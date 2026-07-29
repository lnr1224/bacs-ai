import React, { useEffect, useState } from 'react';
import { Sparkles, CheckCircle2, Loader2, ShieldCheck, Cpu, Lightbulb, LayoutDashboard } from 'lucide-react';

interface DemoLoadingModalProps {
  isOpen: boolean;
  businessName?: string;
  onComplete: () => void;
}

export const DemoLoadingModal: React.FC<DemoLoadingModalProps> = ({
  isOpen,
  businessName = 'Business Venture',
  onComplete
}) => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    { label: 'Interview Complete', icon: CheckCircle2, detail: 'Synthesized 12 key business dimensions' },
    { label: 'Business JSON Built', icon: ShieldCheck, detail: 'Constructed canonical single source of truth' },
    { label: 'Running BACS Intelligence...', icon: Cpu, detail: 'Calculating multi-axis Radar & BACS Index score' },
    { label: 'Hidden Business Assumptions™ Analyzed', icon: Lightbulb, detail: 'De-risking top 3 unverified hypotheses' },
    { label: 'Generating Business Workspace...', icon: LayoutDashboard, detail: 'Configuring Action Center & Strategy Copilot' }
  ];

  useEffect(() => {
    if (!isOpen) {
      setActiveStep(0);
      return;
    }

    const interval = setInterval(() => {
      setActiveStep((prev) => {
        if (prev < steps.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setTimeout(() => {
            onComplete();
          }, 600);
          return prev;
        }
      });
    }, 650);

    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-8 shadow-2xl space-y-8 text-center relative overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute -top-12 -left-12 w-48 h-48 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />

        {/* BACS Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>BACS AI Engine</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            Synthesizing {businessName}
          </h2>
          <p className="text-xs text-slate-400">
            Initializing AI Business Intelligence Workspace...
          </p>
        </div>

        {/* Step Progress List */}
        <div className="space-y-4 text-left">
          {steps.map((step, idx) => {
            const isDone = idx < activeStep;
            const isCurrent = idx === activeStep;
            const StepIcon = step.icon;

            return (
              <div
                key={idx}
                className={`p-3.5 rounded-2xl border transition-all flex items-start space-x-3.5 ${
                  isDone
                    ? 'bg-purple-950/20 border-purple-500/30 text-purple-300'
                    : isCurrent
                    ? 'bg-slate-800 border-indigo-500/60 text-white shadow-lg shadow-indigo-500/10 scale-[1.02]'
                    : 'bg-slate-900/50 border-slate-800/80 text-slate-500 opacity-60'
                }`}
              >
                <div className="mt-0.5">
                  {isDone ? (
                    <div className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center text-xs font-bold">
                      ✓
                    </div>
                  ) : isCurrent ? (
                    <Loader2 className="w-5 h-5 text-indigo-400 animate-spin" />
                  ) : (
                    <div className="w-5 h-5 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-[10px]">
                      {idx + 1}
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold truncate">{step.label}</h4>
                    {isDone && <span className="text-[10px] text-purple-400 font-mono">Done</span>}
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5 truncate">{step.detail}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer info */}
        <div className="pt-2 text-[10px] text-slate-500 font-mono">
          BACS AI Platform • Single Source of Truth • Grounded Intelligence
        </div>
      </div>
    </div>
  );
};
