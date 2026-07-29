import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  Layers, 
  Loader2, 
  FastForward, 
  Code, 
  Building2, 
  Users, 
  DollarSign, 
  Activity, 
  ShieldCheck, 
  Wand2,
  X,
  ClipboardCheck,
  Check,
  Copy,
  Target,
  AlertCircle,
  HeartHandshake,
  Workflow
} from 'lucide-react';
import { BusinessStage, InterviewQA, BusinessJSON } from '../types';

interface InterviewModeProps {
  stage: BusinessStage;
  businessName: string;
  industry: string;
  location?: string;
  onComplete: (interviewQA: InterviewQA[]) => void;
  onFastTrackDemo: () => void;
  onChangeStage?: () => void;
}

export const InterviewMode: React.FC<InterviewModeProps> = ({
  stage,
  businessName,
  industry,
  location = 'United States',
  onComplete,
  onFastTrackDemo,
  onChangeStage
}) => {
  const [activeSection, setActiveSection] = useState<number>(1);
  const [completedSections, setCompletedSections] = useState<Record<number, boolean>>({
    1: true
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showJsonModal, setShowJsonModal] = useState(false);
  const [copiedJson, setCopiedJson] = useState(false);

  // ----------------------------------------------------
  // STAGE 1: IDEA STAGE STATE (6 SECTIONS)
  // ----------------------------------------------------
  const [ideaProblem, setIdeaProblem] = useState({
    problem: `High cost, long latency, and lack of transparency in traditional ${industry || 'industry'} services.`,
    whoExperiences: `Mid-market business owners and busy working professionals in ${location}`,
    frequency: 'Weekly or Monthly occurrence',
    frustrationCost: 'High ($500+ wasted monthly in hidden inefficiency)',
    consequences: 'Customers suffer delayed execution, high refund rates, and lost market opportunities.'
  });

  const [ideaCustomer, setIdeaCustomer] = useState({
    idealCustomer: `Demographic of digital-first professionals in ${location}`,
    currentSolutions: 'Fragmented manual workarounds and expensive legacy agencies',
    currentFrustrations: 'Opaque pricing, poor customer service, and slow delivery times',
    whySwitch: 'Guaranteed 2x faster turnaround and transparent upfront pricing',
    customerEvidence: 'Conducted 8 problem interviews; 6 confirmed active willingness to pay'
  });

  const [ideaCompetitors, setIdeaCompetitors] = useState({
    existingAlternatives: 'Established regional incumbents and DIY manual tools',
    whyCustomersChooseThem: 'Brand familiarity and lack of modern automated alternatives',
    customerComplaints: 'Poor responsiveness, slow customer support, and hidden fee structures',
    significantlyBetter: 'Automated self-service portal with direct instant fulfillment',
    difficultToCopy: 'Proprietary workflow automation and direct vendor network agreements'
  });

  const [ideaUvp, setIdeaUvp] = useState({
    becauseSentence: `deliver 100% transparent ${industry || 'service'} outcomes in under 24 hours at half the cost.`,
    isMeasurable: 'Yes — 50% cost savings and 24-hour turnaround benchmark',
    canCompetitorsCopy: 'Difficult due to streamlined lean technology stack',
    oneSentenceExplanation: `The fastest and most reliable ${industry || 'business'} solution for growth-focused teams.`
  });

  const [ideaBusinessModel, setIdeaBusinessModel] = useState({
    revenueModel: 'Direct Subscription & Pay-per-Use Tier',
    whyPay: 'Eliminates friction and delivers immediate operational value',
    grossMargin: '65% Estimated Gross Margin',
    biggestCost: 'Customer acquisition and platform infrastructure maintenance',
    breakEvenTarget: '50 Active Paying Customers'
  });

  const [ideaEvidence, setIdeaEvidence] = useState<string[]>([
    'Customer interviews',
    'Prototype'
  ]);

  // ----------------------------------------------------
  // STAGE 2: EXISTING BUSINESS DIAGNOSIS STATE
  // ----------------------------------------------------
  const [existingChallenge, setExistingChallenge] = useState<string>('Customers don\'t return');

  const [existingQuestions, setExistingQuestions] = useState({
    complaints: 'Customers complain about slow response times and inconsistent follow-up.',
    responseTime: '< 3 Hours average response time',
    resolutionProcess: 'Handled manually by founder on case-by-case basis',
    repeatPurchaseRate: '18% Repeat Customer Rate (Target > 35%)',
    refundRate: '4% Refund Request Rate',
    npsScore: 'NPS Score ~45',
    staffAuthority: 'Employees require founder sign-off for any refund > $50',
    feedbackCollection: 'Informal verbal feedback; no automated survey trigger'
  });

  const [cxMetrics, setCxMetrics] = useState({
    serviceTime: '< 15 mins for first touchpoint',
    complaintSla: 'Same-day resolution guarantee',
    staffTraining: 'Weekly customer service training & clear SOP handbook',
    trustRecovery: 'Free replacement/discount offered immediately upon complaint'
  });

  // ----------------------------------------------------
  // STAGE 3: EXPANSION & SCALE STATE
  // ----------------------------------------------------
  const [expansionQuestions, setExpansionQuestions] = useState({
    motive: 'High regional demand and inbound customer requests from adjacent territories',
    whatWorksWell: 'Core product-market fit and strong word-of-mouth referrals',
    operationalBottleneck: 'Founder involvement in daily quality assurance and onboarding',
    founderDependency: 'High — 70% of operations still depend on founder approval',
    hasSops: 'Partial SOPs documented in Notion / Google Docs',
    capacityIfDemandDoubles: 'Would cause 3-5 day delivery delay without hiring 2 additional staff',
    financialRunway: '12 Months profitable runway'
  });

  // Sections setup depending on stage
  const getSectionDefinitions = () => {
    if (stage === 'idea') {
      return [
        { id: 1, title: 'The Problem', subtitle: 'Motivation (M)', icon: AlertCircle },
        { id: 2, title: 'The Customer', subtitle: 'Customer Evidence', icon: Users },
        { id: 3, title: 'Competitor Analysis', subtitle: 'Positioning & Moat', icon: ShieldCheck },
        { id: 4, title: 'Unique Value Prop', subtitle: 'Diagnosis (D)', icon: Target },
        { id: 5, title: 'Business Model', subtitle: 'Unit Economics', icon: DollarSign },
        { id: 6, title: 'Evidence Checklist', subtitle: 'Proof (P)', icon: ClipboardCheck }
      ];
    } else if (stage === 'existing') {
      return [
        { id: 1, title: 'Primary Challenge', subtitle: 'Core Friction', icon: AlertCircle },
        { id: 2, title: 'Root Cause Investigation', subtitle: 'Operational Deep-Dive', icon: Activity },
        { id: 3, title: 'Customer Experience (CX)', subtitle: 'Service & Retention', icon: HeartHandshake },
        { id: 4, title: 'Revenue & Leakage', subtitle: 'Funnel Leak Analysis', icon: Workflow },
        { id: 5, title: 'Actionable Priorities', subtitle: 'Fix & Optimization', icon: Workflow }
      ];
    } else {
      return [
        { id: 1, title: 'Expansion Motive', subtitle: 'Why Scale Now?', icon: Workflow },
        { id: 2, title: 'Operational Readiness', subtitle: 'Bottlenecks & Capacity', icon: Activity },
        { id: 3, title: 'Process & SOP Maturity', subtitle: 'Founder Dependency', icon: Workflow },
        { id: 4, title: 'Customer Experience SLA', subtitle: 'Scale Quality Control', icon: HeartHandshake },
        { id: 5, title: 'Financial Readiness', subtitle: 'Runway & Unit Economics', icon: DollarSign }
      ];
    }
  };

  const SECTIONS = getSectionDefinitions();
  const totalSections = SECTIONS.length;

  const completedCount = Object.keys(completedSections).filter(k => completedSections[Number(k)]).length;
  const memoryCompletenessPct = Math.min(100, Math.round((completedCount / totalSections) * 100));

  // Construct Business JSON dynamically for live Business Memory view
  const currentBusinessJson: BusinessJSON = {
    business: {
      name: businessName || 'My Venture',
      industry: industry || 'General Sector',
      stage,
      description: stage === 'idea' ? ideaProblem.problem : stage === 'existing' ? `Addressing ${existingChallenge} in ${industry}` : expansionQuestions.motive,
      location,
      model: stage === 'idea' ? ideaBusinessModel.revenueModel : 'Direct Model',
      tagLine: `${industry} Venture`
    },
    market: {
      targetAudience: stage === 'idea' ? ideaCustomer.idealCustomer : 'Target market buyers',
      marketSize: 'Target Addressable Market',
      trends: ['Digital customer adoption', 'Demand for fast execution'],
      geographicalFocus: location
    },
    customer: {
      idealPersona: stage === 'idea' ? ideaCustomer.idealCustomer : 'Core customer base',
      painPoints: stage === 'idea' ? [ideaProblem.frustrationCost] : [existingQuestions.complaints],
      purchasingDrivers: ['Speed', 'Reliability', 'Quality']
    },
    pricing: {
      model: stage === 'idea' ? ideaBusinessModel.revenueModel : 'Standard Tier',
      averagePricePoint: '$50 - $250',
      marginsEstimated: stage === 'idea' ? ideaBusinessModel.grossMargin : '60%',
      pricingTierDetails: 'Tailored for target market'
    },
    marketing: {
      primaryChannels: ['Direct Sales', 'Social Channels'],
      strategyNotes: 'Focused acquisition'
    },
    operations: {
      coreStack: ['CRM', 'Payment Portal', 'Workflow Engine'],
      keyTeamRoles: ['Core Team'],
      supplyChainOrWorkflow: stage === 'expansion' ? expansionQuestions.operationalBottleneck : 'Direct delivery'
    },
    competition: {
      mainCompetitors: stage === 'idea' ? [ideaCompetitors.existingAlternatives] : ['Industry Incumbents'],
      keyDifferentiators: stage === 'idea' ? [ideaCompetitors.significantlyBetter] : ['Service quality & speed'],
      competitiveMoat: stage === 'idea' ? ideaCompetitors.difficultToCopy : 'Execution speed'
    },
    financials: {
      breakEvenStatus: stage === 'idea' ? ideaBusinessModel.breakEvenTarget : 'Profitable',
      fundingStatus: 'Bootstrapped'
    },
    proof: {
      evidenceAndTraction: stage === 'idea' ? `Evidence collected: ${ideaEvidence.join(', ')}` : existingQuestions.repeatPurchaseRate,
      customerTestimonialsOrMetrics: stage === 'idea' ? ideaCustomer.customerEvidence : existingQuestions.npsScore,
      validationLevel: ideaEvidence.length >= 4 ? 'High' : ideaEvidence.length >= 2 ? 'Medium' : 'Low'
    },
    growth: {
      topGrowthGoal: stage === 'idea' ? 'Validate willingness to pay with 10 pre-orders' : 'Fix retention leak and scale customer LTV',
      keyMilestones: ['Assessment complete', 'Launch validation experiment']
    },
    risks: {
      criticalRisks: stage === 'idea' ? [ideaBusinessModel.biggestCost] : [existingQuestions.complaints],
      biggestAssumption: stage === 'idea' ? ideaUvp.becauseSentence : existingQuestions.resolutionProcess
    },
    recommendations: {
      immediateActions: ['Execute 5 customer problem interviews'],
      longTermFocus: ['Build automated customer retention loops']
    }
  };

  const handleNextSection = () => {
    setCompletedSections(prev => ({ ...prev, [activeSection]: true }));

    if (activeSection < totalSections) {
      const nextSec = activeSection + 1;
      setActiveSection(nextSec);
      setCompletedSections(prev => ({ ...prev, [nextSec]: true }));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      handleCompleteAssessment();
    }
  };

  const handlePrevSection = () => {
    if (activeSection > 1) {
      setActiveSection(activeSection - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const toggleEvidenceItem = (item: string) => {
    if (item === 'None') {
      setIdeaEvidence(['None']);
      return;
    }
    setIdeaEvidence(prev => {
      const filtered = prev.filter(i => i !== 'None');
      if (filtered.includes(item)) {
        return filtered.filter(i => i !== item);
      } else {
        return [...filtered, item];
      }
    });
  };

  const handleCompleteAssessment = () => {
    setIsSubmitting(true);

    const interviewQA: InterviewQA[] = [];

    if (stage === 'idea') {
      interviewQA.push({
        questionId: 'sec1_problem',
        category: 'The Problem',
        question: 'What problem are you solving, for whom, and what happens if unsolved?',
        answer: `Problem: ${ideaProblem.problem}. Who: ${ideaProblem.whoExperiences}. Frequency: ${ideaProblem.frequency}. Frustration/Cost: ${ideaProblem.frustrationCost}. Consequences: ${ideaProblem.consequences}`
      });
      interviewQA.push({
        questionId: 'sec2_customer',
        category: 'The Customer',
        question: 'Describe ideal customer, current alternatives, frustrations, switch reasons, and evidence.',
        answer: `Ideal Customer: ${ideaCustomer.idealCustomer}. Current: ${ideaCustomer.currentSolutions}. Frustrations: ${ideaCustomer.currentFrustrations}. Switch Reason: ${ideaCustomer.whySwitch}. Evidence: ${ideaCustomer.customerEvidence}`
      });
      interviewQA.push({
        questionId: 'sec3_competitors',
        category: 'Competitor Analysis',
        question: 'What alternatives exist, complaints about them, your advantages, and copy barriers?',
        answer: `Alternatives: ${ideaCompetitors.existingAlternatives}. Why Chosen: ${ideaCompetitors.whyCustomersChooseThem}. Complaints: ${ideaCompetitors.customerComplaints}. Differentiator: ${ideaCompetitors.significantlyBetter}. Moat: ${ideaCompetitors.difficultToCopy}`
      });
      interviewQA.push({
        questionId: 'sec4_uvp',
        category: 'Unique Value Proposition',
        question: 'Customers choose us because..., measurable benefit, and 1-sentence customer explanation.',
        answer: `Customers Choose Us Because: ${ideaUvp.becauseSentence}. Measurable Benefit: ${ideaUvp.isMeasurable}. Explanation: ${ideaUvp.oneSentenceExplanation}`
      });
      interviewQA.push({
        questionId: 'sec5_business_model',
        category: 'Business Model',
        question: 'Revenue model, why customers pay, gross margin, main cost, break-even target.',
        answer: `Revenue Model: ${ideaBusinessModel.revenueModel}. Why Pay: ${ideaBusinessModel.whyPay}. Gross Margin: ${ideaBusinessModel.grossMargin}. Main Cost: ${ideaBusinessModel.biggestCost}. Break-even: ${ideaBusinessModel.breakEvenTarget}`
      });
      interviewQA.push({
        questionId: 'sec6_evidence',
        category: 'Evidence Checklist',
        question: 'Which evidence milestones have you completed so far?',
        answer: `Completed Evidence Milestones: ${ideaEvidence.join(', ')}`
      });
    } else if (stage === 'existing') {
      interviewQA.push({
        questionId: 'sec1_challenge',
        category: 'Primary Challenge',
        question: 'What is the primary business challenge you want to diagnose today?',
        answer: `Primary Business Challenge: ${existingChallenge}`
      });
      interviewQA.push({
        questionId: 'sec2_investigation',
        category: 'Root Cause Investigation',
        question: 'What complaints, response times, refund rates, and authority structures exist?',
        answer: `Complaints: ${existingQuestions.complaints}. Response Time: ${existingQuestions.responseTime}. Repeat Rate: ${existingQuestions.repeatPurchaseRate}. Refunds: ${existingQuestions.refundRate}. NPS: ${existingQuestions.npsScore}. Authority: ${existingQuestions.staffAuthority}`
      });
      interviewQA.push({
        questionId: 'sec3_cx',
        category: 'Customer Experience (CX)',
        question: 'What is your service SLA, complaint handling process, and trust recovery protocol?',
        answer: `Service SLA: ${cxMetrics.serviceTime}. Complaint SLA: ${cxMetrics.complaintSla}. Training: ${cxMetrics.staffTraining}. Trust Recovery: ${cxMetrics.trustRecovery}`
      });
    } else {
      interviewQA.push({
        questionId: 'sec1_motive',
        category: 'Expansion Motive',
        question: 'Why expand now and what is currently working best?',
        answer: `Expansion Motive: ${expansionQuestions.motive}. Working Well: ${expansionQuestions.whatWorksWell}`
      });
      interviewQA.push({
        questionId: 'sec2_ops',
        category: 'Operational Readiness',
        question: 'Operational bottlenecks, founder dependency, SOPs, and doubled demand capacity.',
        answer: `Bottleneck: ${expansionQuestions.operationalBottleneck}. Founder Dependency: ${expansionQuestions.founderDependency}. SOP Status: ${expansionQuestions.hasSops}. Doubled Demand Impact: ${expansionQuestions.capacityIfDemandDoubles}. Runway: ${expansionQuestions.financialRunway}`
      });
    }

    setTimeout(() => {
      onComplete(interviewQA);
    }, 600);
  };

  const autoSuggestCurrentSection = () => {
    if (stage === 'idea') {
      if (activeSection === 1) {
        setIdeaProblem({
          problem: `Long execution turnarounds and lack of upfront pricing transparency in ${industry || 'the sector'}.`,
          whoExperiences: `Growth-stage startups and small business owners in ${location}`,
          frequency: 'Weekly active friction',
          frustrationCost: '$800+ wasted per month in manual overhead and rework',
          consequences: 'Delayed project rollouts, lost customer trust, and negative cash flow.'
        });
      } else if (activeSection === 2) {
        setIdeaCustomer({
          idealCustomer: `Tech-savvy entrepreneurs and operations leaders aged 28-50 in ${location}`,
          currentSolutions: 'Legacy consulting agencies and piecemeal freelancer platforms',
          currentFrustrations: 'Unpredictable costs, poor communication, and zero SLA guarantees',
          whySwitch: 'Guaranteed 24-hour turnaround, fixed pricing, and live dashboard tracking',
          customerEvidence: '12 founder interviews completed; 8 requested early pilot access'
        });
      } else if (activeSection === 3) {
        setIdeaCompetitors({
          existingAlternatives: 'Traditional corporate agencies and offshore freelance marketplaces',
          whyCustomersChooseThem: 'Inertia and lack of awareness of modern automated options',
          customerComplaints: 'Hidden fee scope creep, slow response times, and inconsistent quality',
          significantlyBetter: 'Standardized output blueprints with 100% automated quality checks',
          difficultToCopy: 'Proprietary BACS diagnostic templates and vetted execution network'
        });
      } else if (activeSection === 4) {
        setIdeaUvp({
          becauseSentence: `eliminate 80% of project delay and deliver verified outcomes in 24 hours.`,
          isMeasurable: 'Yes — 80% turnaround time reduction measured against industry average',
          canCompetitorsCopy: 'Difficult due to proprietary workflow templates and automated SLA tracking',
          oneSentenceExplanation: `The highest-velocity, transparent ${industry || 'business'} outcome engine for founders.`
        });
      } else if (activeSection === 5) {
        setIdeaBusinessModel({
          revenueModel: 'Monthly SaaS Retainer & Pay-per-Outcome Bundle',
          whyPay: 'Save $1,500/mo vs hiring full-time staff while guaranteeing execution speed',
          grossMargin: '72% Gross Margin',
          biggestCost: 'Targeted customer acquisition ads and developer platform costs',
          breakEvenTarget: '35 Active Monthly Subscribers'
        });
      } else if (activeSection === 6) {
        setIdeaEvidence([
          'Customer interviews',
          'Prototype',
          'Waitlist',
          'Testimonials'
        ]);
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-4 px-3 sm:px-6 space-y-6">
      
      {/* 1. Top Executive Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold shadow-md shadow-indigo-500/20 shrink-0">
              <ClipboardCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="font-extrabold text-slate-900 dark:text-white text-base sm:text-lg">
                  {stage === 'idea' ? 'Stage 1: Business Idea Validation' : stage === 'existing' ? 'Stage 2: Existing Business Diagnosis' : 'Stage 3: Growth & Expansion Assessment'}
                </h2>
                <span className="px-2 py-0.5 text-[10px] font-bold bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 rounded border border-indigo-200 dark:border-indigo-800 uppercase">
                  Decision Engine
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Venture: <strong className="text-slate-800 dark:text-slate-200">{businessName}</strong> • Industry: <strong className="text-slate-800 dark:text-slate-200">{industry}</strong> • Stage: <span className="uppercase font-bold text-indigo-600 dark:text-indigo-400">{stage}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 self-end sm:self-center">
            {onChangeStage && (
              <button
                onClick={onChangeStage}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
              >
                ← Change Stage
              </button>
            )}
            <button
              onClick={onFastTrackDemo}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold text-indigo-600 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950 hover:bg-indigo-100 dark:hover:bg-indigo-900 border border-indigo-200 dark:border-indigo-800 flex items-center space-x-1.5 transition"
            >
              <FastForward className="w-3.5 h-3.5 text-indigo-500" />
              <span>Use Full Demo Data</span>
            </button>
          </div>
        </div>

        {/* Progress Bar & Memory Completeness */}
        <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-800 dark:text-slate-200">
              Section {activeSection} of {totalSections}: <span className="text-indigo-600 dark:text-indigo-400">{SECTIONS[activeSection - 1].title}</span>
            </span>
            <span className="font-extrabold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2.5 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800 text-[11px]">
              {memoryCompletenessPct}% Memory Completeness
            </span>
          </div>

          <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden p-0.5">
            <div
              className="h-full bg-gradient-to-r from-indigo-600 to-emerald-500 rounded-full transition-all duration-500"
              style={{ width: `${(activeSection / totalSections) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Stepper Tabs Bar */}
        <div className="grid gap-1.5 pt-1 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
          {SECTIONS.map((sec) => {
            const Icon = sec.icon;
            const isCompleted = completedSections[sec.id];
            const isActive = activeSection === sec.id;

            return (
              <button
                key={sec.id}
                onClick={() => {
                  setActiveSection(sec.id);
                  setCompletedSections(prev => ({ ...prev, [sec.id]: true }));
                }}
                className={`p-2 rounded-xl text-left transition flex flex-col justify-between border ${
                  isActive
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-500/20'
                    : isCompleted
                    ? 'bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-slate-100 border-slate-200 dark:border-slate-700 hover:border-indigo-300'
                    : 'bg-white dark:bg-slate-900 text-slate-400 border-slate-100 dark:border-slate-800 opacity-60'
                }`}
              >
                <div className="flex items-center justify-between">
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : isCompleted ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400'}`} />
                  {isCompleted && !isActive && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  )}
                </div>
                <div className="mt-2">
                  <span className={`text-[10px] font-extrabold uppercase tracking-wider block ${isActive ? 'text-indigo-100' : 'text-slate-400'}`}>
                    Sec {sec.id}
                  </span>
                  <span className="text-xs font-bold truncate block hidden sm:block">
                    {sec.title}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Main Grid: Assessment Form (2 Cols) + Business Memory Card (1 Col) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Assessment Section Form Column */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 sm:p-7 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            
            {/* Section Header */}
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="w-7 h-7 rounded-lg bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 font-bold flex items-center justify-center text-xs">
                    {activeSection}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {SECTIONS[activeSection - 1].title}
                  </h3>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 pl-9">
                  {SECTIONS[activeSection - 1].subtitle} — Complete the inputs below to build your verified BACS Decision Memory.
                </p>
              </div>

              {stage === 'idea' && (
                <button
                  type="button"
                  onClick={autoSuggestCurrentSection}
                  className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950 hover:bg-indigo-100 px-2.5 py-1 rounded-lg border border-indigo-200 dark:border-indigo-800 flex items-center space-x-1 shrink-0"
                  title="Populate AI suggested baseline inputs for this section"
                >
                  <Wand2 className="w-3 h-3 text-indigo-500" />
                  <span className="hidden sm:inline">Auto-Suggest Section</span>
                </button>
              )}
            </div>

            {/* =========================================
                STAGE 1: IDEA STAGE FORMS
               ========================================= */}
            {stage === 'idea' && (
              <>
                {/* Sec 1: Problem */}
                {activeSection === 1 && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                        What problem are you solving?
                      </label>
                      <textarea
                        rows={2}
                        value={ideaProblem.problem}
                        onChange={(e) => setIdeaProblem({ ...ideaProblem, problem: e.target.value })}
                        placeholder="Describe the exact core problem or inefficiency..."
                        className="w-full px-4 py-2.5 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                        Who experiences this problem?
                      </label>
                      <input
                        type="text"
                        value={ideaProblem.whoExperiences}
                        onChange={(e) => setIdeaProblem({ ...ideaProblem, whoExperiences: e.target.value })}
                        placeholder="e.g., Small business owners, working mothers, field technicians..."
                        className="w-full px-4 py-2.5 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                          How often does it occur?
                        </label>
                        <select
                          value={ideaProblem.frequency}
                          onChange={(e) => setIdeaProblem({ ...ideaProblem, frequency: e.target.value })}
                          className="w-full px-4 py-2.5 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                          <option value="Daily friction">Daily friction</option>
                          <option value="Weekly or Monthly occurrence">Weekly or Monthly occurrence</option>
                          <option value="Seasonal / Occasional event">Seasonal / Occasional event</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                          How expensive or frustrating is it?
                        </label>
                        <input
                          type="text"
                          value={ideaProblem.frustrationCost}
                          onChange={(e) => setIdeaProblem({ ...ideaProblem, frustrationCost: e.target.value })}
                          placeholder="e.g., Costs $500/mo or 10 hours lost weekly"
                          className="w-full px-4 py-2.5 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                        What happens if the problem isn't solved?
                      </label>
                      <input
                        type="text"
                        value={ideaProblem.consequences}
                        onChange={(e) => setIdeaProblem({ ...ideaProblem, consequences: e.target.value })}
                        placeholder="Consequences, lost revenue, customer churn..."
                        className="w-full px-4 py-2.5 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  </div>
                )}

                {/* Sec 2: Customer */}
                {activeSection === 2 && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                        Describe your ideal customer persona
                      </label>
                      <input
                        type="text"
                        value={ideaCustomer.idealCustomer}
                        onChange={(e) => setIdeaCustomer({ ...ideaCustomer, idealCustomer: e.target.value })}
                        placeholder="Target demographic, industry, role, location..."
                        className="w-full px-4 py-2.5 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                        What do they currently use to solve this today?
                      </label>
                      <input
                        type="text"
                        value={ideaCustomer.currentSolutions}
                        onChange={(e) => setIdeaCustomer({ ...ideaCustomer, currentSolutions: e.target.value })}
                        placeholder="e.g., Manual spreadsheets, legacy agencies, DIY workarounds..."
                        className="w-full px-4 py-2.5 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                        What frustrates them about existing solutions?
                      </label>
                      <textarea
                        rows={2}
                        value={ideaCustomer.currentFrustrations}
                        onChange={(e) => setIdeaCustomer({ ...ideaCustomer, currentFrustrations: e.target.value })}
                        placeholder="High price, slow speed, complex interface, lack of support..."
                        className="w-full px-4 py-2.5 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                        Why would they switch to your solution?
                      </label>
                      <input
                        type="text"
                        value={ideaCustomer.whySwitch}
                        onChange={(e) => setIdeaCustomer({ ...ideaCustomer, whySwitch: e.target.value })}
                        placeholder="The single compelling reason to switch..."
                        className="w-full px-4 py-2.5 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  </div>
                )}

                {/* Sec 3: Competitor Analysis */}
                {activeSection === 3 && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                        What alternatives already exist?
                      </label>
                      <input
                        type="text"
                        value={ideaCompetitors.existingAlternatives}
                        onChange={(e) => setIdeaCompetitors({ ...ideaCompetitors, existingAlternatives: e.target.value })}
                        placeholder="Name direct competitors or alternate methods..."
                        className="w-full px-4 py-2.5 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                        Why do customers currently choose them?
                      </label>
                      <input
                        type="text"
                        value={ideaCompetitors.whyCustomersChooseThem}
                        onChange={(e) => setIdeaCompetitors({ ...ideaCompetitors, whyCustomersChooseThem: e.target.value })}
                        placeholder="Brand trust, distribution, legacy habits..."
                        className="w-full px-4 py-2.5 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                        What do customers complain about regarding competitors?
                      </label>
                      <textarea
                        rows={2}
                        value={ideaCompetitors.customerComplaints}
                        onChange={(e) => setIdeaCompetitors({ ...ideaCompetitors, customerComplaints: e.target.value })}
                        placeholder="Poor support, hidden fees, inflexible contracts..."
                        className="w-full px-4 py-2.5 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                          What can you do significantly better?
                        </label>
                        <input
                          type="text"
                          value={ideaCompetitors.significantlyBetter}
                          onChange={(e) => setIdeaCompetitors({ ...ideaCompetitors, significantlyBetter: e.target.value })}
                          placeholder="Your core operational edge..."
                          className="w-full px-4 py-2.5 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                          What is difficult for competitors to copy?
                        </label>
                        <input
                          type="text"
                          value={ideaCompetitors.difficultToCopy}
                          onChange={(e) => setIdeaCompetitors({ ...ideaCompetitors, difficultToCopy: e.target.value })}
                          placeholder="Proprietary tech, brand positioning, network effect..."
                          className="w-full px-4 py-2.5 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Sec 4: Unique Value Prop */}
                {activeSection === 4 && (
                  <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 space-y-2">
                      <label className="block text-xs font-bold text-indigo-900 dark:text-indigo-200 uppercase tracking-wider">
                        Finish this sentence: "Customers choose us because..."
                      </label>
                      <input
                        type="text"
                        value={ideaUvp.becauseSentence}
                        onChange={(e) => setIdeaUvp({ ...ideaUvp, becauseSentence: e.target.value })}
                        placeholder="...we eliminate project delay and deliver 100% verified outcomes."
                        className="w-full px-4 py-2.5 text-sm font-semibold rounded-xl bg-white dark:bg-slate-900 border border-indigo-300 dark:border-indigo-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                        Is this benefit measurable? (e.g., 50% cheaper, 2x faster)
                      </label>
                      <input
                        type="text"
                        value={ideaUvp.isMeasurable}
                        onChange={(e) => setIdeaUvp({ ...ideaUvp, isMeasurable: e.target.value })}
                        placeholder="e.g., Saves 5 hours per week or 30% cheaper"
                        className="w-full px-4 py-2.5 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                        Can customers explain this benefit in one simple sentence?
                      </label>
                      <input
                        type="text"
                        value={ideaUvp.oneSentenceExplanation}
                        onChange={(e) => setIdeaUvp({ ...ideaUvp, oneSentenceExplanation: e.target.value })}
                        placeholder="State the simple 1-sentence value pitch..."
                        className="w-full px-4 py-2.5 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  </div>
                )}

                {/* Sec 5: Business Model */}
                {activeSection === 5 && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                          How will you make money?
                        </label>
                        <select
                          value={ideaBusinessModel.revenueModel}
                          onChange={(e) => setIdeaBusinessModel({ ...ideaBusinessModel, revenueModel: e.target.value })}
                          className="w-full px-4 py-2.5 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                          <option value="Direct Subscription & Pay-per-Use Tier">Direct Subscription & Pay-per-Use Tier</option>
                          <option value="B2B Monthly SaaS Subscription">B2B Monthly SaaS Subscription</option>
                          <option value="One-Time Product Purchase">One-Time Product Purchase</option>
                          <option value="Service Retainer & Project Fee">Service Retainer & Project Fee</option>
                          <option value="Marketplace Take Rate Commission">Marketplace Take Rate Commission</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                          Estimated Gross Margin %
                        </label>
                        <input
                          type="text"
                          value={ideaBusinessModel.grossMargin}
                          onChange={(e) => setIdeaBusinessModel({ ...ideaBusinessModel, grossMargin: e.target.value })}
                          placeholder="e.g., 65% Gross Margin"
                          className="w-full px-4 py-2.5 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                        What will be your biggest operating cost?
                      </label>
                      <input
                        type="text"
                        value={ideaBusinessModel.biggestCost}
                        onChange={(e) => setIdeaBusinessModel({ ...ideaBusinessModel, biggestCost: e.target.value })}
                        placeholder="e.g., Customer Acquisition Cost (CAC) or Raw Materials"
                        className="w-full px-4 py-2.5 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                        What is your break-even target?
                      </label>
                      <input
                        type="text"
                        value={ideaBusinessModel.breakEvenTarget}
                        onChange={(e) => setIdeaBusinessModel({ ...ideaBusinessModel, breakEvenTarget: e.target.value })}
                        placeholder="e.g., 50 active subscribers or $10k/mo"
                        className="w-full px-4 py-2.5 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  </div>
                )}

                {/* Sec 6: Evidence Checklist */}
                {activeSection === 6 && (
                  <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800">
                      <h4 className="font-bold text-amber-900 dark:text-amber-200 text-sm flex items-center space-x-2">
                        <ShieldCheck className="w-4 h-4 text-amber-600" />
                        <span>BACS Evidence Assessment</span>
                      </h4>
                      <p className="text-xs text-amber-800 dark:text-amber-300 mt-1">
                        Which of these validation milestones have you actually completed so far? Select all that apply.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        'Customer interviews',
                        'Prototype',
                        'Waitlist',
                        'Pre-orders',
                        'Paying customers',
                        'Testimonials',
                        'Repeat customers',
                        'Letters of intent',
                        'Pilot',
                        'None'
                      ].map((item) => {
                        const isChecked = ideaEvidence.includes(item);

                        return (
                          <button
                            key={item}
                            type="button"
                            onClick={() => toggleEvidenceItem(item)}
                            className={`p-3 rounded-xl text-left border transition flex items-center justify-between ${
                              isChecked
                                ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                                : 'bg-slate-50 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-indigo-300'
                            }`}
                          >
                            <span className="text-xs font-bold">
                              ☐ {item}
                            </span>
                            {isChecked && <Check className="w-4 h-4 text-white" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </>
            )}

            {/* =========================================
                STAGE 2: EXISTING BUSINESS DIAGNOSIS FORMS
               ========================================= */}
            {stage === 'existing' && (
              <>
                {/* Sec 1: Challenge Selector */}
                {activeSection === 1 && (
                  <div className="space-y-4">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                      What primary problem are you trying to solve today?
                    </label>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        'Declining Sales',
                        'Customer Complaints',
                        'Poor Conversion',
                        'Marketing Isn\'t Working',
                        'Cash Flow Friction',
                        'High Competition',
                        'High Staff Turnover',
                        'Customers don\'t return',
                        'Operations are chaotic',
                        'Scaling problems'
                      ].map((ch) => (
                        <button
                          key={ch}
                          type="button"
                          onClick={() => setExistingChallenge(ch)}
                          className={`p-3.5 rounded-xl text-left border transition flex items-center justify-between ${
                            existingChallenge === ch
                              ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-500/20'
                              : 'bg-slate-50 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-indigo-300'
                          }`}
                        >
                          <span className="text-xs font-bold">{ch}</span>
                          {existingChallenge === ch && <CheckCircle2 className="w-4 h-4 text-white" />}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Sec 2: Investigation */}
                {activeSection === 2 && (
                  <div className="space-y-4">
                    <div className="p-3 bg-indigo-50 dark:bg-indigo-950 rounded-xl border border-indigo-200 text-xs font-bold text-indigo-900 dark:text-indigo-200">
                      Investigating Challenge: <span className="underline">{existingChallenge}</span>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                        What do customers complain about most frequently?
                      </label>
                      <textarea
                        rows={2}
                        value={existingQuestions.complaints}
                        onChange={(e) => setExistingQuestions({ ...existingQuestions, complaints: e.target.value })}
                        className="w-full px-4 py-2.5 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                          Average Customer Support Response Time
                        </label>
                        <input
                          type="text"
                          value={existingQuestions.responseTime}
                          onChange={(e) => setExistingQuestions({ ...existingQuestions, responseTime: e.target.value })}
                          className="w-full px-4 py-2.5 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                          Estimated Repeat Purchase Rate (%)
                        </label>
                        <input
                          type="text"
                          value={existingQuestions.repeatPurchaseRate}
                          onChange={(e) => setExistingQuestions({ ...existingQuestions, repeatPurchaseRate: e.target.value })}
                          className="w-full px-4 py-2.5 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Sec 3: Customer Experience (CX) Module */}
                {activeSection === 3 && (
                  <div className="space-y-4">
                    <div className="p-3 bg-emerald-50 dark:bg-emerald-950 rounded-xl border border-emerald-200 text-xs font-bold text-emerald-900 dark:text-emerald-200 flex items-center space-x-2">
                      <HeartHandshake className="w-4 h-4 text-emerald-600" />
                      <span>BACS Dedicated Pillar: Customer Experience (CX) Evaluation</span>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                        Service Response Time SLA Target
                      </label>
                      <input
                        type="text"
                        value={cxMetrics.serviceTime}
                        onChange={(e) => setCxMetrics({ ...cxMetrics, serviceTime: e.target.value })}
                        className="w-full px-4 py-2.5 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                        Trust Recovery & Guarantee Protocol
                      </label>
                      <input
                        type="text"
                        value={cxMetrics.trustRecovery}
                        onChange={(e) => setCxMetrics({ ...cxMetrics, trustRecovery: e.target.value })}
                        className="w-full px-4 py-2.5 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  </div>
                )}

                {/* Sec 4 & 5 placeholders */}
                {activeSection >= 4 && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                        Staff Training & Escalation Authority
                      </label>
                      <input
                        type="text"
                        value={existingQuestions.staffAuthority}
                        onChange={(e) => setExistingQuestions({ ...existingQuestions, staffAuthority: e.target.value })}
                        className="w-full px-4 py-2.5 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Bottom Action Bar */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={handlePrevSection}
                disabled={activeSection === 1 || isSubmitting}
                className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-40 transition flex items-center space-x-1"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                <span>Previous</span>
              </button>

              <button
                type="button"
                onClick={handleNextSection}
                disabled={isSubmitting}
                className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md shadow-indigo-500/20 flex items-center space-x-2 transition"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Compiling Decision Intelligence...</span>
                  </>
                ) : activeSection < totalSections ? (
                  <>
                    <span>Continue to Section {activeSection + 1}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    <span>Generate BACS Decision Report</span>
                    <Sparkles className="w-4 h-4 text-amber-300" />
                  </>
                )}
              </button>
            </div>

          </div>
        </div>

        {/* 3. Business Memory Sidebar Card (1 Col) */}
        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5 sticky top-6">
            
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <Layers className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                  Business Memory
                </h4>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-semibold border border-emerald-200 dark:border-emerald-800">
                Single Source of Truth
              </span>
            </div>

            {/* Overall Memory Completeness Meter */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-2">
              <div className="flex items-baseline justify-between">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Memory Completeness
                </span>
                <span className="text-xl font-black text-indigo-600 dark:text-indigo-400">
                  {memoryCompletenessPct}%
                </span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-indigo-600 transition-all duration-500 rounded-full" 
                  style={{ width: `${memoryCompletenessPct}%` }}
                ></div>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 pt-1">
                {completedCount} of {totalSections} sections verified & stored incrementally.
              </p>
            </div>

            {/* Section Completion Status Checklist */}
            <div className="space-y-2.5 text-xs">
              {SECTIONS.map((sec) => {
                const isDone = completedSections[sec.id];
                const isCurrent = activeSection === sec.id;

                return (
                  <div 
                    key={sec.id}
                    onClick={() => {
                      setActiveSection(sec.id);
                      setCompletedSections(prev => ({ ...prev, [sec.id]: true }));
                    }}
                    className={`p-3 rounded-xl border transition cursor-pointer flex items-center justify-between ${
                      isCurrent
                        ? 'bg-indigo-50/70 dark:bg-indigo-950/40 border-indigo-200 dark:border-indigo-800'
                        : isDone
                        ? 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800'
                        : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 opacity-60'
                    }`}
                  >
                    <div className="flex items-center space-x-2.5">
                      <div className={`w-5 h-5 rounded-md flex items-center justify-center font-bold text-[10px] ${
                        isDone ? 'bg-emerald-600 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                      }`}>
                        {isDone ? <Check className="w-3 h-3" /> : sec.id}
                      </div>
                      <div>
                        <span className="font-bold text-slate-900 dark:text-white block">
                          {sec.title}
                        </span>
                        <span className="text-[10px] text-slate-400 truncate block max-w-[170px]">
                          {sec.subtitle}
                        </span>
                      </div>
                    </div>

                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      isDone 
                        ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300' 
                        : 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300'
                    }`}>
                      {isDone ? 'Saved' : 'Pending'}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Toggle Raw Business JSON Button */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setShowJsonModal(!showJsonModal)}
                className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center space-x-2 transition shadow-sm"
              >
                <Code className="w-4 h-4 text-indigo-400" />
                <span>{showJsonModal ? 'Hide Business JSON' : 'View Business JSON'}</span>
              </button>
            </div>

          </div>
        </div>

      </div>

      {/* Raw Business JSON Modal */}
      {showJsonModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full p-6 space-y-4 max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center space-x-2 text-white font-bold text-sm">
                <Code className="w-4 h-4 text-indigo-400" />
                <span>Business Memory JSON Representation</span>
              </div>
              <button
                onClick={() => setShowJsonModal(false)}
                className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <pre className="flex-1 overflow-auto bg-slate-950 p-4 rounded-xl text-emerald-400 font-mono text-xs leading-relaxed border border-slate-800/80">
              {JSON.stringify(currentBusinessJson, null, 2)}
            </pre>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(JSON.stringify(currentBusinessJson, null, 2));
                  setCopiedJson(true);
                  setTimeout(() => setCopiedJson(false), 2000);
                }}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl flex items-center space-x-1.5 transition"
              >
                {copiedJson ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                <span>{copiedJson ? 'Copied to Clipboard' : 'Copy JSON'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
