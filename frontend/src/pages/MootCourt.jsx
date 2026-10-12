import React, { useState, useEffect, useRef } from 'react';
import { 
  Gavel, 
  Send, 
  Mic, 
  MicOff, 
  Award, 
  Play, 
  Square, 
  Clock, 
  ShieldAlert,
  Sparkles,
  BookOpen,
  Scale
} from 'lucide-react';
import confetti from 'canvas-confetti';
import CourtroomStage from '../components/CourtroomStage';
import { soundFx } from '../utils/audio';

const MootCourt = () => {
  const [caseScenario, setCaseScenario] = useState('bns_theft');
  const [userRole, setUserRole] = useState('defense'); // defense, prosecution
  const [inSession, setInSession] = useState(false);
  const [activeSpeaker, setActiveSpeaker] = useState('judge'); // judge, user, opponent
  const [transcript, setTranscript] = useState([]);
  const [argumentInput, setArgumentInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [timer, setTimer] = useState(300); // 5 minutes
  const [verdictModal, setVerdictModal] = useState(false);
  const [evaluation, setEvaluation] = useState(null);

  const chatEndRef = useRef(null);

  const sampleCases = [
    {
      id: 'bns_theft',
      title: 'State of Maharashtra vs. Rohan Verma',
      type: 'Criminal Trial • Cyber Theft & Property Dishonesty',
      charge: 'BNS Section 303(2) & IT Act Section 66D',
      facts: 'The accused is alleged to have illegally transferred ₹15 Lakhs from a corporate bank account using compromised credentials.',
      prosecutionArg: 'Digital logs show IP address trace to accused home laptop during non-business hours.',
      defenseArg: 'Accused laptop was compromised via phishing malware; no direct biometric link proved.',
    },
    {
      id: 'bns_negligence',
      title: 'Kiran Patel vs. Apex Medical Center',
      type: 'Civil & Criminal Negligence',
      charge: 'BNS Section 106 (Causing Death by Negligence)',
      facts: 'Patient suffered acute organ failure post-surgery due to alleged improper anesthetic dosage administration.',
      prosecutionArg: 'Medical board audit reveals non-standard dosage administered without prerequisite pre-op tests.',
      defenseArg: 'Patient had undisclosed rare pre-existing genetic allergy to standard surgical compound.',
    }
  ];

  const currentCase = sampleCases.find(c => c.id === caseScenario) || sampleCases[0];

  useEffect(() => {
    let interval = null;
    if (inSession && timer > 0) {
      interval = setInterval(() => setTimer(prev => prev - 1), 1000);
    } else if (timer === 0 && inSession) {
      handleEndSession();
    }
    return () => clearInterval(interval);
  }, [inSession, timer]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [transcript]);

  const handleStartTrial = () => {
    soundFx.playGavelStrike();
    setInSession(true);
    setTimer(300);
    setTranscript([
      {
        id: 1,
        sender: 'Hon\'ble Justice Sarkar AI',
        role: 'judge',
        text: `Court is now in Session for Case: ${currentCase.title}. Presiding Bench: Justice Sarkar AI. Counsel for ${userRole.toUpperCase()}, you may present your opening statement under ${currentCase.charge}.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }
    ]);
    setActiveSpeaker('judge');
  };

  const handleSendArgument = (e) => {
    e?.preventDefault();
    if (!argumentInput.trim() || !inSession) return;

    const userMsg = {
      id: Date.now(),
      sender: userRole === 'defense' ? 'Advocate (Defense Counsel)' : 'Advocate (Public Prosecutor)',
      role: 'user',
      text: argumentInput,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setTranscript(prev => [...prev, userMsg]);
    setArgumentInput('');
    setActiveSpeaker('user');

    // Simulate AI Opposing Counsel and AI Judge response
    setTimeout(() => {
      generateAiResponses();
    }, 1200);
  };

  const generateAiResponses = () => {
    setActiveSpeaker('opponent');
    const oppMsg = {
      id: Date.now() + 1,
      sender: userRole === 'defense' ? 'Public Prosecutor' : 'Defense Counsel',
      role: 'opponent',
      text: `Respected Bench, my learned friend relies on incomplete assertions. Under Section 106 of Bharatiya Sakshya Adhiniyam 2023, the burden of proving specific digital authorization rests upon the possessor of the credentials.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setTranscript(prev => [...prev, oppMsg]);

    setTimeout(() => {
      setActiveSpeaker('judge');
      soundFx.playGavelStrike();
      const judgeMsg = {
        id: Date.now() + 2,
        sender: 'Hon\'ble Justice Sarkar AI',
        role: 'judge',
        text: `Noted. The Bench takes statutory reference of BSA 2023 Section 106 into record. Counsel for ${userRole.toUpperCase()}, how do you address the digital forensics log evidence?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setTranscript(prev => [...prev, judgeMsg]);
    }, 1500);
  };

  const handleObjection = (type) => {
    soundFx.playGavelStrike();
    const objectionMsg = {
      id: Date.now(),
      sender: 'Advocate',
      role: 'user',
      text: `OBJECTION, MY LORD! Basis: ${type}.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isObjection: true,
    };
    setTranscript(prev => [...prev, objectionMsg]);

    setTimeout(() => {
      soundFx.playGavelStrike();
      const isSustained = Math.random() > 0.3;
      const judgeMsg = {
        id: Date.now() + 1,
        sender: 'Hon\'ble Justice Sarkar AI',
        role: 'judge',
        text: isSustained 
          ? `Objection SUSTAINED! The Opposing Counsel shall reframe the questioning without speculative premises.` 
          : `Objection OVERRULED. Opposing Counsel may proceed, argument is germane to statutory intent.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setTranscript(prev => [...prev, judgeMsg]);
    }, 1000);
  };

  const handleEndSession = () => {
    soundFx.playGavelStrike();
    setInSession(false);
    
    // Generate Evaluation
    const score = Math.floor(Math.random() * 15) + 82; // 82-97
    const evalData = {
      overallScore: score,
      legalAccuracy: score + 2,
      citationStrength: score - 4,
      persuasiveness: score + 1,
      courtDecorum: 98,
      verdict: userRole === 'defense' ? 'PROBABLE ACQUITTAL GRANTED' : 'CHARGE SUSTAINED FOR TRIAL',
      recommendation: 'Strong reliance on BSA digital evidence clauses; recommend expanding on BNS Section 303 precedent rulings.',
    };
    setEvaluation(evalData);
    setVerdictModal(true);

    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {}
  };

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Top Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/60 p-6 rounded-2xl border border-amber-500/30">
        <div>
          <div className="flex items-center space-x-2 text-amber-400 text-xs font-mono mb-1">
            <Gavel className="w-4 h-4" />
            <span>REAL-TIME SIMULATION ENGINE • SARKAR VIRTUAL COURT</span>
          </div>
          <h1 className="text-2xl font-cinzel font-bold text-slate-100 gold-text-gradient">
            3D AI Virtual Moot Courtroom
          </h1>
          <p className="text-xs text-slate-400">
            Practice trial proceedings, present oral arguments, raise objections, and receive AI judicial evaluations.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-3">
          {!inSession ? (
            <button
              onClick={handleStartTrial}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-400 hover:to-amber-600 text-slate-950 font-extrabold text-xs shadow-xl shadow-amber-500/20 flex items-center space-x-2 transition-all hover:scale-105"
            >
              <Play className="w-4 h-4 text-slate-950 fill-current" />
              <span>COMMENCE COURT SESSION</span>
            </button>
          ) : (
            <div className="flex items-center space-x-3">
              <div className="px-4 py-2 rounded-xl bg-slate-950 border border-amber-500/40 text-amber-400 font-mono font-bold text-xs flex items-center space-x-2">
                <Clock className="w-4 h-4 animate-pulse text-rose-400" />
                <span>TIME REMAINING: {formatTimer(timer)}</span>
              </div>
              <button
                onClick={handleEndSession}
                className="px-4 py-2 rounded-xl bg-rose-600/20 hover:bg-rose-600/40 text-rose-300 border border-rose-500/40 font-bold text-xs flex items-center space-x-2 transition-all"
              >
                <Square className="w-4 h-4 fill-current" />
                <span>CONCLUDE TRIAL</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 3D Courtroom Interior Stage Visualizer */}
      <CourtroomStage activeSpeaker={activeSpeaker} currentStep={transcript.length} />

      {/* Case Selector & Controls (If not in session) */}
      {!inSession && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 court-glass p-6 rounded-2xl border border-amber-500/30">
          <div>
            <label className="block text-xs font-mono text-amber-400 uppercase tracking-wider mb-2 font-bold">
              Select Court Case Trial Brief:
            </label>
            <select
              value={caseScenario}
              onChange={(e) => setCaseScenario(e.target.value)}
              className="w-full bg-slate-950 text-slate-200 border border-amber-500/40 rounded-xl px-4 py-3 text-xs font-sans focus:outline-none focus:border-amber-400"
            >
              {sampleCases.map(c => (
                <option key={c.id} value={c.id}>{c.title} - {c.charge}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-mono text-amber-400 uppercase tracking-wider mb-2 font-bold">
              Select Counsel Side:
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setUserRole('defense')}
                className={`py-2.5 px-4 rounded-xl border text-xs font-bold transition-all ${
                  userRole === 'defense'
                    ? 'bg-amber-500/20 border-amber-400 text-amber-300 shadow-lg'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                Counsel for Defense
              </button>
              <button
                onClick={() => setUserRole('prosecution')}
                className={`py-2.5 px-4 rounded-xl border text-xs font-bold transition-all ${
                  userRole === 'prosecution'
                    ? 'bg-rose-500/20 border-rose-400 text-rose-300 shadow-lg'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                Public Prosecutor
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Trial Transcript & Oral Submissions Chamber */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Left 3 Cols: Transcript Feed & Argument Input */}
        <div className="lg:col-span-3 space-y-4">
          <div className="court-glass rounded-2xl border border-amber-500/30 flex flex-col h-[500px]">
            
            {/* Header */}
            <div className="px-6 py-4 border-b border-amber-500/20 bg-slate-950/80 flex items-center justify-between">
              <div className="flex items-center space-x-2 text-slate-200">
                <BookOpen className="w-4 h-4 text-amber-400" />
                <span className="font-cinzel font-bold text-sm">Official Court Transcript & Audio Log</span>
              </div>
              <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30">
                VERBATIM STENOGRAPHY
              </span>
            </div>

            {/* Transcript Messages Scroll */}
            <div className="flex-1 p-6 overflow-y-auto space-y-4 font-sans text-xs">
              {transcript.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-slate-500 text-center space-y-3">
                  <Gavel className="w-12 h-12 text-slate-700 animate-pulse" />
                  <p className="font-cinzel text-sm text-slate-400">Court chamber is currently quiet.</p>
                  <p className="text-[11px] max-w-sm text-slate-500">Click "COMMENCE COURT SESSION" to begin arguments before Hon'ble Justice Sarkar AI.</p>
                </div>
              ) : (
                transcript.map((item) => (
                  <div
                    key={item.id}
                    className={`p-4 rounded-xl border transition-all ${
                      item.role === 'judge'
                        ? 'wood-panel border-amber-500/50 text-amber-100 shadow-md'
                        : item.role === 'user'
                        ? 'bg-amber-950/20 border-amber-500/30 text-slate-200 ml-4'
                        : 'bg-rose-950/20 border-rose-500/30 text-slate-200 mr-4'
                    } ${item.isObjection ? 'ring-2 ring-rose-500/60 bg-rose-950/40' : ''}`}
                  >
                    <div className="flex items-center justify-between mb-1.5 font-mono text-[11px]">
                      <span className={`font-bold flex items-center gap-1.5 ${
                        item.role === 'judge' ? 'text-amber-400 font-cinzel text-xs' : item.role === 'user' ? 'text-amber-300' : 'text-rose-400'
                      }`}>
                        {item.role === 'judge' && <Scale className="w-3.5 h-3.5" />}
                        {item.sender}
                      </span>
                      <span className="text-slate-500">{item.timestamp}</span>
                    </div>
                    <p className="leading-relaxed text-xs">{item.text}</p>
                  </div>
                ))
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Objection Action Bar (If in session) */}
            {inSession && (
              <div className="px-6 py-2.5 bg-slate-950 border-t border-slate-800 flex items-center space-x-2 overflow-x-auto text-[11px]">
                <span className="text-slate-400 font-mono flex items-center gap-1">
                  <ShieldAlert className="w-3.5 h-3.5 text-rose-400" /> Raise Objection:
                </span>
                <button
                  onClick={() => handleObjection('Hearsay Evidence')}
                  className="px-2.5 py-1 rounded bg-rose-500/10 text-rose-300 border border-rose-500/30 hover:bg-rose-500/20 font-semibold"
                >
                  Objection: Hearsay
                </button>
                <button
                  onClick={() => handleObjection('Irrelevant Premise')}
                  className="px-2.5 py-1 rounded bg-rose-500/10 text-rose-300 border border-rose-500/30 hover:bg-rose-500/20 font-semibold"
                >
                  Objection: Irrelevant
                </button>
                <button
                  onClick={() => handleObjection('Leading Question')}
                  className="px-2.5 py-1 rounded bg-rose-500/10 text-rose-300 border border-rose-500/30 hover:bg-rose-500/20 font-semibold"
                >
                  Objection: Leading
                </button>
              </div>
            )}

            {/* Input Form */}
            <form onSubmit={handleSendArgument} className="p-4 border-t border-amber-500/20 bg-slate-950 flex items-center space-x-3">
              <input
                type="text"
                disabled={!inSession}
                placeholder={inSession ? "Type your oral legal argument (e.g. My Lord, under BNS 303 statutory provisions...)" : "Commence session to submit arguments..."}
                value={argumentInput}
                onChange={(e) => setArgumentInput(e.target.value)}
                className="flex-1 bg-slate-900 text-slate-100 border border-slate-700 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-amber-400 disabled:opacity-50"
              />
              <button
                type="button"
                onClick={() => setIsRecording(!isRecording)}
                disabled={!inSession}
                className={`p-3 rounded-xl border transition-all ${
                  isRecording 
                    ? 'bg-rose-500/20 text-rose-400 border-rose-500 animate-pulse' 
                    : 'bg-slate-900 text-slate-400 border-slate-700 hover:text-amber-400'
                }`}
                title="Voice Input (Speech-to-Text)"
              >
                {isRecording ? <Mic className="w-4 h-4 text-rose-400" /> : <MicOff className="w-4 h-4" />}
              </button>
              <button
                type="submit"
                disabled={!inSession || !argumentInput.trim()}
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-400 hover:to-amber-600 text-slate-950 font-bold text-xs flex items-center space-x-1.5 shadow-md disabled:opacity-50 transition-all"
              >
                <span>SUBMIT</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>

          </div>
        </div>

        {/* Right 1 Col: Case Brief Sidebar */}
        <div className="space-y-4">
          <div className="court-glass rounded-2xl p-5 border border-amber-500/30 space-y-4">
            <div className="flex items-center space-x-2 text-amber-400 border-b border-amber-500/20 pb-3">
              <Scale className="w-4 h-4" />
              <h3 className="font-cinzel font-bold text-sm text-slate-100">Trial Case Brief</h3>
            </div>

            <div>
              <p className="text-[10px] font-mono text-slate-400 uppercase">Case Title</p>
              <p className="text-xs font-bold text-amber-300 mt-0.5">{currentCase.title}</p>
            </div>

            <div>
              <p className="text-[10px] font-mono text-slate-400 uppercase">Statutory Charge</p>
              <p className="text-xs font-semibold text-rose-400 mt-0.5">{currentCase.charge}</p>
            </div>

            <div>
              <p className="text-[10px] font-mono text-slate-400 uppercase">Key Material Facts</p>
              <p className="text-[11px] text-slate-300 mt-1 leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                {currentCase.facts}
              </p>
            </div>

            <div className="pt-2 border-t border-amber-500/20 space-y-2">
              <p className="text-[10px] font-mono text-amber-400 uppercase font-bold">Suggested Statutes:</p>
              <div className="flex flex-wrap gap-1.5">
                <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30 text-[10px]">
                  BNS § 303
                </span>
                <span className="px-2 py-0.5 rounded bg-sky-500/10 text-sky-300 border border-sky-500/30 text-[10px]">
                  BSA § 106
                </span>
                <span className="px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/30 text-[10px]">
                  BNSS § 187
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Judicial Verdict & Evaluation Modal */}
      {verdictModal && evaluation && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-xl court-glass-gold rounded-3xl p-8 border-2 border-amber-400 shadow-2xl space-y-6">
            
            <div className="text-center space-y-2">
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-tr from-amber-400 to-amber-700 p-0.5 shadow-xl flex items-center justify-center">
                <div className="w-full h-full bg-[#070b14] rounded-full flex items-center justify-center">
                  <Award className="w-8 h-8 text-amber-400" />
                </div>
              </div>
              <h2 className="text-2xl font-cinzel font-extrabold gold-text-gradient">
                VERDICT DECLARATION & EVALUATION
              </h2>
              <p className="text-xs text-slate-300 font-mono uppercase tracking-widest">
                Presiding Bench: Hon'ble Justice Sarkar AI
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-500/50 text-center">
              <p className="text-[10px] font-mono text-amber-400 uppercase font-bold">Judicial Finding</p>
              <p className="text-base font-cinzel font-extrabold text-amber-300 mt-1">{evaluation.verdict}</p>
            </div>

            {/* Score Breakdown */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3.5 rounded-xl bg-slate-900 border border-amber-500/30">
                <p className="text-[10px] font-mono text-slate-400">Legal Accuracy</p>
                <p className="text-lg font-bold text-amber-300">{evaluation.legalAccuracy}%</p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-900 border border-amber-500/30">
                <p className="text-[10px] font-mono text-slate-400">Citation Strength</p>
                <p className="text-lg font-bold text-sky-400">{evaluation.citationStrength}%</p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-900 border border-amber-500/30">
                <p className="text-[10px] font-mono text-slate-400">Persuasiveness</p>
                <p className="text-lg font-bold text-emerald-400">{evaluation.persuasiveness}%</p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-900 border border-amber-500/30">
                <p className="text-[10px] font-mono text-slate-400">Court Decorum</p>
                <p className="text-lg font-bold text-purple-400">{evaluation.courtDecorum}%</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
              <strong className="text-amber-400 block mb-1">Bench Recommendation:</strong>
              {evaluation.recommendation}
            </div>

            <button
              onClick={() => setVerdictModal(false)}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-700 text-slate-950 font-extrabold text-xs shadow-xl transition-transform hover:scale-105"
            >
              CLOSE JUDICIAL EVALUATION
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default MootCourt;
