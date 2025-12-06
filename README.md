# 🌐 Global Alpha Radar

**Multi-Layer Market Intelligence System**

A sophisticated financial analytics dashboard that tracks the collision of three market forces: **geopolitics**, **institutional behavior**, and **crowd psychology**. Most tools track one layer—this tracks all three simultaneously and identifies convergence points.

![Global Alpha Radar Screenshot](./screenshot.png)

## 🎯 Live Demo

[**View Live Demo →**](https://yourusername.github.io/global-alpha-radar)

## ✨ Features

### 📊 Dashboard
- **FOMO Index Gauge** - Real-time composite indicator of retail investor euphoria/fear
- **Geopolitical Risk Heatmap** - Track global hotspots and their impact on assets
- **Trending Tickers** - Social sentiment analysis from Reddit, Twitter, and more
- **Insider Clusters** - Detect when multiple executives are buying or selling

### 🎯 Convergence Analysis
The "secret sauce" - find where all three layers align:
- **🟢 RISK ON** - All signals positive, favorable entry
- **🔴 RISK OFF** - All signals negative, avoid
- **⚠️ DANGER ZONE** - Smart money out, retail in, macro stress
- **🎯 CONTRARIAN BUY** - Fear peaked, insiders buying
- **👁️ INFORMED EDGE** - Insiders moving ahead of crowd
- **🎈 BUBBLE WARNING** - Pure speculation, no fundamental support

### 🌍 Risk Monitor
- Country-by-country geopolitical risk scores
- Affected asset mapping (tickers, commodities, currencies)
- Real-time news velocity tracking
- Trend indicators (rising/falling/stable)

### 🧠 Behavioral Finance
- FOMO Index components breakdown
- Sentiment heatmaps
- **Loss Aversion Simulator** - Interactive game to test your trading psychology

## 🏗️ Architecture

### Three Layers

1. **Macro Layer** (Geopolitical Risk Engine)
   - GDELT news analysis
   - Country risk scoring
   - Currency crisis early warning
   - Sanctions tracking

2. **Market Layer** (Microstructure Signals)
   - SEC Form 4 insider filings
   - Insider conviction scoring
   - Cluster detection (multiple insiders same week)
   - Analyst herding detector

3. **Behavioral Layer** (Sentiment Engine)
   - Reddit sentiment (WSB, r/stocks, r/investing)
   - FOMO Index composite
   - Loss aversion profiling
   - Crowd psychology indicators

### Convergence Engine
Weighted composite of all layers that identifies:
- Multi-signal alignment opportunities
- Regime classification (risk-on/risk-off)
- Sector tilts and specific ticker alerts

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/global-alpha-radar.git
cd global-alpha-radar

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

### Deploy to GitHub Pages

```bash
# Install gh-pages
npm install --save-dev gh-pages

# Add to package.json scripts:
# "predeploy": "npm run build",
# "deploy": "gh-pages -d dist"

# Deploy
npm run deploy
```

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite
- **Styling**: Tailwind CSS
- **State**: React Hooks
- **Charts**: Custom SVG components
- **Deployment**: GitHub Pages / Vercel

## 📁 Project Structure

```
global-alpha-radar/
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── FOMOGauge.jsx
│   │   ├── GeoRiskMap.jsx
│   │   ├── TrendingTable.jsx
│   │   ├── InsiderPanel.jsx
│   │   ├── ConvergencePanel.jsx
│   │   └── LossAversionGame.jsx
│   ├── data/
│   │   └── mockData.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── public/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## 🎮 Loss Aversion Simulator

An interactive behavioral finance game that tests your trading psychology through realistic market scenarios:

1. **Flash Crash** - Test panic resistance
2. **Slow Bleed** - Evaluate loss-cutting discipline  
3. **FOMO Rally** - Measure fear of missing out
4. **Winner's Dilemma** - Assess profit-taking behavior
5. **Earnings Roulette** - Evaluate reaction to news

Get your personalized investor profile:
- **Disciplined Strategist** (80%+)
- **Balanced Trader** (60-79%)
- **Emotional Reactor** (40-59%)
- **Panic Trader** (<40%)

## 📈 Future Roadmap

- [ ] Real-time data integration (SEC EDGAR, Reddit API, GDELT)
- [ ] User accounts and watchlists
- [ ] Custom alerts and notifications
- [ ] Mobile app (React Native)
- [ ] API for programmatic access
- [ ] Backtesting convergence signals

## 👤 Author

**Matin Saiyed**
- CFA Level I Candidate
- Licensed Mutual Fund Representative (CIFC, Ontario)
- [LinkedIn](https://linkedin.com/in/matinsaiyed)

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

## 🙏 Acknowledgments

- Financial data concepts inspired by behavioral finance research
- UI design influenced by modern fintech dashboards
- Built with ❤️ for the finance community

---

**Disclaimer**: This is a portfolio project for educational purposes. Not financial advice. Always do your own research before making investment decisions.
