import React from 'react';
import { BusinessJSON, IntelligenceAnalysis } from '../types';
import { BACSDashboardEngine } from './BACSDashboardEngine';

interface ExecutiveDashboardProps {
  businessJson: BusinessJSON;
  analysis: IntelligenceAnalysis;
  onNavigateTab: (tab: string) => void;
  onOpenInterview: () => void;
}

export const ExecutiveDashboard: React.FC<ExecutiveDashboardProps> = ({
  businessJson,
  analysis,
  onNavigateTab,
  onOpenInterview
}) => {
  return (
    <div className="space-y-6 pb-12">
      
      {/* Top Banner & Venture Profile */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <span className="px-2.5 py-1 text-xs font-semibold bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 rounded-full border border-indigo-200 dark:border-indigo-800 uppercase tracking-wide">
                Stage: {businessJson.business.stage}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                Industry: <strong className="text-slate-800 dark:text-slate-200">{businessJson.business.industry}</strong> • Location: <strong className="text-slate-800 dark:text-slate-200">{businessJson.business.location || 'Target Region'}</strong>
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {businessJson.business.name}
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-300 max-w-2xl">
              {businessJson.business.description}
            </p>
          </div>

          <button
            onClick={onOpenInterview}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-500/20 transition self-start lg:self-center shrink-0"
          >
            Update Venture Profile
          </button>
        </div>
      </div>

      {/* Main BACS Blueprint Intelligence Engine */}
      <BACSDashboardEngine 
        businessJson={businessJson} 
        onNavigateTab={onNavigateTab}
        onOpenInterview={onOpenInterview}
      />
    </div>
  );
};
