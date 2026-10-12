import React, { useState } from 'react';
import { Search, ArrowRight, ArrowLeftRight, Check, Copy } from 'lucide-react';
import toast from 'react-hot-toast';

const CodeMatrix = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all'); // all, ipc_bns, crpc_bnss, iea_bsa

  const bnsDatabase = [
    {
      id: 1,
      category: 'ipc_bns',
      title: 'Murder / Causing Death',
      oldCode: 'IPC Section 302',
      newCode: 'BNS Section 101',
      oldTitle: 'Punishment for Murder',
      newTitle: 'Punishment for Murder (Bharatiya Nyaya Sanhita)',
      penaltyChange: 'Retains Death Penalty or Imprisonment for Life + Fine; introduces specific provisions for mob lynching under 103(2).',
      summary: 'Replaces IPC 302. Clearly defines murder and introduces mandatory life imprisonment or death penalty with enhanced monetary fines.',
      precedents: 'Bachan Singh v. State of Punjab (1980) - Rare of rarest test remains applicable under BNS 101.',
      keyChanges: ['Expanded definition for mob lynching by 5+ persons', 'Gender-neutral language in victim references'],
    },
    {
      id: 2,
      category: 'ipc_bns',
      title: 'Cheating & Dishonestly Inducing Delivery of Property',
      oldCode: 'IPC Section 420',
      newCode: 'BNS Section 318(4)',
      oldTitle: 'Cheating and dishonestly inducing delivery of property',
      newTitle: 'Cheating (Bharatiya Nyaya Sanhita)',
      penaltyChange: 'Imprisonment up to 7 years + Mandatory Fine; incorporates digital financial fraud triggers.',
      summary: 'Replaces IPC 420. Covers modern online fraud, identity theft, and financial deception under a consolidated sub-section.',
      precedents: 'State of Haryana v. Bhajan Lal (1992) - Prima facie fraudulent intention guidelines.',
      keyChanges: ['Includes crypto & electronic ledger fraud', 'Streamlined sub-clauses for corporate fraud'],
    },
    {
      id: 3,
      category: 'ipc_bns',
      title: 'Sexual Assault / Rape',
      oldCode: 'IPC Section 376',
      newCode: 'BNS Section 64',
      oldTitle: 'Punishment for Rape',
      newTitle: 'Rape (Bharatiya Nyaya Sanhita)',
      penaltyChange: 'Rigorously updated: Minimum 10 years up to Life Imprisonment; death penalty for assault on minors under BNS 65.',
      summary: 'Replaces IPC 376 with strict minimum sentencing and expedited medical examination procedures.',
      precedents: 'Mukesh v. State (NCT of Delhi) (2017) - Aggravating circumstances doctrine.',
      keyChanges: ['Enhanced minimum sentence from 7 to 10 years', 'Specific digital evidence requirements'],
    },
    {
      id: 4,
      category: 'ipc_bns',
      title: 'Sedition vs Acts Threatening Sovereignty',
      oldCode: 'IPC Section 124A (Sedition)',
      newCode: 'BNS Section 152',
      oldTitle: 'Sedition',
      newTitle: 'Acts endangering sovereignty, unity and integrity of India',
      penaltyChange: 'IPC 124A repealed! BNS 152 penalizes treasonous acts with 7 years to Life Imprisonment.',
      summary: 'The archaic colonial word "Sedition" is repealed. BNS 152 targets acts exciting secession, armed rebellion, or subversive activities.',
      precedents: 'Kedar Nath Singh v. State of Bihar (1962) & S.G. Vombatkere (2022).',
      keyChanges: ['Sedition word removed', 'Focus on subversion and armed rebellion against the State'],
    },
    {
      id: 5,
      category: 'crpc_bnss',
      title: 'Zero FIR & Electronic Information Registration',
      oldCode: 'CrPC Section 154',
      newCode: 'BNSS Section 173',
      oldTitle: 'Information in cognizable cases',
      newTitle: 'Information in cognizable cases (BNSS)',
      penaltyChange: 'Mandatory registration of Zero FIR regardless of territorial jurisdiction + e-FIR support.',
      summary: 'Mandates that any police station must register a Zero FIR immediately and transfer to jurisdiction within 24 hours.',
      precedents: 'Lalita Kumari v. Govt. of U.P. (2014) - Mandatory FIR registration.',
      keyChanges: ['Legal sanction for e-FIR', 'Zero FIR statutory status'],
    },
    {
      id: 6,
      category: 'iea_bsa',
      title: 'Electronic Record Admissibility',
      oldCode: 'Indian Evidence Act Section 65B',
      newCode: 'Bharatiya Sakshya Adhiniyam Section 63',
      oldTitle: 'Admissibility of electronic records',
      newTitle: 'Admissibility of electronic records (BSA)',
      penaltyChange: 'Standardizes digital certificates for smartphones, server logs, cloud storage & WhatsApp chats.',
      summary: 'Replaces Section 65B with simplified digital evidence certificate format under BSA Schedule.',
      precedents: 'Anvar P.V. v. P.K. Basheer (2014) & Arjun Panditrao (2020).',
      keyChanges: ['Cloud evidence inclusion', 'Hash code digital signature validation'],
    }
  ];

  const filteredCodes = bnsDatabase.filter(item => {
    const query = searchQuery.toLowerCase();
    const matchesCategory = selectedFilter === 'all' || item.category === selectedFilter;
    const matchesSearch = 
      item.title.toLowerCase().includes(query) ||
      item.oldCode.toLowerCase().includes(query) ||
      item.newCode.toLowerCase().includes(query) ||
      item.summary.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    toast.success('Section details copied to clipboard!');
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header Banner */}
      <div className="bg-[#0b132b] p-8 rounded-3xl border border-amber-500/40 shadow-2xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/30 text-xs font-mono">
            <ArrowLeftRight className="w-3.5 h-3.5" />
            <span>STATUTORY CONVERTER • ENFORCED JULY 2024</span>
          </div>

          <h1 className="text-3xl font-cinzel font-extrabold gold-text-gradient">
            IPC 1860 ↔ BNS 2023 Cross-Reference Matrix
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Seamlessly search, convert, and compare the Indian Penal Code (IPC), Code of Criminal Procedure (CrPC), and Indian Evidence Act (IEA) against the newly enacted Bharatiya Nyaya Sanhita (BNS), Bharatiya Nagarik Suraksha Sanhita (BNSS), and Bharatiya Sakshya Adhiniyam (BSA).
          </p>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="court-glass p-6 rounded-2xl border border-amber-500/30 space-y-4">
        
        <div className="relative">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-amber-400" />
          <input
            type="text"
            placeholder="Search by section (e.g. IPC 302, BNS 101, 420, 318) or legal topic (Murder, Fraud, Sedition)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950 text-slate-100 border border-amber-500/40 rounded-xl pl-12 pr-4 py-3.5 text-xs focus:outline-none focus:border-amber-400 shadow-inner"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 text-xs font-mono">
          <button
            onClick={() => setSelectedFilter('all')}
            className={`px-3.5 py-1.5 rounded-lg border font-bold transition-all ${
              selectedFilter === 'all'
                ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md'
                : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
            }`}
          >
            All Acts (IPC / CrPC / IEA)
          </button>
          <button
            onClick={() => setSelectedFilter('ipc_bns')}
            className={`px-3.5 py-1.5 rounded-lg border font-bold transition-all ${
              selectedFilter === 'ipc_bns'
                ? 'bg-sky-500 text-slate-950 border-sky-400 shadow-md'
                : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
            }`}
          >
            IPC ↔ BNS (Penal Code)
          </button>
          <button
            onClick={() => setSelectedFilter('crpc_bnss')}
            className={`px-3.5 py-1.5 rounded-lg border font-bold transition-all ${
              selectedFilter === 'crpc_bnss'
                ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-md'
                : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
            }`}
          >
            CrPC ↔ BNSS (Procedure)
          </button>
          <button
            onClick={() => setSelectedFilter('iea_bsa')}
            className={`px-3.5 py-1.5 rounded-lg border font-bold transition-all ${
              selectedFilter === 'iea_bsa'
                ? 'bg-purple-500 text-slate-950 border-purple-400 shadow-md'
                : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
            }`}
          >
            IEA ↔ BSA (Evidence)
          </button>
        </div>

      </div>

      {/* Code Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCodes.map((item) => (
          <div
            key={item.id}
            className="court-glass rounded-2xl p-6 border border-amber-500/30 hover:border-amber-400/60 transition-all duration-300 space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              
              {/* Top Code Badge Pair */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-xs font-mono font-bold">
                  <span className="px-2.5 py-1 rounded bg-rose-500/20 text-rose-300 border border-rose-500/40 line-through opacity-80">
                    {item.oldCode}
                  </span>
                  <ArrowRight className="w-4 h-4 text-amber-400" />
                  <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                    {item.newCode}
                  </span>
                </div>

                <button
                  onClick={() => handleCopy(`${item.oldCode} -> ${item.newCode}: ${item.title}`)}
                  className="p-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-amber-400 border border-slate-800"
                  title="Copy reference"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>

              <h3 className="text-lg font-cinzel font-bold text-slate-100">
                {item.title}
              </h3>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5 text-xs">
                <div className="flex items-center justify-between text-[11px] text-amber-400 font-mono font-bold">
                  <span>Penalty & Statutory Revision:</span>
                </div>
                <p className="text-slate-300 font-sans leading-relaxed">{item.penaltyChange}</p>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {item.summary}
              </p>

              {/* Key Amendments */}
              <div className="space-y-1">
                <p className="text-[10px] font-mono text-slate-400 uppercase font-bold">Key Statutory Revisions:</p>
                <ul className="space-y-1">
                  {item.keyChanges.map((change, idx) => (
                    <li key={idx} className="text-[11px] text-slate-300 flex items-center space-x-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                      <span>{change}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Precedent Footer */}
            <div className="pt-3 border-t border-amber-500/20 text-[11px] text-slate-400 font-mono">
              <strong className="text-amber-400">Landmark Precedent:</strong> {item.precedents}
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};

export default CodeMatrix;
