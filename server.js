import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8080;

app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false,
}));

app.use(compression());

app.set('trust proxy', 1);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000,
  message: 'Too many requests from this IP, please try again later.'
});
app.use(limiter);

app.use(express.static(path.join(__dirname, 'dist')));

app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
