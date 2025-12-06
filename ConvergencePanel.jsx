import React from 'react';

export default function ConvergencePanel({ ticker, data }) {
  if (!data) return null;

  const typeConfig = {
    risk_on: { gradient: 'from-green-600 to-emerald-600', emoji: '🟢', label: 'RISK ON' },
    risk_off: { gradient: 'from-red-600 to-rose-600', emoji: '🔴', label: 'RISK OFF' },
    danger_zone: { gradient: 'from-red-600 to-orange-600', emoji: '⚠️', label: 'DANGER ZONE' },
    contrarian_buy: { gradient: 'from-emerald-600 to-teal-600', emoji: '🎯', label: 'CONTRARIAN BUY' },
    bubble_warning: { gradient: 'from-orange-500 to-yellow-500', emoji: '🎈', label: 'BUBBLE WARNING' },
    informed_edge: { gradient: 'from-purple-600 to-indigo-600', emoji: '👁️', label: 'INFORMED EDGE' },
    divergence: { gradient: 'from-slate-500 to-slate-600', emoji: '⚖️', label: 'DIVERGENCE' },
    transitional: { gradient: 'from-blue-600 to-indigo-600', emoji: '🔄', label: 'TRANSITIONAL' },
  };

  const config = typeConfig[data.type] || typeConfig.transitional;

  const getSignalColor = (signal) => {
    switch (signal) {
      case 'bullish': return 'text-green-400';
      case 'bearish': return 'text-red-400';
      default: return 'text-yellow-400';
    }
  };

  const getSignalIcon = (signal) => {
    switch (signal) {
      case 'bullish': return '↑';
      case 'bearish': return '↓';
      default: return '→';
    }
  };

  const layers = [
    { key: 'macro', icon: '🌍', label: 'Macro Layer', data: data.macro },
    { key: 'market', icon: '📈', label: 'Market Layer', data: data.market },
    { key: 'behavioral', icon: '🧠', label: 'Behavioral Layer', data: data.behavioral },
  ];

  return (
    <div className="bg-slate-800/80 rounded-2xl p-6 border border-slate-700">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <h3 className="text-2xl font-bold text-white">🎯 ${ticker}</h3>
          <span className={`px-4 py-1.5 rounded-full text-sm font-semibold bg-gradient-to-r ${config.gradient} text-white shadow-lg`}>
            {config.emoji} {config.label}
          </span>
        </div>
        <div className={`text-2xl font-bold ${getSignalColor(data.signal)}`}>
          {getSignalIcon(data.signal)} {data.signal.toUpperCase()}
        </div>
      </div>

      {/* Narrative */}
      <div className="bg-slate-700/30 rounded-xl p-4 mb-6">
        <p className="text-slate-200 leading-relaxed">{data.narrative}</p>
      </div>

      {/* Action */}
      <div className="bg-purple-900/30 border border-purple-500/30 rounded-xl p-4 mb-6">
        <div className="flex items-center gap-2 text-purple-300">
          <span className="text-lg">→</span>
          <span className="font-medium">{data.action}</span>
        </div>
      </div>

      {/* Scores */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center p-4 bg-slate-700/30 rounded-xl">
          <div className="text-3xl font-bold text-white">{(data.score * 100).toFixed(0)}%</div>
          <div className="text-slate-400 text-sm mt-1">Convergence</div>
          <div className="w-full h-1.5 bg-slate-600 rounded-full mt-2 overflow-hidden">
            <div 
              className="h-full bg-purple-500 rounded-full transition-all" 
              style={{ width: `${data.score * 100}%` }} 
            />
          </div>
        </div>
        <div className="text-center p-4 bg-slate-700/30 rounded-xl">
          <div className="text-3xl font-bold text-white">{(data.confidence * 100).toFixed(0)}%</div>
          <div className="text-slate-400 text-sm mt-1">Confidence</div>
          <div className="w-full h-1.5 bg-slate-600 rounded-full mt-2 overflow-hidden">
            <div 
              className="h-full bg-blue-500 rounded-full transition-all" 
              style={{ width: `${data.confidence * 100}%` }} 
            />
          </div>
        </div>
        <div className="text-center p-4 bg-slate-700/30 rounded-xl">
          <div className={`text-3xl font-bold ${getSignalColor(data.signal)}`}>
            {getSignalIcon(data.signal)}
          </div>
          <div className="text-slate-400 text-sm mt-1">Signal</div>
          <div className={`text-sm font-semibold mt-2 ${getSignalColor(data.signal)}`}>
            {data.signal.toUpperCase()}
          </div>
        </div>
      </div>

      {/* Layer Breakdown */}
      <h4 className="text-lg font-semibold text-white mb-4">Layer Breakdown</h4>
      <div className="space-y-3">
        {layers.map(({ key, icon, label, data: layerData }) => (
          <div key={key} className="flex items-center gap-4 p-4 bg-slate-700/30 rounded-xl hover:bg-slate-700/50 transition-all">
            <span className="text-2xl">{icon}</span>
            
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <span className="text-white font-medium">{label}</span>
                <span className={`font-bold ${getSignalColor(layerData.signal)}`}>
                  {getSignalIcon(layerData.signal)} {layerData.signal.toUpperCase()}
                </span>
              </div>
              
              {layerData.drivers.length > 0 && (
                <div className="text-slate-400 text-sm">
                  {layerData.drivers.slice(0, 2).map((driver, i) => (
                    <span key={i}>
                      {i > 0 && ' • '}
                      {driver}
                    </span>
                  ))}
                </div>
              )}
            </div>
            
            <div className="w-20">
              <div className="text-right text-white font-semibold mb-1">{layerData.score}</div>
              <div className="h-1.5 bg-slate-600 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all ${
                    layerData.signal === 'bullish' ? 'bg-green-500' : 
                    layerData.signal === 'bearish' ? 'bg-red-500' : 
                    'bg-yellow-500'
                  }`}
                  style={{ width: `${layerData.score}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
