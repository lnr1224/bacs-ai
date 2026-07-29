import React from 'react';
import { 
  ShieldCheck, 
  HelpCircle, 
  AlertTriangle, 
  CheckCircle2, 
  Target, 
  Zap, 
  Search, 
  Calendar, 
  ArrowRight, 
  TrendingDown, 
  HeartHandshake, 
  Users, 
  Clock, 
  RefreshCw, 
  Smile, 
  Award,
  ChevronRight,
  Filter,
  Check
} from 'lucide-react';
import { IntelligenceAnalysis, BACSDecision } from '../types';

interface BACSDecisionEngineViewProps {
  analysis: IntelligenceAnalysis;
  onOpenCopilot?: () => void;
}

export const BACSDecisionEngineView: React.FC<BACSDecisionEngineViewProps> = ({
  analysis
}) => {
  const de = analysis.decisionEngine;
  const cx = analysis.cxMetrics;
  const leakageMap = analysis.leakageMap || [];
  const journey = analysis.businessJourney || [];

  const getDecisionBadge = (decision: BACSDecision = 'Proceed with Validation') => {
    switch (decision) {
      case 'Proceed':
      case 'Scale':
        return {
          bg: 'bg-emerald-600 text-white dark:bg-emerald-500',
          border: 'border-emerald-500',
          text: 'PROCEED / SCALE WITH CONFIDENCE',
          desc: 'High evidence quality and positive unit economics. Capital deployment recommended.'
        };
      case 'Proceed with Validation':
        return {
          bg: 'bg-amber-500 text-white dark:bg-amber-600',
          border: 'border-amber-400',
          text: 'PROCEED WITH LOW-COST VALIDATION',
          desc: 'Promising foundation, but requires empirical customer evidence before major outlay.'
        };
      case 'Pivot':
        return {
          bg: 'bg-violet-600 text-white dark:bg-violet-500',
          border: 'border-violet-500',
          text: 'PIVOT POSITIONING / MODEL',
          desc: 'Current evidence indicates high customer acquisition friction or margin leak.'
        };
      case 'Pause':
      case 'Stop':
        return {
          bg: 'bg-rose-600 text-white dark:bg-rose-500',
          border: 'border-rose-500',
          text: 'PAUSE / STOP CAPITAL COMMITMENT',
          desc: 'Unvalidated core assumptions pose critical financial risk.'
        };
      default:
        return {
          bg: 'bg-indigo-600 text-white',
          border: 'border-indigo-500',
          text: 'PROCEED WITH VALIDATION',
          desc: 'Run targeted low-cost experiments.'
        };
    }
  };

  const badge = getDecisionBadge(de?.decision);

  return (
    <div className="space-y-8">
      
      {/* 1. Decision Hero Box: "Should You Build, Fix, or Scale?" */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl relative overflow-hidden space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-800 pb-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                BACS Decision Engine Output
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Evidence Score: <strong className="text-emerald-400">{de?.customerEvidenceScore || 65}/100</strong>
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Should You Build, Fix, or Scale?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              {de?.decisionRationale || 'Grounding decisions in empirical customer evidence rather than opinion.'}
            </p>
          </div>

          {/* Decision Verdict Badge */}
          <div className="shrink-0 flex flex-col items-start md:items-end space-y-1">
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
              Diagnostic Verdict
            </span>
            <div className={`px-5 py-2.5 rounded-2xl font-black text-sm sm:text-base tracking-wide uppercase shadow-lg ${badge.bg}`}>
              {de?.decision || 'Proceed with Validation'}
            </div>
            <span className="text-[11px] text-slate-400 max-w-xs text-left md:text-right">
              {badge.desc}
            </span>
          </div>
        </div>

        {/* Evidence Collected Tags */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            Verified Evidence Milestones Collected:
          </span>
          <div className="flex flex-wrap gap-2">
            {(de?.evidenceItemsCollected || ['Customer interviews', 'Prototype']).map((item) => (
              <span
                key={item}
                className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-xl text-xs font-semibold bg-slate-800 text-emerald-300 border border-slate-700"
              >
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>{item}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 2. The 5 Core Decision Answers Cards */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Target className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            The 5 Core Decision Engine Answers
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          
          {/* Answer 1: Build / Fix / Scale */}
          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-xs">
                1
              </div>
              <h4 className="font-extrabold text-slate-900 dark:text-white text-sm">
                1. Should you build, fix, or scale?
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-semibold">
                {de?.fiveCoreAnswers?.shouldBuildFixScale || 'Conduct low-cost customer experiments before full build out.'}
              </p>
            </div>
            <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
              Strategic Directive
            </span>
          </div>

          {/* Answer 2: Biggest Leak */}
          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="w-8 h-8 rounded-lg bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold text-xs">
                2
              </div>
              <h4 className="font-extrabold text-slate-900 dark:text-white text-sm">
                2. What's the biggest leak limiting success?
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-semibold">
                {de?.fiveCoreAnswers?.biggestLeak || 'Customer Retention & Onboarding Leak'}
              </p>
            </div>
            <span className="text-[10px] font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider">
              Primary Bottleneck
            </span>
          </div>

          {/* Answer 3: Cause of Leak */}
          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold text-xs">
                3
              </div>
              <h4 className="font-extrabold text-slate-900 dark:text-white text-sm">
                3. What's causing that leak?
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {de?.fiveCoreAnswers?.leakCause || 'Lack of structured post-purchase feedback loops and response latency.'}
              </p>
            </div>
            <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
              Root Cause
            </span>
          </div>

          {/* Answer 4: Cheapest Experiment */}
          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-xs">
                4
              </div>
              <h4 className="font-extrabold text-slate-900 dark:text-white text-sm">
                4. What's the cheapest validation experiment?
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {de?.fiveCoreAnswers?.cheapestExperiment || 'Deploy a $100 pre-order landing page with 2 price tiers.'}
              </p>
            </div>
            <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
              Lowest-Cost Test
            </span>
          </div>

          {/* Answer 5: Action Plan This Week */}
          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 flex flex-col justify-between md:col-span-2 lg:col-span-2">
            <div className="space-y-2">
              <div className="w-8 h-8 rounded-lg bg-violet-100 dark:bg-violet-950 text-violet-600 dark:text-violet-400 flex items-center justify-center font-bold text-xs">
                5
              </div>
              <h4 className="font-extrabold text-slate-900 dark:text-white text-sm">
                5. What should you do this week?
              </h4>
              <p className="text-xs sm:text-sm font-bold text-indigo-600 dark:text-indigo-400 leading-relaxed">
                {de?.fiveCoreAnswers?.thisWeekActionPlan || 'Conduct 5 structured customer problem interviews and set up automated feedback.'}
              </p>
            </div>
            <span className="text-[10px] font-bold text-violet-600 dark:text-violet-400 uppercase tracking-wider">
              Immediate Action Item
            </span>
          </div>

        </div>
      </div>

      {/* 3. Customer Experience (CX) Pillar */}
      {cx && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-slate-900 dark:text-white text-lg">
                  Customer Experience (CX) Pillar
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Measuring post-acquisition retention, service consistency, and trust recovery
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3 bg-emerald-50 dark:bg-emerald-950/60 px-4 py-2 rounded-2xl border border-emerald-200 dark:border-emerald-800">
              <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 uppercase">
                CX Rating:
              </span>
              <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
                {cx.score}/100
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-1">
              <span className="text-slate-400 block font-semibold text-[10px] uppercase">Response Time SLA</span>
              <span className="font-bold text-slate-900 dark:text-white">{cx.responseTime}</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-1">
              <span className="text-slate-400 block font-semibold text-[10px] uppercase">Complaint Handling</span>
              <span className="font-bold text-slate-900 dark:text-white">{cx.complaintHandling}</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-1">
              <span className="text-slate-400 block font-semibold text-[10px] uppercase">Refund Experience</span>
              <span className="font-bold text-slate-900 dark:text-white">{cx.refundExperience}</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-1">
              <span className="text-slate-400 block font-semibold text-[10px] uppercase">Net Promoter Score</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">{cx.npsScore}</span>
            </div>
          </div>
        </div>
      )}

      {/* 4. Customer Leakage Map */}
      {leakageMap.length > 0 && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="flex items-center space-x-3 border-b border-slate-100 dark:border-slate-800 pb-4">
            <Filter className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <div>
              <h3 className="font-extrabold text-slate-900 dark:text-white text-lg">
                Customer Leakage Map
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Identifying where customers drop off along the acquisition and retention funnel
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            {leakageMap.map((item, idx) => (
              <div
                key={item.stageName}
                className={`p-4 rounded-2xl border transition space-y-2 relative ${
                  item.isPrimaryLeak
                    ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800 shadow-sm'
                    : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700'
                }`}
              >
                {item.isPrimaryLeak && (
                  <span className="absolute -top-2.5 right-3 text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-rose-600 text-white">
                    Primary Leak
                  </span>
                )}
                
                <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase">
                  Step {idx + 1}
                </div>
                <div className="font-extrabold text-slate-900 dark:text-white text-sm">
                  {item.stageName}
                </div>
                <div className="text-2xl font-black text-indigo-600 dark:text-indigo-400">
                  {item.count}
                </div>
                <div className="text-[11px] text-slate-500 font-semibold">
                  Conversion: {item.conversionRate}
                </div>

                {item.leakReason && (
                  <p className="text-[10px] text-rose-700 dark:text-rose-300 pt-1 font-semibold border-t border-rose-200 dark:border-rose-900">
                    ⚠️ {item.leakReason}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. BACS Business Journey */}
      {journey.length > 0 && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="flex items-center space-x-3 border-b border-slate-100 dark:border-slate-800 pb-4">
            <Users className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <div>
              <h3 className="font-extrabold text-slate-900 dark:text-white text-lg">
                BACS Business Journey Matrix
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Mapping risks, evidence levels, and leaks across all 8 customer lifecycle stages
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 uppercase tracking-wider font-bold">
                  <th className="pb-3 pr-4">Stage</th>
                  <th className="pb-3 pr-4">Risk</th>
                  <th className="pb-3 pr-4">Evidence</th>
                  <th className="pb-3 pr-4">Leak Friction</th>
                  <th className="pb-3">Recommendation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {journey.map((j) => (
                  <tr key={j.stage} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition">
                    <td className="py-3.5 pr-4 font-bold text-slate-900 dark:text-white">
                      {j.stage}
                    </td>
                    <td className="py-3.5 pr-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        j.riskLevel === 'Critical' ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300' :
                        j.riskLevel === 'High' ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300' :
                        'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                      }`}>
                        {j.riskLevel}
                      </span>
                    </td>
                    <td className="py-3.5 pr-4">
                      <span className="font-semibold text-slate-600 dark:text-slate-300">
                        {j.evidenceLevel}
                      </span>
                    </td>
                    <td className="py-3.5 pr-4 text-slate-600 dark:text-slate-300">
                      {j.leakDescription}
                    </td>
                    <td className="py-3.5 font-bold text-indigo-600 dark:text-indigo-400">
                      {j.recommendation}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
};
