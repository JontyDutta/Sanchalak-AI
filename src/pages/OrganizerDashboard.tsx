import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, BarChart3, AlertTriangle, Users, Activity } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import AIChatInterface from '../components/AIChatInterface';
import { stadiumData } from '../data/mockData';

export default function OrganizerDashboard({ language }: { language: string }) {
  const chartData = Object.values(stadiumData.gates).map(gate => ({
    name: gate.name.split(' ')[0],
    congestion: gate.currentCongestion,
  }));

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <header className="bg-white dark:bg-fifa-card border-b border-slate-200 dark:border-slate-800 p-4 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
              <ArrowLeft size={24} />
            </Link>
            <h1 className="text-xl font-bold flex items-center gap-2">
              <Activity className="text-fifa-red" /> Organizer Command Center
            </h1>
          </div>
          <div className="bg-fifa-red text-white px-3 py-1 rounded-full text-sm font-medium animate-pulse">
            LIVE - MATCH IN PROGRESS
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-80px)]">
        
        <div className="lg:col-span-2 space-y-6 overflow-y-auto pr-2">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="card border-l-4 border-l-blue-500">
              <h3 className="text-slate-500 text-sm font-medium mb-1">Total Attendance</h3>
              <p className="text-3xl font-bold">64,230</p>
              <p className="text-sm text-green-500 mt-2">↑ 12% since last hour</p>
            </div>
            <div className="card border-l-4 border-l-orange-500">
              <h3 className="text-slate-500 text-sm font-medium mb-1">Avg Gate Wait</h3>
              <p className="text-3xl font-bold">12m</p>
              <p className="text-sm text-orange-500 mt-2">Gate A is severely congested</p>
            </div>
            <div className="card border-l-4 border-l-fifa-red">
              <h3 className="text-slate-500 text-sm font-medium mb-1">Active Alerts</h3>
              <p className="text-3xl font-bold">2</p>
              <p className="text-sm text-slate-500 mt-2">Requires attention</p>
            </div>
          </div>

          <section className="card">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <BarChart3 className="text-fifa-red" />
                <h2 className="text-lg font-bold">Live Gate Congestion</h2>
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.2} />
                  <XAxis dataKey="name" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                  />
                  <Bar dataKey="congestion" fill="#2563EB" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>

          <section className="card bg-orange-50 dark:bg-orange-900/10 border-orange-200 dark:border-orange-900/50">
            <div className="flex items-start gap-3">
              <AlertTriangle className="text-orange-500 mt-1 shrink-0" />
              <div>
                <h3 className="font-bold text-orange-900 dark:text-orange-200 mb-2">AI Operational Recommendation</h3>
                <p className="text-orange-800 dark:text-orange-300 text-sm mb-4">
                  Based on current trends, Gate A will exceed safe capacity in 10 minutes. 
                  Redirecting 30% of incoming attendees to Gate D is advised.
                </p>
                <div className="flex gap-3">
                  <button className="bg-orange-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors">
                    Execute Diversion Protocol
                  </button>
                  <button className="bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors border border-slate-200 dark:border-slate-700">
                    Ignore
                  </button>
                </div>
              </div>
            </div>
          </section>

        </div>

        <div className="lg:col-span-1 h-[600px] lg:h-full">
          <AIChatInterface role="Organizer" language={language} />
        </div>

      </main>
    </div>
  );
}
