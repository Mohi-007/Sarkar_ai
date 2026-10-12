import React, { useState } from 'react';
import { Bot, Mic, Sparkles, Scale, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';

const QAEngine = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [queryText, setQueryText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiResult, setAiResult] = useState(null);

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'Hindi (हिंदी)' },
    { code: 'ta', name: 'Tamil (தமிழ்)' },
    { code: 'te', name: 'Telugu (తెలుగు)' },
    { code: 'mr', name: 'Marathi (मराठी)' },
    { code: 'bn', name: 'Bengali (বাংলা)' },
  ];

  const handleAskQuestion = (e) => {
    e?.preventDefault();
    if (!queryText.trim()) return;

    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setAiResult({
        domain: 'Criminal Law & Cyber Protection',
        detectedLanguage: selectedLanguage === 'hi' ? 'Hindi (हिंदी)' : 'English',
        applicableSections: [
          'Bharatiya Nyaya Sanhita (BNS) Section 318(4) - Cyber Financial Cheating',
          'Information Technology Act 2000 - Section 66D (Personation Fraud)',
          'Bharatiya Nagarik Suraksha Sanhita (BNSS) Section 173 - Zero FIR Registration',
        ],
        explanation: selectedLanguage === 'hi' 
          ? 'यदि आपके बैंक खाते से धोखाधड़ी से धन निकाला गया है, तो बीएनएस धारा 318 और आईटी अधिनियम के तहत यह संज्ञेय अपराध है। आपको तुरंत 1930 राष्ट्रीय साइबर हेल्पलाइन पर शिकायत दर्ज करनी होगी।'
          : 'Under BNS Section 318 and IT Act 66D, unauthorized bank transaction via digital deception is a cognizable offense. Financial institutions are mandated under RBI guidelines to credit shadow reversals if notified within 72 hours.',
        userRights: [
          'Right to register a Zero FIR at any local police station regardless of jurisdiction.',
          'Right to complete immunity from financial liability if reported within 3 days under RBI circular.',
        ],
        immediateSteps: [
          'Call National Cyber Crime Helpline 1930 immediately to freeze fraudulent recipient accounts.',
          'File an e-FIR on cybercrime.gov.in and submit dispute acknowledgement to home bank branch.',
        ]
      });
    }, 1200);
  };

  const handleVoiceListen = () => {
    setIsRecording(true);
    toast.success('Listening... Speak your legal query now.');
    setTimeout(() => {
      setIsRecording(false);
      setQueryText('What are my legal rights if my landlord refuses to return my security deposit after lease expiry?');
      toast.success('Speech recognized successfully!');
    }, 2500);
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Top Banner */}
      <div className="bg-[#0b132b] p-8 rounded-3xl border border-amber-500/40 shadow-2xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/30 text-xs font-mono">
            <Bot className="w-3.5 h-3.5" />
            <span>MULTILINGUAL VOICE LEGAL ASSISTANT • SARKAR AI</span>
          </div>

          <h1 className="text-3xl font-cinzel font-extrabold gold-text-gradient">
            Voice & Multilingual Legal Intelligence
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Ask complex legal questions in your native language via voice or text. Receive structured statutory advice, applicable BNS sections, and step-by-step rights enforcement remedies.
          </p>
        </div>
      </div>

      {/* Language Selector Bar */}
      <div className="court-glass p-4 rounded-2xl border border-amber-500/30 flex items-center justify-between overflow-x-auto">
        <span className="text-xs font-mono text-amber-400 font-bold whitespace-nowrap mr-4">
          Select Preferred Language:
        </span>
        <div className="flex items-center space-x-2">
          {languages.map(lang => (
            <button
              key={lang.code}
              onClick={() => setSelectedLanguage(lang.code)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                selectedLanguage === lang.code
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-slate-200'
              }`}
            >
              {lang.name}
            </button>
          ))}
        </div>
      </div>

      {/* Input Query & Output Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left: Query Form */}
        <form onSubmit={handleAskQuestion} className="court-glass rounded-2xl p-6 border border-amber-500/30 space-y-4">
          <h3 className="font-cinzel font-bold text-sm text-slate-100 flex items-center gap-2 border-b border-amber-500/20 pb-3">
            <Scale className="w-4 h-4 text-amber-400" />
            State Your Legal Situation / Query
          </h3>

          <textarea
            rows={8}
            placeholder="Type your question here (e.g. What are my legal rights if I am arrested without warrant under BNSS, or landlord dispute)..."
            value={queryText}
            onChange={(e) => setQueryText(e.target.value)}
            className="w-full bg-slate-950 text-slate-200 border border-slate-800 rounded-xl p-4 text-xs font-sans focus:outline-none focus:border-amber-400 leading-relaxed"
          />

          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={handleVoiceListen}
              className={`px-4 py-3 rounded-xl border text-xs font-bold flex items-center space-x-2 transition-all ${
                isRecording 
                  ? 'bg-rose-500/20 text-rose-400 border-rose-500 animate-pulse' 
                  : 'bg-slate-950 text-slate-300 border-slate-800 hover:text-amber-400'
              }`}
            >
              <Mic className="w-4 h-4 text-amber-400" />
              <span>{isRecording ? 'Listening...' : 'Voice Query'}</span>
            </button>

            <button
              type="submit"
              disabled={isAnalyzing || !queryText.trim()}
              className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-400 hover:to-amber-600 text-slate-950 font-extrabold text-xs shadow-xl flex items-center justify-center space-x-2 transition-transform hover:scale-[1.01] disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4 text-slate-950" />
              <span>{isAnalyzing ? 'CONSULTING LEGAL RAG...' : 'ANALYZE LEGAL ADVICE'}</span>
            </button>
          </div>
        </form>

        {/* Right: AI Output Analysis */}
        <div className="court-glass rounded-2xl p-6 border border-amber-500/30 space-y-4">
          <h3 className="font-cinzel font-bold text-sm text-slate-100 flex items-center gap-2 border-b border-amber-500/20 pb-3">
            <Bot className="w-4 h-4 text-amber-400" />
            Structured Legal Advice & Statutory Rights
          </h3>

          {!aiResult ? (
            <div className="h-[360px] flex flex-col items-center justify-center text-slate-500 text-center space-y-3">
              <Bot className="w-12 h-12 text-slate-700 animate-pulse" />
              <p className="font-cinzel text-sm text-slate-400">Awaiting Legal Query</p>
              <p className="text-xs max-w-xs text-slate-500">Ask a question using voice or text to receive instant legal advice.</p>
            </div>
          ) : (
            <div className="space-y-4 overflow-y-auto max-h-[420px]">
              
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] font-mono text-slate-400 uppercase">Domain Classification</span>
                <span className="text-xs font-bold text-amber-400 font-cinzel">{aiResult.domain}</span>
              </div>

              {/* Applicable Sections */}
              <div className="space-y-1.5">
                <p className="text-[10px] font-mono text-amber-400 uppercase font-bold">Applicable Laws & Sections:</p>
                {aiResult.applicableSections.map((sec, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-amber-950/20 border border-amber-500/30 text-[11px] text-amber-300 font-mono">
                    {sec}
                  </div>
                ))}
              </div>

              {/* Legal Explanation */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 leading-relaxed">
                <strong className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Plain Language Advice:</strong>
                {aiResult.explanation}
              </div>

              {/* Fundamental Rights */}
              <div className="space-y-1">
                <p className="text-[10px] font-mono text-emerald-400 uppercase font-bold">Your Citizen Rights:</p>
                {aiResult.userRights.map((r, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-[11px] text-slate-300 flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>{r}</span>
                  </div>
                ))}
              </div>

            </div>
          )}
        </div>

      </div>

    </div>
  );
};

export default QAEngine;
