
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
    <form onSubmit={handleSubmit} className="relative group max-w-3xl mx-auto mb-16">
      <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-amber-500 rounded-3xl blur opacity-25 group-focus-within:opacity-60 transition duration-1000 group-focus-within:duration-200"></div>
      
      <div className="relative flex items-center bg-white dark:bg-slate-900 rounded-2xl shadow-2xl">
        <div className="pl-6 flex items-center pointer-events-none">
          {isLoading ? (
            <i className="fa-solid fa-spinner fa-spin text-indigo-500 text-xl"></i>
          ) : (
            <i className="fa-solid fa-search text-slate-400 dark:text-slate-600 group-focus-within:text-indigo-500 transition-colors text-xl"></i>
          )}
        </div>
        
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="What word are you curious about?"
          className="w-full px-6 py-6 text-xl bg-transparent border-none focus:ring-0 focus:outline-none dark:text-white placeholder-slate-400"
          disabled={isLoading}
        />
        
        <div className="pr-3">
          <button
            type="submit"
            disabled={isLoading || !query.trim()}
            className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-200 dark:disabled:bg-slate-800 text-white font-bold rounded-xl transition-all shadow-lg shadow-indigo-500/30 active:scale-95 flex items-center space-x-2"
          >
            <span>Search</span>
            <i className="fa-solid fa-arrow-right text-xs"></i>
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;