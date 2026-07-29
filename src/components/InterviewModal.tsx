import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Loader2, 
  HelpCircle, 
  Building2, 
  Layers, 
  ChevronRight,
  MessageSquare,
  Zap
} from 'lucide-react';
import { BusinessStage, BusinessJSON, IntelligenceAnalysis, AdaptiveInterviewQA } from '../types';
import { generateIntelligenceAnalysis } from '../utils/analysisGenerator';

interface InterviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCompleteDiagnosis: (businessJson: BusinessJSON, analysis: IntelligenceAnalysis) => void;
}

export const InterviewModal: React.FC<InterviewModalProps> = ({
  isOpen,
  onClose,
  onCompleteDiagnosis
}) => {
  const [step, setStep] = useState<'stage' | 'basic' | 'qa' | 'processing'>('stage');
  
  const [selectedStage, setSelectedStage] = useState<BusinessStage>('idea');
  const [name, setName] = useState('');
  const [industry, setIndustry] = useState('Technology');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');

  const [qaHistory, setQaHistory] = useState<AdaptiveInterviewQA[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<{
    questionId: string;
    category: string;
    question: string;
    suggestedAnswers: string[];
  } | null>(null);

  const [customAnswer, setCustomAnswer] = useState('');
  const [isQuestionLoading, setIsQuestionLoading] = useState(false);

  if (!isOpen) return null;

  const industriesList = [
    'Technology',
    'Beauty',
    'Restaurant',
    'Retail',
    'Logistics',
    'Fitness & Health',
    'Education',
    'Finance & Real Estate',
    'Services & Hospitality'
  ];

  const handleStartInterview = async () => {
    setStep('qa');
    fetchNextQuestion([]);
  };

  const fetchNextQuestion = async (previousQA: AdaptiveInterviewQA[]) => {
    setIsQuestionLoading(true);
    try {
      const res = await fetch('/api/interview/next-question', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          stage: selectedStage,
          businessName: name,
          industry,
          previousQA
        })
      });

      if (res.ok) {
        const qData = await res.json();
        setCurrentQuestion(qData);
      } else {
        throw new Error('Fallback question trigger');
      }
    } catch (e) {
      const count = previousQA.length;
      const fallbacks = [
        {
          questionId: 'target_persona',
          category: 'Customer & Market',
          question: `Who is the ideal target customer for ${name || 'your business'} in the ${industry} space, and what key problem are you solving for them?`,
          suggestedAnswers: ['Busy working professionals', 'Small business owners', 'Gen Z & Millennial consumers', 'Corporate enterprise leaders']
        },
        {
          questionId: 'revenue_structure',
          category: 'Pricing & Economics',
          question: 'What is your current or target pricing structure, and what is your estimated gross margin percentage?',
          suggestedAnswers: ['Direct transaction with 65% margin', 'Monthly recurring subscription', 'High-end premium bespoke service', 'Wholesale Keystone (50% margin)']
        },
        {
          questionId: 'acquisition_channel',
          category: 'Marketing & CAC',
          question: 'Which marketing channels bring in (or will bring in) your highest quality leads?',
          suggestedAnswers: ['Paid social ads (Instagram/TikTok)', 'Word-of-mouth & referrals', 'Google Search & SEO', 'Direct outbound sales']
        },
        {
          questionId: 'biggest_risk_factor',
          category: 'Risks & De-Risking',
          question: 'What is your single biggest unvalidated business assumption right now?',
          suggestedAnswers: ['Customer price sensitivity', 'Ad acquisition cost rising', 'Supplier lead times', 'Retention / Churn rate']
        }
      ];
      setCurrentQuestion(fallbacks[count % fallbacks.length]);
    } finally {
      setIsQuestionLoading(false);
    }
  };

  const handleAnswerQuestion = (answerText: string) => {
    if (!currentQuestion) return;

    const newQA: AdaptiveInterviewQA = {
      questionId: currentQuestion.questionId,
      category: currentQuestion.category,
      question: currentQuestion.question,
      answer: answerText
    };

    const updatedQA = [...qaHistory, newQA];
    setQaHistory(updatedQA);
    setCustomAnswer('');

    if (updatedQA.length >= 4) {
      handleFinalizeDiagnosis(updatedQA);
    } else {
      fetchNextQuestion(updatedQA);
    }
  };

  const handleFinalizeDiagnosis = async (finalQA: AdaptiveInterviewQA[]) => {
    setStep('processing');
    try {
      const resJson = await fetch('/api/business/generate-json', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          stage: selectedStage,
          initialData: { name, industry, location, description },
          interviewQA: finalQA
        })
      });

      let bJson: BusinessJSON;
      if (resJson.ok) {
        bJson = await resJson.json();
      } else {
        throw new Error('Generate JSON API failed');
      }

      const resAnalyze = await fetch('/api/business/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ businessJson: bJson })
      });

      let analysis: IntelligenceAnalysis;
      if (resAnalyze.ok) {
        analysis = await resAnalyze.json();
      } else {
        analysis = generateIntelligenceAnalysis(bJson);
      }

      onCompleteDiagnosis(bJson, analysis);
      onClose();
    } catch (err) {
      console.warn('Falling back to deterministic local analysis generator:', err);
      const bJson: BusinessJSON = {
        business: {
          name: name || 'My New Business',
          industry,
          stage: selectedStage,
          description: description || `A promising ${industry} business.`,
          location: location || 'San Francisco, CA',
          model: 'Direct & Subscription',
          tagLine: `${industry} Solution`
        },
        market: {
          targetAudience: 'Target buyers in selected market',
          marketSize: 'Regional addressable market',
          trends: ['Digitalization', 'Direct customer engagement'],
          geographicalFocus: location || 'US Market'
        },
        customer: {
          idealPersona: 'Quality-conscious professional seeking efficiency.',
          painPoints: ['High cost', 'Slow service', 'Lack of transparency'],
          purchasingDrivers: ['Speed', 'Reliability', 'Good value']
        },
        pricing: {
          model: 'Tiered Pricing',
          averagePricePoint: '$50',
          marginsEstimated: '65% Gross Margin',
          pricingTierDetails: 'Standard & Premium Tiers'
        },
        marketing: {
          primaryChannels: ['Social Media Ads', 'Referral Network'],
          customerAcquisitionCost: '$25 CAC target',
          strategyNotes: 'Focus on direct engagement'
        },
        operations: {
          coreStack: ['Web Store', 'Payment Processor'],
          keyTeamRoles: ['Founder / CEO', 'Operations Lead'],
          supplyChainOrWorkflow: 'Direct fulfillment model'
        },
        competition: {
          mainCompetitors: ['Incumbent regional providers'],
          keyDifferentiators: ['Personalized service', 'Modern digital experience'],
          competitiveMoat: 'Agile execution'
        },
        financials: {
          monthlyRevenue: selectedStage === 'idea' ? '$0 (Pre-launch)' : '$15,000/mo',
          burnRate: '$4,000/mo',
          breakEvenStatus: 'Targeting Month 6',
          fundingStatus: 'Bootstrapped'
        },
        proof: {
          evidenceAndTraction: 'Initial interviews and beta feedback.',
          customerTestimonialsOrMetrics: '90%+ positive early feedback.',
          validationLevel: 'Medium'
        },
        growth: {
          topGrowthGoal: 'Acquire first 100 paying customers.',
          expansionTargets: ['Adjacent regional markets'],
          keyMilestones: ['Launch website', 'Achieve $15k monthly revenue']
        },
        risks: {
          criticalRisks: ['Rising digital customer acquisition costs', 'Supply chain delays'],
          biggestAssumption: finalQA[3]?.answer || 'Target buyers will choose a new brand over incumbents.'
        },
        recommendations: {
          immediateActions: ['Pre-sell initial offer', 'Collect customer testimonials'],
          longTermFocus: ['Build recurring revenue stream']
        }
      };

      const analysis = generateIntelligenceAnalysis(bJson);
      onCompleteDiagnosis(bJson, analysis);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden relative my-8">
        <div className="bg-slate-900 text-white p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-indigo-600 rounded-xl text-white">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold">New BACS Business Diagnosis</h2>
              <p className="text-xs text-slate-400">Adaptive AI Interview & Strategy Synthesis</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {step === 'stage' && (
            <div className="space-y-6">
              <div className="text-center space-y-1">
                <h3 className="text-xl font-bold text-slate-900">Select Business Stage</h3>
                <p className="text-xs text-slate-500">Choose the current lifecycle phase of your business</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { id: 'idea' as BusinessStage, title: 'Idea Stage', desc: 'Pre-launch hypothesis, searching for early product-market fit.' },
                  { id: 'existing' as BusinessStage, title: 'Existing Business', desc: 'Operating business seeking margin & channel optimization.' },
                  { id: 'expansion' as BusinessStage, title: 'Expansion Stage', desc: 'Scaling operations, multi-location, or launching new lines.' }
                ].map((st) => (
                  <div
                    key={st.id}
                    onClick={() => setSelectedStage(st.id)}
                    className={`p-4 rounded-2xl border cursor-pointer transition text-left flex flex-col justify-between ${
                      selectedStage === st.id
                        ? 'border-indigo-600 bg-indigo-50/50 ring-2 ring-indigo-500'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm mb-1">{st.title}</h4>
                      <p className="text-xs text-slate-500 leading-relaxed">{st.desc}</p>
                    </div>
                    {selectedStage === st.id && (
                      <CheckCircle2 className="w-5 h-5 text-indigo-600 mt-3 self-end" />
                    )}
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                  onClick={() => setStep('basic')}
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow transition flex items-center space-x-2"
                >
                  <span>Next: Basic Facts</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {step === 'basic' && (
            <div className="space-y-4">
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-slate-900">Business Profile Basics</h3>
                <p className="text-xs text-slate-500">Provide core identity details to seed the adaptive questions</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Business Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Apex Coffee Roasters"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Industry Sector *</label>
                  <select
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  >
                    {industriesList.map((ind) => (
                      <option key={ind} value={ind}>{ind}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Location / Market Focus</label>
                <input
                  type="text"
                  placeholder="e.g. Austin, TX or US National DTC"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Brief Description / Product Offering</label>
                <textarea
                  rows={3}
                  placeholder="e.g. Specialty single-origin organic coffee roaster with monthly subscription delivery..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none"
                />
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => setStep('stage')}
                  className="text-xs font-semibold text-slate-500 hover:text-slate-800"
                >
                  Back
                </button>
                <button
                  onClick={handleStartInterview}
                  disabled={!name.trim()}
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-xl text-xs font-semibold shadow transition flex items-center space-x-2"
                >
                  <span>Start Adaptive Interview</span>
                  <Sparkles className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {step === 'qa' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="font-semibold text-indigo-600">Adaptive Probe {qaHistory.length + 1} of 4</span>
                <span>{qaHistory.length * 25}% Completed</span>
              </div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-indigo-600 h-full rounded-full transition-all duration-300"
                  style={{ width: `${(qaHistory.length + 1) * 25}%` }}
                />
              </div>

              {isQuestionLoading ? (
                <div className="py-12 text-center space-y-3">
                  <Loader2 className="w-8 h-8 text-indigo-600 animate-spin mx-auto" />
                  <p className="text-xs text-slate-500 font-medium">BACS AI is formulating the optimal follow-up question for {name}...</p>
                </div>
              ) : currentQuestion ? (
                <div className="space-y-4">
                  <div className="bg-indigo-50/70 p-4 rounded-2xl border border-indigo-100">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded">
                      {currentQuestion.category}
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-indigo-950 mt-2 leading-snug">
                      {currentQuestion.question}
                    </h3>
                  </div>

                  <div className="space-y-2">
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Select Quick Answer:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {currentQuestion.suggestedAnswers.map((chip, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleAnswerQuestion(chip)}
                          className="p-3 bg-white hover:bg-indigo-50 border border-slate-200 hover:border-indigo-300 rounded-xl text-xs font-medium text-slate-800 text-left transition flex items-center justify-between group shadow-2xs"
                        >
                          <span>{chip}</span>
                          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition" />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2">
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Or type custom response:</p>
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        placeholder="Type specific details..."
                        value={customAnswer}
                        onChange={(e) => setCustomAnswer(e.target.value)}
                        className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      />
                      <button
                        onClick={() => handleAnswerQuestion(customAnswer)}
                        disabled={!customAnswer.trim()}
                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-xl text-xs font-semibold shadow transition"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          )}

          {step === 'processing' && (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto animate-pulse">
                <Sparkles className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Synthesizing Business Intelligence</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
                  Building canonical Business JSON, calculating 8-core BACS Index scores, and engineering de-risking experiments...
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
