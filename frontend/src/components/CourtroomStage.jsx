import React, { useState } from 'react';
import { Gavel, Eye, ShieldCheck, Sparkles, UserCheck, Scale } from 'lucide-react';
import { soundFx } from '../utils/audio';

const CourtroomStage = ({ activeSpeaker, currentStep, onStrikeGavel }) => {
  const [viewMode, setViewMode] = useState('bench'); // bench, podium, witness
  const [isStriking, setIsStriking] = useState(false);

  const handleGavelClick = () => {
    setIsStriking(true);
    soundFx.playGavelStrike();
    if (onStrikeGavel) onStrikeGavel();
    setTimeout(() => setIsStriking(false), 500);
  };

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border-2 border-amber-500/40 shadow-2xl shadow-amber-500/10 bg-[#070b14]">
      
      {/* Background Graphic Backdrop with Court Interior */}
      <div className="relative h-80 sm:h-96 w-full overflow-hidden bg-gradient-to-b from-slate-950 via-[#0b132b] to-[#1a100c]">
        
        {/* Court Interior Image Overlay */}
        <img 
          src="/courtroom_bg.png" 
          alt="Court Interior Design" 
          className={`absolute inset-0 w-full h-full object-cover opacity-40 transition-transform duration-700 ${
            viewMode === 'bench' ? 'scale-105 translate-y-0' :
            viewMode === 'podium' ? 'scale-110 -translate-y-4' :
            viewMode === 'witness' ? 'scale-110 translate-x-4' : 'scale-100'
          }`}
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />

        {/* Dynamic Atmospheric Spotlight */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-full bg-gradient-to-b from-amber-400/20 via-amber-600/5 to-transparent blur-2xl pointer-events-none" />

        {/* Top Court Header Banner */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
          <div className="flex items-center space-x-2 bg-slate-950/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-amber-500/40 shadow-lg">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-xs font-mono font-bold text-amber-300 uppercase tracking-widest">
              COURTROOM CHAMBER #1 • IN SESSION
            </span>
          </div>

          {/* Camera View Selector */}
          <div className="flex items-center bg-slate-950/90 backdrop-blur-md p-1 rounded-xl border border-amber-500/30 text-xs font-medium space-x-1">
            <span className="text-[10px] text-slate-400 font-mono px-2 flex items-center gap-1">
              <Eye className="w-3 h-3 text-amber-400" /> View:
            </span>
            <button
              onClick={() => setViewMode('bench')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                viewMode === 'bench' ? 'bg-amber-500 text-slate-950 font-bold shadow-md' : 'text-slate-300 hover:text-amber-300'
              }`}
            >
              Judge Bench
            </button>
            <button
              onClick={() => setViewMode('podium')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                viewMode === 'podium' ? 'bg-amber-500 text-slate-950 font-bold shadow-md' : 'text-slate-300 hover:text-amber-300'
              }`}
            >
              Counsel Podium
            </button>
            <button
              onClick={() => setViewMode('witness')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                viewMode === 'witness' ? 'bg-amber-500 text-slate-950 font-bold shadow-md' : 'text-slate-300 hover:text-amber-300'
              }`}
            >
              Witness Box
            </button>
          </div>
        </div>

        {/* Center Court Stage Layout */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 z-10">
          
          {/* Main Stage Interactive Elements */}
          <div className="grid grid-cols-3 gap-4 items-end max-w-4xl mx-auto w-full">
            
            {/* Left: Defense Table */}
            <div className={`p-4 rounded-xl backdrop-blur-md transition-all duration-300 border ${
              activeSpeaker === 'defense' || activeSpeaker === 'user'
                ? 'bg-amber-500/20 border-amber-400 shadow-lg shadow-amber-500/20 scale-105' 
                : 'bg-slate-900/60 border-slate-700/60 opacity-80'
            }`}>
              <div className="flex items-center space-x-2 text-slate-200 mb-1">
                <UserCheck className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-bold font-cinzel">Counsel for Defense</span>
              </div>
              <p className="text-[11px] text-slate-300 font-mono">Adv. Surya Sarkar</p>
              <div className="mt-2 flex items-center justify-between text-[10px] text-amber-400 font-mono">
                <span>Arguments: 14</span>
                <span className="px-1.5 py-0.5 rounded bg-amber-500/20">READY</span>
              </div>
            </div>

            {/* Center: Hon'ble Judge Bench & National Scales of Justice */}
            <div className={`p-5 rounded-2xl backdrop-blur-lg border text-center transition-all duration-300 wood-panel shadow-2xl relative ${
              activeSpeaker === 'judge' 
                ? 'border-amber-400 shadow-amber-500/30 scale-110 ring-2 ring-amber-500/50' 
                : 'border-amber-500/40'
            }`}>
              {/* National Emblem Crest */}
              <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-gradient-to-tr from-amber-400 via-amber-600 to-amber-800 p-0.5 shadow-md flex items-center justify-center">
                <div className="w-full h-full bg-[#070b14] rounded-full flex items-center justify-center">
                  <Scale className="w-6 h-6 text-amber-400 animate-pulse-slow" />
                </div>
              </div>
              <h4 className="text-sm font-cinzel font-extrabold gold-text-gradient">
                HON'BLE BENCH OF SARKAR AI
              </h4>
              <p className="text-[11px] text-slate-300 font-mono mt-0.5">Justice AI Presiding</p>

              {/* Interactive Gavel Strike Trigger on Bench */}
              <div className="mt-3">
                <button
                  onClick={handleGavelClick}
                  className={`relative px-4 py-1.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-800 text-slate-950 font-extrabold text-xs shadow-lg transition-transform active:scale-95 flex items-center justify-center space-x-2 mx-auto border border-amber-300 ${
                    isStriking ? 'animate-gavel-strike' : 'hover:scale-105'
                  }`}
                >
                  <Gavel className="w-4 h-4 text-slate-950" />
                  <span>STRIKE GAVEL</span>
                </button>
              </div>

              {/* Gavel Shockwave FX */}
              {isStriking && (
                <div className="absolute inset-0 rounded-2xl border-4 border-amber-400 animate-shockwave pointer-events-none" />
              )}
            </div>

            {/* Right: Prosecution Table */}
            <div className={`p-4 rounded-xl backdrop-blur-md transition-all duration-300 border ${
              activeSpeaker === 'prosecution' || activeSpeaker === 'opponent'
                ? 'bg-rose-500/20 border-rose-400 shadow-lg shadow-rose-500/20 scale-105' 
                : 'bg-slate-900/60 border-slate-700/60 opacity-80'
            }`}>
              <div className="flex items-center space-x-2 text-slate-200 mb-1">
                <ShieldCheck className="w-4 h-4 text-rose-400" />
                <span className="text-xs font-bold font-cinzel">Public Prosecutor</span>
              </div>
              <p className="text-[11px] text-slate-300 font-mono">Senior Govt Advocate</p>
              <div className="mt-2 flex items-center justify-between text-[10px] text-rose-400 font-mono">
                <span>Arguments: 12</span>
                <span className="px-1.5 py-0.5 rounded bg-rose-500/20">ACTIVE</span>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Stage Bottom Bar */}
      <div className="bg-[#0b132b] px-6 py-3 border-t border-amber-500/30 flex items-center justify-between text-xs text-slate-300 font-mono">
        <div className="flex items-center space-x-4">
          <span className="flex items-center gap-1.5 text-amber-300">
            <Sparkles className="w-4 h-4 text-amber-400" /> Audio Engine: <span className="text-emerald-400">Web Audio Active</span>
          </span>
          <span className="hidden sm:inline text-slate-500">•</span>
          <span className="hidden sm:inline text-slate-400">Presiding Bench: Supreme AI Model 4.0</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-slate-400">Court decorum level:</span>
          <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30 font-bold">100% STRICT</span>
        </div>
      </div>

    </div>
  );
};

export default CourtroomStage;
