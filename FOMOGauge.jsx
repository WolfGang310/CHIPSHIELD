import React from 'react';

export default function FOMOGauge({ data }) {
  const regimeColors = {
    extreme_fear: "#22c55e",
    fear: "#86efac",
    neutral: "#fbbf24",
    greed: "#f97316",
    extreme_greed: "#ef4444"
  };
  
  const regimeEmoji = {
    extreme_fear: "😨",
    fear: "😟",
    neutral: "😐",
    greed: "😏",
    extreme_greed: "🤑"
  };
  
  const regimeDescriptions = {
    extreme_fear: "Maximum pessimism. Historically a contrarian buy signal.",
    fear: "Elevated fear. Potential opportunities forming.",
    neutral: "Balanced sentiment. Follow fundamentals.",
    greed: "Elevated optimism. Stay invested but cautious.",
    extreme_greed: "Maximum euphoria. Historically a contrarian sell signal."
  };

  const rotation = (data.score / 100) * 180 - 90;
  const color = regimeColors[data.regime] || regimeColors.neutral;

  return (
    <div className="bg-slate-800/80 rounded-2xl p-6 border border-slate-700">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-white">FOMO Index</h3>
        <div className={`text-sm px-2 py-0.5 rounded ${data.change24h >= 0 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
          {data.change24h >= 0 ? '↑' : '↓'} {Math.abs(data.change24h).toFixed(1)}
        </div>
      </div>
      
      {/* Gauge */}
      <div className="relative w-48 h-28 mx-auto mb-4">
        <svg viewBox="0 0 200 110" className="w-full">
          <defs>
            <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#22c55e" />
              <stop offset="25%" stopColor="#86efac" />
              <stop offset="50%" stopColor="#fbbf24" />
              <stop offset="75%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#ef4444" />
            </linearGradient>
          </defs>
          
          {/* Background arc */}
          <path
            d="M 20 95 A 80 80 0 0 1 180 95"
            fill="none"
            stroke="#334155"
            strokeWidth="14"
            strokeLinecap="round"
          />
          
          {/* Colored arc */}
          <path
            d="M 20 95 A 80 80 0 0 1 180 95"
            fill="none"
            stroke="url(#gaugeGradient)"
            strokeWidth="14"
            strokeLinecap="round"
          />
          
          {/* Tick marks */}
          {[0, 25, 50, 75, 100].map((tick, i) => {
            const angle = ((tick / 100) * 180 - 90) * (Math.PI / 180);
            const x1 = 100 + 65 * Math.cos(angle);
            const y1 = 95 + 65 * Math.sin(angle);
            const x2 = 100 + 75 * Math.cos(angle);
            const y2 = 95 + 75 * Math.sin(angle);
            return (
              <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#64748b" strokeWidth="2" />
            );
          })}
          
          {/* Needle */}
          <line
            x1="100"
            y1="95"
            x2="100"
            y2="35"
            stroke={color}
            strokeWidth="3"
            strokeLinecap="round"
            transform={`rotate(${rotation}, 100, 95)`}
            style={{ transition: 'transform 0.5s ease-out' }}
          />
          
          {/* Center circle */}
          <circle cx="100" cy="95" r="10" fill={color} />
          <circle cx="100" cy="95" r="5" fill="#1e293b" />
        </svg>
      </div>
      
      {/* Score and regime */}
      <div className="text-center">
        <div className="text-4xl font-bold text-white mb-1">{data.score.toFixed(1)}</div>
        <div className="flex items-center justify-center gap-2">
          <span className="text-2xl">{regimeEmoji[data.regime]}</span>
          <span className="text-lg font-semibold capitalize" style={{ color }}>
            {data.regime.replace('_', ' ')}
          </span>
        </div>
        <p className="text-slate-400 text-sm mt-2 max-w-xs mx-auto">
          {regimeDescriptions[data.regime]}
        </p>
      </div>
      
      {/* Additional stats */}
      <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-slate-700">
        <div className="text-center">
          <div className="text-lg font-bold text-white">{data.percentile || 65}%</div>
          <div className="text-slate-500 text-xs">1Y Percentile</div>
        </div>
        <div className="text-center">
          <div className={`text-lg font-bold ${(data.change7d || 0) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {(data.change7d || 0) >= 0 ? '+' : ''}{(data.change7d || -2.3).toFixed(1)}
          </div>
          <div className="text-slate-500 text-xs">7D Change</div>
        </div>
      </div>
    </div>
  );
}
