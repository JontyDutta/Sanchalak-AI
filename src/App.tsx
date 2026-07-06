import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import FanDashboard from './pages/FanDashboard';
import VolunteerDashboard from './pages/VolunteerDashboard';
import OrganizerDashboard from './pages/OrganizerDashboard';
import SecurityDashboard from './pages/SecurityDashboard';

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
        <Routes>
          <Route path="/" element={<LandingPage setDarkMode={setDarkMode} darkMode={darkMode} language={language} setLanguage={setLanguage} />} />
          <Route path="/fan/*" element={<FanDashboard language={language} />} />
          <Route path="/volunteer/*" element={<VolunteerDashboard language={language} />} />
          <Route path="/organizer/*" element={<OrganizerDashboard language={language} />} />
          <Route path="/security/*" element={<SecurityDashboard language={language} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
