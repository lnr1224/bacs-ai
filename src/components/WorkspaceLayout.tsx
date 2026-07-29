import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  BarChart2, 
  ShieldAlert, 
  CheckSquare, 
  Bot, 
  FileJson, 
  FileText, 
  Bookmark, 
  Plus, 
  Sparkles, 
  Menu, 
  X, 
  Zap, 
  TrendingUp,
  Layers,
  ChevronRight,
  ShieldCheck,
  Building2,
  FolderOpen
} from 'lucide-react';
import { BusinessJSON, IntelligenceAnalysis, BusinessStage, CopilotMessage } from '../types';
import { SummaryView } from './SummaryView';
import { HiddenAssumptionsView } from './HiddenAssumptionsView';
import { AnalysisView } from './AnalysisView';
import { ActionCenterView } from './ActionCenterView';
import { StrategyCopilotView } from './StrategyCopilotView';
import { BusinessJsonInspectorView } from './BusinessJsonInspectorView';
import { ReportView } from './ReportView';

export type WorkspaceTab = 'summary' | 'analysis' | 'assumptions' | 'actions' | 'copilot' | 'json' | 'reports';

interface WorkspaceLayoutProps {
  businessJson: BusinessJSON;
  analysis: IntelligenceAnalysis;
  copilotHistory: CopilotMessage[];
  onSaveCopilotHistory: (messages: CopilotMessage[]) => void;
  onUpdateBusinessJson: (updated: BusinessJSON) => void;
  onNewInterview: (stage?: BusinessStage) => void;
  onOpenSavedProfiles: () => void;
  currentProfileId?: string;
}

export const WorkspaceLayout: React.FC<WorkspaceLayoutProps> = ({
  businessJson,
  analysis,
  copilotHistory,
  onSaveCopilotHistory,
  onUpdateBusinessJson,
  onNewInterview,
  onOpenSavedProfiles,
  currentProfileId = 'default_profile'
}) => {
  const [activeTab, setActiveTab] = useState<WorkspaceTab>('summary');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const b = businessJson.business;

  const getStageBadgeColor = (stage: BusinessStage) => {
    switch (stage) {
      case 'idea':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
      case 'existing':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      case 'expansion':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
    }
  };

  const navItems = [
    { id: 'summary', label: 'Summary', icon: LayoutDashboard },
    { id: 'analysis', label: 'Detailed Analysis', icon: BarChart2 },
    { id: 'assumptions', label: 'Hidden Assumptions™', icon: ShieldAlert },
    { id: 'actions', label: 'Action Center', icon: CheckSquare },
    { id: 'copilot', label: 'Strategy Copilot', icon: Bot },
    { id: 'json', label: 'Business JSON', icon: FileJson },
    { id: 'reports', label: 'Strategy Reports', icon: FileText }
  ] as const;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row overflow-x-hidden font-sans">
      {/* ========================================================= */}
      {/* DESKTOP LEFT SIDEBAR */}
      {/* ========================================================= */}
      <aside className="hidden md:flex flex-col w-64 bg-slate-900 border-r border-slate-800 shrink-0 h-screen sticky top-0 p-4 space-y-6 justify-between z-20">
        <div className="space-y-6">
          {/* Brand Header */}
          <div className="flex items-center space-x-3 px-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-indigo-400 flex items-center justify-center text-white shadow-lg shadow-purple-600/30 font-extrabold">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-extrabold tracking-tight text-white text-base">BACS AI</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  MVP 2026
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium">Business Intelligence Workspace</p>
            </div>
          </div>

          {/* Active Business Profile Card */}
          <div className="bg-slate-950/80 border border-slate-800 p-3 rounded-2xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Active Venture</span>
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${getStageBadgeColor(b.stage)}`}>
                {b.stage}
              </span>
            </div>
            <h3 className="text-sm font-bold text-white truncate">{b.name}</h3>
            <p className="text-[11px] text-slate-400 truncate">{b.industry}</p>

            <div className="pt-1 flex items-center justify-between border-t border-slate-800/80 text-[11px]">
              <span className="text-slate-400">BACS Index</span>
              <span className="font-bold text-purple-400 font-mono">{analysis.bacsIndexScore}/100</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            <span className="px-3 text-[10px] font-mono text-slate-500 uppercase tracking-wider block mb-1">
              Workspace Views
            </span>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-purple-600 text-white shadow-md shadow-purple-600/20 font-bold'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="space-y-2 pt-4 border-t border-slate-800">
          <button
            onClick={onOpenSavedProfiles}
            className="w-full py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 flex items-center justify-center space-x-2 transition"
          >
            <FolderOpen className="w-4 h-4 text-purple-400" />
            <span>Saved Profiles</span>
          </button>

          <button
            onClick={() => onNewInterview()}
            className="w-full py-2.5 px-3 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 text-xs font-bold border border-purple-500/30 flex items-center justify-center space-x-2 transition"
          >
            <Plus className="w-4 h-4" />
            <span>New Diagnosis</span>
          </button>
        </div>
      </aside>

      {/* ========================================================= */}
      {/* MOBILE TOP BAR */}
      {/* ========================================================= */}
      <header className="md:hidden bg-slate-900 border-b border-slate-800 px-4 py-3 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center text-white shadow font-bold text-xs">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-xs font-bold text-white truncate max-w-[140px]">{b.name}</h2>
            <span className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded border ${getStageBadgeColor(b.stage)}`}>
              {b.stage}
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <div className="bg-slate-800 px-2.5 py-1 rounded-lg text-center border border-slate-700">
            <span className="text-[10px] font-bold text-purple-400 font-mono">{analysis.bacsIndexScore}/100</span>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 bg-slate-800 text-slate-300 hover:text-white rounded-xl border border-slate-700"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* MOBILE DRAWER MENU */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-slate-950/90 backdrop-blur-md pt-16 p-6 space-y-4 overflow-y-auto">
          <div className="space-y-2">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
              Workspace Navigation
            </span>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-purple-600 text-white font-bold'
                      : 'bg-slate-900 text-slate-300 border border-slate-800'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-4 border-t border-slate-800 space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSavedProfiles();
              }}
              className="w-full py-3 px-4 rounded-xl bg-slate-900 text-slate-200 text-xs font-semibold border border-slate-800 flex items-center justify-center space-x-2"
            >
              <FolderOpen className="w-4 h-4 text-purple-400" />
              <span>Saved Business Profiles</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNewInterview();
              }}
              className="w-full py-3 px-4 rounded-xl bg-purple-600 text-white text-xs font-bold flex items-center justify-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>New Diagnosis Interview</span>
            </button>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MAIN WORKSPACE CONTENT AREA */}
      {/* ========================================================= */}
      <main className="flex-1 overflow-y-auto pb-20 md:pb-8">
        {activeTab === 'summary' && (
          <SummaryView
            businessJson={businessJson}
            analysis={analysis}
            onNavigateTab={(tab) => setActiveTab(tab)}
          />
        )}

        {activeTab === 'analysis' && (
          <AnalysisView analysis={analysis} />
        )}

        {activeTab === 'assumptions' && (
          <HiddenAssumptionsView
            items={analysis.realityCheck}
            onNavigateCopilot={() => setActiveTab('copilot')}
          />
        )}

        {activeTab === 'actions' && (
          <ActionCenterView
            businessJson={businessJson}
            analysis={analysis}
            profileId={currentProfileId}
          />
        )}

        {activeTab === 'copilot' && (
          <StrategyCopilotView
            businessJson={businessJson}
            analysis={analysis}
            copilotHistory={copilotHistory}
            onSaveHistory={onSaveCopilotHistory}
          />
        )}

        {activeTab === 'json' && (
          <BusinessJsonInspectorView
            businessJson={businessJson}
            onUpdateBusinessJson={onUpdateBusinessJson}
          />
        )}

        {activeTab === 'reports' && (
          <ReportView
            businessJson={businessJson}
            analysis={analysis}
          />
        )}
      </main>

      {/* ========================================================= */}
      {/* MOBILE STICKY BOTTOM NAVIGATION BAR */}
      {/* ========================================================= */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-md border-t border-slate-800 px-3 py-2 flex items-center justify-around z-30 shadow-2xl">
        <button
          onClick={() => setActiveTab('summary')}
          className={`flex flex-col items-center space-y-1 p-1 transition ${
            activeTab === 'summary' ? 'text-purple-400 font-bold' : 'text-slate-400'
          }`}
        >
          <LayoutDashboard className="w-5 h-5" />
          <span className="text-[10px]">Summary</span>
        </button>

        <button
          onClick={() => setActiveTab('analysis')}
          className={`flex flex-col items-center space-y-1 p-1 transition ${
            activeTab === 'analysis' ? 'text-purple-400 font-bold' : 'text-slate-400'
          }`}
        >
          <BarChart2 className="w-5 h-5" />
          <span className="text-[10px]">Analysis</span>
        </button>

        <button
          onClick={() => setActiveTab('actions')}
          className={`flex flex-col items-center space-y-1 p-1 transition ${
            activeTab === 'actions' ? 'text-purple-400 font-bold' : 'text-slate-400'
          }`}
        >
          <CheckSquare className="w-5 h-5" />
          <span className="text-[10px]">Actions</span>
        </button>

        <button
          onClick={() => setActiveTab('copilot')}
          className={`flex flex-col items-center space-y-1 p-1 transition ${
            activeTab === 'copilot' ? 'text-purple-400 font-bold' : 'text-slate-400'
          }`}
        >
          <Bot className="w-5 h-5" />
          <span className="text-[10px]">Copilot</span>
        </button>
      </nav>
    </div>
  );
};
