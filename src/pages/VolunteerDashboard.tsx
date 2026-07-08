
import { Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, UserCheck, Search, Phone } from 'lucide-react';
import AIChatInterface from '../components/AIChatInterface';

export default function VolunteerDashboard({ language }: { language: string }) {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <header className="bg-white dark:bg-fifa-card border-b border-slate-200 dark:border-slate-800 p-4 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" aria-label="Back to home page" className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
              <ArrowLeft size={24} />
            </Link>
            <h1 className="text-xl font-bold">Volunteer Hub</h1>
          </div>
          <div className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 px-3 py-1 rounded-full text-sm font-medium">
            Active Shift
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <div className="lg:col-span-2 space-y-6">
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button onClick={() => window.dispatchEvent(new CustomEvent('send-ai-message', { detail: 'Can you show me the standard operating procedures?' }))} className="card flex flex-col items-center justify-center p-4 hover:border-green-500 transition-colors gap-2">
              <BookOpen className="text-green-500" size={32} />
              <span className="text-sm font-medium text-center">SOP Library</span>
            </button>
            <button onClick={() => window.dispatchEvent(new CustomEvent('send-ai-message', { detail: 'I have a fan with a ticketing issue. What is the protocol?' }))} className="card flex flex-col items-center justify-center p-4 hover:border-blue-500 transition-colors gap-2">
              <UserCheck className="text-blue-500" size={32} />
              <span className="text-sm font-medium text-center">Ticketing Help</span>
            </button>
            <button onClick={() => window.dispatchEvent(new CustomEvent('send-ai-message', { detail: 'A fan lost their item. What is the procedure for Lost & Found?' }))} className="card flex flex-col items-center justify-center p-4 hover:border-orange-500 transition-colors gap-2">
              <Search className="text-orange-500" size={32} />
              <span className="text-sm font-medium text-center">Lost & Found</span>
            </button>
            <button onClick={() => window.dispatchEvent(new CustomEvent('send-ai-message', { detail: 'There is an emergency situation. What is the immediate protocol?' }))} className="card flex flex-col items-center justify-center p-4 hover:border-fifa-red transition-colors gap-2">
              <Phone className="text-fifa-red" size={32} />
              <span className="text-sm font-medium text-center">Emergency</span>
            </button>
          </div>

          <section className="card bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-900/50">
            <h2 className="text-lg font-bold text-green-900 dark:text-green-400 mb-4">Quick Protocols (SOPs)</h2>
            <ul className="space-y-3">
              <li onClick={() => window.dispatchEvent(new CustomEvent('send-ai-message', { detail: 'What is the full detailed SOP for handling lost items?' }))} className="bg-white dark:bg-slate-800 p-3 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm cursor-pointer hover:shadow-md transition-shadow">
                <span className="font-semibold text-slate-800 dark:text-slate-200 block mb-1">Handling Lost Items</span>
                <span className="text-sm text-slate-500">Collect item, log in system, hand to Sector Supervisor.</span>
              </li>
              <li onClick={() => window.dispatchEvent(new CustomEvent('send-ai-message', { detail: 'What is the full detailed SOP for directing wheelchair users?' }))} className="bg-white dark:bg-slate-800 p-3 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm cursor-pointer hover:shadow-md transition-shadow">
                <span className="font-semibold text-slate-800 dark:text-slate-200 block mb-1">Directing Wheelchair Users</span>
                <span className="text-sm text-slate-500">Guide to nearest Elevator Bank A. Verify companion ticket.</span>
              </li>
            </ul>
          </section>

        </div>

        <div className="lg:col-span-1 h-[600px] lg:h-[calc(100vh-120px)] sticky top-24">
          <AIChatInterface role="Volunteer" language={language} />
        </div>

      </main>
    </div>
  );
}
