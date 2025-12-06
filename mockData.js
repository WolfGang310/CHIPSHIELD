// Mock data for Global Alpha Radar

export const generateFOMOData = () => ({
  score: 58 + Math.random() * 20,
  regime: ['fear', 'neutral', 'greed', 'extreme_greed'][Math.floor(Math.random() * 4)],
  change24h: (Math.random() - 0.5) * 10,
  change7d: (Math.random() - 0.5) * 15,
  percentile: Math.floor(60 + Math.random() * 30),
  components: {
    social_sentiment: 55 + Math.random() * 30,
    search_trends: 45 + Math.random() * 25,
    options_speculation: 50 + Math.random() * 35,
    meme_stock_volume: 40 + Math.random() * 40,
    retail_flow: 50 + Math.random() * 25,
  }
});

export const geoData = [
  { country: "Taiwan", code: "TW", risk: 72, level: "high", assets: ["TSM", "NVDA", "semiconductors"], articles: 34, trend: "rising" },
  { country: "Russia", code: "RU", risk: 68, level: "high", assets: ["wheat", "natural_gas", "oil", "palladium"], articles: 56, trend: "stable" },
  { country: "Israel", code: "IL", risk: 61, level: "medium", assets: ["oil", "defense", "tech"], articles: 41, trend: "rising" },
  { country: "China", code: "CN", risk: 48, level: "medium", assets: ["BABA", "JD", "rare_earths", "manufacturing"], articles: 89, trend: "stable" },
  { country: "Turkey", code: "TR", risk: 44, level: "medium", assets: ["TRY", "emerging_markets"], articles: 23, trend: "falling" },
  { country: "Argentina", code: "AR", risk: 52, level: "medium", assets: ["ARS", "soybeans", "lithium"], articles: 18, trend: "rising" },
  { country: "Brazil", code: "BR", risk: 28, level: "low", assets: ["BRL", "iron_ore", "EWZ", "soybeans"], articles: 31, trend: "stable" },
  { country: "India", code: "IN", risk: 22, level: "low", assets: ["INR", "tech_services", "pharma"], articles: 45, trend: "falling" },
  { country: "South Africa", code: "ZA", risk: 38, level: "low", assets: ["ZAR", "gold", "platinum"], articles: 15, trend: "stable" },
  { country: "Mexico", code: "MX", risk: 31, level: "low", assets: ["MXN", "manufacturing", "oil"], articles: 22, trend: "stable" },
];

export const trendingTickers = [
  { ticker: "NVDA", mentions: 847, sentiment: 0.72, signal: "bullish", change: 3.2, volume: "high" },
  { ticker: "TSLA", mentions: 623, sentiment: 0.18, signal: "neutral", change: -1.4, volume: "high" },
  { ticker: "GME", mentions: 412, sentiment: 0.45, signal: "bullish", change: 8.7, volume: "extreme" },
  { ticker: "SPY", mentions: 389, sentiment: -0.12, signal: "neutral", change: 0.3, volume: "normal" },
  { ticker: "AMD", mentions: 301, sentiment: 0.58, signal: "bullish", change: 2.1, volume: "high" },
  { ticker: "AAPL", mentions: 278, sentiment: 0.35, signal: "bullish", change: 0.8, volume: "normal" },
  { ticker: "PLTR", mentions: 245, sentiment: 0.62, signal: "bullish", change: 4.5, volume: "high" },
  { ticker: "META", mentions: 198, sentiment: 0.41, signal: "bullish", change: 1.9, volume: "normal" },
  { ticker: "AMZN", mentions: 176, sentiment: 0.28, signal: "neutral", change: 0.5, volume: "normal" },
  { ticker: "MSFT", mentions: 165, sentiment: 0.33, signal: "bullish", change: 1.1, volume: "normal" },
];

export const insiderClusters = [
  { ticker: "NVDA", insiders: 4, direction: "buy", value: 2450000, conviction: 8.2, names: ["Jensen Huang (CEO)", "Colette Kress (CFO)", "Ajay Puri (EVP)", "Debora Shoquist (EVP)"], date: "2 days ago" },
  { ticker: "META", insiders: 3, direction: "buy", value: 1890000, conviction: 7.1, names: ["Mark Zuckerberg (CEO)", "Susan Li (CFO)", "Javier Olivan (COO)"], date: "3 days ago" },
  { ticker: "TSLA", insiders: 5, direction: "sell", value: 12500000, conviction: -6.8, names: ["Elon Musk (CEO)", "Zachary Kirkhorn (CFO)", "Andrew Baglino (SVP)", "Tom Zhu (SVP)", "Vaibhav Taneja (CAO)"], date: "1 day ago" },
  { ticker: "AAPL", insiders: 2, direction: "buy", value: 890000, conviction: 5.4, names: ["Tim Cook (CEO)", "Luca Maestri (CFO)"], date: "5 days ago" },
  { ticker: "GOOGL", insiders: 2, direction: "sell", value: 3200000, conviction: -4.2, names: ["Sundar Pichai (CEO)", "Ruth Porat (CFO)"], date: "4 days ago" },
];

export const convergenceData = {
  NVDA: {
    type: "risk_on",
    signal: "bullish",
    score: 0.85,
    confidence: 0.78,
    narrative: "🟢 RISK ON: All signals positive for NVDA. Clean macro environment, strong insider buying (4 executives purchased shares last week totaling $2.4M), and overwhelmingly positive social sentiment with 847 mentions.",
    action: "Favorable setup. Standard position sizing appropriate. Consider scaling in on pullbacks.",
    macro: { signal: "bullish", score: 72, drivers: ["Low geopolitical exposure", "Strong sector momentum", "Favorable interest rate environment"] },
    market: { signal: "bullish", score: 81, drivers: ["4 insiders net buying $2.4M", "CEO Jensen Huang purchase", "No recent selling"] },
    behavioral: { signal: "bullish", score: 78, drivers: ["847 social mentions (24h)", "72% bullish sentiment", "High conviction DD posts"] }
  },
  TSLA: {
    type: "divergence",
    signal: "neutral",
    score: 0.35,
    confidence: 0.52,
    narrative: "⚖️ MIXED SIGNALS: TSLA shows conflicting signals across layers. Heavy insider selling ($12.5M from 5 executives) contradicts moderate retail optimism. China exposure adds macro uncertainty.",
    action: "Wait for clarity. Signals may align soon. Avoid new positions until convergence improves.",
    macro: { signal: "neutral", score: 50, drivers: ["Moderate China exposure", "EV competition intensifying", "Regulatory uncertainty"] },
    market: { signal: "bearish", score: 28, drivers: ["5 insiders selling $12.5M", "CEO reducing stake", "Consistent selling pattern"] },
    behavioral: { signal: "neutral", score: 55, drivers: ["Mixed sentiment", "623 mentions but divided opinion", "Cult following vs skeptics"] }
  },
  GME: {
    type: "bubble_warning",
    signal: "neutral",
    score: 0.42,
    confidence: 0.61,
    narrative: "🎈 BUBBLE WARNING: GME driven by speculation with limited fundamental support. No insider conviction (zero purchases), but elevated retail enthusiasm continues. Classic retail vs institutional divergence.",
    action: "High risk trade. If participating, size very small and set tight stops. Not suitable for core portfolio.",
    macro: { signal: "neutral", score: 50, drivers: ["No significant macro exposure", "Retail-focused business"] },
    market: { signal: "neutral", score: 45, drivers: ["No recent insider activity", "Institutional ownership declining", "High short interest"] },
    behavioral: { signal: "bullish", score: 72, drivers: ["Strong Reddit presence", "412 mentions with meme energy", "YOLO culture driving volume"] }
  },
  AAPL: {
    type: "risk_on",
    signal: "bullish",
    score: 0.72,
    confidence: 0.68,
    narrative: "🟢 RISK ON: AAPL shows solid fundamentals across all layers. Insider confidence (Tim Cook buying), stable sentiment, and manageable macro exposure despite China manufacturing dependency.",
    action: "Core holding quality. Add on dips. Suitable for long-term positions.",
    macro: { signal: "bullish", score: 65, drivers: ["Diversifying supply chain", "Strong balance sheet", "Services growth"] },
    market: { signal: "bullish", score: 71, drivers: ["CEO Tim Cook buying $890K", "Consistent insider confidence", "Low selling activity"] },
    behavioral: { signal: "bullish", score: 68, drivers: ["Steady positive sentiment", "278 quality mentions", "Loyal investor base"] }
  },
  SPY: {
    type: "transitional",
    signal: "neutral",
    score: 0.55,
    confidence: 0.62,
    narrative: "🔄 TRANSITIONAL: Broad market (SPY) at crossroads. Elevated geopolitical risks globally balanced against resilient economic data. Sentiment near neutral suggests market awaiting catalyst.",
    action: "Maintain current allocation. Not ideal for aggressive positioning in either direction.",
    macro: { signal: "neutral", score: 52, drivers: ["Elevated geo risks globally", "Fed policy uncertainty", "Mixed economic signals"] },
    market: { signal: "neutral", score: 50, drivers: ["Balanced institutional flow", "Normal rebalancing activity"] },
    behavioral: { signal: "neutral", score: 48, drivers: ["Sentiment near neutral", "389 mentions with mixed tone", "Awaiting direction"] }
  },
  AMD: {
    type: "risk_on",
    signal: "bullish",
    score: 0.74,
    confidence: 0.71,
    narrative: "🟢 RISK ON: AMD benefits from semiconductor tailwinds. Positive sentiment, moderate insider activity, and AI demand driving interest. Taiwan exposure is a risk factor to monitor.",
    action: "Favorable entry. Consider as NVDA alternative with similar AI exposure.",
    macro: { signal: "neutral", score: 58, drivers: ["Taiwan supply chain exposure", "AI demand tailwind", "Competition with NVDA/INTC"] },
    market: { signal: "bullish", score: 68, drivers: ["Moderate insider buying", "Institutional accumulation"] },
    behavioral: { signal: "bullish", score: 75, drivers: ["301 bullish mentions", "58% positive sentiment", "AI narrative support"] }
  },
  PLTR: {
    type: "informed_edge",
    signal: "bullish",
    score: 0.68,
    confidence: 0.64,
    narrative: "👁️ INFORMED EDGE: PLTR shows insider activity ahead of crowd recognition. Government contract momentum building. Sentiment bullish but not yet extreme.",
    action: "Monitor closely. Insiders may see catalysts before public. Consider scaled entry.",
    macro: { signal: "bullish", score: 62, drivers: ["Government spending tailwind", "Defense sector strength", "AI/data analytics demand"] },
    market: { signal: "bullish", score: 71, drivers: ["Insider buying pattern", "CEO maintaining stake", "Institutional interest growing"] },
    behavioral: { signal: "bullish", score: 70, drivers: ["245 engaged mentions", "62% bullish", "Growing retail interest"] }
  },
  META: {
    type: "risk_on",
    signal: "bullish",
    score: 0.76,
    confidence: 0.72,
    narrative: "🟢 RISK ON: META showing strong convergence. Zuckerberg and team buying shares ($1.9M), positive sentiment on AI and efficiency initiatives, limited macro concerns.",
    action: "Favorable setup. Year of efficiency narrative supporting multiple expansion.",
    macro: { signal: "bullish", score: 68, drivers: ["Digital advertising recovery", "Cost cutting success", "AI investment paying off"] },
    market: { signal: "bullish", score: 77, drivers: ["3 insiders buying $1.9M", "CEO confidence", "Buyback program active"] },
    behavioral: { signal: "bullish", score: 72, drivers: ["198 positive mentions", "41% bullish sentiment", "Narrative shift positive"] }
  },
};

export const gameScenarios = [
  {
    id: 1,
    name: "Flash Crash",
    description: "Your portfolio just dropped 8% in 30 minutes due to a market-wide flash crash. Headlines are panicking about a potential recession.",
    loss: -8,
    options: [
      { text: "Sell everything immediately to protect remaining capital", action: "panic", rational: false },
      { text: "Hold steady and wait for more information", action: "hold", rational: true },
      { text: "Buy more - this looks like an overreaction", action: "buy", rational: true }
    ],
    results: {
      panic: { text: "Market recovered 7% by end of day. You locked in losses and missed the recovery. Flash crashes typically reverse quickly.", score: -2 },
      hold: { text: "Market recovered fully within 2 hours. Your patience was rewarded.", score: 1 },
      buy: { text: "You bought near the bottom. Position up 12% by end of week. Great contrarian instinct.", score: 2 }
    }
  },
  {
    id: 2,
    name: "Slow Bleed",
    description: "Your favorite stock has been dropping 2% every week for 6 weeks straight. Down 12% total. No specific news, just persistent selling pressure.",
    loss: -12,
    options: [
      { text: "Cut losses now before it gets worse", action: "sell", rational: true },
      { text: "Hold - it has to bounce back eventually", action: "hold", rational: false },
      { text: "Average down - buy more at these lower prices", action: "avg", rational: false }
    ],
    results: {
      sell: { text: "Stock continued falling another 20% over next month. Cutting losses early saved significant capital.", score: 2 },
      hold: { text: "Stock fell another 20% before finally stabilizing. Hope is not a strategy.", score: -1 },
      avg: { text: "Caught a falling knife. Position now down 25% with larger size. Averaging down without catalyst is dangerous.", score: -2 }
    }
  },
  {
    id: 3,
    name: "FOMO Rally",
    description: "A stock you've been watching just jumped 40% in one day on no news. Social media is exploding with rocket emojis and moon predictions.",
    loss: 0,
    options: [
      { text: "Buy now before it goes even higher!", action: "fomo", rational: false },
      { text: "Wait for a pullback before considering entry", action: "wait", rational: true },
      { text: "Ignore it - you missed the move", action: "ignore", rational: true }
    ],
    results: {
      fomo: { text: "Stock dropped 25% next week as early buyers took profits. You bought the top. FOMO is a trap.", score: -2 },
      wait: { text: "Stock pulled back 15% over next week. If you still wanted in, much better entry available.", score: 1 },
      ignore: { text: "Stock eventually fell below its original price. Missing one move doesn't mean you missed forever.", score: 1 }
    }
  },
  {
    id: 4,
    name: "Winner's Dilemma",
    description: "Your stock is up 50% in 3 months. You feel the urge to sell and lock in gains, but it keeps going up.",
    loss: 50,
    options: [
      { text: "Sell everything - take profits while you can", action: "sell", rational: false },
      { text: "Sell half - lock in some gains, let rest ride", action: "half", rational: true },
      { text: "Hold everything - let winners run", action: "hold", rational: true }
    ],
    results: {
      sell: { text: "Stock went up another 40% over next quarter. You left significant gains on the table by selling the whole position.", score: 0 },
      half: { text: "Balanced approach. Captured some profits while maintaining upside exposure. Stock continued higher.", score: 1 },
      hold: { text: "Stock continued climbing to +100% gain. Discipline to hold winners is rare and valuable.", score: 2 }
    }
  },
  {
    id: 5,
    name: "Earnings Roulette",
    description: "Company reports earnings tonight. Beat estimates but stock drops 10% on 'sell the news' reaction. Fundamentals look strong.",
    loss: -10,
    options: [
      { text: "Sell - the market knows something I don't", action: "sell", rational: false },
      { text: "Hold - fundamentals justify the price", action: "hold", rational: true },
      { text: "Buy more - this is an overreaction to good news", action: "buy", rational: true }
    ],
    results: {
      sell: { text: "Stock recovered and rallied 15% over next month as analysts upgraded. Knee-jerk selling on good earnings is usually wrong.", score: -1 },
      hold: { text: "Stock recovered fully in 2 weeks. Patience with quality companies pays off.", score: 1 },
      buy: { text: "Great entry on temporary weakness. Position up 20% within a month.", score: 2 }
    }
  }
];

export const getRandomMarketNews = () => {
  const headlines = [
    { text: "Fed signals potential rate pause at next meeting", impact: "neutral", time: "2h ago" },
    { text: "Tech sector leads market higher on AI optimism", impact: "positive", time: "4h ago" },
    { text: "Geopolitical tensions rise in Taiwan Strait", impact: "negative", time: "1h ago" },
    { text: "Retail sales beat expectations, consumer strong", impact: "positive", time: "3h ago" },
    { text: "Oil prices surge on OPEC+ production cuts", impact: "mixed", time: "5h ago" },
    { text: "Major bank upgrades semiconductor sector", impact: "positive", time: "6h ago" },
    { text: "Inflation data comes in hotter than expected", impact: "negative", time: "30m ago" },
    { text: "Corporate earnings season off to strong start", impact: "positive", time: "2h ago" },
  ];
  return headlines.slice(0, 4);
};
