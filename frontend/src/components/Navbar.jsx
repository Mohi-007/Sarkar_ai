import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Scale, 
  Gavel, 
  BookOpen, 
  ShieldAlert, 
  BarChart3, 
  Menu, 
  User, 
  Bot,
  Compass,
  FileCheck
} from 'lucide-react';
import { soundFx } from '../utils/audio';

const Navbar = ({ onMenuClick }) => {
  const location = useLocation();
  const { user } = useAuth();

  const handleGavelClick = () => {
    soundFx.playGavelStrike();
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 bg-[#070b14]/90 backdrop-blur-md border-b border-amber-500/20 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Left: Mobile Menu & Logo */}
          <div className="flex items-center space-x-4">
            <button
              onClick={onMenuClick}
              className="lg:hidden p-2 rounded-lg text-slate-300 hover:text-amber-400 hover:bg-slate-800/60 focus:outline-none"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Brand Logo & Emblem */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 via-amber-600 to-amber-800 p-0.5 shadow-lg shadow-amber-500/20 group-hover:shadow-amber-500/40 transition-all duration-300">
                <div className="w-full h-full bg-[#070b14] rounded-[10px] flex items-center justify-center">
                  <Scale className="w-6 h-6 text-amber-400 group-hover:scale-110 transition-transform duration-300" />
                </div>
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-cinzel font-extrabold text-2xl tracking-wider gold-text-gradient">
                    SARKAR AI
                  </span>
                  <span className="px-2 py-0.5 text-[10px] font-mono tracking-wider font-semibold uppercase bg-amber-500/10 text-amber-400 border border-amber-500/30 rounded-full">
                    SUPREME V2.4
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 font-sans tracking-wide">
                  Supreme Judicial & Legal Intelligence System
                </p>
              </div>
            </Link>
          </div>

          {/* Center Nav Links (Desktop) */}
          <nav className="hidden lg:flex items-center space-x-1">
            <Link
              to="/"
              className={`px-3 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-200 flex items-center space-x-1.5 ${
                isActive('/') 
                  ? 'bg-amber-500/15 text-amber-300 border border-amber-500/40 shadow-sm' 
                  : 'text-slate-300 hover:text-amber-400 hover:bg-slate-800/40'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>Chamber</span>
            </Link>

            <Link
              to="/moot"
              className={`px-3 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-200 flex items-center space-x-1.5 ${
                isActive('/moot') 
                  ? 'bg-amber-500/15 text-amber-300 border border-amber-500/40 shadow-sm' 
                  : 'text-slate-300 hover:text-amber-400 hover:bg-slate-800/40'
              }`}
            >
              <Gavel className="w-4 h-4 text-amber-400" />
              <span>3D Moot Court</span>
            </Link>

            <Link
              to="/matrix"
              className={`px-3 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-200 flex items-center space-x-1.5 ${
                isActive('/matrix') 
                  ? 'bg-amber-500/15 text-amber-300 border border-amber-500/40 shadow-sm' 
                  : 'text-slate-300 hover:text-amber-400 hover:bg-slate-800/40'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>IPC ↔ BNS Matrix</span>
            </Link>

            <Link
              to="/document"
              className={`px-3 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-200 flex items-center space-x-1.5 ${
                isActive('/document') 
                  ? 'bg-amber-500/15 text-amber-300 border border-amber-500/40 shadow-sm' 
                  : 'text-slate-300 hover:text-amber-400 hover:bg-slate-800/40'
              }`}
            >
              <ShieldAlert className="w-4 h-4" />
              <span>Risk & Draft AI</span>
            </Link>

            <Link
              to="/bail"
              className={`px-3 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-200 flex items-center space-x-1.5 ${
                isActive('/bail') 
                  ? 'bg-amber-500/15 text-amber-300 border border-amber-500/40 shadow-sm' 
                  : 'text-slate-300 hover:text-amber-400 hover:bg-slate-800/40'
              }`}
            >
              <FileCheck className="w-4 h-4" />
              <span>Bail Predictor</span>
            </Link>

            <Link
              to="/qa"
              className={`px-3 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-200 flex items-center space-x-1.5 ${
                isActive('/qa') 
                  ? 'bg-amber-500/15 text-amber-300 border border-amber-500/40 shadow-sm' 
                  : 'text-slate-300 hover:text-amber-400 hover:bg-slate-800/40'
              }`}
            >
              <Bot className="w-4 h-4 text-emerald-400" />
              <span>Voice Advocate</span>
            </Link>

            <Link
              to="/dashboard"
              className={`px-3 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-200 flex items-center space-x-1.5 ${
                isActive('/dashboard') 
                  ? 'bg-amber-500/15 text-amber-300 border border-amber-500/40 shadow-sm' 
                  : 'text-slate-300 hover:text-amber-400 hover:bg-slate-800/40'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Analytics</span>
            </Link>
          </nav>

          {/* Right: Gavel Sound Trigger & User Profile */}
          <div className="flex items-center space-x-3">
            {/* Interactive Audio Gavel Button */}
            <button
              onClick={handleGavelClick}
              title="Strike Gavel (Order in Court)"
              className="px-3 py-1.5 bg-gradient-to-r from-amber-600/30 to-amber-800/30 hover:from-amber-600/50 hover:to-amber-800/50 text-amber-300 border border-amber-500/40 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all shadow-md active:scale-95 group"
            >
              <Gavel className="w-4 h-4 text-amber-400 group-hover:rotate-12 transition-transform" />
              <span className="hidden sm:inline font-mono">ORDER IN COURT</span>
            </button>

            {/* User Profile Pill */}
            <div className="flex items-center space-x-2 pl-3 border-l border-slate-800">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-500 to-amber-700 p-0.5 shadow-md">
                <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-amber-300" />
                </div>
              </div>
              <div className="hidden md:block text-left">
                <p className="text-xs font-bold text-slate-200 leading-tight">{user?.name || 'Advocate Sarkar'}</p>
                <p className="text-[10px] text-amber-400/80 font-mono leading-tight">{user?.barCouncilNo || 'DEL/19824/2022'}</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
};

export default Navbar;
