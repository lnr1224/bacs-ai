import React from 'react';
import { Sparkles, ArrowRight, Lightbulb, Building2, Rocket, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { BusinessStage } from '../types';

interface StageWorkspaceHeroProps {
  stage: BusinessStage;
  onBackToLanding: () => void;
  onStartInterview: (stage: BusinessStage) => void;
}

export const StageWorkspaceHero: React.FC<StageWorkspaceHeroProps> = ({
  stage,
  onBackToLanding,
  onStartInterview
}) => {
  const stageConfig = {
    idea: {
      badge: 'Idea Stage Workspace',
      headline: 'Validate before you invest.',
      subtitle: 'De-risk your target customer demand, pricing power, and unit economics before spending capital or quitting your day job.',
      cta: 'Start Idea Diagnosis',
      icon: Lightbulb,
      color: 'from-emerald-500 to-indigo-600',
      badgeClass: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
      benefits: [
        'Test pricing elasticity before inventory commitment',
        'Identify target persona pain points',
        'Formulate $100 validation experiment protocols'
      ]
    },
    existing: {
      badge: 'Existing Business Workspace',
      headline: "Discover what's limiting your growth.",
      subtitle: 'Uncover hidden revenue bottlenecks, acquisition CAC leaks, and operational waste holding back monthly profitability.',
      cta: 'Diagnose Business',
      icon: Building2,
      color: 'from-purple-600 to-indigo-600',
      badgeClass: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
      benefits: [
        'Optimize gross margins & prime cost ratios',
        'Diagnose primary channel CAC inefficiency',
        'Fix customer churn & re-booking dropoff'
      ]
    },
    expansion: {
      badge: 'Expansion Workspace',
      headline: 'Know if your business is ready to scale.',
      subtitle: 'Assess operational readiness, moat defensibility, and team delegation before launching new locations or wholesale channels.',
      cta: 'Run Expansion Assessment',
      icon: Rocket,
      color: 'from-amber-500 to-purple-600',
      badgeClass: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
      benefits: [
        'Evaluate multi-location expansion risk',
        'Audit supply chain & operational delegation',
        'Build 90-day scaling roadmap & KPI milestones'
      ]
    }
  }[stage];

  const StageIcon = stageConfig.icon;

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 space-y-8">
      <button
        onClick={onBackToLanding}
        className="flex items-center space-x-2 text-xs font-semibold text-slate-400 hover:text-white transition"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Business Stage Selection</span>
      </button>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-10 shadow-2xl space-y-8 relative overflow-hidden text-center sm:text-left">
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-5">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-500 text-white flex items-center justify-center shadow-lg shrink-0">
            <StageIcon className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className={`inline-block text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${stageConfig.badgeClass}`}>
              {stageConfig.badge}
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              {stageConfig.headline}
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
              {stageConfig.subtitle}
            </p>
          </div>
        </div>

        <div className="bg-slate-950/80 border border-slate-800/80 p-6 rounded-2xl space-y-3 text-left">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-400 font-mono">
            Key Objectives for this Workspace
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {stageConfig.benefits.map((b, i) => (
              <div key={i} className="flex items-start space-x-2 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                <span>{b}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-800">
          <div className="text-xs text-slate-400 font-mono text-center sm:text-left">
            Adaptive AI Interview • ~3-5 minutes • Instant Business JSON
          </div>

          <button
            onClick={() => onStartInterview(stage)}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-base shadow-lg shadow-purple-600/30 flex items-center justify-center space-x-2 transition-all transform hover:-translate-y-0.5"
          >
            <span>{stageConfig.cta}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
