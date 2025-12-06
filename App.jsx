import React, { useState, useEffect } from 'react';
import { generateFOMOData, geoData, trendingTickers, insiderClusters, convergenceData, gameScenarios, getRandomMarketNews } from './data/mockData';
import FOMOGauge from './components/FOMOGauge';
import GeoRiskMap from './components/GeoRiskMap';
import TrendingTable from './components/TrendingTable';
import InsiderPanel from './components/InsiderPanel';
import ConvergencePanel from './components/ConvergencePanel';
import LossAversionGame from './components/LossAversionGame';
import Header from './components/Header';
import Footer from './components/Footer';

export default function App() {
  const [view, setView] = useState('dashboard');
  const [fomo, setFomo] = useState(generateFOMOData());
  const [selectedTicker, setSelectedTicker] = useState('NVDA');
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [showGame, setShowGame] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [news, setNews] = useState(getRandomMarketNews());

  useEffect(() => {
    const interval = setInterval(() => {
      setFomo(generateFOMOData());
      setLastUpdate(new Date());
      setNews(getRandomMarketNews());
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const globalRisk = geoData.reduce((s, c) => s + c.risk, 0) / geoData.length;
  const highRiskCount = geoData.filter(c => c.risk > 50).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900">
      {showGame && <LossAversionGame scenarios={gameScenarios} onClose={() => setShowGame(false)} />}
      
      <Header view={view} setView={setView} onGameClick={() => setShowGame(true)} />

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Top Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <StatCard 
            label="Market Regime" 
            value={
              <span className="flex items-center gap-2">
                {fomo.regime === 'extreme_greed' ? '🤑' : fomo.regime === 'greed' ? '😏' : fomo.regime === 'fear' ? '😟' : fomo.regime === 'extreme_fear' ? '😨' : '😐'}
                <span className="capitalize">{fomo.regime.replace('_', ' ')}</span>
              </span>
            }
          />
          <StatCard 
            label="FOMO Index"
            value={fomo.score.toFixed(1)}
            change={fomo.change24h}
          />
          <StatCard 
            label="Global Risk"
            value={globalRisk.toFixed(1)}
            subtitle={`${highRiskCount} hotspots`}
          />
          <StatCard 
            label="Top Hotspot"
            value={<span className="text-red-400">🔥 {geoData[0].country}</span>}
            subtitle={`Risk: ${geoData[0].risk}`}
          />
        </div>

        {/* News Ticker */}
        <div className="bg-slate-800/40 rounded-lg p-3 mb-6 overflow-hidden">
          <div className="flex gap-8 animate-marquee">
            {news.map((item, i) => (
              <span key={i} className="flex items-center gap-2 whitespace-nowrap text-sm">
                <span className={item.impact === 'positive' ? 'text-green-400' : item.impact === 'negative' ? 'text-red-400' : 'text-yellow-400'}>●</span>
                <span className="text-slate-300">{item.text}</span>
                <span className="text-slate-500">{item.time}</span>
              </span>
            ))}
          </div>
        </div>

        {view === 'dashboard' && (
          <DashboardView 
            fomo={fomo}
            geoData={geoData}
            trendingTickers={trendingTickers}
            insiderClusters={insiderClusters}
            onTickerSelect={(t) => { setSelectedTicker(t); setView('analyze'); }}
            onCountrySelect={setSelectedCountry}
          />
        )}

        {view === 'analyze' && (
          <AnalyzeView 
            selectedTicker={selectedTicker}
            setSelectedTicker={setSelectedTicker}
            convergenceData={convergenceData}
            trendingTickers={trendingTickers}
          />
        )}

        {view === 'risk' && (
          <RiskView 
            geoData={geoData}
            selectedCountry={selectedCountry}
            setSelectedCountry={setSelectedCountry}
          />
        )}

        {view === 'sentiment' && (
          <SentimentView 
            fomo={fomo}
            trendingTickers={trendingTickers}
          />
        )}
      </main>

      <Footer lastUpdate={lastUpdate} />
    </div>
  );
}

// Stat Card Component
function StatCard({ label, value, change, subtitle }) {
  return (
    <div className="bg-slate-800/60 rounded-xl p-4 border border-slate-700 hover:border-purple-500/50 transition-all">
      <div className="text-slate-400 text-sm mb-1">{label}</div>
      <div className="text-xl font-bold text-white flex items-baseline gap-2">
        {value}
        {change !== undefined && (
          <span className={`text-sm ${change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {change >= 0 ? '+' : ''}{change.toFixed(1)}
          </span>
        )}
      </div>
      {subtitle && <div className="text-slate-500 text-xs mt-1">{subtitle}</div>}
    </div>
  );
}

// Dashboard View
function DashboardView({ fomo, geoData, trendingTickers, insiderClusters, onTickerSelect, onCountrySelect }) {
  return (
    <div className="grid lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <FOMOGauge data={fomo} />
          <InsiderPanel data={insiderClusters} />
        </div>
        <TrendingTable data={trendingTickers} onSelect={onTickerSelect} />
      </div>
      <div>
        <GeoRiskMap data={geoData} onSelect={onCountrySelect} />
      </div>
    </div>
  );
}

// Analyze View
function AnalyzeView({ selectedTicker, setSelectedTicker, convergenceData, trendingTickers }) {
  const availableTickers = Object.keys(convergenceData);
  
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {availableTickers.map(t => (
          <button
            key={t}
            onClick={() => setSelectedTicker(t)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              selectedTicker === t 
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/25' 
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            ${t}
          </button>
        ))}
      </div>
      
      {convergenceData[selectedTicker] && (
        <ConvergencePanel ticker={selectedTicker} data={convergenceData[selectedTicker]} />
      )}
      
      {/* Quick comparison */}
      <div className="bg-slate-800/80 rounded-2xl p-6 border border-slate-700">
        <h3 className="text-lg font-semibold text-white mb-4">📊 Quick Comparison</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-slate-400 text-sm border-b border-slate-700">
                <th className="text-left pb-3">Ticker</th>
                <th className="text-center pb-3">Type</th>
                <th className="text-center pb-3">Signal</th>
                <th className="text-center pb-3">Convergence</th>
                <th className="text-center pb-3">Confidence</th>
              </tr>
            </thead>
            <tbody>
              {availableTickers.map(t => {
                const d = convergenceData[t];
                return (
                  <tr 
                    key={t} 
                    onClick={() => setSelectedTicker(t)}
                    className={`border-b border-slate-700/50 cursor-pointer transition-all ${selectedTicker === t ? 'bg-purple-900/20' : 'hover:bg-slate-700/30'}`}
                  >
                    <td className="py-3 font-bold text-white">${t}</td>
                    <td className="py-3 text-center">
                      <span className="text-xs px-2 py-1 rounded bg-slate-700 text-slate-300">
                        {d.type.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="py-3 text-center">
                      <span className={`font-semibold ${d.signal === 'bullish' ? 'text-green-400' : d.signal === 'bearish' ? 'text-red-400' : 'text-yellow-400'}`}>
                        {d.signal === 'bullish' ? '↑' : d.signal === 'bearish' ? '↓' : '→'} {d.signal}
                      </span>
                    </td>
                    <td className="py-3 text-center text-white">{(d.score * 100).toFixed(0)}%</td>
                    <td className="py-3 text-center text-slate-300">{(d.confidence * 100).toFixed(0)}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Risk View
function RiskView({ geoData, selectedCountry, setSelectedCountry }) {
  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <GeoRiskMap data={geoData} onSelect={setSelectedCountry} />
      
      <div className="bg-slate-800/80 rounded-2xl p-6 border border-slate-700">
        <h3 className="text-lg font-semibold text-white mb-4">
          {selectedCountry ? `🔍 ${selectedCountry.country} Details` : '👆 Select a Country'}
        </h3>
        
        {selectedCountry ? (
          <div className="space-y-6">
            <div className="flex items-center gap-6">
              <div className={`text-6xl font-bold ${selectedCountry.risk > 65 ? 'text-red-400' : selectedCountry.risk > 45 ? 'text-orange-400' : 'text-green-400'}`}>
                {selectedCountry.risk}
              </div>
              <div>
                <div className="text-white font-semibold text-xl">Risk Score</div>
                <div className={`capitalize ${selectedCountry.level === 'high' ? 'text-red-400' : selectedCountry.level === 'medium' ? 'text-orange-400' : 'text-green-400'}`}>
                  {selectedCountry.level} risk level
                </div>
                <div className="text-slate-400 text-sm mt-1">
                  Trend: <span className={selectedCountry.trend === 'rising' ? 'text-red-400' : selectedCountry.trend === 'falling' ? 'text-green-400' : 'text-slate-300'}>
                    {selectedCountry.trend === 'rising' ? '↑' : selectedCountry.trend === 'falling' ? '↓' : '→'} {selectedCountry.trend}
                  </span>
                </div>
              </div>
            </div>
            
            <div>
              <div className="text-slate-400 text-sm mb-2">Affected Assets</div>
              <div className="flex flex-wrap gap-2">
                {selectedCountry.assets.map(a => (
                  <span key={a} className="px-3 py-1.5 bg-slate-700/70 hover:bg-slate-600 rounded-full text-white text-sm cursor-pointer transition-colors">
                    {a}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-700/30 rounded-lg p-4">
                <div className="text-2xl font-bold text-white">{selectedCountry.articles}</div>
                <div className="text-slate-400 text-sm">Articles (48h)</div>
              </div>
              <div className="bg-slate-700/30 rounded-lg p-4">
                <div className="text-2xl font-bold text-white">{selectedCountry.assets.length}</div>
                <div className="text-slate-400 text-sm">Assets Exposed</div>
              </div>
            </div>
            
            <div className="bg-slate-700/30 rounded-lg p-4">
              <div className="text-slate-400 text-sm mb-2">Risk Assessment</div>
              <p className="text-slate-300 text-sm">
                {selectedCountry.risk > 65 
                  ? `High geopolitical risk in ${selectedCountry.country}. Consider reducing exposure to affected assets or implementing hedges.`
                  : selectedCountry.risk > 45
                  ? `Moderate risk levels in ${selectedCountry.country}. Monitor situation closely but no immediate action required.`
                  : `Low risk environment in ${selectedCountry.country}. Normal exposure levels appropriate.`
                }
              </p>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🌍</div>
            <p className="text-slate-400">Click on a country in the risk map to see detailed analysis and affected assets.</p>
          </div>
        )}
      </div>
    </div>
  );
}

// Sentiment View
function SentimentView({ fomo, trendingTickers }) {
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <FOMOGauge data={fomo} />
        
        <div className="bg-slate-800/80 rounded-2xl p-6 border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4">📊 FOMO Components</h3>
          <div className="space-y-4">
            {Object.entries(fomo.components).map(([key, value]) => (
              <div key={key}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-400 capitalize">{key.replace('_', ' ')}</span>
                  <span className="text-white font-medium">{value.toFixed(1)}</span>
                </div>
                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-500"
                    style={{ 
                      width: `${value}%`,
                      background: value > 70 ? '#ef4444' : value > 50 ? '#f97316' : value > 30 ? '#fbbf24' : '#22c55e'
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="bg-slate-800/80 rounded-2xl p-6 border border-slate-700">
        <h3 className="text-lg font-semibold text-white mb-4">🔥 Sentiment Heatmap</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {trendingTickers.slice(0, 8).map(t => (
            <div 
              key={t.ticker}
              className={`p-4 rounded-xl text-center transition-all hover:scale-105 cursor-pointer ${
                t.sentiment > 0.5 ? 'bg-green-900/40 border border-green-500/30' :
                t.sentiment > 0.2 ? 'bg-green-900/20 border border-green-500/20' :
                t.sentiment > -0.2 ? 'bg-yellow-900/20 border border-yellow-500/20' :
                t.sentiment > -0.5 ? 'bg-red-900/20 border border-red-500/20' :
                'bg-red-900/40 border border-red-500/30'
              }`}
            >
              <div className="text-xl font-bold text-white">${t.ticker}</div>
              <div className={`text-2xl font-bold ${t.sentiment > 0 ? 'text-green-400' : 'text-red-400'}`}>
                {t.sentiment > 0 ? '+' : ''}{(t.sentiment * 100).toFixed(0)}%
              </div>
              <div className="text-slate-400 text-sm">{t.mentions} mentions</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
