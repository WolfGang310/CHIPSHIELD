import React from 'react';

export default function GeoRiskMap({ data, onSelect }) {
  const sortedData = [...data].sort((a, b) => b.risk - a.risk);
  
  const getRiskColor = (risk) => {
    if (risk > 65) return { bg: 'bg-red-500', text: 'text-red-400', bar: '#ef4444' };
    if (risk > 45) return { bg: 'bg-orange-500', text: 'text-orange-400', bar: '#f97316' };
    return { bg: 'bg-green-500', text: 'text-green-400', bar: '#22c55e' };
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'rising': return <span className="text-red-400">↑</span>;
      case 'falling': return <span className="text-green-400">↓</span>;
      default: return <span className="text-slate-400">→</span>;
    }
  };

  return (
    <div className="bg-slate-800/80 rounded-2xl p-6 border border-slate-700">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-white">🌍 Geopolitical Risk</h3>
        <div className="flex items-center gap-3 text-xs text-slate-400">
          <span className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-500 rounded-full" /> Low
          </span>
          <span className="flex items-center gap-1">
            <div className="w-2 h-2 bg-orange-500 rounded-full" /> Medium
          </span>
          <span className="flex items-center gap-1">
            <div className="w-2 h-2 bg-red-500 rounded-full" /> High
          </span>
        </div>
      </div>
      
      <div className="space-y-2">
        {sortedData.map((country) => {
          const colors = getRiskColor(country.risk);
          
          return (
            <div
              key={country.code}
              onClick={() => onSelect(country)}
              className="flex items-center gap-3 p-3 rounded-lg bg-slate-700/50 hover:bg-slate-700 cursor-pointer transition-all group"
            >
              {/* Country name */}
              <div className="w-28 flex items-center gap-2">
                <span className="text-white font-medium group-hover:text-purple-300 transition-colors">
                  {country.country}
                </span>
              </div>
              
              {/* Progress bar */}
              <div className="flex-1 h-3 bg-slate-600 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ 
                    width: `${country.risk}%`,
                    background: colors.bar
                  }}
                />
              </div>
              
              {/* Risk score */}
              <div className={`w-10 text-right font-bold ${colors.text}`}>
                {country.risk}
              </div>
              
              {/* Trend */}
              <div className="w-6 text-center">
                {getTrendIcon(country.trend)}
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Summary */}
      <div className="mt-4 pt-4 border-t border-slate-700 grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="text-xl font-bold text-red-400">
            {data.filter(c => c.risk > 65).length}
          </div>
          <div className="text-slate-500 text-xs">High Risk</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-bold text-orange-400">
            {data.filter(c => c.risk > 45 && c.risk <= 65).length}
          </div>
          <div className="text-slate-500 text-xs">Medium Risk</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-bold text-green-400">
            {data.filter(c => c.risk <= 45).length}
          </div>
          <div className="text-slate-500 text-xs">Low Risk</div>
        </div>
      </div>
    </div>
  );
}
