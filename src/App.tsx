import React, { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const LandingPage = lazy(() => import('./pages/LandingPage'));
const FanDashboard = lazy(() => import('./pages/FanDashboard'));
const VolunteerDashboard = lazy(() => import('./pages/VolunteerDashboard'));
const OrganizerDashboard = lazy(() => import('./pages/OrganizerDashboard'));
const SecurityDashboard = lazy(() => import('./pages/SecurityDashboard'));

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [language, setLanguage] = useState('English');

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50 dark:bg-fifa-dark text-slate-900 dark:text-slate-100 transition-colors duration-200">
        <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
          <Routes>
            <Route path="/" element={<LandingPage setDarkMode={setDarkMode} darkMode={darkMode} language={language} setLanguage={setLanguage} />} />
            <Route path="/fan/*" element={<FanDashboard language={language} />} />
            <Route path="/volunteer/*" element={<VolunteerDashboard language={language} />} />
            <Route path="/organizer/*" element={<OrganizerDashboard language={language} />} />
            <Route path="/security/*" element={<SecurityDashboard language={language} />} />
          </Routes>
        </Suspense>
      </div>
    </BrowserRouter>
  );
}

export default App;
