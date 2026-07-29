import React, { useState } from 'react';
import { Sparkles, Download, PlusCircle, Sun, Moon, FolderOpen, PlayCircle, ShieldCheck, Menu, X, ChevronDown } from 'lucide-react';
import { BusinessStage, SavedProfile } from '../types';
import { DEMO_PRESETS } from '../data/demoBusinesses';

interface NavbarProps {
  currentStage: BusinessStage | null;
  activeProfile: SavedProfile | null;
  savedProfiles: SavedProfile[];
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onNewDiagnosis: () => void;
  onSelectDemo: (presetId: string) => void;
  onSelectProfile: (profileId: string) => void;
  onOpenJsonInspector: () => void;
  onOpenReportExport: () => void;
  onOpenCopilot: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentStage,
  activeProfile,
  savedProfiles,
  darkMode,
  onToggleDarkMode,
  onNewDiagnosis,
  onSelectDemo,
  onSelectProfile,
  onOpenJsonInspector,
  onOpenReportExport,
  onOpenCopilot
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showDemosMobile, setShowDemosMobile] = useState(false);
  const [showProfilesMobile, setShowProfilesMobile] = useState(false);

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-white/90 dark:bg-slate-900/90 border-b border-slate-200 dark:border-slate-800 transition-colors w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center space-x-2.5 cursor-pointer shrink-0" onClick={onNewDiagnosis}>
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-extrabold text-base sm:text-xl tracking-tight text-slate-900 dark:text-white">
                BACS <span className="text-indigo-600 dark:text-indigo-400">AI</span>
              </span>
              <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-widest px-1.5 sm:px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                2026
              </span>
            </div>
            <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium hidden md:block">
              Business Diagnosis. Intelligent Growth.
            </p>
          </div>
        </div>

        {/* Desktop Controls */}
        <div className="hidden lg:flex items-center space-x-2.5">
          {/* Active Stage Indicator */}
          {currentStage && (
            <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="capitalize">{currentStage === 'idea' ? 'Idea Validation' : currentStage === 'existing' ? 'Existing Diagnosis' : 'Expansion Plan'}</span>
            </div>
          )}

          {/* Demo Presets Dropdown */}
          <div className="relative group">
            <button className="flex items-center space-x-1.5 text-xs font-semibold px-3 py-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 transition-all">
              <PlayCircle className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span>Try Demo</span>
            </button>
            <div className="absolute right-0 mt-2 w-64 py-2 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 hidden group-hover:block z-50">
              <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                Sample Businesses (Instant)
              </div>
              {DEMO_PRESETS.map((demo) => (
                <button
                  key={demo.id}
                  onClick={() => onSelectDemo(demo.id)}
                  className="w-full text-left px-3 py-2 text-xs hover:bg-slate-100 dark:hover:bg-slate-800/80 flex items-center justify-between text-slate-700 dark:text-slate-200 transition-colors"
                >
                  <span className="font-semibold truncate">{demo.name}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 capitalize">
                    {demo.stage}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Saved Profiles Dropdown */}
          {savedProfiles.length > 0 && (
            <div className="relative group">
              <button className="flex items-center space-x-1.5 text-xs font-semibold px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all">
                <FolderOpen className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                <span className="truncate max-w-[120px]">
                  {activeProfile ? activeProfile.businessJson.business.name : 'Saved Audits'}
                </span>
              </button>
              <div className="absolute right-0 mt-2 w-72 py-2 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 hidden group-hover:block z-50">
                <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                  Your Saved Diagnosis Profiles
                </div>
                {savedProfiles.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => onSelectProfile(p.id)}
                    className={`w-full text-left px-3 py-2 text-xs hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-between transition-colors ${
                      activeProfile?.id === p.id ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 font-semibold' : 'text-slate-700 dark:text-slate-200'
                    }`}
                  >
                    <div className="truncate pr-2">
                      <div className="font-semibold truncate">{p.businessJson.business.name}</div>
                      <div className="text-[10px] text-slate-400">{p.businessJson.business.industry}</div>
                    </div>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300">
                      Score {p.analysis.bacsIndexScore}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Action buttons if profile active */}
          {activeProfile && (
            <div className="flex items-center space-x-1.5">
              <button
                onClick={onOpenCopilot}
                className="flex items-center space-x-1 text-xs font-semibold px-2.5 py-2 rounded-lg bg-violet-600 hover:bg-violet-700 text-white shadow-sm transition-all"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Copilot</span>
              </button>
              <button
                onClick={onOpenJsonInspector}
                className="flex items-center space-x-1 text-xs font-semibold px-2 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition-all"
                title="Inspect Business JSON"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-500" />
                <span>JSON</span>
              </button>
            </div>
          )}

          {/* New Audit Button */}
          <button
            onClick={onNewDiagnosis}
            className="flex items-center space-x-1 text-xs font-semibold px-3 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition-all shadow-sm"
          >
            <PlusCircle className="w-4 h-4" />
            <span>New Diagnosis</span>
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={onToggleDarkMode}
            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            aria-label="Toggle theme"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
          </button>
        </div>

        {/* Mobile / Tablet Compact Controls */}
        <div className="flex lg:hidden items-center space-x-2">
          {/* Quick Demo button on Mobile */}
          <button
            onClick={() => onSelectDemo('organic-skincare')}
            className="flex items-center space-x-1 text-[11px] font-bold px-2.5 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800"
          >
            <PlayCircle className="w-3.5 h-3.5 text-indigo-500" />
            <span>Demo</span>
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={onToggleDarkMode}
            className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
            aria-label="Toggle theme"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
          </button>

          {/* Hamburger Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
            aria-label="Open menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 py-4 space-y-4 shadow-xl text-xs">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
            <span className="font-extrabold uppercase text-[10px] tracking-wider text-slate-400">
              Navigation Menu
            </span>
            {currentStage && (
              <span className="capitalize px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-semibold text-[10px]">
                {currentStage} Stage
              </span>
            )}
          </div>

          <div className="space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNewDiagnosis();
              }}
              className="w-full flex items-center justify-between p-2.5 rounded-xl bg-indigo-600 text-white font-bold"
            >
              <div className="flex items-center space-x-2">
                <PlusCircle className="w-4 h-4" />
                <span>Start New Business Diagnosis</span>
              </div>
            </button>

            {/* Collapsible Demo Presets */}
            <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
              <button
                onClick={() => setShowDemosMobile(!showDemosMobile)}
                className="w-full p-2.5 flex items-center justify-between bg-slate-50 dark:bg-slate-800/60 text-slate-800 dark:text-slate-200 font-semibold"
              >
                <div className="flex items-center space-x-2">
                  <PlayCircle className="w-4 h-4 text-indigo-500" />
                  <span>Try Demo Businesses</span>
                </div>
                <ChevronDown className={`w-4 h-4 transition-transform ${showDemosMobile ? 'rotate-180' : ''}`} />
              </button>
              {showDemosMobile && (
                <div className="p-2 space-y-1 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
                  {DEMO_PRESETS.map((demo) => (
                    <button
                      key={demo.id}
                      onClick={() => {
                        onSelectDemo(demo.id);
                        setMobileMenuOpen(false);
                      }}
                      className="w-full text-left p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg flex items-center justify-between text-slate-700 dark:text-slate-300"
                    >
                      <span className="font-semibold">{demo.name}</span>
                      <span className="text-[10px] capitalize text-slate-400">{demo.stage}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Collapsible Saved Profiles */}
            {savedProfiles.length > 0 && (
              <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
                <button
                  onClick={() => setShowProfilesMobile(!showProfilesMobile)}
                  className="w-full p-2.5 flex items-center justify-between bg-slate-50 dark:bg-slate-800/60 text-slate-800 dark:text-slate-200 font-semibold"
                >
                  <div className="flex items-center space-x-2">
                    <FolderOpen className="w-4 h-4 text-slate-400" />
                    <span>Saved Profiles ({savedProfiles.length})</span>
                  </div>
                  <ChevronDown className={`w-4 h-4 transition-transform ${showProfilesMobile ? 'rotate-180' : ''}`} />
                </button>
                {showProfilesMobile && (
                  <div className="p-2 space-y-1 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
                    {savedProfiles.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => {
                          onSelectProfile(p.id);
                          setMobileMenuOpen(false);
                        }}
                        className={`w-full text-left p-2 rounded-lg flex items-center justify-between ${
                          activeProfile?.id === p.id ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 font-bold' : 'text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        <span className="truncate">{p.businessJson.business.name}</span>
                        <span className="text-[10px] font-mono text-purple-400">{p.analysis.bacsIndexScore}/100</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Active profile quick shortcuts */}
            {activeProfile && (
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenCopilot();
                  }}
                  className="p-2 rounded-xl bg-violet-600/20 text-violet-300 border border-violet-500/30 font-bold flex items-center justify-center space-x-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Copilot</span>
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenReportExport();
                  }}
                  className="p-2 rounded-xl bg-slate-800 text-slate-200 border border-slate-700 font-semibold flex items-center justify-center space-x-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export Report</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

