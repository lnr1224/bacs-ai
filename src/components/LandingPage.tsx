import React from 'react';
import { Sparkles, ArrowRight, Play, CheckCircle2, ShieldCheck, Cpu, MessageSquareText, Layers, TrendingUp, Building2, Lightbulb, Rocket } from 'lucide-react';
import { BusinessStage } from '../types';
import { DEMO_PRESETS } from '../data/demoBusinesses';

interface LandingPageProps {
  onSelectStage: (stage: BusinessStage) => void;
  onSelectDemo: (presetId: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onSelectStage, onSelectDemo }) => {
  return (
    <div className="space-y-16 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="text-center space-y-6 pt-6 pb-4 max-w-4xl mx-auto">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-200/80 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-semibold shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-indigo-500 animate-pulse" />
          <span>BACS AI Business Consultant • BuildFest 2026</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
          Find what's holding your business back—<br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">
            and what to do next.
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto">
          BACS AI diagnoses business ideas, existing businesses, and expansion plans using structured AI intelligence grounded in a single-source-of-truth Business JSON.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={() => onSelectStage('idea')}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-base shadow-lg shadow-indigo-600/30 flex items-center justify-center space-x-2 transition-all transform hover:-translate-y-0.5"
          >
            <span>Start Free Diagnosis</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          <button
            onClick={() => onSelectDemo('organic-skincare')}
            className="w-full sm:w-auto px-7 py-4 rounded-xl bg-white dark:bg-slate-800 text-slate-800 dark:text-white font-semibold text-base border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/60 shadow-sm flex items-center justify-center space-x-2 transition-all"
          >
            <Play className="w-4 h-4 text-indigo-600 dark:text-indigo-400 fill-current" />
            <span>Try Instant Demo</span>
          </button>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 pt-6 text-xs text-slate-500 dark:text-slate-400 font-medium">
          <span className="flex items-center space-x-1">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>No Signup Required</span>
          </span>
          <span className="flex items-center space-x-1">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>Structured Business JSON Memory</span>
          </span>
          <span className="flex items-center space-x-1">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>Memorable Reality Check Engine</span>
          </span>
        </div>
      </div>

      {/* Three Stage Scenarios Section */}
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Choose Your Business Stage
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Select your current scenario to launch a tailored, adaptive AI interview.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Business Idea */}
          <div
            onClick={() => onSelectStage('idea')}
            className="group relative p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-indigo-500 dark:hover:border-indigo-500 transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                <Lightbulb className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">Scenario 1</span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  I Have a Business Idea
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                  Validate market demand, pricing power, and unit economics before investing real capital or quitting your day job.
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-indigo-600 dark:text-indigo-400">
              <span>Goal: Validate before investing</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 2: Existing Business */}
          <div
            onClick={() => onSelectStage('existing')}
            className="group relative p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-indigo-500 dark:hover:border-indigo-500 transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">Scenario 2</span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  I Already Own a Business
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                  Diagnose why revenue or profit is stalling, uncover food/labor waste, fix customer churn, and optimize acquisition CAC.
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-indigo-600 dark:text-indigo-400">
              <span>Goal: Diagnose underperformance</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 3: Expansion Planning */}
          <div
            onClick={() => onSelectStage('expansion')}
            className="group relative p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-indigo-500 dark:hover:border-indigo-500 transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <Rocket className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Scenario 3</span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  I Want to Expand
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                  Determine expansion readiness for new locations, productized retainers, wholesale distribution, or team scaling.
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-indigo-600 dark:text-indigo-400">
              <span>Goal: Determine expansion readiness</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>

      {/* Instant Demo Presets Showcase */}
      <div className="space-y-6 pt-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Instant Demo Presets
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Click any sample business below to instantly view its generated Business JSON, BACS Scores, Reality Check, and Copilot.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {DEMO_PRESETS.map((preset) => (
            <div
              key={preset.id}
              onClick={() => onSelectDemo(preset.id)}
              className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500 dark:hover:border-indigo-500 transition-all cursor-pointer hover:shadow-md flex flex-col justify-between group"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
                    {preset.industry}
                  </span>
                  <span className="text-[10px] font-semibold text-slate-400 capitalize">
                    {preset.stage}
                  </span>
                </div>
                <h4 className="font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {preset.name}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                  {preset.tagline}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                <span className="font-mono text-indigo-600 dark:text-indigo-400 font-bold">
                  BACS Index {preset.analysis.bacsIndexScore}
                </span>
                <span className="text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 font-semibold flex items-center space-x-1">
                  <span>View Dashboard</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Philosophy & Architecture Showcase */}
      <div className="p-8 rounded-3xl bg-slate-900 text-white space-y-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-2xl space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">Core Architecture</span>
          <h3 className="text-3xl font-extrabold tracking-tight">
            Not a generic chatbot. Grounded in Business JSON Memory.
          </h3>
          <p className="text-slate-300 text-sm leading-relaxed">
            Generic LLMs hallucinate advice without knowing your unit economics. BACS AI enforces a single-source-of-truth Business JSON that drives every recommendation, reality check, and strategy response.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-2">
          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 space-y-2">
            <Layers className="w-6 h-6 text-indigo-400" />
            <h4 className="font-bold text-white text-sm">Structured JSON</h4>
            <p className="text-xs text-slate-400">Captures market, pricing, operations, competition, proof, and risks.</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 space-y-2">
            <Cpu className="w-6 h-6 text-violet-400" />
            <h4 className="font-bold text-white text-sm">Intelligence Engine</h4>
            <p className="text-xs text-slate-400">Produces 8 health scores, priority levels, and 90-day execution roadmaps.</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 space-y-2">
            <ShieldCheck className="w-6 h-6 text-amber-400" />
            <h4 className="font-bold text-white text-sm">Reality Check</h4>
            <p className="text-xs text-slate-400">Identifies top 3 core assumptions and designs low-cost experiments.</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 space-y-2">
            <MessageSquareText className="w-6 h-6 text-emerald-400" />
            <h4 className="font-bold text-white text-sm">Strategy Copilot</h4>
            <p className="text-xs text-slate-400">Senior AI consultant that strictly obeys your business facts without fluff.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
