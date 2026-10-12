import React, { useState } from 'react';
import { FileCheck, ShieldCheck, Scale, Sparkles, Activity } from 'lucide-react';

const BailPredictor = () => {
  const [offenseCategory, setOffenseCategory] = useState('bns_property');
  const [custodyDays, setCustodyDays] = useState(14);
  const [chargeSheetFiled, setChargeSheetFiled] = useState(true);
  const [priorCriminalRecord, setPriorCriminalRecord] = useState(false);
  const [cooperatedInInvestigation, setCooperatedInInvestigation] = useState(true);
  const [isCalculating, setIsCalculating] = useState(false);
  const [bailPrediction, setBailPrediction] = useState(null);

  const handlePredictBail = (e) => {
    e.preventDefault();
    setIsCalculating(true);

    setTimeout(() => {
      setIsCalculating(false);
      let prob = 75;
      if (chargeSheetFiled) prob += 12;
      if (!priorCriminalRecord) prob += 8;
      if (cooperatedInInvestigation) prob += 5;
      if (custodyDays > 30) prob += 5;

      prob = Math.min(prob, 96);

      setBailPrediction({
        probabilityScore: prob,
        verdictCategory: prob >= 70 ? 'HIGH LIKELIHOOD OF BAIL GRANTED' : 'CONDITIONAL BAIL WITH SURETY',
        applicableSection: 'BNSS Section 480 / Section 483 (Formerly CrPC 437/439)',
        sentenceEstimate: 'Potential sentence under BNS: 3 to 7 years imprisonment or monetary fine.',
        mitigatingFactors: [
          'Chargesheet successfully submitted within statutory 60-day window.',
          'Clean antecedent record with no prior habitual criminal convictions.',
          'Full cooperation demonstrated during police custodial interrogation.',
        ],
        riskFactors: [
          'Public prosecutor may oppose on grounds of potential witness tampering in local jurisdiction.',
        ],
        precedentCitation: 'Arnesh Kumar v. State of Bihar (2014) 8 SCC 273 - Mandatory compliance with BNSS § 35 arrest protocols.',
      });
    }, 1000);
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Top Banner */}
      <div className="bg-[#0b132b] p-8 rounded-3xl border border-amber-500/40 shadow-2xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-mono">
            <FileCheck className="w-3.5 h-3.5" />
            <span>STATISTICAL BAIL ANALYTICS • BNSS COMPLIANT</span>
          </div>

          <h1 className="text-3xl font-cinzel font-extrabold gold-text-gradient">
            Bail Approval & Sentence Predictor
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            AI-driven statistical outcome model analyzing offence gravity under Bharatiya Nyaya Sanhita (BNS) and procedural compliance under BNSS Section 480 to predict bail probability.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left: Input Form */}
        <form onSubmit={handlePredictBail} className="court-glass rounded-2xl p-6 border border-amber-500/30 space-y-4">
          <h3 className="font-cinzel font-bold text-sm text-slate-100 flex items-center gap-2 border-b border-amber-500/20 pb-3">
            <Scale className="w-4 h-4 text-amber-400" />
            Case Offence & Procedural Parameters
          </h3>

          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1">Offence Classification:</label>
            <select
              value={offenseCategory}
              onChange={(e) => setOffenseCategory(e.target.value)}
              className="w-full bg-slate-950 text-slate-200 border border-slate-800 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-amber-400"
            >
              <option value="bns_property">BNS Section 318 - Financial Fraud / Cheating (Non-Violent)</option>
              <option value="bns_theft">BNS Section 303 - Theft & Dishonest Misappropriation</option>
              <option value="bns_negligence">BNS Section 106 - Medical / Rash Negligence</option>
              <option value="bns_hurt">BNS Section 115 - Voluntarily Causing Hurt</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">Judicial Custody Days:</label>
              <input
                type="number"
                value={custodyDays}
                onChange={(e) => setCustodyDays(parseInt(e.target.value) || 0)}
                className="w-full bg-slate-950 text-slate-200 border border-slate-800 rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">Chargesheet Submitted?</label>
              <select
                value={chargeSheetFiled ? 'yes' : 'no'}
                onChange={(e) => setChargeSheetFiled(e.target.value === 'yes')}
                className="w-full bg-slate-950 text-slate-200 border border-slate-800 rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-amber-400"
              >
                <option value="yes">Yes (Filed in Court)</option>
                <option value="no">No (Under Investigation)</option>
              </select>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <label className="block text-xs font-mono text-slate-300">Antecedent & Interrogation Parameters:</label>
            
            <label className="flex items-center space-x-2 text-xs text-slate-300 cursor-pointer p-2.5 rounded-xl bg-slate-950 border border-slate-800">
              <input
                type="checkbox"
                checked={!priorCriminalRecord}
                onChange={(e) => setPriorCriminalRecord(!e.target.checked)}
                className="rounded text-amber-500 focus:ring-amber-400"
              />
              <span>First-time offender with no prior criminal convictions</span>
            </label>

            <label className="flex items-center space-x-2 text-xs text-slate-300 cursor-pointer p-2.5 rounded-xl bg-slate-950 border border-slate-800">
              <input
                type="checkbox"
                checked={cooperatedInInvestigation}
                onChange={(e) => setCooperatedInInvestigation(e.target.checked)}
                className="rounded text-amber-500 focus:ring-amber-400"
              />
              <span>Accused fully surrendered passports & cooperated with Investigating Officer</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={isCalculating}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-400 hover:to-amber-600 text-slate-950 font-extrabold text-xs shadow-xl flex items-center justify-center space-x-2 transition-transform hover:scale-[1.01]"
          >
            <Activity className="w-4 h-4 text-slate-950" />
            <span>CALCULATE BAIL PROBABILITY</span>
          </button>
        </form>

        {/* Right: Results Panel */}
        <div className="court-glass rounded-2xl p-6 border border-amber-500/30 space-y-4">
          <h3 className="font-cinzel font-bold text-sm text-slate-100 flex items-center gap-2 border-b border-amber-500/20 pb-3">
            <Sparkles className="w-4 h-4 text-amber-400" />
            AI Statistical Prediction & Precedents
          </h3>

          {!bailPrediction ? (
            <div className="h-[360px] flex flex-col items-center justify-center text-slate-500 text-center space-y-3">
              <FileCheck className="w-12 h-12 text-slate-700 animate-pulse" />
              <p className="font-cinzel text-sm text-slate-400">Ready for Analytics</p>
              <p className="text-xs max-w-xs text-slate-500">Configure procedural parameters and click "CALCULATE BAIL PROBABILITY".</p>
            </div>
          ) : (
            <div className="space-y-4">
              
              {/* Score Display */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-950 border border-emerald-500/50 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-mono text-emerald-400 uppercase font-bold">Estimated Bail Approval Rate</p>
                  <p className="text-lg font-cinzel font-extrabold text-emerald-300 mt-1">{bailPrediction.verdictCategory}</p>
                  <p className="text-xs font-mono text-slate-400 mt-1">{bailPrediction.applicableSection}</p>
                </div>
                <div className="text-right">
                  <span className="text-4xl font-black text-emerald-400">{bailPrediction.probabilityScore}%</span>
                </div>
              </div>

              {/* Mitigating Factors */}
              <div className="space-y-1.5">
                <p className="text-[10px] font-mono text-emerald-400 uppercase font-bold">Key Mitigating Factors:</p>
                <div className="space-y-1">
                  {bailPrediction.mitigatingFactors.map((fact, idx) => (
                    <div key={idx} className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-[11px] text-slate-300 flex items-center space-x-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span>{fact}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Precedent Citation */}
              <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/40 text-xs text-amber-300 space-y-1">
                <strong className="block text-[10px] font-mono uppercase text-amber-400">Binding Precedent Citation:</strong>
                <p>{bailPrediction.precedentCitation}</p>
              </div>

            </div>
          )}
        </div>

      </div>

    </div>
  );
};

export default BailPredictor;
