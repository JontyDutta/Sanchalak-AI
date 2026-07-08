import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Users, Mic, Activity, Moon, Sun, Server, X } from 'lucide-react';

interface Props {
  setDarkMode: (val: boolean) => void;
  darkMode: boolean;
  language: string;
  setLanguage: (val: string) => void;
}

export default function LandingPage({ setDarkMode, darkMode, language, setLanguage }: Props) {
  const [showArch, setShowArch] = useState(false);

  const roles = [
    { name: 'Fan', icon: <Users size={32} />, path: '/fan', color: 'bg-blue-500' },
    { name: 'Volunteer', icon: <Mic size={32} />, path: '/volunteer', color: 'bg-green-500' },
    { name: 'Organizer', icon: <Activity size={32} />, path: '/organizer', color: 'bg-orange-500' },
    { name: 'Security', icon: <Shield size={32} />, path: '/security', color: 'bg-fifa-red' },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[url('https://images.unsplash.com/photo-1518605368461-1ee7e1635391?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center bg-no-repeat relative">
      <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm z-0"></div>

      <div className="absolute top-6 left-6 z-10 hidden md:block">
        <div className="bg-orange-500/20 border border-orange-500/50 text-orange-400 px-4 py-2 rounded-full text-sm font-bold tracking-widest uppercase backdrop-blur-md">
          Prompt Wars Challenge 4
        </div>
      </div>
      
      <div className="absolute top-6 right-6 z-10 flex items-center gap-4">
        <button 
          onClick={() => setShowArch(true)}
          aria-label="View System Architecture"
          className="p-3 rounded-full bg-fifa-gold/20 hover:bg-fifa-gold/40 text-fifa-gold backdrop-blur-md transition-all flex items-center gap-2"
        >
          <Server size={24} aria-hidden="true" />
          <span className="hidden sm:inline font-bold">Architecture</span>
        </button>
        <select 
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          aria-label="Select Language"
          className="bg-white/10 border border-white/20 text-white backdrop-blur-md rounded-lg px-3 py-2 outline-none font-medium cursor-pointer appearance-none pr-8 relative"
          style={{ backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23FFFFFF%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right .7rem top 50%', backgroundSize: '.65rem auto' }}
        >
          <option value="English" className="text-black">English</option>
          <option value="Hindi" className="text-black">Hindi</option>
          <option value="Spanish" className="text-black">Spanish</option>
          <option value="Arabic" className="text-black">Arabic</option>
          <option value="French" className="text-black">French</option>
        </select>
        <button 
          onClick={() => setDarkMode(!darkMode)}
          aria-label={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-all"
        >
          {darkMode ? <Sun size={24} aria-hidden="true" /> : <Moon size={24} aria-hidden="true" />}
        </button>
      </div>

      <main className="z-10 text-center max-w-3xl w-full">
        <h1 className="text-5xl md:text-7xl font-black text-white mb-4 tracking-tight">
          SANCHALAK <span className="text-fifa-gold">AI</span>
        </h1>
        <p className="text-xl md:text-2xl text-slate-200 mb-12 font-light">
          Operational Intelligence Copilot for FIFA World Cup 2026
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl mx-auto">
          {roles.map((role) => (
            <Link 
              key={role.name}
              to={role.path}
              aria-label={`Enter ${role.name} Portal`}
              className={`group flex items-center p-6 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md transition-all duration-300 hover:scale-[1.02]`}
            >
              <div className={`${role.color} p-4 rounded-xl text-white mr-6 shadow-lg group-hover:scale-110 transition-transform`}>
                {role.icon}
              </div>
              <div className="text-left">
                <h3 className="text-2xl font-bold text-white mb-1">{role.name}</h3>
                <p className="text-slate-300 text-sm">Enter {role.name} Portal</p>
              </div>
            </Link>
          ))}
        </div>
      </main>
      
      <div className="absolute bottom-6 z-10 text-slate-400 text-sm font-light">
        Powered by Gemini AI • Real-time Decision Support
      </div>

      {showArch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-fifa-card rounded-2xl p-6 md:p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto relative shadow-2xl border border-slate-200 dark:border-slate-700 text-left">
            <button 
              onClick={() => setShowArch(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              aria-label="Close modal"
            >
              <X size={24} className="text-slate-700 dark:text-slate-300" />
            </button>
            <h2 className="text-3xl font-black mb-6 text-slate-800 dark:text-white">Production System Architecture</h2>
            
            <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-xl mb-6 border border-slate-200 dark:border-slate-700">
              <h3 className="text-xl font-bold mb-4 text-slate-800 dark:text-fifa-gold">Security & Scalability Design</h3>
              <p className="text-slate-600 dark:text-slate-300 mb-4">
                This MVP uses a direct client-to-API connection for speed of development during the Prompt Wars Hackathon. 
                Below is the planned architecture for the production deployment to ensure enterprise-grade security, scalability, and performance for the FIFA World Cup 2026.
              </p>
              
              <ul className="space-y-4 mt-6">
                <li className="flex gap-4">
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg text-blue-600 dark:text-blue-400 h-fit">
                    <Shield size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 dark:text-slate-200">Backend Proxy & Secret Manager</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">The Gemini API Key will be securely stored in Google Cloud Secret Manager. The frontend will communicate with a Node.js/Express backend proxy (e.g., hosted on Cloud Run), which will authenticate the user and append the secret key before making the server-to-server call to the Gemini API.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-lg text-green-600 dark:text-green-400 h-fit">
                    <Activity size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 dark:text-slate-200">Event-Driven Data Ingestion</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Live stadium data (turnstiles, CCTV crowd density, POS systems) will stream via Kafka/PubSub into a fast in-memory Redis cache. The AI's Function Calling will query this real-time cache rather than a static JSON file.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
