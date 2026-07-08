import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';

import { getGeminiResponseBackend } from './server-gemini.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8080;

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", "https://www.googletagmanager.com"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      imgSrc: ["'self'", "data:", "https://*"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      frameSrc: ["'self'", "https://maps.google.com", "https://www.google.com"],
      connectSrc: ["'self'", "https://*"],
    },
  },
  crossOriginEmbedderPolicy: false,
  crossOriginOpenerPolicy: false,
}));

app.use(compression());

app.set('trust proxy', 1);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000,
  message: 'Too many requests from this IP, please try again later.'
});
app.use(limiter);

app.post('/api/gemini', express.json(), async (req, res) => {
  const { role, prompt, language } = req.body;
  try {
    const response = await getGeminiResponseBackend(role, prompt, language);
    res.json({ response });
  } catch (error) {
    console.error("Gemini backend error:", error);
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
});

app.use(express.static(path.join(__dirname, 'dist')));

app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
