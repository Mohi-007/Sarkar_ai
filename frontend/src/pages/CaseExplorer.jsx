import React, { useState } from 'react';
import { FileSearch, Search, Bookmark } from 'lucide-react';
import toast from 'react-hot-toast';

const CaseExplorer = () => {
  const [query, setQuery] = useState('');

  const sampleCases = [
    {
      id: 1,
      title: 'Arnesh Kumar v. State of Bihar & Anr.',
      citation: '(2014) 8 SCC 273',
      court: 'Supreme Court of India',
      bench: '2-Judge Bench (Hon\'ble Chandramauli Kr. Prasad & Pinaki Chandra Ghose, JJ.)',
      relevanceScore: 98,
      subject: 'Mandatory Compliance with Arrest Protocols under BNSS § 35 (Formerly CrPC 41/41A)',
      ratio: 'Police officers must not make automatic or routine arrests in offences punishable with imprisonment up to 7 years without issuing prior Notice of Appearance.',
    },
    {
      id: 2,
      title: 'Anvar P.V. v. P.K. Basheer & Ors.',
      citation: '(2014) 10 SCC 473',
      court: 'Supreme Court of India',
      bench: '3-Judge Bench (Hon\'ble R.M. Lodha, C.J.I.)',
      relevanceScore: 95,
      subject: 'Admissibility of Digital & Electronic Evidence under BSA § 63 (IEA 65B)',
      ratio: 'Electronic record produced by way of secondary evidence is strictly inadmissible unless accompanied by mandatory statutory certificate at the time of trial.',
    },
    {
      id: 3,
      title: 'Lalita Kumari v. Government of Uttar Pradesh',
      citation: '(2014) 2 SCC 1',
      court: 'Supreme Court of India',
      bench: '5-Judge Constitution Bench',
      relevanceScore: 92,
      subject: 'Mandatory Registration of FIR under BNSS § 173 (CrPC 154)',
      ratio: 'Registration of FIR is mandatory if the information discloses commission of a cognizable offence and no preliminary inquiry is permissible in such cases.',
    }
  ];

  const filteredCases = sampleCases.filter(c => {
    const q = query.toLowerCase();
    return c.title.toLowerCase().includes(q) || c.subject.toLowerCase().includes(q) || c.citation.toLowerCase().includes(q);
  });

  const handleBookmark = (title) => {
    toast.success(`Bookmarked precedent: ${title}`);
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Top Banner */}
      <div className="bg-[#0b132b] p-8 rounded-3xl border border-amber-500/40 shadow-2xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-mono">
            <FileSearch className="w-3.5 h-3.5" />
            <span>SEMANTIC PRECEDENT RETRIEVAL ENGINE</span>
          </div>

          <h1 className="text-3xl font-cinzel font-extrabold gold-text-gradient">
            Landmark Precedent & Case Explorer
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Search landmark judgments across the Supreme Court of India & High Courts with vector similarity embeddings and ratio decidendi breakdowns.
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="court-glass p-6 rounded-2xl border border-amber-500/30 space-y-4">
        <div className="relative">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-amber-400" />
          <input
            type="text"
            placeholder="Search precedents by keyword (e.g. arrest protocol, electronic evidence, bail guidelines, FIR)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-slate-950 text-slate-100 border border-amber-500/40 rounded-xl pl-12 pr-4 py-3.5 text-xs focus:outline-none focus:border-amber-400"
          />
        </div>
      </div>

      {/* Case Cards Grid */}
      <div className="space-y-4">
        {filteredCases.map(item => (
          <div key={item.id} className="court-glass rounded-2xl p-6 border border-amber-500/30 hover:border-amber-400/60 transition-all space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30">
                  {item.citation}
                </span>
                <h3 className="text-lg font-cinzel font-bold text-slate-100 mt-1">{item.title}</h3>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-xs font-mono text-emerald-400 font-bold px-2 py-1 rounded bg-emerald-500/10 border border-emerald-500/30">
                  {item.relevanceScore}% Match
                </span>
                <button onClick={() => handleBookmark(item.title)} className="p-2 rounded-lg bg-slate-950 text-slate-400 hover:text-amber-400 border border-slate-800">
                  <Bookmark className="w-4 h-4" />
                </button>
              </div>
            </div>

            <p className="text-xs font-mono text-slate-400">{item.court} • {item.bench}</p>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300">
              <strong className="block text-[10px] font-mono text-amber-400 uppercase mb-1">Subject Matter:</strong>
              {item.subject}
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              <strong className="text-amber-300 font-cinzel">Ratio Decidendi: </strong>
              {item.ratio}
            </p>
          </div>
        ))}
      </div>

    </div>
  );
};

export default CaseExplorer;
