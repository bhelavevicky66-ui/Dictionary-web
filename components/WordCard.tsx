
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
    const labels = ["Everyday Life", "Professional", "Social", "Academic", "Creative"];
    const icons = ["fa-house", "fa-briefcase", "fa-users", "fa-graduation-cap", "fa-pen-nib"];
    return { label: labels[idx], icon: icons[idx] };
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 max-w-4xl mx-auto space-y-8">
      
      {/* 1. Main Word Hero Section */}
      <section className="bg-white dark:bg-slate-800 rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-700/50 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-amber-500/5 rounded-full -ml-16 -mb-16 blur-3xl"></div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-[10px] font-bold uppercase tracking-widest rounded-full">Definition</span>
              <div className="h-1 w-1 rounded-full bg-slate-300"></div>
              <span className="text-slate-400 dark:text-slate-500 text-xs font-medium uppercase tracking-widest">En - Hi</span>
            </div>
            <h1 className="text-6xl md:text-7xl font-black dark:text-white capitalize tracking-tighter leading-none mb-4">
              {data.word}
            </h1>
            <div className="flex items-center space-x-4">
              <span className="text-2xl font-semibold text-indigo-500/80 italic font-serif">
                {data.phonetic || data.phonetics.find(p => p.text)?.text}
              </span>
              {audioObj && (
                <button 
                  onClick={playAudio}
                  className="w-12 h-12 bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 rounded-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-md border border-slate-100 dark:border-slate-600"
                >
                  <i className="fa-solid fa-volume-up text-lg"></i>
                </button>
              )}
            </div>
          </div>

          {/* Hindi Meaning Box */}
          <div className="min-w-[280px]">
            {aiInsights ? (
              <div className="bg-gradient-to-br from-amber-400 to-orange-500 rounded-3xl p-6 shadow-xl shadow-orange-500/20 text-white transform hover:-rotate-1 transition-transform cursor-default">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80">हिन्दी अर्थ</span>
                  <i className="fa-solid fa-language text-xl opacity-50"></i>
                </div>
                <div className="text-4xl md:text-5xl font-bold mb-1">
                  {aiInsights.hindiMeaning}
                </div>
                <div className="text-[10px] uppercase font-bold tracking-widest opacity-70">Primary Meaning</div>
              </div>
            ) : isAiLoading ? (
              <div className="bg-slate-100 dark:bg-slate-700/50 rounded-3xl p-6 animate-pulse w-full h-32"></div>
            ) : null}
          </div>
        </div>
      </section>

      {/* 2. Bilingual Examples Section */}
      <section className="space-y-6">
        <div className="flex items-center space-x-4">
          <h2 className="text-xl font-extrabold dark:text-white tracking-tight">Real-world Context</h2>
          <div className="h-1 w-12 bg-indigo-500 rounded-full"></div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">5 Contextual Types</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {aiInsights ? (
            aiInsights.examples.map((ex, idx) => {
              const ctx = getContextLabel(idx);
              return (
                <div key={idx} className="group glass-effect rounded-3xl p-6 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 border border-white/40 dark:border-slate-700/50 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center space-x-2 mb-4">
                      <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-500">
                        <i className={`fa-solid ${ctx.icon} text-xs`}></i>
                      </div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{ctx.label}</span>
                    </div>
                    <p className="text-slate-800 dark:text-slate-200 font-bold text-lg mb-3 leading-tight">
                      {ex.english}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                    <p className="text-amber-600 dark:text-amber-400 text-sm font-medium italic">
                      {ex.hindi}
                    </p>
                  </div>
                </div>
              );
            })
          ) : isAiLoading ? (
            Array(5).fill(0).map((_, i) => (
              <div key={i} className="h-48 bg-white dark:bg-slate-800 rounded-3xl animate-pulse"></div>
            ))
          ) : null}
        </div>
      </section>

      {/* 3. AI Insights Grid */}
      {aiInsights && (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-indigo-600 rounded-[2rem] p-8 text-white shadow-xl shadow-indigo-500/20 relative overflow-hidden group">
            <i className="fa-solid fa-lightbulb absolute top-4 right-4 text-7xl opacity-10 group-hover:scale-110 transition-transform"></i>
            <h3 className="text-xs font-black uppercase tracking-[0.2em] mb-4 opacity-70">Mnemonic Device</h3>
            <p className="text-xl md:text-2xl font-bold leading-snug italic">
              "{aiInsights.mnemonic}"
            </p>
          </div>
          
          <div className="bg-white dark:bg-slate-800 rounded-[2rem] p-8 border border-slate-100 dark:border-slate-700/50 shadow-xl shadow-slate-200/50 dark:shadow-none flex flex-col justify-center">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] mb-4 text-indigo-600">Quick Usage Tip</h3>
            <p className="text-slate-600 dark:text-slate-300 font-medium text-lg leading-relaxed">
              {aiInsights.usageTip}
            </p>
          </div>
        </section>
      )}

      {/* 4. Deep English Definitions */}
      <section className="bg-white dark:bg-slate-800 rounded-[2.5rem] p-8 md:p-12 border border-slate-100 dark:border-slate-700/50 shadow-xl">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-10 text-center">Comprehensive Meanings</h3>
        <div className="space-y-16">
          {data.meanings.map((meaning, mIdx) => (
            <div key={mIdx}>
              <div className="flex items-center space-x-6 mb-8">
                <div className="px-6 py-2 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-sm font-black uppercase tracking-widest rounded-full">
                  {meaning.partOfSpeech}
                </div>
                <div className="h-px flex-grow bg-slate-100 dark:bg-slate-700"></div>
              </div>
              <div className="grid grid-cols-1 gap-10">
                {meaning.definitions.map((def, dIdx) => (
                  <div key={dIdx} className="flex gap-6">
                    <span className="text-5xl font-black text-indigo-500/10 select-none">0{dIdx + 1}</span>
                    <div>
                      <p className="text-xl text-slate-800 dark:text-slate-100 font-medium leading-relaxed mb-4">
                        {def.definition}
                      </p>
                      {def.example && (
                        <div className="bg-slate-50 dark:bg-slate-900/40 p-5 rounded-2xl border-l-4 border-indigo-400">
                          <p className="text-slate-500 dark:text-slate-400 italic">
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