import React from 'react';

export default function InsiderPanel({ data }) {
  return (
    <div className="bg-slate-800/80 rounded-2xl p-6 border border-slate-700">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-white">👔 Insider Clusters</h3>
        <span className="text-slate-400 text-sm">7-day activity</span>
      </div>
      
      <div className="space-y-3">
        {data.slice(0, 4).map((cluster) => (
          <div
            key={cluster.ticker}
            className={`p-4 rounded-xl border transition-all hover:scale-[1.02] cursor-pointer ${
              cluster.direction === 'buy'
                ? 'bg-green-900/20 border-green-500/30 hover:border-green-500/50'
                : 'bg-red-900/20 border-red-500/30 hover:border-red-500/50'
            }`}
          >
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-white">${cluster.ticker}</span>
                <span className={`text-sm font-medium ${cluster.direction === 'buy' ? 'text-green-400' : 'text-red-400'}`}>
                  {cluster.direction === 'buy' ? '🟢' : '🔴'} 
                  {cluster.insiders} insiders {cluster.direction.toUpperCase()}
                </span>
              </div>
              <div className="text-right">
                <div className="text-white font-semibold">
                  ${(cluster.value / 1000000).toFixed(2)}M
                </div>
                <div className="text-slate-400 text-xs">{cluster.date}</div>
              </div>
            </div>
            
            <div className="flex justify-between items-end">
              <div className="text-slate-400 text-sm truncate max-w-[200px]" title={cluster.names.join(', ')}>
                {cluster.names.slice(0, 2).join(', ')}
                {cluster.names.length > 2 && ` +${cluster.names.length - 2}`}
              </div>
              <div className={`text-sm font-semibold ${cluster.conviction > 0 ? 'text-green-400' : 'text-red-400'}`}>
                Conviction: {cluster.conviction > 0 ? '+' : ''}{cluster.conviction.toFixed(1)}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Summary stats */}
      <div className="mt-4 pt-4 border-t border-slate-700 grid grid-cols-2 gap-4">
        <div className="text-center">
          <div className="text-xl font-bold text-green-400">
            {data.filter(c => c.direction === 'buy').length}
          </div>
          <div className="text-slate-500 text-xs">Buy Clusters</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-bold text-red-400">
            {data.filter(c => c.direction === 'sell').length}
          </div>
          <div className="text-slate-500 text-xs">Sell Clusters</div>
        </div>
      </div>
    </div>
  );
}
