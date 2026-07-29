import React, { useState } from 'react';
import { 
  ShieldAlert, 
  FlaskConical, 
  DollarSign, 
  HelpCircle, 
  AlertOctagon, 
  CheckCircle2, 
  ArrowRight,
  Info,
  Sparkles
} from 'lucide-react';
import { BusinessJSON, RealityCheckItem } from '../types';

interface RealityCheckViewProps {
  businessJson: BusinessJSON;
  realityCheck: RealityCheckItem[];
  onNavigateTab: (tab: string) => void;
}

export const RealityCheckView: React.FC<RealityCheckViewProps> = ({
  businessJson,
  realityCheck,
  onNavigateTab
}) => {
  const [completedExperiments, setCompletedExperiments] = useState<Record<number, boolean>>({});

  const toggleExperiment = (index: number) => {
    setCompletedExperiments(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-1 text-xs font-bold bg-red-500/20 text-red-300 border border-red-500/30 rounded-full uppercase tracking-wider flex items-center space-x-1">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>De-Risking Engine</span>
            </span>
            <span className="text-xs text-slate-300">
              Stage: <strong className="text-white">{businessJson.business.stage}</strong>
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Reality Check & Capital De-Risking
          </h1>

          <p className="text-sm text-slate-300 leading-relaxed">
            Every business failure stems from unvalidated assumptions treated as truth. Below are your top 3 highest-risk hypotheses, paired with fast, low-cost ($100 or less) empirical experiments to test them before committing major capital.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {realityCheck.map((item, idx) => {
          const isDone = !!completedExperiments[idx];
          return (
            <div 
              key={idx}
              className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden shadow-sm ${
                isDone ? 'border-emerald-200 bg-emerald-50/20' : 'border-slate-200 hover:border-indigo-300'
              }`}
            >
              <div className="p-5 sm:p-6 border-b border-slate-100 flex items-start justify-between gap-4">
                <div className="flex items-start space-x-3">
                  <span className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                    #{idx + 1}
                  </span>
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Primary Assumption</span>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                      "{item.assumption}"
                    </h3>
                  </div>
                </div>

                <button
                  onClick={() => toggleExperiment(idx)}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition flex-shrink-0 ${
                    isDone 
                      ? 'bg-emerald-600 text-white shadow-sm' 
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{isDone ? 'Experiment Validated' : 'Mark Completed'}</span>
                </button>
              </div>

              <div className="p-5 sm:p-6 grid grid-cols-1 lg:grid-cols-3 gap-6 bg-slate-50/50">
                <div className="space-y-1.5">
                  <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-700">
                    <Info className="w-4 h-4 text-indigo-600" />
                    <span>Why It Matters</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.whyItMatters}
                  </p>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center space-x-1.5 text-xs font-bold text-red-700">
                    <AlertOctagon className="w-4 h-4 text-red-600" />
                    <span>Risk If Wrong</span>
                  </div>
                  <p className="text-xs text-red-900 bg-red-50/80 p-2.5 rounded-lg border border-red-100 leading-relaxed font-medium">
                    {item.riskIfWrong}
                  </p>
                </div>

                <div className="space-y-1.5 bg-indigo-50/80 p-3.5 rounded-xl border border-indigo-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1.5 text-xs font-bold text-indigo-900">
                      <FlaskConical className="w-4 h-4 text-indigo-600" />
                      <span>$100 Low-Cost Experiment</span>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 bg-indigo-200 text-indigo-900 rounded font-semibold">
                      Budget &lt; $100
                    </span>
                  </div>
                  <p className="text-xs text-indigo-950 leading-relaxed font-medium">
                    {item.lowCostExperiment}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-2xl p-6 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-indigo-100 text-indigo-700 rounded-xl">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 text-sm">Need help designing an experiment protocol?</h4>
            <p className="text-xs text-slate-500">Ask Strategy Copilot for step-by-step ad copy, survey questions, or landing page layouts.</p>
          </div>
        </div>

        <button
          onClick={() => onNavigateTab('copilot')}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-md transition flex items-center space-x-1.5 whitespace-nowrap"
        >
          <span>Ask Copilot for Details</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
