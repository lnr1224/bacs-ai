import React, { useState } from 'react';
import { 
  AlertTriangle, 
  Lightbulb, 
  Target, 
  ChevronDown, 
  ChevronUp, 
  ShieldAlert, 
  HelpCircle,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { RealityCheckItem } from '../types';

interface HiddenAssumptionsViewProps {
  items: RealityCheckItem[];
  onNavigateCopilot?: () => void;
}

export const HiddenAssumptionsView: React.FC<HiddenAssumptionsViewProps> = ({ 
  items,
  onNavigateCopilot
}) => {
  const [expandedIndices, setExpandedIndices] = useState<number[]>([0, 1, 2]);

  const toggleExpand = (idx: number) => {
    setExpandedIndices(prev => 
      prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
    );
  };

  const getRiskBadgeClass = (riskLevel?: string) => {
    switch (riskLevel) {
      case 'Critical':
        return 'bg-rose-500/20 text-rose-300 border-rose-500/30';
      case 'High':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
      default:
        return 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30';
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto py-4 px-4 sm:px-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-3 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center space-x-2">
          <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center space-x-1">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
            <span>Core Hypotheses</span>
          </span>
          <span className="text-xs font-mono text-slate-400">
            BACS Risk Analysis Engine
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Hidden Business Assumptions™
        </h1>

        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
          Your business currently depends on dozens of assumptions. AI has identified the three assumptions most likely to prevent success. Validate these before investing further.
        </p>
      </div>

      {/* Assumptions List (Expandable Cards) */}
      <div className="space-y-4">
        {items.map((item, index) => {
          const isExpanded = expandedIndices.includes(index);
          const riskLevel = item.riskLevel || (index === 0 ? 'Critical' : index === 1 ? 'High' : 'Medium');

          return (
            <div
              key={index}
              className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-md hover:border-slate-700 transition-all"
            >
              {/* Card Header (Click to toggle) */}
              <div
                onClick={() => toggleExpand(index)}
                className="p-5 flex items-start justify-between cursor-pointer gap-4 hover:bg-slate-800/40 transition-colors"
              >
                <div className="flex items-start space-x-3 min-w-0">
                  <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 shrink-0 flex items-center justify-center text-xs font-bold border border-amber-500/30 mt-0.5">
                    #{index + 1}
                  </div>
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center space-x-2 flex-wrap gap-1">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${getRiskBadgeClass(riskLevel)}`}>
                        {riskLevel} Risk
                      </span>
                      <span className="text-[11px] text-slate-400">Assumption #{index + 1}</span>
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-white leading-snug">
                      "{item.assumption}"
                    </h3>
                  </div>
                </div>

                <button className="p-1.5 text-slate-400 hover:text-white rounded-lg">
                  {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </button>
              </div>

              {/* Expandable Body */}
              {isExpanded && (
                <div className="px-5 pb-5 pt-1 space-y-4 border-t border-slate-800/80 text-xs animate-in fade-in duration-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Why It Matters */}
                    <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/60 space-y-1">
                      <span className="font-bold text-purple-300 block text-[11px] flex items-center space-x-1">
                        <Target className="w-3.5 h-3.5 text-purple-400" />
                        <span>Why It Matters:</span>
                      </span>
                      <p className="text-slate-300 leading-relaxed text-[11px]">
                        {item.whyItMatters}
                      </p>
                    </div>

                    {/* Risk If Wrong */}
                    <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/60 space-y-1">
                      <span className="font-bold text-rose-300 block text-[11px] flex items-center space-x-1">
                        <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                        <span>Risk If Wrong:</span>
                      </span>
                      <p className="text-slate-300 leading-relaxed text-[11px]">
                        {item.riskIfWrong}
                      </p>
                    </div>
                  </div>

                  {/* Low-cost Validation Experiment */}
                  <div className="bg-emerald-950/30 border border-emerald-800/40 p-4 rounded-xl space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-emerald-400 text-xs flex items-center space-x-1">
                        <Lightbulb className="w-4 h-4 text-emerald-400" />
                        <span>Validation Experiment (Low-Cost):</span>
                      </span>
                      <span className="text-[10px] font-mono text-emerald-300 bg-emerald-900/60 px-2 py-0.5 rounded border border-emerald-700">
                        Target Budget: &lt;$100-$250
                      </span>
                    </div>

                    <p className="text-emerald-100 text-xs leading-relaxed font-medium">
                      {item.lowCostExperiment}
                    </p>

                    {item.expectedLearning && (
                      <div className="pt-2 border-t border-emerald-800/30 flex items-center space-x-2 text-[11px] text-emerald-200">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span><strong>Expected Learning:</strong> {item.expectedLearning}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {onNavigateCopilot && (
        <div className="pt-2 flex justify-end">
          <button
            onClick={onNavigateCopilot}
            className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs flex items-center space-x-2 shadow"
          >
            <Sparkles className="w-4 h-4" />
            <span>Formulate Experiment Protocols with Strategy Copilot</span>
          </button>
        </div>
      )}
    </div>
  );
};
