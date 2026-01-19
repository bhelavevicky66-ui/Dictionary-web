
import React, { useState, useEffect, useCallback } from 'react';
import Layout from './components/Layout';
import SearchBar from './components/SearchBar';
import WordCard from './components/WordCard';
import History from './components/History';
import AuthModal from './components/AuthModal';
import { fetchWordData } from './services/dictionaryService';
import { getAIInsights } from './services/geminiService';
import { WordEntry, AIInsights, HistoryItem, User } from './types';

const App: React.FC = () => {
  const [wordData, setWordData] = useState<WordEntry | null>(null);
  const [aiInsights, setAiInsights] = useState<AIInsights | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  // Initialize from LocalStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem('leximind_history');
    if (savedHistory) setHistory(JSON.parse(savedHistory));

    const savedUser = localStorage.getItem('leximind_user');
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const saveHistory = useCallback((word: string) => {
    setHistory(prev => {
      const filtered = prev.filter(item => item.word.toLowerCase() !== word.toLowerCase());
      const newHistory = [{ word, timestamp: Date.now() }, ...filtered].slice(0, 10);
      localStorage.setItem('leximind_history', JSON.stringify(newHistory));
      return newHistory;
    });
  }, []);

  const handleSearch = async (word: string) => {
    setIsLoading(true);
    setIsAiLoading(true);
    setError(null);
    setWordData(null);
    setAiInsights(null);

    try {
      const results = await fetchWordData(word);
      const mainResult = results[0];
      setWordData(mainResult);
      saveHistory(mainResult.word);

      // AI Insights (Hindi Translation)
      getAIInsights(mainResult.word)
        .then(insights => {
          setAiInsights(insights);
        })
        .finally(() => {
          setIsAiLoading(false);
        });
        
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
      setIsAiLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('leximind_user');
  };

  const handleAuthSuccess = (username: string) => {
    const newUser = { username, email: `${username}@example.com` };
    setUser(newUser);
    localStorage.setItem('leximind_user', JSON.stringify(newUser));
  };

  return (
    <Layout 
      user={user} 
      onLogout={handleLogout} 
      onLoginClick={() => setIsAuthOpen(true)}
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4 dark:text-white tracking-tight">
            English to <span className="text-amber-500">हिन्दी</span> Dictionary
          </h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-lg mx-auto">
            Get instant Hindi meanings, pronunciations, and AI memory aids for any English word.
          </p>
        </div>

        <SearchBar onSearch={handleSearch} isLoading={isLoading} />
        
        <History 
          items={history} 
          onSelect={handleSearch} 
          onClear={() => {
            setHistory([]);
            localStorage.removeItem('leximind_history');
          }}
        />

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-8 text-center max-w-2xl mx-auto">
            <div className="bg-red-100 dark:bg-red-800/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fa-solid fa-triangle-exclamation text-red-600 text-2xl"></i>
            </div>
            <h3 className="text-xl font-bold text-red-800 dark:text-red-400 mb-2">Oops!</h3>
            <p className="text-red-600 dark:text-red-400/80">{error}</p>
          </div>
        )}

        {wordData && (
          <WordCard 
            data={wordData} 
            aiInsights={aiInsights} 
            isAiLoading={isAiLoading} 
          />
        )}

        {!wordData && !isLoading && !error && (
          <div className="mt-12 text-center py-20 bg-white/50 dark:bg-slate-800/30 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-3xl">
            <i className="fa-solid fa-language text-4xl text-slate-200 dark:text-slate-700 mb-4"></i>
            <p className="text-slate-400 dark:text-slate-500 font-medium">Type a word above to see the Hindi meaning...</p>
          </div>
        )}
      </div>

      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)} 
        onSuccess={handleAuthSuccess} 
      />
    </Layout>
  );
};

export default App;
