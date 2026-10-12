import React, { useState } from 'react';
import { ShieldAlert, FileText, Sparkles, Scale, RefreshCw, PenTool, Copy } from 'lucide-react';
import toast from 'react-hot-toast';

const DocumentScanner = () => {
  const [activeTab, setActiveTab] = useState('scanner'); // scanner, generator
  const [contractText, setContractText] = useState('');
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditReport, setAuditReport] = useState(null);

  // Generator State
  const [docType, setDocType] = useState('legal_notice');
  const [partyName, setPartyName] = useState('Ramesh Kumar');
  const [oppPartyName, setOppPartyName] = useState('ABC Builders Ltd.');
  const [disputeAmount, setDisputeAmount] = useState('₹ 12,50,000');
  const [facts, setFacts] = useState('Delay in flat possession beyond agreed 24-month contract deadline under RERA Act Section 18.');
  const [generatedDraft, setGeneratedDraft] = useState('');

  const sampleContractText = `CLAUSE 4: TERMINATION & PENALTY
The Company reserves the unilateral right to terminate this Employment & Service Agreement at any time without prior written notice or reason. Upon termination, all unpaid bonuses and accumulated provident contributions shall be completely forfeited to the Company.

CLAUSE 9: INDEMNIFICATION & LIABILITY
The Contractor agrees to indemnify the Client for all losses, damages, legal costs, and indirect consequences, regardless of whether such losses arise from client gross negligence or third-party breaches. The maximum liability of the Client under any circumstances shall be limited to ₹100.

CLAUSE 14: DISPUTE RESOLUTION
All disputes shall be referred solely to an arbitrator nominated exclusively by the Director of the Company. The venue of arbitration shall be chosen by the Company.`;

  const handleAuditContract = () => {
    const textToAudit = contractText.trim() || sampleContractText;
    setIsAuditing(true);

    setTimeout(() => {
      setIsAuditing(false);
      setAuditReport({
        overallRiskScore: 78, // High risk
        status: 'HIGH RISK DETECTED',
        clauseAnalysis: [
          {
            id: 1,
            clauseName: 'Clause 4: Unilateral Termination & Forfeiture',
            riskLevel: 'HAZARDOUS',
            explanation: 'Forfeiture of earned wages or statutory provident fund upon unilateral termination violates Indian Contract Act Section 27 and Payment of Gratuity Act.',
            recommendation: 'Amend clause to require mandatory 30-day written notice and preserve statutory employee entitlements.',
          },
          {
            id: 2,
            clauseName: 'Clause 9: Asymmetric Indemnification',
            riskLevel: 'HAZARDOUS',
            explanation: 'Capping client liability to ₹100 while placing unlimited liability on contractor is unconscionable and void under Section 23 of ICA 1872.',
            recommendation: 'Cap mutual indemnification liability to the total contract value (e.g. 100% of fees paid).',
          },
          {
            id: 3,
            clauseName: 'Clause 14: Unilateral Arbitrator Appointment',
            riskLevel: 'CAUTION',
            explanation: 'Supreme Court ruling in Perkins Eastman (2020) holds that a party interested in the dispute outcome cannot unilaterally appoint a sole arbitrator.',
            recommendation: 'Specify arbitration under the Arbitration & Conciliation Act 1996 through an independent institutional arbitrator.',
          }
        ]
      });
    }, 1200);
  };

  const handleGenerateDraft = (e) => {
    e.preventDefault();
    const draft = `LEGAL NOTICE UNDER SECTION 138 OF NEGOTIABLE INSTRUMENTS ACT & RERA ACT 2016

REGISTERED A.D. / SPEED POST

To,
${oppPartyName}
Corporate Office Address: Plot No. 42, Sector 18, Cyber Hub, Gurugram, Haryana.

Sir/Madam,

Under instructions and on behalf of my client, Mr. ${partyName}, residing at House No. 108, Civil Lines, New Delhi, I hereby serve upon you this LEGAL NOTICE:

1. That my client entered into an Agreement for Sale dated 14th March 2022 with your company for booking of Unit No. B-402 in your project.
2. That as per Clause 7 of the said agreement, possession of the unit was promised within 24 months, subject to a total consideration of ${disputeAmount}.
3. That my client has paid the complete financial obligation of ${disputeAmount} in full. However, despite repeated requests, your company has failed to deliver possession.
4. ${facts}

THEREFORE, TAKE NOTICE that you are hereby called upon to refund the entire principal sum of ${disputeAmount} along with 18% per annum interest within 15 (Fifteen) days of receipt of this notice, failing which my client shall initiate formal criminal and civil proceedings under BNS Section 318 and RERA Section 18 before the Competent Tribunal at your sole risk and costs.

Issued under my hand and seal at New Delhi this ${new Date().toLocaleDateString('en-GB')}.

Advocate Surya Sarkar
Enrollment No: DEL/19824/2022
Supreme Court of India & High Court of Delhi`;

    setGeneratedDraft(draft);
    toast.success('Legal Draft generated successfully!');
  };

  const handleCopyDraft = () => {
    navigator.clipboard.writeText(generatedDraft);
    toast.success('Legal draft copied to clipboard!');
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Top Banner */}
      <div className="bg-[#0b132b] p-8 rounded-3xl border border-amber-500/40 shadow-2xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/30 text-xs font-mono">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>AI DOCUMENT AUDITOR & AUTO-DRAFTER</span>
          </div>

          <h1 className="text-3xl font-cinzel font-extrabold gold-text-gradient">
            Legal Risk Scanner & Auto-Drafting Engine
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Upload contracts for clause-by-clause risk auditing or instantly generate court-ready legal notices, bail applications, affidavits, and RTI petitions.
          </p>
        </div>
      </div>

      {/* Tab Selector */}
      <div className="flex border-b border-amber-500/20 text-xs font-cinzel font-bold space-x-4">
        <button
          onClick={() => setActiveTab('scanner')}
          className={`pb-3 border-b-2 transition-all flex items-center space-x-2 ${
            activeTab === 'scanner'
              ? 'border-amber-400 text-amber-300'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <ShieldAlert className="w-4 h-4" />
          <span>Contract Risk Auditor</span>
        </button>
        <button
          onClick={() => setActiveTab('generator')}
          className={`pb-3 border-b-2 transition-all flex items-center space-x-2 ${
            activeTab === 'generator'
              ? 'border-amber-400 text-amber-300'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <PenTool className="w-4 h-4" />
          <span>AI Legal Notice & Draft Generator</span>
        </button>
      </div>

      {/* TAB 1: CONTRACT RISK AUDITOR */}
      {activeTab === 'scanner' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Input Box */}
          <div className="court-glass rounded-2xl p-6 border border-amber-500/30 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-cinzel font-bold text-sm text-slate-100 flex items-center gap-2">
                <FileText className="w-4 h-4 text-amber-400" />
                Contract Text / Document Input
              </h3>
              <button
                onClick={() => setContractText(sampleContractText)}
                className="text-[10px] font-mono px-2.5 py-1 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30 hover:bg-amber-500/20"
              >
                Load Sample Agreement
              </button>
            </div>

            <textarea
              rows={12}
              placeholder="Paste contract clauses here or click 'Load Sample Agreement' to test the risk auditor..."
              value={contractText}
              onChange={(e) => setContractText(e.target.value)}
              className="w-full bg-slate-950 text-slate-200 border border-slate-800 rounded-xl p-4 text-xs font-sans focus:outline-none focus:border-amber-400 leading-relaxed"
            />

            <button
              onClick={handleAuditContract}
              disabled={isAuditing}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-400 hover:to-amber-600 text-slate-950 font-extrabold text-xs shadow-xl flex items-center justify-center space-x-2 transition-transform hover:scale-[1.01]"
            >
              {isAuditing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                  <span>AUDITING CLAUSES & LEGAL RISK...</span>
                </>
              ) : (
                <>
                  <ShieldAlert className="w-4 h-4 text-slate-950" />
                  <span>AUDIT CONTRACT RISK</span>
                </>
              )}
            </button>
          </div>

          {/* Audit Results Panel */}
          <div className="court-glass rounded-2xl p-6 border border-amber-500/30 space-y-4">
            <h3 className="font-cinzel font-bold text-sm text-slate-100 flex items-center gap-2 border-b border-amber-500/20 pb-3">
              <Sparkles className="w-4 h-4 text-amber-400" />
              Risk Audit Findings & Recommendations
            </h3>

            {!auditReport ? (
              <div className="h-[360px] flex flex-col items-center justify-center text-slate-500 text-center space-y-3">
                <ShieldAlert className="w-12 h-12 text-slate-700 animate-pulse" />
                <p className="font-cinzel text-sm text-slate-400">No Document Audited Yet</p>
                <p className="text-xs max-w-xs text-slate-500">Paste text on the left and click "AUDIT CONTRACT RISK" to evaluate hazardous clauses.</p>
              </div>
            ) : (
              <div className="space-y-4 overflow-y-auto max-h-[420px]">
                
                {/* Risk Score Pill */}
                <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-500/50 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-mono text-rose-400 uppercase font-bold">Risk Assessment</p>
                    <p className="text-base font-cinzel font-bold text-rose-300">{auditReport.status}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-black text-rose-400">{auditReport.overallRiskScore} / 100</p>
                    <p className="text-[10px] font-mono text-slate-400">Hazard Score</p>
                  </div>
                </div>

                {/* Clause List */}
                <div className="space-y-3">
                  {auditReport.clauseAnalysis.map((c) => (
                    <div key={c.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-cinzel font-bold text-xs text-amber-300">{c.clauseName}</span>
                        <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                          c.riskLevel === 'HAZARDOUS' 
                            ? 'bg-rose-500/20 text-rose-300 border-rose-500/40' 
                            : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                        }`}>
                          {c.riskLevel}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-300 leading-relaxed">{c.explanation}</p>
                      <div className="p-2.5 rounded-lg bg-amber-950/20 border border-amber-500/30 text-[11px] text-amber-300">
                        <strong className="block text-[10px] uppercase font-mono">Suggested Amendment:</strong>
                        {c.recommendation}
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            )}

          </div>

        </div>
      )}

      {/* TAB 2: AI LEGAL DRAFT GENERATOR */}
      {activeTab === 'generator' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Form */}
          <form onSubmit={handleGenerateDraft} className="court-glass rounded-2xl p-6 border border-amber-500/30 space-y-4">
            <h3 className="font-cinzel font-bold text-sm text-slate-100 flex items-center gap-2 border-b border-amber-500/20 pb-3">
              <PenTool className="w-4 h-4 text-amber-400" />
              Legal Document Parameters
            </h3>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">Select Document Category:</label>
              <select
                value={docType}
                onChange={(e) => setDocType(e.target.value)}
                className="w-full bg-slate-950 text-slate-200 border border-slate-800 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-amber-400"
              >
                <option value="legal_notice">Legal Notice (Consumer / Builder Dispute)</option>
                <option value="bail_app">Bail Application under BNSS § 480</option>
                <option value="affidavit">General Sworn Affidavit</option>
                <option value="rti">RTI Application under Section 6</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">Complainant / Client Name:</label>
                <input
                  type="text"
                  value={partyName}
                  onChange={(e) => setPartyName(e.target.value)}
                  className="w-full bg-slate-950 text-slate-200 border border-slate-800 rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-amber-400"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">Opposite Party Name:</label>
                <input
                  type="text"
                  value={oppPartyName}
                  onChange={(e) => setOppPartyName(e.target.value)}
                  className="w-full bg-slate-950 text-slate-200 border border-slate-800 rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">Dispute Amount / Consideration:</label>
              <input
                type="text"
                value={disputeAmount}
                onChange={(e) => setDisputeAmount(e.target.value)}
                className="w-full bg-slate-950 text-slate-200 border border-slate-800 rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">Factual Grounds & Grievance:</label>
              <textarea
                rows={4}
                value={facts}
                onChange={(e) => setFacts(e.target.value)}
                className="w-full bg-slate-950 text-slate-200 border border-slate-800 rounded-xl p-3 text-xs focus:outline-none focus:border-amber-400"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-400 hover:to-amber-600 text-slate-950 font-extrabold text-xs shadow-xl flex items-center justify-center space-x-2 transition-transform hover:scale-[1.01]"
            >
              <Sparkles className="w-4 h-4 text-slate-950" />
              <span>GENERATE FORMATED LEGAL DRAFT</span>
            </button>
          </form>

          {/* Formatted Output */}
          <div className="court-glass rounded-2xl p-6 border border-amber-500/30 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-amber-500/20 pb-3">
                <h3 className="font-cinzel font-bold text-sm text-slate-100 flex items-center gap-2">
                  <Scale className="w-4 h-4 text-amber-400" />
                  Formatted Court Draft Output
                </h3>
                {generatedDraft && (
                  <button
                    onClick={handleCopyDraft}
                    className="px-3 py-1 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30 text-xs font-mono flex items-center gap-1.5 hover:bg-amber-500/20"
                  >
                    <Copy className="w-3.5 h-3.5" /> Copy Text
                  </button>
                )}
              </div>

              {!generatedDraft ? (
                <div className="h-[360px] flex flex-col items-center justify-center text-slate-500 text-center space-y-3">
                  <PenTool className="w-12 h-12 text-slate-700 animate-pulse" />
                  <p className="font-cinzel text-sm text-slate-400">Ready to Draft</p>
                  <p className="text-xs max-w-xs text-slate-500">Fill in the client details on the left and click "GENERATE FORMATED LEGAL DRAFT".</p>
                </div>
              ) : (
                <pre className="w-full h-[380px] bg-slate-950 p-4 rounded-xl border border-slate-800 text-[11px] font-mono text-slate-200 overflow-y-auto whitespace-pre-wrap leading-relaxed">
                  {generatedDraft}
                </pre>
              )}
            </div>
          </div>

        </div>
      )}

    </div>
  );
};

export default DocumentScanner;
