
import React, { useState, useEffect } from 'react';

interface LayoutProps {
  children: React.ReactNode;
  user: any;
  onLogout: () => void;
  onLoginClick: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, user, onLogout, onLoginClick }) => {
  const [isDark, setIsDark] = useState(true); // Default to dark for premium look

  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Floating Header */}
      <nav className="sticky top-6 z-50 max-w-5xl mx-auto w-full px-4 mb-4">
        <div className="glass-effect rounded-[2rem] px-8 py-4 flex items-center justify-between shadow-2xl border border-white/10">
          <div className="flex items-center space-x-4 group cursor-pointer">
            <div className="bg-indigo-600 w-11 h-11 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/40 group-hover:rotate-[15deg] transition-all duration-500">
              <i className="fa-solid fa-brain text-white text-xl"></i>
            </div>
            <div>
              <span className="text-2xl font-black tracking-tight bg-gradient-to-r from-indigo-400 to-indigo-200 bg-clip-text text-transparent">
                LexiMind
              </span>
              <span className="block text-[9px] font-black uppercase tracking-[0.3em] text-indigo-400/60">AI Dictionary</span>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                  <span className="font-black text-indigo-400">{user.username[0].toUpperCase()}</span>
                </div>
                <button 
                  onClick={onLogout}
                  className="hidden sm:block text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-red-400 transition-colors"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button 
                onClick={onLoginClick}
                className="px-8 py-3 text-xs font-black uppercase tracking-[0.2em] text-white bg-indigo-600 hover:bg-indigo-500 rounded-2xl transition-all shadow-xl shadow-indigo-500/20 active:scale-95 border border-white/10"
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

      {/* Fully Redesigned Immersive Footer */}
      <footer className="w-full max-w-5xl mx-auto px-4 pb-12 mt-20 relative z-10">
        {/* Deep ambient glow behind the footer */}
        <div className="absolute inset-x-0 -top-20 h-64 bg-indigo-600/10 blur-[120px] pointer-events-none rounded-full"></div>
        
        <div className="glass-effect bg-white/5 dark:bg-slate-900/40 backdrop-blur-2xl rounded-[3rem] p-12 border border-white/10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] overflow-hidden relative group">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center relative z-10">
            
            {/* Branding */}
            <div className="flex flex-col items-center md:items-start space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white shadow-xl shadow-indigo-500/20">
                  <i className="fa-solid fa-brain"></i>
                </div>
                <span className="text-xl font-black uppercase tracking-[0.2em] text-white">
                  LexiMind
                </span>
              </div>
              <p className="text-sm text-slate-400 font-medium leading-relaxed text-center md:text-left">
                The future of bilingual learning. Context-aware translations powered by advanced neural intelligence.
              </p>
            </div>

            {/* Social Icons with Glowing Hover */}
            <div className="flex flex-col items-center space-y-6">
              <div className="flex space-x-5">
                {[
                  { icon: 'fa-github', color: 'hover:text-white' },
                  { icon: 'fa-twitter', color: 'hover:text-blue-400' },
                  { icon: 'fa-discord', color: 'hover:text-indigo-400' }
                ].map((social, i) => (
                  <a key={i} href="#" className={`w-14 h-14 rounded-[1.5rem] bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 transition-all duration-500 hover:scale-110 hover:bg-white/10 hover:border-white/20 hover:shadow-2xl hover:shadow-indigo-500/20 ${social.color}`}>
                    <i className={`fa-brands ${social.icon} text-2xl`}></i>
                  </a>
                ))}
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-500">Connect with us</span>
            </div>

            {/* Status & Copy */}
            <div className="flex flex-col items-center md:items-end space-y-4">
              <div className="flex items-center space-x-3 bg-slate-900/50 border border-white/10 px-5 py-2.5 rounded-2xl">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>
                <span className="text-[11px] font-bold text-slate-300 uppercase tracking-widest">AI Engine Online</span>
              </div>
              <div className="text-center md:text-right">
                <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">
                  &copy; 2025 LexiMind Intelligence
                </p>
                <p className="mt-1 text-[9px] text-indigo-400/50 font-bold uppercase tracking-[0.1em]">
                  Redefining Vocabulary
                </p>
              </div>
            </div>

          </div>

          {/* Bottom decorative bar */}
          <div className="absolute bottom-0 left-0 w-full h-1.5 bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent"></div>
        </div>

        {/* Closing decorative elements to ensure no white space */}
        <div className="mt-10 flex justify-center items-center space-x-3 opacity-20">
          <div className="h-px w-20 bg-gradient-to-r from-transparent to-white"></div>
          <i className="fa-solid fa-star text-[8px] text-white"></i>
          <div className="h-px w-20 bg-gradient-to-l from-transparent to-white"></div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
