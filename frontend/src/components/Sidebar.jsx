import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Scale, 
  Gavel, 
  BookOpen, 
  ShieldAlert, 
  FileSearch, 
  BarChart3, 
  X, 
  Compass, 
  Bot, 
  FileCheck,
  Award
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  const { user } = useAuth();

  const isActive = (path) => location.pathname === path;

  const navItems = [
    { path: '/', label: 'Advocate Chamber', icon: Compass, badge: 'Main' },
    { path: '/moot', label: '3D Virtual Moot Court', icon: Gavel, badge: 'Interactive', color: 'text-amber-400' },
    { path: '/matrix', label: 'IPC ↔ BNS Law Matrix', icon: BookOpen, badge: '2023 Codes', color: 'text-sky-400' },
    { path: '/document', label: 'Document Risk & Draft AI', icon: ShieldAlert, badge: 'OCR + Draft', color: 'text-rose-400' },
    { path: '/bail', label: 'Bail & Sentence Predictor', icon: FileCheck, badge: 'BNSS AI', color: 'text-emerald-400' },
    { path: '/qa', label: 'Voice Advocate Q&A', icon: Bot, badge: '6 Languages', color: 'text-purple-400' },
    { path: '/cases', label: 'Landmark Precedent Explorer', icon: FileSearch, badge: 'Vector Search' },
    { path: '/dashboard', label: 'Judicial Analytics', icon: BarChart3, badge: 'Stats' },
  ];

  return (
    <>
      {/* Backdrop for Mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar Drawer */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-72 bg-[#070b14] border-r border-amber-500/20 shadow-2xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:static lg:z-auto`}
      >
        <div className="flex flex-col h-full">
          
          {/* Header */}
          <div className="flex items-center justify-between h-20 px-6 border-b border-amber-500/20 bg-slate-900/40">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-700 p-0.5 shadow-md">
                <div className="w-full h-full bg-[#070b14] rounded-[10px] flex items-center justify-center">
                  <Scale className="w-5 h-5 text-amber-400" />
                </div>
              </div>
              <div>
                <span className="font-cinzel font-bold text-lg text-slate-100 tracking-wider">
                  SARKAR AI
                </span>
                <p className="text-[10px] text-amber-400 font-mono uppercase tracking-wider">Judicial Suite</p>
              </div>
            </div>
            
            <button
              onClick={onClose}
              className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="flex-1 py-6 px-4 overflow-y-auto space-y-1.5">
            <p className="px-3 text-[10px] font-mono uppercase tracking-widest text-slate-500 font-semibold mb-2">
              Judicial Modules
            </p>
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold transition-all duration-200 group ${
                    active
                      ? 'bg-gradient-to-r from-amber-500/20 to-amber-900/10 text-amber-300 border border-amber-500/40 shadow-lg shadow-amber-500/5'
                      : 'text-slate-300 hover:text-amber-300 hover:bg-slate-800/40'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className={`w-5 h-5 ${active ? 'text-amber-400' : item.color || 'text-slate-400 group-hover:text-amber-400'} transition-colors`} />
                    <span className="font-sans text-xs tracking-wide">{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`text-[9px] font-mono px-2 py-0.5 rounded-full border ${
                      active
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                        : 'bg-slate-800 text-slate-400 border-slate-700'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Courtroom Status Banner & Advocate Footer */}
          <div className="p-4 border-t border-amber-500/20 bg-slate-900/60">
            <div className="p-3.5 rounded-xl bg-gradient-to-br from-amber-950/40 via-slate-900 to-slate-950 border border-amber-500/30">
              <div className="flex items-center space-x-2 text-amber-400 mb-1">
                <Award className="w-4 h-4" />
                <span className="text-xs font-cinzel font-bold">Supreme Court Verified</span>
              </div>
              <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
                Empowered with Bharatiya Nyaya Sanhita 2023 & Indian Evidence Act RAG models.
              </p>
            </div>
            
            <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500 font-mono">
              <span>Status: <span className="text-emerald-400 font-semibold">Live System</span></span>
              <span>v2.4.0</span>
            </div>
          </div>

        </div>
      </aside>
    </>
  );
};

export default Sidebar;
