import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { StageWorkspaceHero } from './components/StageWorkspaceHero';
import { StageSelector } from './components/StageSelector';
import { InterviewMode } from './components/InterviewMode';
import { WorkspaceLayout } from './components/WorkspaceLayout';
import { DemoLoadingModal } from './components/DemoLoadingModal';
import { SavedProfilesModal } from './components/SavedProfilesModal';
import { JsonInspectorModal } from './components/JsonInspectorModal';
import { ReportExportModal } from './components/ReportExportModal';
import { StrategyCopilotDrawer } from './components/StrategyCopilotDrawer';
import {
  BusinessStage,
  BusinessJSON,
  IntelligenceAnalysis,
  SavedProfile,
  CopilotMessage,
  InterviewQA
} from './types';
import { DEMO_PRESETS } from './data/demoBusinesses';
import {
  getSavedProfiles,
  saveProfile,
  getActiveProfileId,
  setActiveProfileId,
  saveCopilotHistory,
  deleteProfile
} from './utils/storage';
import { generateIntelligenceAnalysis } from './utils/analysisGenerator';

export default function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'stage-workspace' | 'select-stage' | 'interview' | 'workspace'>('landing');
  const [currentStage, setCurrentStage] = useState<BusinessStage | null>(null);
  const [businessName, setBusinessName] = useState('');
  const [industry, setIndustry] = useState('Beauty');
  const [location, setLocation] = useState('United States');

  const [activeBusinessJson, setActiveBusinessJson] = useState<BusinessJSON | null>(null);
  const [activeAnalysis, setActiveAnalysis] = useState<IntelligenceAnalysis | null>(null);
  const [activeProfileId, setActiveProfileIdState] = useState<string | null>(null);

  const [savedProfiles, setSavedProfiles] = useState<SavedProfile[]>([]);
  const [copilotHistory, setCopilotHistory] = useState<CopilotMessage[]>([]);

  // Demo loading animation modal state
  const [isDemoLoading, setIsDemoLoading] = useState(false);
  const [pendingTargetView, setPendingTargetView] = useState<'workspace' | null>(null);

  // Modals & Drawers
  const [isSavedProfilesOpen, setIsSavedProfilesOpen] = useState(false);
  const [isCopilotOpen, setIsCopilotOpen] = useState(false);
  const [isJsonInspectorOpen, setIsJsonInspectorOpen] = useState(false);
  const [isReportExportOpen, setIsReportExportOpen] = useState(false);

  // Dark Mode Default (Premium Dark UI)
  const [darkMode, setDarkMode] = useState<boolean>(true);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('bacs_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('bacs_theme', 'light');
    }
  }, [darkMode]);

  // Load saved profiles on mount
  useEffect(() => {
    const profiles = getSavedProfiles();
    setSavedProfiles(profiles);

    const activeId = getActiveProfileId();
    if (activeId) {
      const active = profiles.find((p) => p.id === activeId);
      if (active) {
        setActiveProfileIdState(active.id);
        setActiveBusinessJson(active.businessJson);
        setActiveAnalysis(active.analysis);
        setCurrentStage(active.stage);
        setCopilotHistory(active.copilotHistory || []);
        setCurrentView('workspace');
      }
    }
  }, []);

  // Handlers
  const handleSelectStage = (stage: BusinessStage) => {
    setCurrentStage(stage);
    setCurrentView('select-stage');
  };

  const handleStartInterviewFromStage = (stage: BusinessStage) => {
    setCurrentStage(stage);
    setCurrentView('select-stage');
  };

  const handleStartInterview = (stage: BusinessStage, name: string, ind: string, loc: string) => {
    setCurrentStage(stage);
    setBusinessName(name);
    setIndustry(ind);
    setLocation(loc);
    setCurrentView('interview');
  };

  const triggerDemoLoadingSequence = (onFinish: () => void) => {
    setIsDemoLoading(true);
    setPendingTargetView('workspace');
  };

  const handleDemoLoadingComplete = () => {
    setIsDemoLoading(false);
    if (pendingTargetView) {
      setCurrentView(pendingTargetView);
      setPendingTargetView(null);
    }
  };

  const handleSelectDemo = (presetId: string) => {
    const preset = DEMO_PRESETS.find((p) => p.id === presetId) || DEMO_PRESETS[0];
    const saved = saveProfile(preset.businessJson, preset.analysis);
    setSavedProfiles(getSavedProfiles());
    setActiveProfileIdState(saved.id);
    setActiveBusinessJson(preset.businessJson);
    setActiveAnalysis(preset.analysis);
    setCurrentStage(preset.stage);
    setCopilotHistory([]);

    triggerDemoLoadingSequence(() => {
      setCurrentView('workspace');
    });
  };

  const handleSelectProfile = (profileId: string) => {
    const profiles = getSavedProfiles();
    const profile = profiles.find((p) => p.id === profileId);
    if (profile) {
      setActiveProfileId(profile.id);
      setActiveProfileIdState(profile.id);
      setActiveBusinessJson(profile.businessJson);
      setActiveAnalysis(profile.analysis);
      setCurrentStage(profile.stage);
      setCopilotHistory(profile.copilotHistory || []);
      setCurrentView('workspace');
    }
  };

  const handleDeleteProfile = (profileId: string) => {
    deleteProfile(profileId);
    const updated = getSavedProfiles();
    setSavedProfiles(updated);
    if (activeProfileId === profileId) {
      if (updated.length > 0) {
        handleSelectProfile(updated[0].id);
      } else {
        handleNewDiagnosis();
      }
    }
  };

  const handleNewDiagnosis = () => {
    setActiveBusinessJson(null);
    setActiveAnalysis(null);
    setActiveProfileIdState(null);
    setCurrentStage(null);
    setCopilotHistory([]);
    setCurrentView('landing');
  };

  const handleCompleteInterview = async (interviewQA: InterviewQA[]) => {
    try {
      const resJson = await fetch('/api/business/generate-json', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          stage: currentStage,
          initialData: { name: businessName, industry, location },
          interviewQA
        })
      });

      let bJson: BusinessJSON | null = null;
      if (resJson.ok) {
        bJson = await resJson.json();
      }

      if (!bJson || !bJson.business) {
        bJson = {
          business: {
            name: businessName || 'My Business',
            industry: industry || 'Beauty',
            stage: currentStage || 'idea',
            description: `A forward-looking ${industry} venture in ${location} focused on high market value.`,
            location: location || 'United States',
            model: 'Direct-to-Consumer & Omnichannel',
            tagLine: `${industry} Innovation in ${location}`
          },
          market: {
            targetAudience: 'Urban professionals looking for high-quality solutions.',
            marketSize: 'Regional addressable market',
            trends: ['Digital engagement', 'Direct customer relationships'],
            geographicalFocus: 'Domestic'
          },
          customer: {
            idealPersona: 'Quality-conscious buyer prioritizing convenience and speed.',
            painPoints: ['High price of legacy providers', 'Inconvenient access'],
            purchasingDrivers: ['Speed', 'Reliability', 'Transparent pricing']
          },
          pricing: {
            model: 'Tiered Pricing',
            averagePricePoint: '$50',
            marginsEstimated: '65% Gross Margin',
            pricingTierDetails: 'Standard & Premium Tiers'
          },
          marketing: {
            primaryChannels: ['Social Ads', 'Referrals', 'Content Marketing'],
            customerAcquisitionCost: '$25 CAC',
            strategyNotes: 'Focus on social proof and direct customer engagement.'
          },
          operations: {
            coreStack: ['Web Store', 'CRM', 'Payment Processor'],
            keyTeamRoles: ['Founder', 'Operations Lead', 'Marketing Specialist'],
            supplyChainOrWorkflow: 'Direct fulfillment model with local supplier partners.'
          },
          competition: {
            mainCompetitors: ['Incumbent providers'],
            keyDifferentiators: ['Personalized service', 'Modern digital experience'],
            competitiveMoat: 'Agile execution and strong customer relationships'
          },
          financials: {
            monthlyRevenue: currentStage === 'idea' ? '$0' : '$15,000/mo',
            burnRate: '$5,000/mo',
            breakEvenStatus: currentStage === 'idea' ? 'Pre-revenue' : 'Profitable',
            fundingStatus: 'Bootstrapped'
          },
          proof: {
            evidenceAndTraction: 'Customer interviews and waitlist signups.',
            customerTestimonialsOrMetrics: '90%+ positive feedback from early test users.',
            validationLevel: 'Medium'
          },
          growth: {
            topGrowthGoal: 'Acquire 100 paying customer accounts in 90 days.',
            expansionTargets: ['Adjacent regional markets'],
            keyMilestones: ['Launch updated website', 'Achieve $20k monthly revenue']
          },
          risks: {
            criticalRisks: ['Rising digital acquisition costs'],
            biggestAssumption: 'Target customers will choose a new brand over established alternatives.'
          },
          recommendations: {
            immediateActions: ['Validate pricing assumption with a small pre-order campaign'],
            longTermFocus: ['Build recurring subscription revenue stream']
          }
        };
      }

      const resAnalysis = await fetch('/api/business/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ businessJson: bJson })
      });

      let analysisData: IntelligenceAnalysis;
      if (resAnalysis.ok) {
        analysisData = await resAnalysis.json();
      } else {
        analysisData = generateIntelligenceAnalysis(bJson);
      }

      const saved = saveProfile(bJson, analysisData);
      setSavedProfiles(getSavedProfiles());
      setActiveProfileIdState(saved.id);
      setActiveBusinessJson(bJson);
      setActiveAnalysis(analysisData);
      setCopilotHistory([]);

      triggerDemoLoadingSequence(() => {
        setCurrentView('workspace');
      });
    } catch (err) {
      console.error('Error completing interview:', err);
      handleSelectDemo('organic-skincare');
    }
  };

  const handleSaveJsonUpdate = (updatedJson: BusinessJSON) => {
    setActiveBusinessJson(updatedJson);
    const updatedAnalysis = generateIntelligenceAnalysis(updatedJson);
    setActiveAnalysis(updatedAnalysis);
    if (activeProfileId) {
      saveProfile(updatedJson, updatedAnalysis, activeProfileId, copilotHistory);
      setSavedProfiles(getSavedProfiles());
    }
  };

  const handleUpdateCopilotHistory = (newHistory: CopilotMessage[]) => {
    setCopilotHistory(newHistory);
    if (activeProfileId) {
      saveCopilotHistory(activeProfileId, newHistory);
    }
  };

  const activeProfile = savedProfiles.find((p) => p.id === activeProfileId) || null;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-purple-600 selection:text-white">
      {/* Top Header Navbar for landing / setup screens */}
      {currentView !== 'workspace' && (
        <Navbar
          currentStage={currentStage}
          activeProfile={activeProfile}
          savedProfiles={savedProfiles}
          darkMode={darkMode}
          onToggleDarkMode={() => setDarkMode(!darkMode)}
          onNewDiagnosis={handleNewDiagnosis}
          onSelectDemo={handleSelectDemo}
          onSelectProfile={handleSelectProfile}
          onOpenJsonInspector={() => setIsJsonInspectorOpen(true)}
          onOpenReportExport={() => setIsReportExportOpen(true)}
          onOpenCopilot={() => setIsCopilotOpen(true)}
        />
      )}

      {/* Main View Router */}
      <main className="flex-1">
        {currentView === 'landing' && (
          <LandingPage
            onSelectStage={handleSelectStage}
            onSelectDemo={handleSelectDemo}
          />
        )}

        {currentView === 'stage-workspace' && currentStage && (
          <StageWorkspaceHero
            stage={currentStage}
            onBackToLanding={() => setCurrentView('landing')}
            onStartInterview={handleStartInterviewFromStage}
          />
        )}

        {currentView === 'select-stage' && (
          <StageSelector
            initialStage={currentStage || 'idea'}
            onStartInterview={handleStartInterview}
            onCancel={handleNewDiagnosis}
          />
        )}

        {currentView === 'interview' && currentStage && (
          <InterviewMode
            stage={currentStage}
            businessName={businessName}
            industry={industry}
            location={location}
            onComplete={handleCompleteInterview}
            onFastTrackDemo={() => handleSelectDemo('organic-skincare')}
            onChangeStage={() => setCurrentView('select-stage')}
          />
        )}

        {currentView === 'workspace' && activeBusinessJson && activeAnalysis && (
          <WorkspaceLayout
            businessJson={activeBusinessJson}
            analysis={activeAnalysis}
            copilotHistory={copilotHistory}
            onSaveCopilotHistory={handleUpdateCopilotHistory}
            onUpdateBusinessJson={handleSaveJsonUpdate}
            onNewInterview={(stage) => {
              if (stage) setCurrentStage(stage);
              setCurrentView('landing');
            }}
            onOpenSavedProfiles={() => setIsSavedProfilesOpen(true)}
            currentProfileId={activeProfileId || 'default_profile'}
          />
        )}
      </main>

      {/* Demo Loading Modal Animation */}
      <DemoLoadingModal
        isOpen={isDemoLoading}
        businessName={activeBusinessJson?.business.name || businessName || 'Business Venture'}
        onComplete={handleDemoLoadingComplete}
      />

      {/* Saved Profiles Modal */}
      <SavedProfilesModal
        isOpen={isSavedProfilesOpen}
        onClose={() => setIsSavedProfilesOpen(false)}
        savedProfiles={savedProfiles}
        activeProfileId={activeProfileId}
        onSelectProfile={handleSelectProfile}
        onDeleteProfile={handleDeleteProfile}
        onNewDiagnosis={handleNewDiagnosis}
      />

      {/* Legacy/Utility Modals & Drawers */}
      {activeBusinessJson && activeAnalysis && (
        <>
          <StrategyCopilotDrawer
            isOpen={isCopilotOpen}
            onClose={() => setIsCopilotOpen(false)}
            businessJson={activeBusinessJson}
            analysis={activeAnalysis}
            history={copilotHistory}
            onUpdateHistory={handleUpdateCopilotHistory}
          />

          <JsonInspectorModal
            isOpen={isJsonInspectorOpen}
            onClose={() => setIsJsonInspectorOpen(false)}
            businessJson={activeBusinessJson}
            onSaveJson={handleSaveJsonUpdate}
          />

          <ReportExportModal
            isOpen={isReportExportOpen}
            onClose={() => setIsReportExportOpen(false)}
            businessJson={activeBusinessJson}
            analysis={activeAnalysis}
          />
        </>
      )}

      {/* Footer for Non-Workspace Views */}
      {currentView !== 'workspace' && (
        <footer className="border-t border-slate-800 bg-slate-900 py-6 px-4 text-center text-xs text-slate-400 space-y-1">
          <p className="font-semibold text-slate-300">
            BACS AI — Business Diagnosis & Intelligent Growth Platform
          </p>
          <p>Grounded in structured Business JSON memory • Built for BuildFest 2026</p>
        </footer>
      )}
    </div>
  );
}
