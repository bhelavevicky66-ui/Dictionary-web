
import React from 'react';
import { HistoryItem } from '../types';

interface HistoryProps {
  items: HistoryItem[];
  onSelect: (word: string) => void;
  onClear: () => void;
}

const History: React.FC<HistoryProps> = ({ items, onSelect, onClear }) => {
  if (items.length === 0) return null;

  return (
    <div className="mb-12 max-w-3xl mx-auto animate-in fade-in slide-in-from-top-4 duration-500 delay-200">
      <div className="flex items-center justify-between mb-4 px-2">
        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">History</h3>
        <button 
          onClick={onClear}
          className="text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-red-500 transition-colors flex items-center space-x-1"
        >
          <i className="fa-solid fa-trash-can text-[8px]"></i>
          <span>Clear All</span>
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {items.map((item, idx) => (
          <button
            key={idx}
            onClick={() => onSelect(item.word)}
            className="px-5 py-2.5 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-full text-xs font-bold border border-slate-200 dark:border-slate-700 hover:border-indigo-400 dark:hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:shadow-lg hover:shadow-indigo-500/10 transition-all active:scale-95"
          >
            {item.word}
          </button>
        ))}
      </div>
    </div>
  );
};

export default History;