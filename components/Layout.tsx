
import React, { useState, useEffect } from 'react';

interface LayoutProps {
  children: React.ReactNode;
  user: any;
  onLogout: () => void;
  onLoginClick: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, user, onLogout, onLoginClick }) => {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' || 
             (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  return (
    <div className="min-h-screen transition-colors duration-500 flex flex-col relative overflow-hidden">
      {/* Dynamic Background Pattern - Increased intensity and coverage */}
      <div className="fixed inset-0 pointer-events-none opacity-30 dark:opacity-20 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-indigo-500/20 rounded-full blur-[140px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-amber-500/20 rounded-full blur-[140px] animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <nav className="sticky top-4 z-50 max-w-5xl mx-auto w-full px-4 mt-4">
        <div className="glass-effect rounded-2xl px-6 py-3 flex items-center justify-between shadow-xl shadow-indigo-500/5 dark:shadow-none border border-white/50 dark:border-slate-700/50">
          <div className="flex items-center space-x-3 group cursor-pointer">
            <div className="bg-indigo-600 w-10 h-10 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/40 group-hover:rotate-12 transition-transform duration-300">
              <i className="fa-solid fa-brain text-white text-lg"></i>
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-600 to-indigo-400 bg-clip-text text-transparent">
                LexiMind
              </span>
              <span className="block text-[8px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">AI Powered Dictionary</span>
            </div>
          </div>

          <div className="flex items-center space-x-2 md:space-x-5">
            <button 
              onClick={() => setIsDark(!isDark)}
              className="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300 border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
              aria-label="Toggle dark mode"
            >
              {isDark ? (
                <i className="fa-solid fa-sun text-amber-400 text-lg"></i>
              ) : (
                <i className="fa-solid fa-moon text-slate-600 text-lg"></i>
              )}
            </button>
            
            {user ? (
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center overflow-hidden border-2 border-indigo-500/20">
                  <span className="font-bold text-slate-600 dark:text-slate-300">{user.username[0].toUpperCase()}</span>
                </div>
                <button 
                  onClick={onLogout}
                  className="hidden sm:block px-5 py-2 text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 hover:text-red-500 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button 
                onClick={onLoginClick}
                className="px-6 py-2.5 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl transition-all shadow-xl shadow-indigo-500/25 active:scale-95"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </nav>

      <main className="flex-grow max-w-5xl mx-auto w-full p-4 md:p-10 relative z-10">
        {children}
      </main>

      {/* Redesigned Footer Section */}
      <footer className="w-full max-w-5xl mx-auto px-4 pb-12 relative z-10">
        <div className="glass-effect rounded-[2rem] p-8 border border-white/40 dark:border-slate-700/50 shadow-2xl shadow-indigo-500/5 overflow-hidden relative">
          {/* Subtle footer glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-50"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            {/* Branding Column */}
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start space-x-2 mb-2">
                <i className="fa-solid fa-brain text-indigo-500 text-sm"></i>
                <span className="text-sm font-black uppercase tracking-[0.2em] text-slate-800 dark:text-white">LexiMind</span>
              </div>
              <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">The most advanced English-Hindi AI dictionary.</p>
            </div>

            {/* Social / Feature Icons Column */}
            <div className="flex justify-center space-x-6">
              <a href="#" className="w-10 h-10 rounded-full bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex items-center justify-center text-slate-400 hover:text-indigo-500 hover:shadow-lg hover:shadow-indigo-500/10 transition-all active:scale-95">
                <i className="fa-brands fa-github text-lg"></i>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex items-center justify-center text-slate-400 hover:text-indigo-500 hover:shadow-lg hover:shadow-indigo-500/10 transition-all active:scale-95">
                <i className="fa-brands fa-twitter text-lg"></i>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex items-center justify-center text-slate-400 hover:text-indigo-500 hover:shadow-lg hover:shadow-indigo-500/10 transition-all active:scale-95">
                <i className="fa-solid fa-envelope text-lg"></i>
              </a>
            </div>

            {/* Powered By Column */}
            <div className="text-center md:text-right">
              <div className="inline-flex items-center space-x-2 bg-slate-900 dark:bg-slate-100 px-4 py-2 rounded-full shadow-lg shadow-slate-900/10">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">Powered by</span>
                <span className="text-[11px] font-bold text-white dark:text-slate-900">Gemini 3.0</span>
              </div>
              <p className="mt-3 text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-[0.3em]">
                &copy; 2025 LexiMind AI
              </p>
            </div>
          </div>
        </div>
        
        {/* Visual anchor at the very bottom */}
        <div className="mt-8 flex justify-center opacity-30">
          <div className="w-1 h-1 rounded-full bg-indigo-500 mx-1"></div>
          <div className="w-1 h-1 rounded-full bg-amber-500 mx-1"></div>
          <div className="w-1 h-1 rounded-full bg-indigo-500 mx-1"></div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
