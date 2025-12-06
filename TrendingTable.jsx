import React from 'react';

export default function TrendingTable({ data, onSelect }) {
  const getSignalStyle = (signal) => {
    switch (signal) {
      case 'bullish':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'bearish':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    }
  };

  const getVolumeStyle = (volume) => {
    switch (volume) {
      case 'extreme':
        return 'text-purple-400';
      case 'high':
        return 'text-orange-400';
      default:
        return 'text-slate-400';
    }
  };

  return (
    <div className="bg-slate-800/80 rounded-2xl p-6 border border-slate-700">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-white">📊 Trending Tickers</h3>
        <div className="text-slate-400 text-sm">24h social volume</div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-slate-400 text-sm">
              <th className="text-left pb-3 font-medium">Ticker</th>
              <th className="text-right pb-3 font-medium">Mentions</th>
              <th className="text-right pb-3 font-medium">Sentiment</th>
              <th className="text-right pb-3 font-medium">Change</th>
              <th className="text-right pb-3 font-medium">Signal</th>
            </tr>
          </thead>
          <tbody>
            {data.map((ticker, index) => (
              <tr
                key={ticker.ticker}
                onClick={() => onSelect(ticker.ticker)}
                className="border-t border-slate-700 hover:bg-slate-700/50 cursor-pointer transition-all group"
              >
                <td className="py-3">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-500 text-sm w-5">{index + 1}</span>
                    <span className="font-bold text-white group-hover:text-purple-300 transition-colors">
                      ${ticker.ticker}
                    </span>
                  </div>
                </td>
                <td className="py-3 text-right">
                  <span className={`font-medium ${getVolumeStyle(ticker.volume)}`}>
                    {ticker.mentions.toLocaleString()}
                  </span>
                </td>
                <td className="py-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <div className="w-16 h-1.5 bg-slate-600 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${Math.abs(ticker.sentiment) * 100}%`,
                          marginLeft: ticker.sentiment < 0 ? 'auto' : 0,
                          background: ticker.sentiment > 0.3 ? '#22c55e' : ticker.sentiment < -0.3 ? '#ef4444' : '#fbbf24'
                        }}
                      />
                    </div>
                    <span className={`font-medium w-12 text-right ${
                      ticker.sentiment > 0.3 ? 'text-green-400' : 
                      ticker.sentiment < -0.3 ? 'text-red-400' : 
                      'text-yellow-400'
                    }`}>
                      {ticker.sentiment > 0 ? '+' : ''}{ticker.sentiment.toFixed(2)}
                    </span>
                  </div>
                </td>
                <td className="py-3 text-right">
                  <span className={`font-medium ${ticker.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {ticker.change >= 0 ? '+' : ''}{ticker.change.toFixed(1)}%
                  </span>
                </td>
                <td className="py-3 text-right">
                  <span className={`px-2 py-1 rounded text-xs font-semibold border ${getSignalStyle(ticker.signal)}`}>
                    {ticker.signal}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Footer summary */}
      <div className="mt-4 pt-4 border-t border-slate-700 flex justify-between items-center text-sm">
        <div className="text-slate-400">
          Tracking <span className="text-white font-medium">{data.length}</span> tickers
        </div>
        <div className="flex gap-4">
          <span className="text-green-400">
            {data.filter(t => t.signal === 'bullish').length} bullish
          </span>
          <span className="text-yellow-400">
            {data.filter(t => t.signal === 'neutral').length} neutral
          </span>
          <span className="text-red-400">
            {data.filter(t => t.signal === 'bearish').length} bearish
          </span>
        </div>
      </div>
    </div>
  );
}
