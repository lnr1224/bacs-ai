import React, { useState } from 'react';
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell
} from 'recharts';
import {
  Sparkles,
  ShieldCheck,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  Grid,
  Zap,
  Download,
  MessageSquareText,
  ChevronDown,
  ChevronUp,
  Award,
  ArrowUpRight
} from 'lucide-react';
import { BusinessJSON, IntelligenceAnalysis, BACSScoreItem } from '../types';
import { RealityCheckCard } from './RealityCheckCard';
import { BACSDecisionEngineView } from './BACSDecisionEngineView';

interface DashboardViewProps {
  businessJson: BusinessJSON;
  analysis: IntelligenceAnalysis;
  onOpenCopilot: () => void;
  onOpenJsonInspector: () => void;
  onOpenReportExport: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  businessJson,
  analysis,
  onOpenCopilot,
  onOpenJsonInspector,
  onOpenReportExport
}) => {
  const [expandedScoreKey, setExpandedScoreKey] = useState<string | null>(null);

  const b = businessJson.business;

  // Prepare chart data
  const radarData = (analysis.scores || []).map((s) => ({
    subject: s.title,
    score: s.score,
    fullMark: 100
  }));

  const barData = (analysis.scores || []).map((s) => ({
    name: s.title.split(' ')[0],
    fullName: s.title,
    score: s.score,
    priority: s.priority
  }));

  const getPriorityBadgeClass = (priority: string) => {
    switch (priority) {
      case 'Critical':
        return 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300 border-rose-200 dark:border-rose-800';
      case 'High':
        return 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300 border-amber-200 dark:border-amber-800';
      case 'Medium':
        return 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800';
      default:
        return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return '#10b981'; // emerald
    if (score >= 68) return '#6366f1'; // indigo
    if (score >= 55) return '#f59e0b'; // amber
    return '#f43f5e'; // rose
  };

  return (
    <div className="space-y-10 py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* 1. Header & Actions Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
              BACS Intelligence Engine Output
            </span>
            <span className="text-xs text-slate-400 font-mono capitalize">
              {b.stage} Stage • {b.industry}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {b.name}
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-2xl">
            {b.description || 'Structured business diagnosis dashboard.'}
          </p>
        </div>

        {/* Floating Quick Action Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={onOpenCopilot}
            className="px-5 py-3 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-bold text-sm shadow-md shadow-violet-500/20 flex items-center space-x-2 transition-all transform hover:-translate-y-0.5"
          >
            <Sparkles className="w-4 h-4" />
            <span>Open Strategy Copilot</span>
          </button>

          <button
            onClick={onOpenJsonInspector}
            className="px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-sm border border-slate-200 dark:border-slate-700 flex items-center space-x-2 transition-all"
          >
            <ShieldCheck className="w-4 h-4 text-indigo-500" />
            <span>Inspect Business JSON</span>
          </button>

          <button
            onClick={onOpenReportExport}
            className="px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-sm border border-slate-200 dark:border-slate-700 flex items-center space-x-2 transition-all"
          >
            <Download className="w-4 h-4 text-slate-500" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* 2. BACS Stage-Aware Decision Engine Output */}
      <BACSDecisionEngineView analysis={analysis} onOpenCopilot={onOpenCopilot} />

      {/* 3. Memorable Reality Check Section */}
      <RealityCheckCard items={analysis.realityCheck} />

      {/* 3. Executive Metrics & Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Metric Cards (1 col) */}
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-indigo-600 to-violet-700 text-white p-6 rounded-3xl shadow-lg space-y-3 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-200">
                BACS Index Score
              </span>
              <Award className="w-6 h-6 text-indigo-200" />
            </div>
            <div className="flex items-baseline space-x-2">
              <span className="text-5xl font-extrabold tracking-tight">
                {analysis.bacsIndexScore}
              </span>
              <span className="text-lg text-indigo-200 font-bold">/ 100</span>
            </div>
            <p className="text-xs text-indigo-100">
              Composite business viability & execution readiness rating.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
              <span className="text-xs text-slate-400 font-semibold block">Overall Health</span>
              <div className="text-2xl font-extrabold text-slate-900 dark:text-white">
                {analysis.overallHealthScore}%
              </div>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
                High Integrity
              </span>
            </div>

            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
              <span className="text-xs text-slate-400 font-semibold block">AI Confidence</span>
              <div className="text-2xl font-extrabold text-slate-900 dark:text-white">
                {analysis.aiConfidence}%
              </div>
              <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-semibold">
                High Model Grounding
              </span>
            </div>
          </div>
        </div>

        {/* Executive Summary (2 cols) */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <h3 className="font-bold text-slate-900 dark:text-white text-lg">
                Executive Diagnosis Summary
              </h3>
            </div>
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
              {analysis.executiveSummary}
            </p>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex items-center space-x-2">
              <span className="font-bold text-slate-700 dark:text-slate-300">Top Priority Action:</span>
              <span className="text-indigo-600 dark:text-indigo-400 font-semibold">
                {analysis.quickWins?.[0] || 'Validate pricing and pre-orders.'}
              </span>
            </div>

            <button
              onClick={onOpenCopilot}
              className="text-xs font-bold text-violet-600 dark:text-violet-400 hover:underline flex items-center space-x-1"
            >
              <span>Ask Copilot about this summary</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 4. Charts Section (Radar & Bar) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Radar Chart */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                BACS Multi-Axis Radar
              </h3>
              <p className="text-xs text-slate-400">Holistic balance across 8 business dimensions</p>
            </div>
          </div>

          <div className="h-64 sm:h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 11 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#94a3b8' }} />
                <Radar name="Score" dataKey="score" stroke="#6366f1" fill="#6366f1" fillOpacity={0.4} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                Category Score Breakdown
              </h3>
              <p className="text-xs text-slate-400">Score performance rated out of 100</p>
            </div>
          </div>

          <div className="h-64 sm:h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} layout="vertical" margin={{ top: 5, right: 20, left: 40, bottom: 5 }}>
                <XAxis type="number" domain={[0, 100]} tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <YAxis dataKey="name" type="category" tick={{ fill: '#64748b', fontSize: 11 }} />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-slate-900 text-white p-2.5 rounded-lg text-xs shadow-lg border border-slate-700">
                          <p className="font-bold">{data.fullName}</p>
                          <p className="text-indigo-300">Score: {data.score}/100</p>
                          <p className="text-slate-400">Priority: {data.priority}</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="score" radius={[0, 6, 6, 0]}>
                  {barData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={getScoreColor(entry.score)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 5. Scores Grid Cards (Clickable details) */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">
          Detailed Dimension Diagnostics
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {analysis.scores.map((scoreItem) => {
            const isExpanded = expandedScoreKey === scoreItem.key;
            return (
              <div
                key={scoreItem.key}
                onClick={() => setExpandedScoreKey(isExpanded ? null : scoreItem.key)}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-indigo-500 transition-all cursor-pointer space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${getPriorityBadgeClass(scoreItem.priority)}`}>
                    {scoreItem.priority}
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-400">
                    {scoreItem.score}/100
                  </span>
                </div>

                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                    {scoreItem.title}
                  </h4>
                  {/* Progress Bar */}
                  <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full mt-2 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${scoreItem.score}%`,
                        backgroundColor: getScoreColor(scoreItem.score)
                      }}
                    ></div>
                  </div>
                </div>

                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                  {scoreItem.explanation}
                </p>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] font-semibold text-indigo-600 dark:text-indigo-400">
                  <span>View Recommended Action</span>
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>

                {isExpanded && (
                  <div className="pt-2 text-xs space-y-2 bg-indigo-50/60 dark:bg-indigo-950/40 p-3 rounded-xl border border-indigo-100 dark:border-indigo-900 text-slate-800 dark:text-slate-200 animate-in fade-in duration-200">
                    <span className="font-bold text-indigo-600 dark:text-indigo-400 block">
                      Recommended Action:
                    </span>
                    <p>{scoreItem.recommendedAction}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 6. Strengths & Weaknesses / Growth Opportunities & Critical Risks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Strengths & Weaknesses */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            <h3 className="font-bold text-slate-900 dark:text-white text-base">
              Strengths & Weaknesses
            </h3>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <span className="font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 block mb-2">
                Core Strengths
              </span>
              <ul className="space-y-1.5">
                {analysis.strengths.map((str, i) => (
                  <li key={i} className="flex items-start space-x-2 text-slate-700 dark:text-slate-300">
                    <span className="text-emerald-500 font-bold">•</span>
                    <span>{str}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
              <span className="font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 block mb-2">
                Core Weaknesses
              </span>
              <ul className="space-y-1.5">
                {analysis.weaknesses.map((wk, i) => (
                  <li key={i} className="flex items-start space-x-2 text-slate-700 dark:text-slate-300">
                    <span className="text-rose-500 font-bold">•</span>
                    <span>{wk}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Growth Opportunities & Critical Risks */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center space-x-2">
            <Zap className="w-5 h-5 text-amber-500" />
            <h3 className="font-bold text-slate-900 dark:text-white text-base">
              Opportunities & Critical Risks
            </h3>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <span className="font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 block mb-2">
                Growth Levers
              </span>
              <ul className="space-y-1.5">
                {analysis.growthOpportunities.map((opp, i) => (
                  <li key={i} className="flex items-start space-x-2 text-slate-700 dark:text-slate-300">
                    <span className="text-indigo-500 font-bold">•</span>
                    <span>{opp}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
              <span className="font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 block mb-2">
                Critical Risks
              </span>
              <ul className="space-y-1.5">
                {analysis.criticalRisks.map((rk, i) => (
                  <li key={i} className="flex items-start space-x-2 text-slate-700 dark:text-slate-300">
                    <span className="text-amber-500 font-bold">•</span>
                    <span>{rk}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* 7. Quick Wins Section */}
      <div className="bg-gradient-to-r from-amber-500/10 via-indigo-500/10 to-violet-500/10 p-6 sm:p-8 rounded-3xl border border-amber-200 dark:border-amber-900/40 space-y-4">
        <div className="flex items-center space-x-2">
          <Zap className="w-5 h-5 text-amber-500" />
          <h3 className="font-bold text-slate-900 dark:text-white text-lg">
            High-Impact Quick Wins
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {analysis.quickWins.map((qw, index) => (
            <div key={index} className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                Quick Win #{index + 1}
              </span>
              <p className="text-xs font-medium text-slate-800 dark:text-slate-200 leading-relaxed">
                {qw}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 8. 90-Day Roadmap */}
      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex items-center space-x-2">
          <Calendar className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-lg">
              90-Day Strategic Roadmap
            </h3>
            <p className="text-xs text-slate-400">Sequential execution phases to maximize ROI</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {analysis.roadmap.map((phase, i) => (
            <div key={i} className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase text-indigo-600 dark:text-indigo-400">
                  {phase.phase} • {phase.duration}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 font-semibold">
                  {phase.focusArea}
                </span>
              </div>

              <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                {phase.title}
              </h4>

              <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                {phase.items.map((item, itemIdx) => (
                  <li key={itemIdx} className="flex items-start space-x-2">
                    <span className="text-indigo-500 font-bold">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* 9. Priority Matrix (2x2 Grid) */}
      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex items-center space-x-2">
          <Grid className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-lg">
              Priority Matrix (Impact vs Effort)
            </h3>
            <p className="text-xs text-slate-400">Task prioritization quadrant breakdown</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Quick Wins (High Impact, Low Effort) */}
          <div className="p-5 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
              ⚡ Quick Wins (High Impact, Low Effort)
            </span>
            <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-200">
              {analysis.priorityMatrix
                .filter((p) => p.quadrant === 'Quick Win' || (p.impact === 'High' && p.effort === 'Low'))
                .map((p, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <span className="text-emerald-500 font-bold">•</span>
                    <span>{p.task}</span>
                  </li>
                ))}
            </ul>
          </div>

          {/* Major Projects (High Impact, High Effort) */}
          <div className="p-5 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-400">
              🚀 Major Projects (High Impact, High Effort)
            </span>
            <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-200">
              {analysis.priorityMatrix
                .filter((p) => p.quadrant === 'Major Project' || (p.impact === 'High' && p.effort === 'High'))
                .map((p, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <span className="text-indigo-500 font-bold">•</span>
                    <span>{p.task}</span>
                  </li>
                ))}
            </ul>
          </div>

          {/* Fill-ins (Low Impact, Low Effort) */}
          <div className="p-5 rounded-2xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
              📋 Fill-in Tasks (Low Impact, Low Effort)
            </span>
            <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
              {analysis.priorityMatrix
                .filter((p) => p.quadrant === 'Fill-in' || (p.impact === 'Low' && p.effort === 'Low'))
                .map((p, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <span className="text-slate-400 font-bold">•</span>
                    <span>{p.task}</span>
                  </li>
                ))}
            </ul>
          </div>

          {/* Thankless Tasks (Low Impact, High Effort) */}
          <div className="p-5 rounded-2xl bg-rose-50/60 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-700 dark:text-rose-400">
              ⚠️ Deprioritize (Low Impact, High Effort)
            </span>
            <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
              {analysis.priorityMatrix
                .filter((p) => p.quadrant === 'Thankless Task' || (p.impact === 'Low' && p.effort === 'High'))
                .map((p, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <span className="text-rose-400 font-bold">•</span>
                    <span>{p.task}</span>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
