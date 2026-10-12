import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Scale, 
  Gavel, 
  BookOpen, 
  ShieldAlert, 
  BarChart3, 
  Bot, 
  FileCheck, 
  ArrowRight,
  Sparkles,
  Award,
  Zap,
  CheckCircle2,
  BookMarked
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import CourtroomStage from '../components/CourtroomStage';

const Home = () => {
  const { user } = useAuth();

  const features = [
    {
      id: 'moot',
      title: '3D Virtual Moot Court',
      description: 'Practice courtroom advocacy with AI Hon\'ble Judge, opposing counsel, live objections & real-time gavel strikes.',
      icon: Gavel,
      path: '/moot',
      badge: 'Interactive 3D Stage',
      btnBg: 'bg-amber-500 text-slate-950 hover:bg-amber-400',
    },
    {
      id: 'matrix',
      title: 'IPC ↔ BNS Law Matrix',
      description: 'Instant cross-reference converter comparing IPC 1860 vs Bharatiya Nyaya Sanhita 2023 & CrPC vs BNSS with precedents.',
      icon: BookOpen,
      path: '/matrix',
      badge: '2023 Criminal Codes',
      btnBg: 'bg-sky-500 text-slate-950 hover:bg-sky-400',
    },
    {
      id: 'document',
      title: 'Document Risk & Draft AI',
      description: 'Clause-by-clause contract risk auditing plus automated drafting for Legal Notices, Bail Petitions & Affidavits.',
      icon: ShieldAlert,
      path: '/document',
      badge: 'OCR & Auto-Draft',
      btnBg: 'bg-rose-500 text-slate-950 hover:bg-rose-400',
    },
    {
      id: 'bail',
      title: 'Bail & Trial Predictor',
      description: 'AI statistical probability engine predicting bail approval rate, risk metrics & expected timeline under BNSS.',
      icon: FileCheck,
      path: '/bail',
      badge: 'BNSS Analytics',
      btnBg: 'bg-emerald-500 text-slate-950 hover:bg-emerald-400',
    },
    {
      id: 'qa',
      title: 'Voice Legal Assistant',
      description: 'Multilingual legal advice in English, Hindi, Tamil, Telugu & Marathi with speech synthesis and domain classification.',
      icon: Bot,
      path: '/qa',
      badge: '6 Indian Languages',
      btnBg: 'bg-purple-500 text-slate-950 hover:bg-purple-400',
    },
    {
      id: 'dashboard',
      title: 'Judicial Analytics',
      description: 'Track advocacy score trends, courtroom win rates, citation usage index, and personalized improvement metrics.',
      icon: BarChart3,
      path: '/dashboard',
      badge: 'Advocate Insights',
      btnBg: 'bg-indigo-500 text-slate-950 hover:bg-indigo-400',
    },
  ];

  return (
    <div className="space-y-8 pb-12">
      
      {/* Top Welcome Banner with Court Interior Vibe */}
      <div className="relative rounded-3xl p-8 sm:p-10 overflow-hidden court-glass-gold border border-amber-500/40 shadow-2xl">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>SUPREME JUDICIAL INTELLIGENCE PLATFORM</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-cinzel font-extrabold gold-text-gradient leading-tight">
            Welcome to Sarkar AI Advocate Chamber
          </h1>

          <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed">
            Welcome, <strong className="text-amber-300">{user?.name || 'Advocate Surya Sarkar'}</strong>. Experience India's premier AI legal system equipped with 3D Virtual Courtrooms, BNS/BNSS code converters, predictive bail analytics, contract risk auditing, and automated legal notice drafting.
          </p>

          <div className="pt-2 flex flex-wrap gap-4">
            <Link
              to="/moot"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-400 hover:to-amber-600 text-slate-950 font-extrabold text-sm shadow-xl shadow-amber-500/20 flex items-center space-x-2 transition-all hover:scale-105"
            >
              <Gavel className="w-4 h-4 text-slate-950" />
              <span>Enter 3D Virtual Courtroom</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </Link>

            <Link
              to="/matrix"
              className="px-6 py-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-amber-300 border border-amber-500/40 font-bold text-sm shadow-lg flex items-center space-x-2 transition-all"
            >
              <BookOpen className="w-4 h-4 text-amber-400" />
              <span>Explore IPC ↔ BNS Matrix</span>
            </Link>
          </div>
        </div>

        {/* Decorative Background Scales */}
        <div className="absolute top-1/2 -right-10 -translate-y-1/2 opacity-10 pointer-events-none hidden lg:block">
          <Scale className="w-96 h-96 text-amber-400" />
        </div>
      </div>

      {/* Interactive Courtroom Interior Preview Stage */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-cinzel font-bold text-slate-100 flex items-center gap-2">
              <Scale className="w-5 h-5 text-amber-400" />
              Interactive Courtroom Interior Stage
            </h2>
            <p className="text-xs text-slate-400">Live 3D courtroom view with judge bench, counsel podiums, and gavel audio effects.</p>
          </div>
          <span className="text-xs font-mono px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            SYSTEM ONLINE
          </span>
        </div>

        <CourtroomStage activeSpeaker="judge" />
      </div>

      {/* Feature Grid Header */}
      <div className="pt-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-cinzel font-bold text-slate-100 flex items-center gap-2">
              <Zap className="w-6 h-6 text-amber-400" />
              Sarkar AI Legal Suites & Features
            </h2>
            <p className="text-xs text-slate-400">Select any module to start your legal practice or judicial simulation.</p>
          </div>
        </div>

        {/* 6 Core Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="group relative rounded-2xl p-6 court-glass border transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-900/30 border border-amber-500/30 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-amber-400 group-hover:scale-110 transition-transform" />
                    </div>
                    <span className="text-[10px] font-mono font-semibold px-2.5 py-1 rounded-full bg-slate-900 text-amber-300 border border-amber-500/30">
                      {item.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-cinzel font-bold text-slate-100 group-hover:text-amber-300 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-300 font-sans mt-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="pt-6">
                  <Link
                    to={item.path}
                    className={`w-full py-2.5 px-4 rounded-xl font-extrabold text-xs flex items-center justify-center space-x-2 transition-all shadow-md ${item.btnBg}`}
                  >
                    <span>Launch Module</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Judicial Stats & Updates Bar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4">
        
        <div className="court-glass rounded-2xl p-6 border border-amber-500/20 space-y-3">
          <div className="flex items-center space-x-3 text-amber-400">
            <Award className="w-5 h-5" />
            <h4 className="font-cinzel font-bold text-sm text-slate-200">Supreme Court Precedents</h4>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Indexed over 45,000 Supreme Court & High Court judgments with semantic vector embeddings for instant case retrieval.
          </p>
          <div className="pt-2 flex items-center justify-between text-xs font-mono text-amber-300">
            <span>Model: ChromaDB RAG</span>
            <span className="text-emerald-400">100% Synced</span>
          </div>
        </div>

        <div className="court-glass rounded-2xl p-6 border border-amber-500/20 space-y-3">
          <div className="flex items-center space-x-3 text-sky-400">
            <BookMarked className="w-5 h-5" />
            <h4 className="font-cinzel font-bold text-sm text-slate-200">New Criminal Acts 2023</h4>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Full compliance with Bharatiya Nyaya Sanhita (BNS), Bharatiya Nagarik Suraksha Sanhita (BNSS), and Sakshya Adhiniyam.
          </p>
          <div className="pt-2 flex items-center justify-between text-xs font-mono text-sky-300">
            <span>Enforced: July 2024</span>
            <span className="text-emerald-400">Active</span>
          </div>
        </div>

        <div className="court-glass rounded-2xl p-6 border border-amber-500/20 space-y-3">
          <div className="flex items-center space-x-3 text-emerald-400">
            <CheckCircle2 className="w-5 h-5" />
            <h4 className="font-cinzel font-bold text-sm text-slate-200">Advocate Performance</h4>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Track moot court success rates, citation accuracy, and legal argument strength with real-time AI scoring algorithms.
          </p>
          <div className="pt-2 flex items-center justify-between text-xs font-mono text-emerald-300">
            <span>Advocate Rank: Senior</span>
            <span className="text-amber-400">Top 5%</span>
          </div>
        </div>

      </div>

    </div>
  );
};

export default Home;
