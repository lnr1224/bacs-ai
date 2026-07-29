import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Target, 
  CheckCircle2, 
  TrendingUp, 
  AlertTriangle,
  Award,
  Zap,
  ShieldAlert,
  ChevronRight
} from 'lucide-react';
import { BusinessJSON, IntelligenceAnalysis } from '../types';

interface SummaryViewProps {
  businessJson: BusinessJSON;
  analysis: IntelligenceAnalysis;
  onNavigateTab: (tab: 'summary' | 'analysis' | 'assumptions' | 'actions' | 'copilot' | 'json' | 'reports') => void;
}

export const SummaryView: React.FC<SummaryViewProps> = ({
  businessJson,
  analysis,
  onNavigateTab
}) => {
  const b = businessJson.business;
  const oneThing = analysis.oneThingToFix || {
    title: `Validate ${businessJson.pricing?.averagePricePoint || 'Pricing'} & Customer Unit Economics`,
    whyItMatters: `Pricing directly dictates your gross margin buffer (${businessJson.pricing?.marginsEstimated || '65%'}), acquisition CAC buffer, and survival.`,
    expectedImpact: `Prevents uncapitalized cash burn and locks in sustainable target margins.`,
    estimatedEffort: `Low (2-3 days)`,
    expectedRoi: `3x Risk Reduction on Initial Capital`,
    actionStep: `Launch $100 pre-order deposit experiment.`
  };

  const topAssumption = analysis.realityCheck?.[0];

  return (
    <div className="space-y-6 max-w-5xl mx-auto py-4 px-4 sm:px-6">
      {/* 1. Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-1.5 z-10">
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
              Executive Diagnosis
            </span>
            <span className="text-[11px] font-mono text-slate-400 capitalize">
              {b.stage} Stage • {b.industry}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {b.name}
          </h1>
          <p className="text-xs text-slate-400 max-w-xl line-clamp-2">
            {b.description || 'AI Business Intelligence Overview & Critical Action Summary.'}
          </p>
        </div>

        {/* Index Badges */}
        <div className="flex items-center gap-3 z-10 shrink-0">
          <div className="bg-gradient-to-br from-purple-600 to-indigo-700 text-white px-5 py-3 rounded-2xl shadow-lg text-center space-y-0.5 border border-purple-400/30">
            <span className="text-[10px] uppercase font-bold text-purple-200 block">BACS Index</span>
            <div className="text-2xl font-extrabold">{analysis.bacsIndexScore}/100</div>
          </div>

          <div className="bg-slate-800 border border-slate-700 p-3 rounded-2xl text-center space-y-0.5">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Health</span>
            <div className="text-2xl font-extrabold text-emerald-400">{analysis.overallHealthScore}%</div>
          </div>
        </div>
      </div>

      {/* 2. ONE THING TO FIX FIRST (Prominent Card) */}
      <div className="bg-gradient-to-r from-purple-950/80 via-indigo-950/80 to-slate-900 border-2 border-purple-500/50 rounded-3xl p-6 sm:p-7 shadow-2xl space-y-4 relative overflow-hidden group">
        <div className="flex items-center justify-between border-b border-purple-900/60 pb-3">
          <div className="flex items-center space-x-2 text-amber-400 font-extrabold text-sm sm:text-base tracking-wide">
            <Zap className="w-5 h-5 text-amber-400 fill-amber-400/20 animate-pulse" />
            <span>If you only fixed ONE thing this month...</span>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
            #1 Priority
          </span>
        </div>

        <div>
          <h2 className="text-lg sm:text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
            {oneThing.title}
          </h2>
        </div>

        {/* Metadata Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-slate-900/70 p-4 rounded-2xl border border-purple-900/40">
          <div className="space-y-1">
            <span className="font-bold text-purple-300 text-[11px] block">Why this matters:</span>
            <p className="text-slate-300 leading-relaxed text-[11px]">{oneThing.whyItMatters}</p>
          </div>

          <div className="space-y-1">
            <span className="font-bold text-emerald-300 text-[11px] block">Expected business impact:</span>
            <p className="text-slate-300 leading-relaxed text-[11px]">{oneThing.expectedImpact}</p>
          </div>

          <div className="pt-2 sm:pt-0 space-y-1">
            <span className="font-bold text-indigo-300 text-[11px] block">Estimated Effort:</span>
            <span className="inline-block px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 text-[11px] font-mono border border-indigo-800">
              {oneThing.estimatedEffort}
            </span>
          </div>

          <div className="pt-2 sm:pt-0 space-y-1">
            <span className="font-bold text-amber-300 text-[11px] block">Expected ROI:</span>
            <span className="inline-block px-2 py-0.5 rounded bg-amber-950 text-amber-300 text-[11px] font-mono border border-amber-800">
              {oneThing.expectedRoi}
            </span>
          </div>
        </div>

        <div className="pt-2 flex items-center justify-between">
          <button
            onClick={() => onNavigateTab('actions')}
            className="w-full sm:w-auto px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl shadow-lg shadow-purple-600/30 flex items-center justify-center space-x-2 transition-all transform hover:-translate-y-0.5"
          >
            <span>Open Action Plan</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 3. Hidden Business Assumptions Teaser */}
      {topAssumption && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-rose-400 font-bold text-xs uppercase tracking-wider">
              <ShieldAlert className="w-4 h-4" />
              <span>Hidden Business Assumption Teaser</span>
            </div>
            <button
              onClick={() => onNavigateTab('assumptions')}
              className="text-xs text-purple-400 hover:underline flex items-center space-x-1 font-semibold"
            >
              <span>View All 3</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700/80 text-xs space-y-1.5">
            <p className="font-bold text-white text-xs sm:text-sm">"{topAssumption.assumption}"</p>
            <p className="text-slate-400 text-[11px] line-clamp-2">{topAssumption.whyItMatters}</p>
          </div>
        </div>
      )}

      {/* 4. Executive Summary Box */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
        <h3 className="text-xs font-bold uppercase tracking-wider text-purple-400 flex items-center space-x-2">
          <TrendingUp className="w-4 h-4" />
          <span>Executive Summary</span>
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          {analysis.executiveSummary}
        </p>
      </div>

      {/* 5. Primary CTAs */}
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
        <button
          onClick={() => onNavigateTab('analysis')}
          className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-md shadow-purple-600/20 flex items-center justify-center space-x-2 transition-all"
        >
          <span>Continue to Detailed Analysis</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <button
          onClick={() => onNavigateTab('copilot')}
          className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 flex items-center justify-center space-x-2 transition-all"
        >
          <Sparkles className="w-4 h-4 text-purple-400" />
          <span>Discuss with Strategy Copilot</span>
        </button>
      </div>
    </div>
  );
};
