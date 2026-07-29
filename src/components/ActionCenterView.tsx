import React, { useState, useEffect } from 'react';
import { 
  CheckSquare, 
  Square, 
  Clock, 
  Target, 
  Sparkles, 
  Filter, 
  Award,
  Calendar,
  Zap,
  CheckCircle2,
  ListTodo
} from 'lucide-react';
import { ActionTaskItem, IntelligenceAnalysis, BusinessJSON } from '../types';

interface ActionCenterViewProps {
  businessJson: BusinessJSON;
  analysis: IntelligenceAnalysis;
  profileId?: string;
}

export const ActionCenterView: React.FC<ActionCenterViewProps> = ({
  businessJson,
  analysis,
  profileId = 'default_profile'
}) => {
  const [tasks, setTasks] = useState<ActionTaskItem[]>(() => {
    // Attempt to load saved task states from localStorage
    const saved = localStorage.getItem(`bacs_tasks_${profileId}`);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved tasks', e);
      }
    }

    // Default task generation from analysis recommendations
    const generated: ActionTaskItem[] = [];

    // 1. One Thing to Fix
    if (analysis.oneThingToFix) {
      generated.push({
        id: 'task_onething',
        title: analysis.oneThingToFix.actionStep || analysis.oneThingToFix.title,
        timeframe: 'Today',
        source: 'One Thing to Fix First',
        completed: false,
        effort: analysis.oneThingToFix.estimatedEffort,
        impact: analysis.oneThingToFix.expectedImpact
      });
    }

    // 2. Reality Check experiments
    analysis.realityCheck.forEach((rc, i) => {
      generated.push({
        id: `task_rc_${i}`,
        title: `Execute validation experiment: ${rc.lowCostExperiment}`,
        timeframe: i === 0 ? 'Today' : 'This Week',
        source: `Hidden Assumption #${i + 1}`,
        completed: false,
        effort: '< $100 budget',
        impact: 'High De-risking'
      });
    });

    // 3. Quick Wins
    analysis.quickWins.forEach((qw, i) => {
      generated.push({
        id: `task_qw_${i}`,
        title: qw,
        timeframe: 'This Week',
        source: 'Quick Win',
        completed: false,
        effort: 'Low Effort',
        impact: 'Immediate Growth'
      });
    });

    // 4. Roadmap Items
    analysis.roadmap.forEach(r => {
      const timeframe: ActionTaskItem['timeframe'] = 
        r.phase === 'Phase 1' ? '30-Day Plan' : '90-Day Plan';

      r.items.forEach((item, idx) => {
        generated.push({
          id: `task_${r.phase}_${idx}`,
          title: item,
          timeframe,
          source: r.title,
          completed: false,
          effort: r.focusArea,
          impact: r.duration
        });
      });
    });

    return generated;
  });

  const [activeFilter, setActiveFilter] = useState<'All' | 'Today' | 'This Week' | '30-Day Plan' | '90-Day Plan' | 'Completed'>('All');

  // Sync to localStorage on change
  useEffect(() => {
    localStorage.setItem(`bacs_tasks_${profileId}`, JSON.stringify(tasks));
  }, [tasks, profileId]);

  const toggleTask = (id: string) => {
    setTasks(prev =>
      prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const totalCount = tasks.length;
  const completedCount = tasks.filter(t => t.completed).length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const timeframes: Array<'Today' | 'This Week' | '30-Day Plan' | '90-Day Plan'> = [
    'Today',
    'This Week',
    '30-Day Plan',
    '90-Day Plan'
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto py-4 px-4 sm:px-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              Execution Control Center
            </span>
            <span className="text-xs font-mono text-slate-400">
              Action Plan Engine
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Action Center
          </h1>
          <p className="text-xs text-slate-400">
            Turn BACS AI diagnosis recommendations into completed milestones.
          </p>
        </div>

        {/* Progress Tracker */}
        <div className="bg-slate-800/90 border border-slate-700 p-4 rounded-2xl min-w-[220px] space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-200">
            <span className="flex items-center space-x-1.5">
              <ListTodo className="w-4 h-4 text-emerald-400" />
              <span>Execution Progress</span>
            </span>
            <span className="font-mono text-emerald-400">{progressPercent}%</span>
          </div>

          <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden border border-slate-700">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-400 transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <div className="text-[10px] font-mono text-slate-400 text-right">
            {completedCount} of {totalCount} tasks completed
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1 text-xs">
        {(['All', 'Today', 'This Week', '30-Day Plan', '90-Day Plan', 'Completed'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveFilter(tab)}
            className={`px-3.5 py-2 rounded-xl border transition shrink-0 font-semibold ${
              activeFilter === tab
                ? 'bg-purple-600 text-white border-purple-500 shadow-md'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            {tab} {tab === 'Completed' ? `(${completedCount})` : ''}
          </button>
        ))}
      </div>

      {/* Timeframe Sections */}
      <div className="space-y-6">
        {timeframes.map(tf => {
          if (activeFilter !== 'All' && activeFilter !== 'Completed' && activeFilter !== tf) {
            return null;
          }

          let sectionTasks = tasks.filter(t => t.timeframe === tf);
          if (activeFilter === 'Completed') {
            sectionTasks = sectionTasks.filter(t => t.completed);
          }

          if (sectionTasks.length === 0) return null;

          return (
            <div key={tf} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-purple-400" />
                  <span>{tf}</span>
                </h3>
                <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                  {sectionTasks.filter(t => t.completed).length}/{sectionTasks.length} Completed
                </span>
              </div>

              <div className="space-y-2">
                {sectionTasks.map(task => (
                  <div
                    key={task.id}
                    onClick={() => toggleTask(task.id)}
                    className={`p-3.5 rounded-xl border transition-all flex items-start space-x-3 cursor-pointer ${
                      task.completed
                        ? 'bg-slate-950/60 border-slate-800 text-slate-500 opacity-60'
                        : 'bg-slate-800/60 border-slate-700/70 text-slate-200 hover:border-purple-500/50'
                    }`}
                  >
                    <div className="mt-0.5 shrink-0 text-purple-400">
                      {task.completed ? (
                        <CheckSquare className="w-5 h-5 text-emerald-400" />
                      ) : (
                        <Square className="w-5 h-5 text-slate-400 hover:text-purple-400" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0 space-y-1">
                      <p className={`text-xs sm:text-sm font-medium ${task.completed ? 'line-through text-slate-500' : 'text-slate-200'}`}>
                        {task.title}
                      </p>

                      <div className="flex items-center space-x-3 text-[10px] text-slate-400 font-mono">
                        <span className="bg-slate-900 px-2 py-0.5 rounded text-purple-300 border border-slate-800">
                          Source: {task.source}
                        </span>
                        {task.effort && <span>Effort: {task.effort}</span>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
