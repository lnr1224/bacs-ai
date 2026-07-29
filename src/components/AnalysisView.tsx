import React, { useState } from 'react';
import { 
  BarChart2, 
  TrendingUp, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles, 
  ChevronDown, 
  ChevronUp,
  Star,
  Activity,
  Award,
  ShieldCheck,
  Target
} from 'lucide-react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { BACSScoreItem, IntelligenceAnalysis } from '../types';

interface AnalysisViewProps {
  analysis: IntelligenceAnalysis;
}

export const AnalysisView: React.FC<AnalysisViewProps> = ({ analysis }) => {
  const [showCharts, setShowCharts] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const getHealthBadge = (score: number) => {
    if (score >= 90) return { label: 'Excellent', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30', stars: '★★★★★' };
    if (score >= 70) return { label: 'Solid', color: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30', stars: '★★★★☆' };
    if (score >= 55) return { label: 'Needs Attention', color: 'bg-amber-500/20 text-amber-300 border-amber-500/30', stars: '★★★☆☆' };
    return { label: 'Critical', color: 'bg-rose-500/20 text-rose-300 border-rose-500/30', stars: '★☆☆☆☆' };
  };

  const getRiskBadge = (priority: string) => {
    switch (priority) {
      case 'Critical':
        return { label: 'High Risk', class: 'bg-rose-500/20 text-rose-300 border-rose-500/30' };
      case 'High':
        return { label: 'Medium Risk', class: 'bg-amber-500/20 text-amber-300 border-amber-500/30' };
      default:
        return { label: 'Low Risk', class: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30' };
    }
  };

  const chartData = analysis.scores.map(s => ({
    title: s.title.replace(' & ', ' & \n'),
    score: s.score,
    fullMark: 100
  }));

  const filteredScores = selectedCategory 
    ? analysis.scores.filter(s => s.priority === selectedCategory)
    : analysis.scores;

  return (
    <div className="space-y-6 max-w-5xl mx-auto py-4 px-4 sm:px-6">
      {/* 1. Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              12-Dimension Diagnostic
            </span>
            <span className="text-xs font-mono text-slate-400">
              BACS Evaluation Matrix
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
            Business Intelligence Analysis
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Comprehensive diagnostic scores across strategy, unit economics, acquisition & moats.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="bg-slate-800 border border-slate-700 px-4 py-2.5 rounded-2xl text-center">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Overall BACS Index</span>
            <span className="text-xl font-extrabold text-purple-400">{analysis.bacsIndexScore}/100</span>
          </div>

          <button
            onClick={() => setShowCharts(!showCharts)}
            className="px-3.5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 flex items-center space-x-1.5 transition"
          >
            <BarChart2 className="w-4 h-4 text-purple-400" />
            <span>{showCharts ? 'Hide Visual Charts' : 'Show Charts'}</span>
          </button>
        </div>
      </div>

      {/* 2. Recharts Radar & Bar Visualizations */}
      {showCharts && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                12-Dimension Business Radar
              </h3>
              <span className="text-[10px] font-mono text-slate-400">0 - 100 Scale</span>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={chartData}>
                  <PolarGrid stroke="#334155" />
                  <PolarAngleAxis dataKey="title" stroke="#94a3b8" tick={{ fill: '#94a3b8', fontSize: 9 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#475569" />
                  <Radar name="Score" dataKey="score" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.4} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                Dimension Score Distribution
              </h3>
              <span className="text-[10px] font-mono text-slate-400">Performance</span>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: -25, bottom: 25 }}>
                  <XAxis dataKey="title" stroke="#64748b" tick={{ fill: '#64748b', fontSize: 8 }} angle={-35} textAnchor="end" />
                  <YAxis domain={[0, 100]} stroke="#64748b" tick={{ fill: '#64748b', fontSize: 10 }} />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '11px', color: '#fff' }} />
                  <Bar dataKey="score" fill="#6366f1" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* 3. Filter Buttons */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1 text-xs font-medium">
        <span className="text-slate-400 text-xs shrink-0">Filter Priority:</span>
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-3 py-1.5 rounded-lg border transition shrink-0 ${
            selectedCategory === null
              ? 'bg-purple-600 text-white border-purple-500 font-bold'
              : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
          }`}
        >
          All (12)
        </button>
        {['Critical', 'High', 'Medium', 'Low'].map(p => (
          <button
            key={p}
            onClick={() => setSelectedCategory(p)}
            className={`px-3 py-1.5 rounded-lg border transition shrink-0 ${
              selectedCategory === p
                ? 'bg-purple-600 text-white border-purple-500 font-bold'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      {/* 4. Score Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredScores.map((item, idx) => {
          const health = getHealthBadge(item.score);
          const risk = getRiskBadge(item.priority);

          return (
            <div
              key={idx}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-sm hover:border-slate-700 transition flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                {/* Header Top Row */}
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-300 font-mono uppercase tracking-wider">
                    {item.title}
                  </span>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${risk.class}`}>
                    {risk.label}
                  </span>
                </div>

                {/* Main Score & Health Display */}
                <div className="flex items-baseline justify-between pt-1">
                  <div className="flex items-baseline space-x-2">
                    <span className="text-3xl font-extrabold text-white">{item.score}</span>
                    <span className="text-xs text-slate-400 font-mono">/100</span>
                  </div>

                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${health.color}`}>
                    {health.label}
                  </span>
                </div>

                {/* Priority Star Rating */}
                <div className="flex items-center justify-between pt-1">
                  <span className="text-[10px] font-mono text-slate-400">Rating:</span>
                  <span className="text-xs text-amber-400 tracking-widest">{health.stars}</span>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed pt-1">
                  {item.explanation}
                </p>
              </div>

              {/* Recommended Action Box */}
              <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/80 text-[11px] space-y-1">
                <span className="font-bold text-purple-300 block text-[10px] uppercase tracking-wider">
                  Recommended Action:
                </span>
                <p className="text-slate-300 leading-snug">
                  {item.recommendedAction}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* 5. Strengths & Weaknesses 2-Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Strengths */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
          <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Core Business Strengths</span>
          </h3>
          <ul className="space-y-2 text-xs text-slate-300">
            {analysis.strengths.map((str, i) => (
              <li key={i} className="flex items-start space-x-2 bg-slate-800/50 p-2.5 rounded-xl border border-slate-700/50">
                <span className="text-emerald-400 font-bold">•</span>
                <span>{str}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Critical Weaknesses */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
          <h3 className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center space-x-2">
            <AlertTriangle className="w-4 h-4 text-rose-400" />
            <span>Critical Strategic Vulnerabilities</span>
          </h3>
          <ul className="space-y-2 text-xs text-slate-300">
            {analysis.weaknesses.map((wk, i) => (
              <li key={i} className="flex items-start space-x-2 bg-slate-800/50 p-2.5 rounded-xl border border-slate-700/50">
                <span className="text-rose-400 font-bold">•</span>
                <span>{wk}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
