import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Navigation, Train, HelpCircle } from 'lucide-react';
import AIChatInterface from '../components/AIChatInterface';

export default function FanDashboard({ language }: { language: string }) {
  const handleSmartNavigation = () => {
    window.dispatchEvent(new CustomEvent('send-ai-message', { detail: 'I need help finding my seat and the nearest food/restrooms.' }));
  };

  const handleExitPlanner = () => {
    window.dispatchEvent(new CustomEvent('send-ai-message', { detail: 'I am ready to leave. Can you help me plan the safest and fastest exit route to the Metro?' }));
  };

  const handleAccessibility = () => {
    window.dispatchEvent(new CustomEvent('send-ai-message', { detail: 'What accessibility options and routes are available for a wheelchair user?' }));
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <header className="bg-white dark:bg-fifa-card border-b border-slate-200 dark:border-slate-800 p-4 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
              <ArrowLeft size={24} />
            </Link>
            <h1 className="text-xl font-bold">Fan Experience Portal</h1>
          </div>
          <div className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 px-3 py-1 rounded-full text-sm font-medium">
            Match Day
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-80px)]">
        
        <div className="lg:col-span-2 space-y-6 overflow-y-auto pr-2">
          
          <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="card bg-gradient-to-br from-blue-500 to-blue-600 text-white border-none">
              <MapPin size={24} className="mb-4 opacity-80" />
              <h2 className="text-xl font-bold mb-2">Smart Navigation</h2>
              <p className="text-blue-100 text-sm mb-4">Find your seat, nearest food, and restrooms instantly.</p>
              <button onClick={handleSmartNavigation} className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium text-sm hover:bg-blue-50 transition-colors">
                Find My Seat
              </button>
            </div>
            
            <div className="card bg-gradient-to-br from-purple-500 to-purple-600 text-white border-none">
              <Train size={24} className="mb-4 opacity-80" />
              <h2 className="text-xl font-bold mb-2">Exit Planner</h2>
              <p className="text-purple-100 text-sm mb-4">Plan your safest and fastest route home after the match.</p>
              <button onClick={handleExitPlanner} className="bg-white text-purple-600 px-4 py-2 rounded-lg font-medium text-sm hover:bg-purple-50 transition-colors">
                Plan Exit
              </button>
            </div>
          </section>

          <section className="card">
            <div className="flex items-center gap-2 mb-4">
              <Navigation className="text-fifa-red" />
              <h2 className="text-lg font-bold">Stadium Map</h2>
            </div>
            <div className="aspect-video bg-slate-200 dark:bg-slate-800 rounded-lg flex items-center justify-center relative overflow-hidden group">
               <img 
                 src="https://images.unsplash.com/photo-1577223625816-7546f13df25d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                 alt="Stadium Map Placeholder" 
                 className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-overlay group-hover:scale-105 transition-transform duration-700"
               />
               <div className="z-10 text-center">
                 <p className="text-slate-500 dark:text-slate-300 font-medium bg-black/40 px-4 py-2 rounded backdrop-blur-sm">Interactive Map view</p>
                 <p className="text-xs text-slate-400 mt-2">(Use Copilot for directions)</p>
               </div>
            </div>
          </section>

          <section className="grid grid-cols-2 gap-4">
            <div onClick={handleAccessibility} className="card flex items-center justify-center gap-2 cursor-pointer hover:border-fifa-red transition-colors group">
              <HelpCircle className="text-slate-400 group-hover:text-fifa-red transition-colors" />
              <span className="font-medium group-hover:text-fifa-red transition-colors">Accessibility Options</span>
            </div>
            <div className="card flex items-center justify-center gap-2 cursor-pointer hover:border-fifa-red transition-colors group">
              <span className="text-2xl">🌐</span>
              <span className="font-medium group-hover:text-fifa-red transition-colors">Language: {language}</span>
            </div>
          </section>

        </div>

        <div className="lg:col-span-1 h-[600px] lg:h-full">
          <AIChatInterface role="Fan" language={language} />
        </div>

      </main>
    </div>
  );
}
