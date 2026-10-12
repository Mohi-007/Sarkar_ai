import React from 'react';
import { BarChart3, Award, TrendingUp, Gavel, Scale, BookOpen } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, CartesianGrid } from 'recharts';

const Dashboard = () => {
  const performanceData = [
    { session: 'Session 1', score: 74, citations: 68 },
    { session: 'Session 2', score: 78, citations: 72 },
    { session: 'Session 3', score: 82, citations: 80 },
    { session: 'Session 4', score: 88, citations: 85 },
    { session: 'Session 5', score: 91, citations: 89 },
    { session: 'Session 6', score: 94, citations: 92 },
  ];

  const domainData = [
    { domain: 'Criminal (BNS)', sessions: 12 },
    { domain: 'Cyber Fraud', sessions: 8 },
    { domain: 'Civil Negligence', sessions: 6 },
    { domain: 'Constitutional', sessions: 4 },
  ];

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header */}
      <div className="bg-[#0b132b] p-8 rounded-3xl border border-amber-500/40 shadow-2xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 text-xs font-mono">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>ADVOCATE ANALYTICS & INSIGHTS</span>
          </div>

          <h1 className="text-3xl font-cinzel font-extrabold gold-text-gradient">
            Judicial Analytics & Advocacy Dashboard
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Monitor trial simulation progress, legal argument accuracy, citation index, and courtroom decorum metrics.
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="court-glass rounded-2xl p-5 border border-amber-500/30 space-y-2">
          <div className="flex items-center justify-between text-amber-400">
            <span className="text-xs font-mono uppercase font-bold">Total Moot Sessions</span>
            <Gavel className="w-5 h-5" />
          </div>
          <p className="text-3xl font-black text-slate-100">18</p>
          <p className="text-[11px] text-emerald-400 font-mono flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +4 this week
          </p>
        </div>

        <div className="court-glass rounded-2xl p-5 border border-amber-500/30 space-y-2">
          <div className="flex items-center justify-between text-emerald-400">
            <span className="text-xs font-mono uppercase font-bold">Win Rate %</span>
            <Award className="w-5 h-5" />
          </div>
          <p className="text-3xl font-black text-slate-100">88.4%</p>
          <p className="text-[11px] text-emerald-400 font-mono">Top 5% Advocates</p>
        </div>

        <div className="court-glass rounded-2xl p-5 border border-amber-500/30 space-y-2">
          <div className="flex items-center justify-between text-sky-400">
            <span className="text-xs font-mono uppercase font-bold">Avg Judicial Score</span>
            <Scale className="w-5 h-5" />
          </div>
          <p className="text-3xl font-black text-slate-100">92 / 100</p>
          <p className="text-[11px] text-sky-400 font-mono">Consistent Senior Rank</p>
        </div>

        <div className="court-glass rounded-2xl p-5 border border-amber-500/30 space-y-2">
          <div className="flex items-center justify-between text-purple-400">
            <span className="text-xs font-mono uppercase font-bold">Citation Accuracy</span>
            <BookOpen className="w-5 h-5" />
          </div>
          <p className="text-3xl font-black text-slate-100">94.2%</p>
          <p className="text-[11px] text-purple-400 font-mono">BSA & BNS Validated</p>
        </div>
      </div>

      {/* Visual Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Line Chart */}
        <div className="court-glass rounded-2xl p-6 border border-amber-500/30 space-y-4">
          <h3 className="font-cinzel font-bold text-sm text-slate-100 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-amber-400" />
            Judicial Score Trend Progression
          </h3>
          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#243252" />
                <XAxis dataKey="session" stroke="#94a3b8" tick={{ fontSize: 10 }} />
                <YAxis stroke="#94a3b8" tick={{ fontSize: 10 }} domain={[60, 100]} />
                <Tooltip contentStyle={{ backgroundColor: '#070b14', borderColor: '#d4af37', borderRadius: '12px', fontSize: '12px' }} />
                <Line type="monotone" dataKey="score" stroke="#d4af37" strokeWidth={3} dot={{ fill: '#d4af37', r: 5 }} />
                <Line type="monotone" dataKey="citations" stroke="#38bdf8" strokeWidth={2} strokeDasharray="5 5" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="court-glass rounded-2xl p-6 border border-amber-500/30 space-y-4">
          <h3 className="font-cinzel font-bold text-sm text-slate-100 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-amber-400" />
            Practice Session Distribution by Domain
          </h3>
          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={domainData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#243252" />
                <XAxis dataKey="domain" stroke="#94a3b8" tick={{ fontSize: 10 }} />
                <YAxis stroke="#94a3b8" tick={{ fontSize: 10 }} />
                <Tooltip contentStyle={{ backgroundColor: '#070b14', borderColor: '#d4af37', borderRadius: '12px', fontSize: '12px' }} />
                <Bar dataKey="sessions" fill="#d4af37" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

    </div>
  );
};

export default Dashboard;
