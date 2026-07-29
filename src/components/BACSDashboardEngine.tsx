import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  ShieldAlert, 
  Zap, 
  Target, 
  ArrowRight,
  Sparkles,
  HelpCircle,
  Clock,
  Brain,
  FileText,
  Activity,
  Layers,
  Star,
  Compass,
  AlertCircle,
  FlaskConical,
  Flame,
  CheckCircle,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { BusinessJSON } from '../types';
import { runBACSAnalysisEngine, BACSVariable } from '../core/bacs-engine';

interface BACSDashboardEngineProps {
  businessJson: BusinessJSON;
  onNavigateTab?: (tab: string) => void;
  onOpenInterview?: () => void;
}

export const BACSDashboardEngine: React.FC<BACSDashboardEngineProps> = ({
  businessJson,
  onNavigateTab,
  onOpenInterview
}) => {
  const analysis = runBACSAnalysisEngine(businessJson);
  const [activeTab, setActiveTab] = useState<'overview' | 'microleaks' | 'evidence' | 'assumptions' | 'remediation'>('overview');
  const [completedTaskIds, setCompletedTaskIds] = useState<Record<string, boolean>>({});

  const toggleTaskCompletion = (taskId: string) => {
    setCompletedTaskIds(prev => ({ ...prev, [taskId]: !prev[taskId] }));
  };

  const getBACSVariableBadge = (v: BACSVariable) => {
    switch (v) {
      case 'M':
        return <span className="px-2 py-0.5 text-[10px] font-bold bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 rounded border border-amber-200 dark:border-amber-800">M — Motivation</span>;
      case 'D':
        return <span className="px-2 py-0.5 text-[10px] font-bold bg-blue-100 dark:bg-blue-950/80 text-blue-800 dark:text-blue-300 rounded border border-blue-200 dark:border-blue-800">D — Diagnosis</span>;
      case 'F':
        return <span className="px-2 py-0.5 text-[10px] font-bold bg-purple-100 dark:bg-purple-950/80 text-purple-800 dark:text-purple-300 rounded border border-purple-200 dark:border-purple-800">F — Feasibility</span>;
      case 'P':
        return <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 rounded border border-emerald-200 dark:border-emerald-800">P — Proof</span>;
    }
  };

  const getComplexityBadge = (level: string) => {
    switch (level) {
      case 'Critical':
        return <span className="px-2.5 py-1 text-xs font-bold bg-red-100 dark:bg-red-950/80 text-red-700 dark:text-red-300 rounded-full border border-red-200 dark:border-red-800">Critical Friction</span>;
      case 'High':
        return <span className="px-2.5 py-1 text-xs font-bold bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 rounded-full border border-amber-200 dark:border-amber-800">High Complexity</span>;
      case 'Medium':
        return <span className="px-2.5 py-1 text-xs font-bold bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 rounded-full border border-blue-200 dark:border-blue-800">Moderate Complexity</span>;
      default:
        return <span className="px-2.5 py-1 text-xs font-bold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 rounded-full border border-emerald-200 dark:border-emerald-800">Low Friction</span>;
    }
  };

  return (
    <div className="space-y-8">
      
      {/* 1. Four Phase Audit Tracker */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
          <div className="flex items-center space-x-2">
            <Activity className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              BACS Four Phase Audit Progress
            </h3>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 flex items-center space-x-1">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
            <span>Audit Passed & Traceable</span>
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-indigo-50/70 dark:bg-slate-800/80 border border-indigo-200 dark:border-slate-700">
            <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider block">Phase 1</span>
            <span className="font-bold text-slate-900 dark:text-white block mt-0.5">Data Verification</span>
            <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center mt-1">
              <CheckCircle2 className="w-3 h-3 mr-1" /> Passed
            </span>
          </div>

          <div className="p-3 rounded-xl bg-indigo-50/70 dark:bg-slate-800/80 border border-indigo-200 dark:border-slate-700">
            <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider block">Phase 2</span>
            <span className="font-bold text-slate-900 dark:text-white block mt-0.5">Formula Quantification</span>
            <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center mt-1">
              <CheckCircle2 className="w-3 h-3 mr-1" /> B = M × (D+F) × P
            </span>
          </div>

          <div className="p-3 rounded-xl bg-indigo-50/70 dark:bg-slate-800/80 border border-indigo-200 dark:border-slate-700">
            <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider block">Phase 3</span>
            <span className="font-bold text-slate-900 dark:text-white block mt-0.5">Micro-Leak Audit</span>
            <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center mt-1">
              <CheckCircle2 className="w-3 h-3 mr-1" /> {analysis.microLeaks.length} Leaks Detected
            </span>
          </div>

          <div className="p-3 rounded-xl bg-indigo-50/70 dark:bg-slate-800/80 border border-indigo-200 dark:border-slate-700">
            <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider block">Phase 4</span>
            <span className="font-bold text-slate-900 dark:text-white block mt-0.5">Remediation Mapping</span>
            <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center mt-1">
              <CheckCircle2 className="w-3 h-3 mr-1" /> Executable Tasks Ready
            </span>
          </div>
        </div>
      </div>

      {/* 2. Critical Score Leaks Alert Banner (If Any Variable <= 3) */}
      {analysis.criticalScoreLeaks.length > 0 && (
        <div className="bg-red-50 dark:bg-red-950/50 border-2 border-red-300 dark:border-red-800 rounded-2xl p-5 space-y-3">
          <div className="flex items-center space-x-2 text-red-700 dark:text-red-300 font-extrabold text-sm sm:text-base">
            <AlertOctagon className="w-5 h-5 text-red-600 animate-pulse shrink-0" />
            <span>🚨 Critical Conversion Score Leaks Identified</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {analysis.criticalScoreLeaks.map((leak, idx) => (
              <div key={idx} className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-red-200 dark:border-red-900 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-red-600 dark:text-red-400">
                    {leak.variableName}: {leak.score}/10
                  </span>
                  <span className="text-[10px] font-bold bg-red-100 dark:bg-red-900/60 text-red-800 dark:text-red-200 px-2 py-0.5 rounded uppercase">
                    Immediate Attention
                  </span>
                </div>
                <p className="text-xs font-semibold text-slate-900 dark:text-white">{leak.whyItMatters}</p>
                <p className="text-[11px] text-slate-600 dark:text-slate-400"><strong>Business Impact:</strong> {leak.businessImpact}</p>
                <div className="mt-2 text-[11px] bg-red-50 dark:bg-slate-800/90 p-2 rounded border border-red-100 dark:border-slate-700 text-red-900 dark:text-red-300">
                  <strong>Mandatory Fix:</strong> {leak.mandatoryRemediation}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. BACS Blueprint Formula Hero Card */}
      <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-indigo-800/50 pb-6">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-900/80 border border-indigo-700 text-indigo-300 text-xs font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>BACS Blueprint Intelligence Engine</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              The BACS Conversion Formula
            </h2>
            <p className="text-xs sm:text-sm text-indigo-200 mt-1 max-w-xl">
              Conversion Index (B) = M × (D + F) × P. Mathematical conversion diagnosis grounded in behavioral synthesis.
            </p>
          </div>

          <div className="text-right bg-indigo-900/40 border border-indigo-700/60 p-4 rounded-2xl shrink-0">
            <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-300 block">Overall Conversion Index</span>
            <div className="flex items-baseline justify-end space-x-1 mt-1">
              <span className="text-4xl sm:text-5xl font-black text-indigo-400">{analysis.formula.conversionIndex}</span>
              <span className="text-sm font-semibold text-indigo-300">/100</span>
            </div>
            <span className="text-[10px] text-emerald-400 font-semibold block mt-1">
              Raw Formula Score B = {analysis.formula.rawB}
            </span>
          </div>
        </div>

        {/* The 4 BACS Variables Scorecards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          
          {/* M - Motivation */}
          <div className="bg-slate-900/90 border border-indigo-800/80 p-4 rounded-2xl space-y-2 hover:border-amber-500/50 transition">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-amber-400 uppercase tracking-wider">M — Motivation</span>
              <span className="text-lg font-black text-white">{analysis.formula.M}<span className="text-xs text-slate-400 font-normal">/10</span></span>
            </div>
            <p className="text-[11px] text-indigo-200 font-medium">Customer desire & pain urgency</p>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div className="h-full bg-amber-400 rounded-full" style={{ width: `${analysis.formula.M * 10}%` }}></div>
            </div>
          </div>

          {/* D - Diagnosis */}
          <div className="bg-slate-900/90 border border-indigo-800/80 p-4 rounded-2xl space-y-2 hover:border-blue-500/50 transition">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-blue-400 uppercase tracking-wider">D — Diagnosis</span>
              <span className="text-lg font-black text-white">{analysis.formula.D}<span className="text-xs text-slate-400 font-normal">/10</span></span>
            </div>
            <p className="text-[11px] text-indigo-200 font-medium">Intellectual problem & solution clarity</p>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div className="h-full bg-blue-400 rounded-full" style={{ width: `${analysis.formula.D * 10}%` }}></div>
            </div>
          </div>

          {/* F - Feasibility */}
          <div className="bg-slate-900/90 border border-indigo-800/80 p-4 rounded-2xl space-y-2 hover:border-purple-500/50 transition">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-purple-400 uppercase tracking-wider">F — Customer Feasibility</span>
              <span className="text-lg font-black text-white">{analysis.formula.F}<span className="text-xs text-slate-400 font-normal">/10</span></span>
            </div>
            <p className="text-[11px] text-indigo-200 font-medium">Customer simplicity & low brain cycles</p>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div className="h-full bg-purple-400 rounded-full" style={{ width: `${analysis.formula.F * 10}%` }}></div>
            </div>
          </div>

          {/* P - Proof */}
          <div className="bg-slate-900/90 border border-indigo-800/80 p-4 rounded-2xl space-y-2 hover:border-emerald-500/50 transition">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-emerald-400 uppercase tracking-wider">P — Proof & Trust</span>
              <span className="text-lg font-black text-white">{analysis.formula.P}<span className="text-xs text-slate-400 font-normal">/10</span></span>
            </div>
            <p className="text-[11px] text-indigo-200 font-medium">Emotional certainty & verified evidence</p>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${analysis.formula.P * 10}%` }}></div>
            </div>
          </div>

        </div>
      </div>

      {/* 4. Complexity Barrier Card (Φ) & Feasibility Scorecard */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Complexity Barrier Card (Φ) */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
                Φ
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base">Complexity Barrier (Φ)</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Measures wasted engagement caused by friction</p>
              </div>
            </div>
            {getComplexityBadge(analysis.complexityBarrier.overallLevel)}
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs pt-2">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Decision Count</span>
              <span className="font-bold text-slate-900 dark:text-white text-sm">{analysis.complexityBarrier.decisionCount} Choices Required</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Reading Complexity</span>
              <span className="font-bold text-slate-900 dark:text-white text-sm">{analysis.complexityBarrier.readingComplexity}</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Cognitive Load</span>
              <span className="font-bold text-slate-900 dark:text-white text-sm">{analysis.complexityBarrier.cognitiveLoad}</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">User Effort</span>
              <span className="font-bold text-slate-900 dark:text-white text-sm">{analysis.complexityBarrier.userEffort}</span>
            </div>
          </div>
        </div>

        {/* Feasibility Breakdown Scorecard */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Brain className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              <h3 className="font-bold text-slate-900 dark:text-white text-base">Feasibility Scorecard</h3>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-300">
              Score: {analysis.feasibilityScorecard.overallScore}/10
            </span>
          </div>

          <div className="space-y-2.5 text-xs">
            <div>
              <div className="flex justify-between font-semibold text-slate-700 dark:text-slate-300 mb-1">
                <span>Brain Cycles Required</span>
                <span>{analysis.feasibilityScorecard.brainCyclesRequired}/10</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-purple-600 h-full rounded-full" style={{ width: `${analysis.feasibilityScorecard.brainCyclesRequired * 10}%` }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between font-semibold text-slate-700 dark:text-slate-300 mb-1">
                <span>Time to First Value</span>
                <span>{analysis.feasibilityScorecard.timeToValue}/10</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-indigo-600 h-full rounded-full" style={{ width: `${analysis.feasibilityScorecard.timeToValue * 10}%` }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between font-semibold text-slate-700 dark:text-slate-300 mb-1">
                <span>Workflow Disruption Friction</span>
                <span>{analysis.feasibilityScorecard.workflowDisruption}/10</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-amber-500 h-full rounded-full" style={{ width: `${analysis.feasibilityScorecard.workflowDisruption * 10}%` }}></div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Navigation Sub-Tabs to Micro-Leaks, Evidence, Hidden Assumptions & Remediation */}
      <div className="border-b border-slate-200 dark:border-slate-800 flex items-center space-x-2 overflow-x-auto pb-1 text-xs font-bold">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2.5 rounded-xl transition ${activeTab === 'overview' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
        >
          Overview & Benchmarks
        </button>
        <button
          onClick={() => setActiveTab('microleaks')}
          className={`px-4 py-2.5 rounded-xl transition flex items-center space-x-1.5 ${activeTab === 'microleaks' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
        >
          <span>Micro-Leak Engine</span>
          <span className="px-1.5 py-0.5 rounded-full bg-red-100 text-red-700 dark:bg-red-900/60 dark:text-red-200 text-[10px]">
            {analysis.microLeaks.length}
          </span>
        </button>
        <button
          onClick={() => setActiveTab('evidence')}
          className={`px-4 py-2.5 rounded-xl transition flex items-center space-x-1.5 ${activeTab === 'evidence' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
        >
          <span>Evidence Pyramid</span>
          <span className="px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/60 dark:text-emerald-200 text-[10px]">
            {analysis.evidenceQuality.overallConfidenceScore}%
          </span>
        </button>
        <button
          onClick={() => setActiveTab('assumptions')}
          className={`px-4 py-2.5 rounded-xl transition flex items-center space-x-1.5 ${activeTab === 'assumptions' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
        >
          <span>Hidden Assumptions™</span>
          <span className="px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/60 dark:text-amber-200 text-[10px]">
            {analysis.hiddenAssumptions.length}
          </span>
        </button>
        <button
          onClick={() => setActiveTab('remediation')}
          className={`px-4 py-2.5 rounded-xl transition flex items-center space-x-1.5 ${activeTab === 'remediation' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
        >
          <span>Action Centre</span>
          <span className="px-1.5 py-0.5 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900/60 dark:text-indigo-200 text-[10px]">
            {analysis.remediationPlan.length} Tasks
          </span>
        </button>
      </div>

      {/* Tab 1: Overview & Industry Benchmarks */}
      {activeTab === 'overview' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center space-x-2">
              <Compass className="w-5 h-5 text-indigo-600" />
              <span>Industry Knowledge Benchmark: {analysis.industryBenchmark.industry}</span>
            </h3>
            <span className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold bg-indigo-50 dark:bg-indigo-950 px-3 py-1 rounded-full">
              {analysis.industryBenchmark.conversionBenchmarks}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-2">
              <span className="font-bold text-slate-800 dark:text-slate-200 block uppercase tracking-wider text-[10px] text-indigo-600 dark:text-indigo-400">
                Primary Buying Triggers
              </span>
              <ul className="space-y-1 text-slate-600 dark:text-slate-300">
                {analysis.industryBenchmark.buyingTriggers.map((t, idx) => (
                  <li key={idx} className="flex items-start space-x-1.5">
                    <span className="text-indigo-500 font-bold">•</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-2">
              <span className="font-bold text-slate-800 dark:text-slate-200 block uppercase tracking-wider text-[10px] text-indigo-600 dark:text-indigo-400">
                Common Buying Barriers
              </span>
              <ul className="space-y-1 text-slate-600 dark:text-slate-300">
                {analysis.industryBenchmark.buyingBarriers.map((b, idx) => (
                  <li key={idx} className="flex items-start space-x-1.5">
                    <span className="text-red-500 font-bold">•</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-2">
              <span className="font-bold text-slate-800 dark:text-slate-200 block uppercase tracking-wider text-[10px] text-indigo-600 dark:text-indigo-400">
                Recommended BACS Fixes
              </span>
              <ul className="space-y-1 text-slate-600 dark:text-slate-300">
                {analysis.industryBenchmark.recommendedBACSFixes.map((f, idx) => (
                  <li key={idx} className="flex items-start space-x-1.5">
                    <span className="text-emerald-500 font-bold">•</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Micro-Leak Engine */}
      {activeTab === 'microleaks' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 dark:text-white text-base">
              Identified Conversion Micro-Leaks
            </h3>
            <span className="text-xs text-slate-500">Every leak maps directly to BACS formula variables (M, D, F, or P)</span>
          </div>

          <div className="space-y-3">
            {analysis.microLeaks.map(leak => (
              <div key={leak.id} className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                  <div className="flex items-center space-x-2">
                    {getBACSVariableBadge(leak.affectedVariable)}
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">{leak.leakName}</h4>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950 px-2.5 py-1 rounded-full">
                      Loss: {leak.estimatedConversionLoss}
                    </span>
                    <span className="text-xs font-bold bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-full text-slate-700 dark:text-slate-300">
                      Severity {leak.severityScore}/10
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                  <div>
                    <strong className="text-slate-400 uppercase text-[10px] block">Supporting Evidence:</strong>
                    <p className="text-slate-700 dark:text-slate-300 mt-0.5">{leak.supportingEvidence}</p>
                  </div>
                  <div>
                    <strong className="text-slate-400 uppercase text-[10px] block">Root Cause:</strong>
                    <p className="text-slate-700 dark:text-slate-300 mt-0.5">{leak.rootCause}</p>
                  </div>
                  <div className="bg-indigo-50/70 dark:bg-slate-800/80 p-2.5 rounded-xl border border-indigo-100 dark:border-slate-700">
                    <strong className="text-indigo-600 dark:text-indigo-400 uppercase text-[10px] block">BACS Mechanism Fix:</strong>
                    <p className="text-indigo-950 dark:text-indigo-200 font-semibold mt-0.5">{leak.recommendedMechanism}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Evidence Pyramid */}
      {activeTab === 'evidence' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">The Evidence Quality Pyramid</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Assesses emotional and factual certainty behind key business claims</p>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-slate-400 block uppercase">Overall Confidence</span>
              <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">{analysis.evidenceQuality.overallConfidenceScore}%</span>
            </div>
          </div>

          <div className="space-y-3">
            {analysis.evidenceQuality.classifiedClaims.map((claim, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 dark:text-white text-sm">{claim.claim}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-amber-500 font-extrabold text-sm tracking-widest">{claim.starDisplay}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300">
                      {claim.level}
                    </span>
                  </div>
                </div>
                <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 gap-2 pt-1 border-t border-slate-200/60 dark:border-slate-700/60">
                  <span>Source: <strong>{claim.sourceType}</strong></span>
                  <span>Confidence Score: <strong>{claim.confidenceScore}%</strong></span>
                  <span className="text-slate-600 dark:text-slate-300 font-medium">{claim.supportingData}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Hidden Business Assumptions™ */}
      {activeTab === 'assumptions' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">Hidden Business Assumptions™</h3>
              <p className="text-xs text-slate-500">Unvalidated hypotheses extracted automatically from your Business JSON</p>
            </div>
          </div>

          <div className="space-y-3">
            {analysis.hiddenAssumptions.map(assumption => (
              <div key={assumption.id} className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
                  <div className="flex items-center space-x-2">
                    {getBACSVariableBadge(assumption.affectedVariable)}
                    <span className="font-bold text-slate-900 dark:text-white text-sm">{assumption.statement}</span>
                  </div>
                  <span className="text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950 px-2.5 py-1 rounded-full">
                    Risk: {assumption.riskLevel}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                  <div>
                    <strong className="text-slate-400 uppercase text-[10px] block">Why It Matters:</strong>
                    <p className="text-slate-700 dark:text-slate-300 mt-0.5">{assumption.whyItMatters}</p>
                  </div>
                  <div>
                    <strong className="text-slate-400 uppercase text-[10px] block">Validation Experiment:</strong>
                    <p className="text-slate-700 dark:text-slate-300 mt-0.5 font-medium">{assumption.validationExperiment}</p>
                  </div>
                  <div className="bg-emerald-50/70 dark:bg-slate-800/80 p-2.5 rounded-xl border border-emerald-100 dark:border-slate-700">
                    <strong className="text-emerald-700 dark:text-emerald-400 uppercase text-[10px] block">Experiment Budget / Duration:</strong>
                    <p className="text-emerald-950 dark:text-emerald-200 font-bold mt-0.5">{assumption.estimatedCost} • {assumption.expectedTime}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 5: Remediation Action Centre */}
      {activeTab === 'remediation' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">BACS Remediation Action Centre</h3>
              <p className="text-xs text-slate-500">Executable, traceable conversion optimization tasks</p>
            </div>
          </div>

          <div className="space-y-3">
            {analysis.remediationPlan.map(task => {
              const isDone = completedTaskIds[task.id];
              return (
                <div 
                  key={task.id} 
                  className={`bg-white dark:bg-slate-900 p-5 rounded-2xl border transition-all space-y-3 ${
                    isDone 
                      ? 'border-emerald-300 dark:border-emerald-800 bg-emerald-50/30 dark:bg-emerald-950/20 opacity-80' 
                      : 'border-slate-200 dark:border-slate-800 shadow-sm'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => toggleTaskCompletion(task.id)}
                        className={`w-6 h-6 rounded-lg flex items-center justify-center border transition ${
                          isDone 
                            ? 'bg-emerald-600 border-emerald-600 text-white' 
                            : 'border-slate-300 dark:border-slate-600 hover:border-indigo-500'
                        }`}
                      >
                        {isDone && <CheckCircle className="w-4 h-4" />}
                      </button>
                      <div>
                        <div className="flex items-center space-x-2">
                          {getBACSVariableBadge(task.bacsVariable)}
                          <h4 className={`font-bold text-sm ${isDone ? 'line-through text-slate-500' : 'text-slate-900 dark:text-white'}`}>
                            {task.problem}
                          </h4>
                        </div>
                      </div>
                    </div>

                    <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950 px-2.5 py-1 rounded-full">
                      Target Impact: {task.expectedImpact}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs pt-1 border-t border-slate-100 dark:border-slate-800">
                    <div>
                      <strong className="text-slate-400 uppercase text-[10px] block">Recommended BACS Mechanism:</strong>
                      <p className="text-slate-800 dark:text-slate-200 font-semibold mt-0.5">{task.recommendedMechanism}</p>
                    </div>
                    <div>
                      <strong className="text-slate-400 uppercase text-[10px] block">Validation Experiment:</strong>
                      <p className="text-slate-700 dark:text-slate-300 mt-0.5">{task.validationExperiment}</p>
                    </div>
                    <div>
                      <strong className="text-slate-400 uppercase text-[10px] block">Success Metric:</strong>
                      <p className="text-emerald-600 dark:text-emerald-400 font-bold mt-0.5">{task.successMetric}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
};

function AlertOctagon(props: any) {
  return <AlertCircle {...props} />;
}
