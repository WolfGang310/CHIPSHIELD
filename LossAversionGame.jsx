import React, { useState } from 'react';

export default function LossAversionGame({ scenarios, onClose }) {
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [scores, setScores] = useState([]);
  const [complete, setComplete] = useState(false);

  const scenario = scenarios[step];

  const handleSelect = (option) => {
    setSelected(option);
    setShowResult(true);
    setScores([...scores, { 
      rational: option.rational, 
      score: scenario.results[option.action].score,
      action: option.action
    }]);
  };

  const next = () => {
    if (step < scenarios.length - 1) {
      setStep(step + 1);
      setSelected(null);
      setShowResult(false);
    } else {
      setComplete(true);
    }
  };

  const restart = () => {
    setStep(0);
    setSelected(null);
    setShowResult(false);
    setScores([]);
    setComplete(false);
  };

  // Results screen
  if (complete) {
    const totalScore = scores.reduce((s, x) => s + x.score, 0);
    const maxScore = scenarios.length * 2;
    const minScore = scenarios.length * -2;
    const rationalCount = scores.filter(s => s.rational).length;
    const panicCount = scores.filter(s => s.action === 'panic' || s.action === 'fomo').length;
    
    const percentile = Math.round(((totalScore - minScore) / (maxScore - minScore)) * 100);
    
    let investorType, description, emoji;
    if (percentile >= 80) {
      investorType = "Disciplined Strategist";
      description = "You make rational decisions under pressure. You don't let emotions drive your trades. This is a rare skill that separates successful long-term investors from the crowd.";
      emoji = "🏆";
    } else if (percentile >= 60) {
      investorType = "Balanced Trader";
      description = "You generally make sound decisions but occasionally let emotions influence you. With practice, you can develop more consistent discipline.";
      emoji = "⚖️";
    } else if (percentile >= 40) {
      investorType = "Emotional Reactor";
      description = "Fear and greed often influence your decisions. Consider implementing rules-based strategies and checklists to reduce emotional trading.";
      emoji = "😰";
    } else {
      investorType = "Panic Trader";
      description = "High emotional reactivity to market moves. You might benefit from automated investing strategies like dollar-cost averaging to remove emotional decision-making.";
      emoji = "🎢";
    }

    const lossAversionRatio = panicCount > 1 ? 2.5 : panicCount === 1 ? 1.8 : 1.2;

    return (
      <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4 overflow-y-auto">
        <div className="bg-slate-800 rounded-2xl p-8 max-w-lg w-full border border-purple-500/30 shadow-2xl my-8">
          <div className="text-center mb-6">
            <div className="text-6xl mb-4">{emoji}</div>
            <h2 className="text-2xl font-bold text-white mb-2">Your Behavioral Profile</h2>
            <p className="text-slate-400">Based on {scenarios.length} market scenarios</p>
          </div>

          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-6 mb-6">
            <div className="text-2xl font-bold text-white mb-2">{investorType}</div>
            <p className="text-purple-100 text-sm">{description}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-slate-700/50 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-emerald-400">{percentile}%</div>
              <div className="text-slate-400 text-sm mt-1">Rationality Score</div>
            </div>
            <div className="bg-slate-700/50 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-blue-400">{rationalCount}/{scenarios.length}</div>
              <div className="text-slate-400 text-sm mt-1">Rational Decisions</div>
            </div>
            <div className="bg-slate-700/50 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-orange-400">{lossAversionRatio.toFixed(1)}x</div>
              <div className="text-slate-400 text-sm mt-1">Loss Aversion</div>
            </div>
            <div className="bg-slate-700/50 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-red-400">{panicCount}</div>
              <div className="text-slate-400 text-sm mt-1">Emotional Trades</div>
            </div>
          </div>

          <div className="bg-slate-700/30 rounded-xl p-4 mb-6">
            <h4 className="text-white font-semibold mb-2">What This Means</h4>
            <p className="text-slate-300 text-sm">
              {lossAversionRatio > 2 
                ? "Research shows you feel losses roughly 2.5x more intensely than equivalent gains. This can lead to panic selling during dips and holding losers too long hoping to break even."
                : lossAversionRatio > 1.5
                  ? "You show moderate loss aversion, which is common. You may occasionally sell winners too early or hold losers hoping they'll recover."
                  : "You have a healthy balance between fear and greed. You evaluate gains and losses relatively objectively, which is uncommon and valuable."}
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={restart}
              className="flex-1 py-3 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-xl transition-all"
            >
              Play Again
            </button>
            <button
              onClick={onClose}
              className="flex-1 py-3 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-xl transition-all"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Game screen
  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-2xl p-6 max-w-md w-full border border-purple-500/30 shadow-2xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-bold text-white">{scenario.name}</h2>
            <p className="text-purple-300 text-sm">Test your trading psychology</p>
          </div>
          <div className="bg-purple-900/50 px-3 py-1.5 rounded-full text-purple-200 text-sm font-medium">
            {step + 1} / {scenarios.length}
          </div>
        </div>

        {/* Scenario */}
        <p className="text-slate-300 mb-4 leading-relaxed">{scenario.description}</p>

        {scenario.loss !== 0 && (
          <div className={`text-4xl font-bold mb-6 ${scenario.loss < 0 ? 'text-red-400' : 'text-green-400'}`}>
            {scenario.loss > 0 ? '+' : ''}{scenario.loss}%
          </div>
        )}

        {/* Options or Result */}
        {!showResult ? (
          <div className="space-y-3">
            <p className="text-purple-300 font-medium text-sm mb-3">What do you do?</p>
            {scenario.options.map((option, i) => (
              <button
                key={i}
                onClick={() => handleSelect(option)}
                className="w-full p-4 text-left bg-slate-700/50 hover:bg-slate-700 border border-slate-600 hover:border-purple-400 rounded-xl text-white transition-all"
              >
                {option.text}
              </button>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-slate-700/30 rounded-xl p-4">
              <p className="text-purple-300 text-xs mb-1">Your choice:</p>
              <p className="text-white">{selected.text}</p>
            </div>

            <div className={`rounded-xl p-4 ${
              scenario.results[selected.action].score > 0
                ? 'bg-green-900/30 border border-green-500/30'
                : scenario.results[selected.action].score < 0
                  ? 'bg-red-900/30 border border-red-500/30'
                  : 'bg-slate-700/30 border border-slate-500/30'
            }`}>
              <p className="text-slate-300 text-xs mb-1">Outcome:</p>
              <p className="text-white">{scenario.results[selected.action].text}</p>
              <div className="mt-3">
                <span className={`text-sm font-semibold ${selected.rational ? 'text-green-400' : 'text-amber-400'}`}>
                  {selected.rational ? '✓ Rational decision' : '⚠ Emotional decision'}
                </span>
              </div>
            </div>

            <button
              onClick={next}
              className="w-full py-3 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-xl transition-all"
            >
              {step < scenarios.length - 1 ? 'Next Scenario →' : 'See My Results'}
            </button>
          </div>
        )}

        {/* Cancel button */}
        <button
          onClick={onClose}
          className="w-full mt-4 py-2 text-slate-400 hover:text-white text-sm transition-colors"
        >
          Cancel
        </button>

        {/* Progress dots */}
        <div className="mt-4 flex gap-1.5 justify-center">
          {scenarios.map((_, idx) => (
            <div
              key={idx}
              className={`w-2 h-2 rounded-full transition-all ${
                idx < step ? 'bg-purple-500' :
                idx === step ? 'bg-purple-400 scale-125' :
                'bg-slate-600'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
