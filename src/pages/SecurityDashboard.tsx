
import { Link } from 'react-router-dom';
import { ArrowLeft, ShieldAlert, Video, BellRing, MapPin } from 'lucide-react';
import AIChatInterface from '../components/AIChatInterface';
import { stadiumData } from '../data/mockData';

export default function SecurityDashboard({ language }: { language: string }) {
  const activeIncidents = stadiumData.incidents.filter(i => i.status === 'Active');

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <header className="bg-fifa-dark border-b border-slate-800 p-4 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" aria-label="Back to home page" className="p-2 hover:bg-slate-800 rounded-full transition-colors text-white">
              <ArrowLeft size={24} />
            </Link>
            <h1 className="text-xl font-bold text-fifa-red flex items-center gap-2">
              <ShieldAlert />
              Security Command
            </h1>
          </div>
          <div className="flex items-center gap-2">
             <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
            <span className="text-red-500 font-medium text-sm">System Armed</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <div className="lg:col-span-2 space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold flex items-center gap-2"><Video className="text-blue-400"/> Live CCTV Feeds</h3>
                <span className="text-xs bg-slate-700 px-2 py-1 rounded text-slate-300">142 Active</span>
              </div>
              <div className="aspect-video bg-black rounded-lg relative overflow-hidden group cursor-pointer">
                 <img src="https://images.unsplash.com/photo-1540344558238-d6e6761bc225?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="CCTV" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                 <div className="absolute top-2 left-2 bg-red-600 text-white text-[10px] px-1 rounded font-mono font-bold">REC</div>
                 <div className="absolute bottom-2 left-2 text-white text-xs font-mono drop-shadow-md">CAM-04 : GATE A NORTH</div>
              </div>
            </div>

            <div className="bg-slate-800 rounded-xl p-4 border border-slate-700 flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold flex items-center gap-2"><BellRing className="text-orange-400"/> Active Incidents</h3>
                <span className="text-xs bg-red-900/50 text-red-400 px-2 py-1 rounded font-bold">{activeIncidents.length} Critical</span>
              </div>
              <div className="flex-1 overflow-y-auto space-y-3">
                {stadiumData.incidents.map(incident => (
                  <div key={incident.id} className={`p-3 rounded-lg border ${incident.status === 'Active' ? 'border-red-500/50 bg-red-500/10' : 'border-slate-700 bg-slate-900/50'}`}>
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-bold text-sm">{incident.type}</span>
                      <span className={`text-[10px] uppercase px-1.5 py-0.5 rounded font-bold ${incident.status === 'Active' ? 'bg-red-500 text-white' : 'bg-slate-700 text-slate-300'}`}>
                        {incident.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-slate-400 mb-2">
                      <MapPin size={12} /> {incident.location}
                    </div>
                    <p className="text-xs text-slate-500">{incident.timeReported}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <section className="bg-slate-800 rounded-xl p-4 border border-slate-700">
            <h2 className="text-lg font-bold mb-4 text-fifa-gold">AI Crowd Risk Analysis</h2>
            <div className="space-y-4">
              <div className="bg-slate-900 p-4 rounded-lg border border-orange-500/30">
                <div className="flex justify-between mb-2">
                  <span className="font-medium text-orange-400">Bottleneck Detected: Sector C Concourse</span>
                  <span className="text-sm font-mono text-orange-400">Risk: 82%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2 mb-3">
                  <div className="bg-orange-500 h-2 rounded-full" style={{ width: '82%' }}></div>
                </div>
                <p className="text-sm text-slate-300">
                  AI predicts a crush risk within 15 minutes due to overlapping exit flows. 
                  Recommended action: Deploy quick-response team to establish barrier lines.
                </p>
                <button className="mt-3 bg-slate-700 hover:bg-slate-600 text-white text-sm px-3 py-1.5 rounded transition-colors">
                  Dispatch Team Alpha
                </button>
              </div>
            </div>
          </section>

        </div>

        <div className="lg:col-span-1 h-[600px] lg:h-[calc(100vh-120px)] sticky top-24">
          <AIChatInterface role="Security" language={language} />
        </div>

      </main>
    </div>
  );
}
