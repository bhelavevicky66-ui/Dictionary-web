
import React from 'react';
import { WordEntry, AIInsights } from '../types';

interface WordCardProps {
  data: WordEntry;
  aiInsights: AIInsights | null;
  isAiLoading: boolean;
}

const WordCard: React.FC<WordCardProps> = ({ data, aiInsights, isAiLoading }) => {
  const audioObj = data.phonetics.find(p => p.audio && p.audio.length > 0);
  
  const playAudio = () => {
    if (audioObj?.audio) {
      const audio = new Audio(audioObj.audio);
      audio.play().catch(e => console.error("Audio playback error:", e));
    }
  };

  const getContextLabel = (idx: number) => {
    const labels = ["Common Usage", "Professional", "Social", "Scholarly", "Creative"];
    const icons = ["fa-comment-dots", "fa-briefcase", "fa-users", "fa-book-open", "fa-wand-magic"];
    return { label: labels[idx], icon: icons[idx] };
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-12 duration-1000 max-w-4xl mx-auto space-y-12">
      
      {/* Word Hero Section */}
      <section className="glass-effect rounded-[3rem] p-10 md:p-16 border border-white/10 shadow-2xl relative overflow-hidden">
        {/* Dynamic Glow Accents */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full -mr-32 -mt-32 blur-[100px]"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500/10 rounded-full -ml-32 -mb-32 blur-[100px]"></div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-10 relative z-10">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-6">
              <span className="px-4 py-1.5 bg-indigo-500/20 text-indigo-300 text-[10px] font-black uppercase tracking-[0.3em] rounded-full border border-indigo-500/20">Knowledge Node</span>
              <div className="h-1 w-1 rounded-full bg-slate-600"></div>
              <span className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em]">English - Hindi</span>
            </div>
            <h1 className="text-7xl md:text-8xl font-black text-white capitalize tracking-tighter leading-none mb-6">
              {data.word}
            </h1>
            <div className="flex items-center space-x-6">
              <span className="text-3xl font-bold text-indigo-400 italic">
                {data.phonetic || data.phonetics.find(p => p.text)?.text}
              </span>
              {audioObj && (
                <button 
                  onClick={playAudio}
                  className="w-14 h-14 bg-white/10 hover:bg-white/20 text-white rounded-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-2xl border border-white/10"
                >
                  <i className="fa-solid fa-volume-high text-xl"></i>
                </button>
              )}
            </div>
          </div>

          {/* Hindi Identity Section */}
          <div className="flex-shrink-0">
            {aiInsights ? (
              <div className="bg-gradient-to-br from-amber-400 to-orange-600 rounded-[2.5rem] p-10 shadow-[0_20px_50px_-12px_rgba(245,158,11,0.3)] text-white transform hover:rotate-1 transition-transform cursor-default border border-white/20">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-black uppercase tracking-[0.3em] opacity-70">हिन्दी अनुवाद</span>
                  <i className="fa-solid fa-language text-2xl opacity-50"></i>
                </div>
                <div className="text-5xl md:text-6xl font-black mb-2 tracking-tight">
                  {aiInsights.hindiMeaning}
                </div>
                <div className="text-[11px] uppercase font-bold tracking-[0.2em] opacity-80">Core Hindi Meaning</div>
              </div>
            ) : isAiLoading ? (
              <div className="bg-white/5 rounded-[2.5rem] p-10 animate-pulse w-72 h-44 border border-white/10"></div>
            ) : null}
          </div>
        </div>
      </section>

      {/* Examples Grid */}
      <section className="space-y-8">
        <div className="flex items-center space-x-4 px-2">
          <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
          <h2 className="text-2xl font-black text-white tracking-tight">Contextual Intelligence</h2>
          <div className="h-px flex-grow bg-white/10"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {aiInsights ? (
            aiInsights.examples.map((ex, idx) => {
              const ctx = getContextLabel(idx);
              return (
                <div key={idx} className="glass-effect rounded-[2rem] p-8 border border-white/10 hover:border-white/20 hover:bg-white/[0.07] transition-all duration-500 flex flex-col justify-between group">
                  <div>
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
                        <i className={`fa-solid ${ctx.icon} text-sm`}></i>
                      </div>
                      <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">{ctx.label}</span>
                    </div>
                    <p className="text-white font-bold text-xl mb-4 leading-snug">
                      {ex.english}
                    </p>
                  </div>
                  <div className="pt-6 border-t border-white/5">
                    <p className="text-amber-400/90 text-sm font-bold italic tracking-wide">
                      {ex.hindi}
                    </p>
                  </div>
                </div>
              );
            })
          ) : isAiLoading ? (
            Array(5).fill(0).map((_, i) => (
              <div key={i} className="h-56 bg-white/5 rounded-[2rem] animate-pulse border border-white/10"></div>
            ))
          ) : null}
        </div>
      </section>

      {/* AI Memory Insights */}
      {aiInsights && (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-indigo-600 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden group border border-white/10">
            <i className="fa-solid fa-brain absolute top-6 right-6 text-9xl opacity-5 group-hover:scale-125 transition-transform duration-1000"></i>
            <h3 className="text-[11px] font-black uppercase tracking-[0.4em] mb-6 opacity-60">Memory Anchor</h3>
            <p className="text-2xl font-bold leading-relaxed italic">
              "{aiInsights.mnemonic}"
            </p>
          </div>
          
          <div className="glass-effect rounded-[2.5rem] p-10 border border-white/10 shadow-2xl flex flex-col justify-center">
            <h3 className="text-[11px] font-black uppercase tracking-[0.4em] mb-6 text-indigo-400">Nuance & Usage</h3>
            <p className="text-slate-300 font-bold text-xl leading-relaxed">
              {aiInsights.usageTip}
            </p>
          </div>
        </section>
      )}

      {/* English Structure */}
      <section className="glass-effect rounded-[3rem] p-12 md:p-16 border border-white/10 shadow-2xl mb-20">
        <h3 className="text-xs font-black text-slate-500 uppercase tracking-[0.5em] mb-12 text-center">Structural Breakdown</h3>
        <div className="space-y-20">
          {data.meanings.map((meaning, mIdx) => (
            <div key={mIdx} className="relative">
              <div className="flex items-center space-x-8 mb-10">
                <div className="px-8 py-3 bg-white/10 text-white text-xs font-black uppercase tracking-[0.3em] rounded-2xl border border-white/10">
                  {meaning.partOfSpeech}
                </div>
                <div className="h-px flex-grow bg-white/5"></div>
              </div>
              <div className="grid grid-cols-1 gap-12">
                {meaning.definitions.map((def, dIdx) => (
                  <div key={dIdx} className="flex items-start gap-8">
                    <span className="text-6xl font-black text-white/5 leading-none select-none">0{dIdx + 1}</span>
                    <div className="flex-1">
                      <p className="text-2xl text-slate-200 font-medium leading-relaxed mb-6">
                        {def.definition}
                      </p>
                      {def.example && (
                        <div className="bg-white/[0.03] p-8 rounded-3xl border-l-4 border-indigo-500/50">
                          <p className="text-slate-400 italic text-lg">
                            "{def.example}"
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default WordCard;