import React, { useState } from 'react';
import { 
  Calendar, 
  CheckCircle2, 
  Circle, 
  Download, 
  Share2, 
  Target, 
  Clock,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { BusinessJSON, RoadmapItem } from '../types';

interface RoadmapViewProps {
  businessJson: BusinessJSON;
  roadmap: RoadmapItem[];
  onNavigateTab: (tab: string) => void;
}

export const RoadmapView: React.FC<RoadmapViewProps> = ({
  businessJson,
  roadmap,
  onNavigateTab
}) => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const toggleItem = (key: string) => {
    setCheckedItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const totalTasks = roadmap.reduce((acc, phase) => acc + phase.items.length, 0);
  const completedTasks = Object.values(checkedItems).filter(Boolean).length;
  const progressPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const exportRoadmapMarkdown = () => {
    let md = `# 90-Day Execution Roadmap: ${businessJson.business.name}\n`;
    md += `Industry: ${businessJson.business.industry} | Stage: ${businessJson.business.stage}\n\n`;

    roadmap.forEach(phase => {
      md += `## ${phase.phase}: ${phase.title} (${phase.duration})\n`;
      md += `**Focus Area:** ${phase.focusArea}\n\n`;
      phase.items.forEach(item => {
        md += `- [ ] ${item}\n`;
      });
      md += `\n`;
    });

    const blob = new Blob([md], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${businessJson.business.name.toLowerCase().replace(/\s+/g, '_')}_90day_roadmap.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-1 text-xs font-bold bg-emerald-50 text-emerald-700 rounded-full border border-emerald-200 uppercase tracking-wider">
              90-Day Masterplan
            </span>
            <span className="text-xs text-slate-500">
              {completedTasks} of {totalTasks} milestones completed
            </span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mt-2">
            90-Day Strategic Execution Roadmap
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Sequenced growth milestones customized for {businessJson.business.name} ({businessJson.business.stage} stage).
          </p>
        </div>

        <div className="flex items-center space-x-3 w-full md:w-auto">
          <div className="hidden sm:block text-right pr-4 border-r border-slate-200">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Overall Progress</p>
            <p className="text-xl font-extrabold text-slate-900">{progressPercent}%</p>
          </div>

          <button
            onClick={exportRoadmapMarkdown}
            className="flex-1 md:flex-initial flex items-center justify-center space-x-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl shadow transition"
          >
            <Download className="w-4 h-4" />
            <span>Export Markdown</span>
          </button>
        </div>
      </div>

      <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
        <div 
          className="bg-emerald-500 h-full rounded-full transition-all duration-500"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {roadmap.map((phase, pIdx) => {
          const colorStyles = [
            { bg: 'border-indigo-200 bg-indigo-50/20', headerBg: 'bg-indigo-600', badge: 'bg-indigo-100 text-indigo-800' },
            { bg: 'border-blue-200 bg-blue-50/20', headerBg: 'bg-blue-600', badge: 'bg-blue-100 text-blue-800' },
            { bg: 'border-emerald-200 bg-emerald-50/20', headerBg: 'bg-emerald-600', badge: 'bg-emerald-100 text-emerald-800' }
          ][pIdx % 3];

          return (
            <div 
              key={pIdx}
              className={`bg-white rounded-2xl border shadow-sm overflow-hidden flex flex-col justify-between ${colorStyles.bg}`}
            >
              <div>
                <div className={`p-4 text-white ${colorStyles.headerBg}`}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded">
                      {phase.phase}
                    </span>
                    <span className="text-xs font-medium opacity-90 flex items-center space-x-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{phase.duration}</span>
                    </span>
                  </div>
                  <h3 className="text-lg font-bold">{phase.title}</h3>
                </div>

                <div className="px-4 py-3 border-b border-slate-100 bg-white">
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Primary Focus</p>
                  <p className="text-xs font-semibold text-slate-800">{phase.focusArea}</p>
                </div>

                <div className="p-4 space-y-3">
                  {phase.items.map((item, iIdx) => {
                    const itemKey = `${pIdx}_${iIdx}`;
                    const isChecked = !!checkedItems[itemKey];

                    return (
                      <div 
                        key={iIdx}
                        onClick={() => toggleItem(itemKey)}
                        className={`p-3 rounded-xl border text-xs cursor-pointer transition flex items-start space-x-3 ${
                          isChecked 
                            ? 'bg-emerald-50 border-emerald-200 text-emerald-900 line-through opacity-75' 
                            : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800'
                        }`}
                      >
                        {isChecked ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                        ) : (
                          <Circle className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                        )}
                        <span className="leading-relaxed">{item}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="p-4 bg-slate-50 border-t border-slate-100 text-center">
                <span className="text-[11px] text-slate-500 font-medium">
                  {phase.items.filter((_, i) => checkedItems[`${pIdx}_${i}`]).length} / {phase.items.length} Tasks Completed
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-slate-900 text-white rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <Sparkles className="w-6 h-6 text-indigo-400 flex-shrink-0" />
          <div>
            <h4 className="font-bold text-sm">Need help executing Phase 1?</h4>
            <p className="text-xs text-slate-400">Our Strategy Copilot can draft SOPs, email sequences, or supplier negotiation scripts for you.</p>
          </div>
        </div>

        <button
          onClick={() => onNavigateTab('copilot')}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl transition whitespace-nowrap"
        >
          Open Strategy Copilot
        </button>
      </div>
    </div>
  );
};
