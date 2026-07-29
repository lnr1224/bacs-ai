import React, { useState } from 'react';
import { 
  Zap, 
  Target, 
  CheckCircle2, 
  Sparkles, 
  Clock, 
  AlertCircle,
  Layers,
  Info
} from 'lucide-react';
import { BusinessJSON, PriorityMatrixItem } from '../types';

interface PriorityMatrixViewProps {
  businessJson: BusinessJSON;
  priorityMatrix: PriorityMatrixItem[];
  onNavigateTab: (tab: string) => void;
}

export const PriorityMatrixView: React.FC<PriorityMatrixViewProps> = ({
  businessJson,
  priorityMatrix,
  onNavigateTab
}) => {
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>({});

  const toggleTask = (taskName: string) => {
    setCompletedTasks(prev => ({
      ...prev,
      [taskName]: !prev[taskName]
    }));
  };

  const getQuadrantItems = (quadrantName: PriorityMatrixItem['quadrant']) => {
    return priorityMatrix.filter(item => item.quadrant === quadrantName);
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-1 text-xs font-bold bg-indigo-50 text-indigo-700 rounded-full border border-indigo-200 uppercase tracking-wider">
              Strategic Prioritization
            </span>
            <span className="text-xs text-slate-500">
              Impact vs. Effort 2x2 Matrix
            </span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mt-2">
            Execution Priority Matrix
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Focus first on High Impact / Low Effort Quick Wins before tackling Major Projects.
          </p>
        </div>
      </div>

      <div className="relative bg-slate-900 p-4 sm:p-6 rounded-3xl text-white shadow-xl overflow-hidden">
        <div className="text-center font-bold text-xs uppercase tracking-widest text-indigo-400 mb-3">
          ▲ HIGH IMPACT
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-2xl p-5 backdrop-blur-sm relative group hover:border-emerald-400 transition">
            <div className="flex items-center justify-between mb-3 border-b border-emerald-500/20 pb-2">
              <div className="flex items-center space-x-2">
                <div className="p-1.5 bg-emerald-500 text-white rounded-lg">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-emerald-300">Quick Wins</h3>
                  <p className="text-[10px] text-emerald-400">High Impact • Low Effort</p>
                </div>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">
                PRIORITY #1
              </span>
            </div>

            <div className="space-y-2.5">
              {getQuadrantItems('Quick Win').map((item, idx) => (
                <div 
                  key={idx}
                  onClick={() => toggleTask(item.task)}
                  className={`p-3 rounded-xl border text-xs cursor-pointer transition flex items-start space-x-2.5 ${
                    completedTasks[item.task]
                      ? 'bg-emerald-900/40 border-emerald-500/40 text-emerald-300 line-through opacity-70'
                      : 'bg-emerald-900/20 border-emerald-500/30 hover:bg-emerald-900/40 text-emerald-100'
                  }`}
                >
                  <CheckCircle2 className={`w-4 h-4 mt-0.5 flex-shrink-0 ${completedTasks[item.task] ? 'text-emerald-400' : 'text-emerald-500/60'}`} />
                  <span className="font-medium leading-relaxed">{item.task}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-indigo-950/40 border border-indigo-500/30 rounded-2xl p-5 backdrop-blur-sm group hover:border-indigo-400 transition">
            <div className="flex items-center justify-between mb-3 border-b border-indigo-500/20 pb-2">
              <div className="flex items-center space-x-2">
                <div className="p-1.5 bg-indigo-500 text-white rounded-lg">
                  <Target className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-indigo-300">Major Projects</h3>
                  <p className="text-[10px] text-indigo-400">High Impact • High Effort</p>
                </div>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-bold">
                PLAN & SCHEDULE
              </span>
            </div>

            <div className="space-y-2.5">
              {getQuadrantItems('Major Project').map((item, idx) => (
                <div 
                  key={idx}
                  onClick={() => toggleTask(item.task)}
                  className={`p-3 rounded-xl border text-xs cursor-pointer transition flex items-start space-x-2.5 ${
                    completedTasks[item.task]
                      ? 'bg-indigo-900/40 border-indigo-500/40 text-indigo-300 line-through opacity-70'
                      : 'bg-indigo-900/20 border-indigo-500/30 hover:bg-indigo-900/40 text-indigo-100'
                  }`}
                >
                  <CheckCircle2 className={`w-4 h-4 mt-0.5 flex-shrink-0 ${completedTasks[item.task] ? 'text-indigo-400' : 'text-indigo-500/60'}`} />
                  <span className="font-medium leading-relaxed">{item.task}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-5 backdrop-blur-sm group hover:border-slate-600 transition">
            <div className="flex items-center justify-between mb-3 border-b border-slate-700/50 pb-2">
              <div className="flex items-center space-x-2">
                <div className="p-1.5 bg-slate-600 text-white rounded-lg">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-300">Fill-in Tasks</h3>
                  <p className="text-[10px] text-slate-400">Low Impact • Low Effort</p>
                </div>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-700 text-slate-300 font-bold">
                DELEGATE / OFF-PEAK
              </span>
            </div>

            <div className="space-y-2.5">
              {getQuadrantItems('Fill-in').map((item, idx) => (
                <div 
                  key={idx}
                  onClick={() => toggleTask(item.task)}
                  className={`p-3 rounded-xl border text-xs cursor-pointer transition flex items-start space-x-2.5 ${
                    completedTasks[item.task]
                      ? 'bg-slate-800 border-slate-600 text-slate-400 line-through opacity-70'
                      : 'bg-slate-800/60 border-slate-700 hover:bg-slate-800 text-slate-300'
                  }`}
                >
                  <CheckCircle2 className={`w-4 h-4 mt-0.5 flex-shrink-0 ${completedTasks[item.task] ? 'text-slate-400' : 'text-slate-500'}`} />
                  <span className="font-medium leading-relaxed">{item.task}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-red-950/20 border border-red-500/20 rounded-2xl p-5 backdrop-blur-sm group hover:border-red-500/40 transition">
            <div className="flex items-center justify-between mb-3 border-b border-red-500/20 pb-2">
              <div className="flex items-center space-x-2">
                <div className="p-1.5 bg-red-800/80 text-white rounded-lg">
                  <AlertCircle className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-red-300">Thankless Tasks</h3>
                  <p className="text-[10px] text-red-400">Low Impact • High Effort</p>
                </div>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-500/20 text-red-300 border border-red-500/30 font-bold">
                DE-PRIORITIZE
              </span>
            </div>

            <div className="space-y-2.5">
              {getQuadrantItems('Thankless Task').map((item, idx) => (
                <div 
                  key={idx}
                  onClick={() => toggleTask(item.task)}
                  className={`p-3 rounded-xl border text-xs cursor-pointer transition flex items-start space-x-2.5 ${
                    completedTasks[item.task]
                      ? 'bg-red-950/40 border-red-500/30 text-red-400 line-through opacity-70'
                      : 'bg-red-950/30 border-red-500/20 hover:bg-red-950/50 text-red-200'
                  }`}
                >
                  <CheckCircle2 className={`w-4 h-4 mt-0.5 flex-shrink-0 ${completedTasks[item.task] ? 'text-red-400' : 'text-red-500/50'}`} />
                  <span className="font-medium leading-relaxed">{item.task}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center text-[11px] font-bold text-slate-400 mt-4 px-2">
          <span>◀ LOW EFFORT</span>
          <span>HIGH EFFORT ▶</span>
        </div>
      </div>
    </div>
  );
};
