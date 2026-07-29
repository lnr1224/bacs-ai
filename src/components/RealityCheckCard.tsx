import React from 'react';
import { AlertTriangle, ShieldCheck, Target, Lightbulb } from 'lucide-react';
import { RealityCheckItem } from '../types';

interface RealityCheckCardProps {
  items: RealityCheckItem[];
}

export const RealityCheckCard: React.FC<RealityCheckCardProps> = ({ items }) => {
  if (!items || items.length === 0) return null;

  return (
    <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-indigo-500/30 space-y-6 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-indigo-900/80 pb-6">
        <div className="space-y-1">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold uppercase tracking-wider">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
            <span>Memorable Feature • Reality Check</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Top 3 Assumptions to Validate First
          </h3>
          <p className="text-xs sm:text-sm text-slate-300">
            Before making your next major business decision, validate these unverified core hypotheses using low-cost experiments.
          </p>
        </div>

        <div className="shrink-0">
          <div className="px-4 py-2 rounded-xl bg-slate-800/80 border border-slate-700 text-right">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Risk Mitigation</span>
            <span className="text-xs font-semibold text-emerald-400">Save Capital & Time</span>
          </div>
        </div>
      </div>

      {/* Assumptions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
        {items.map((item, index) => (
          <div
            key={index}
            className="bg-slate-800/60 backdrop-blur-md rounded-2xl p-5 border border-indigo-800/40 hover:border-amber-500/50 transition-all flex flex-col justify-between space-y-4 group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center text-xs font-bold border border-amber-500/30">
                  #{index + 1}
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                  Assumption
                </span>
              </div>

              <h4 className="font-bold text-white text-sm leading-snug group-hover:text-amber-300 transition-colors">
                "{item.assumption}"
              </h4>

              <div className="space-y-2 pt-2 text-xs">
                <div>
                  <span className="font-bold text-indigo-300 block mb-0.5 flex items-center space-x-1">
                    <Target className="w-3 h-3 text-indigo-400" />
                    <span>Why It Matters:</span>
                  </span>
                  <p className="text-slate-300 leading-relaxed">{item.whyItMatters}</p>
                </div>

                <div>
                  <span className="font-bold text-rose-300 block mb-0.5 flex items-center space-x-1">
                    <AlertTriangle className="w-3 h-3 text-rose-400" />
                    <span>Risk If Wrong:</span>
                  </span>
                  <p className="text-slate-300 leading-relaxed">{item.riskIfWrong}</p>
                </div>
              </div>
            </div>

            {/* Low-cost Experiment */}
            <div className="pt-3 border-t border-slate-700/80 space-y-1">
              <span className="font-bold text-emerald-400 text-xs flex items-center space-x-1">
                <Lightbulb className="w-3.5 h-3.5 text-emerald-400" />
                <span>Low-Cost Experiment:</span>
              </span>
              <p className="text-xs text-emerald-100 bg-emerald-950/40 p-2.5 rounded-xl border border-emerald-800/40 leading-relaxed">
                {item.lowCostExperiment}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
