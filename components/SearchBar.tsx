
import React, { useState } from 'react';

interface SearchBarProps {
  onSearch: (word: string) => void;
  isLoading: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoading }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative group max-w-3xl mx-auto mb-20 px-4 md:px-0">
      {/* Outer Glow Effect */}
      <div className="absolute -inset-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-amber-500 rounded-[2.5rem] blur-2xl opacity-10 group-focus-within:opacity-30 transition duration-1000"></div>
      
      <div className="relative flex items-center glass-effect rounded-[2.2rem] border border-white/20 shadow-2xl overflow-hidden">
        <div className="pl-8 flex items-center pointer-events-none">
          {isLoading ? (
            <i className="fa-solid fa-circle-notch fa-spin text-indigo-400 text-2xl"></i>
          ) : (
            <i className="fa-solid fa-magnifying-glass text-slate-500 group-focus-within:text-indigo-400 transition-colors text-2xl"></i>
          )}
        </div>
        
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a word..."
          className="w-full px-6 py-8 text-2xl bg-transparent border-none focus:ring-0 focus:outline-none text-white placeholder-slate-500 font-medium tracking-tight"
          disabled={isLoading}
        />
        
        <div className="pr-4">
          <button
            type="submit"
            disabled={isLoading || !query.trim()}
            className="px-10 py-5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-20 text-white font-black uppercase tracking-widest text-xs rounded-3xl transition-all shadow-xl shadow-indigo-500/20 active:scale-95 flex items-center space-x-3 border border-white/10"
          >
            <span>Define</span>
            <i className="fa-solid fa-sparkles"></i>
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;