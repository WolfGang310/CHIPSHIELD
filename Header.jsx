import React from 'react';

export default function Header({ view, setView, onGameClick }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'analyze', label: 'Analyze', icon: '🎯' },
    { id: 'risk', label: 'Risk', icon: '🌍' },
    { id: 'sentiment', label: 'Sentiment', icon: '🧠' },
  ];

  return (
    <header className="border-b border-slate-700/50 bg-slate-900/80 backdrop-blur-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-xl">
              🌐
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Global Alpha Radar</h1>
              <p className="text-slate-400 text-xs hidden sm:block">Multi-Layer Market Intelligence</p>
            </div>
          </div>
          
          <nav className="flex items-center gap-1">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => setView(item.id)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
                  view === item.id 
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/25' 
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <span className="hidden sm:inline">{item.icon}</span>
                <span className="hidden md:inline">{item.label}</span>
                <span className="md:hidden">{item.icon}</span>
              </button>
            ))}
            
            <button
              onClick={onGameClick}
              className="ml-2 px-3 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-500 hover:to-pink-500 transition-all flex items-center gap-1.5"
            >
              <span>🎮</span>
              <span className="hidden sm:inline">Test Psychology</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}
