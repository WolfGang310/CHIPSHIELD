import React from 'react';

export default function Footer({ lastUpdate }) {
  return (
    <footer className="border-t border-slate-700/50 mt-12 py-8 bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-sm">
              🌐
            </div>
            <div>
              <div className="text-white font-semibold">Global Alpha Radar</div>
              <div className="text-slate-500 text-xs">Multi-layer signal convergence for informed decisions</div>
            </div>
          </div>
          
          <div className="flex items-center gap-6 text-sm">
            <div className="text-slate-500">
              Last updated: <span className="text-slate-300">{lastUpdate.toLocaleTimeString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-green-400 text-xs">Live</span>
            </div>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <div>
            Built by <a href="https://linkedin.com/in/matinsaiyed" className="text-purple-400 hover:text-purple-300 transition-colors">Matin Saiyed</a> • 
            CFA Candidate • Licensed Mutual Fund Representative
          </div>
          <div className="flex gap-4">
            <a href="https://github.com" className="hover:text-white transition-colors">GitHub</a>
            <a href="https://linkedin.com/in/matinsaiyed" className="hover:text-white transition-colors">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
