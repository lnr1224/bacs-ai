export type BusinessStage = 'idea' | 'existing' | 'expansion';

export interface BusinessDetails {
  name: string;
  industry: string;
  stage: BusinessStage;
  description: string;
  location?: string;
  model: string;
  tagLine?: string;
}

export interface MarketDetails {
  targetAudience: string;
  marketSize?: string;
  trends?: string[];
  geographicalFocus?: string;
}

export interface CustomerDetails {
  idealPersona: string;
  painPoints: string[];
  purchasingDrivers: string[];
}

export interface PricingDetails {
  model: string;
  averagePricePoint: string;
  marginsEstimated?: string;
  pricingTierDetails?: string;
}

export interface MarketingDetails {
  primaryChannels: string[];
  customerAcquisitionCost?: string;
  strategyNotes: string;
}

export interface OperationsDetails {
  coreStack: string[];
  keyTeamRoles: string[];
  supplyChainOrWorkflow: string;
}

export interface CompetitionDetails {
  mainCompetitors: string[];
  keyDifferentiators: string[];
  competitiveMoat: string;
}

export interface FinancialDetails {
  monthlyRevenue?: string;
  burnRate?: string;
  breakEvenStatus: string;
  fundingStatus: string;
}

export interface ProofDetails {
  evidenceAndTraction: string;
  customerTestimonialsOrMetrics: string;
  validationLevel: 'Low' | 'Medium' | 'High';
}

export interface GrowthDetails {
  topGrowthGoal: string;
  expansionTargets?: string[];
  keyMilestones: string[];
}

export interface RiskDetails {
  criticalRisks: string[];
  biggestAssumption: string;
}

export interface RecommendationDetails {
  immediateActions: string[];
  longTermFocus: string[];
}

export interface BusinessJSON {
  business: BusinessDetails;
  market: MarketDetails;
  customer: CustomerDetails;
  pricing: PricingDetails;
  marketing: MarketingDetails;
  operations: OperationsDetails;
  competition: CompetitionDetails;
  financials: FinancialDetails;
  proof: ProofDetails;
  growth: GrowthDetails;
  risks: RiskDetails;
  recommendations: RecommendationDetails;
}

export type ScorePriority = 'Critical' | 'High' | 'Medium' | 'Low';

export interface BACSScoreItem {
  key: string;
  title: string;
  score: number; // 0 - 100
  priority: ScorePriority;
  explanation: string;
  recommendedAction: string;
}

export interface RealityCheckItem {
  assumption: string;
  whyItMatters: string;
  riskIfWrong: string;
  lowCostExperiment: string;
  expectedLearning?: string;
  riskLevel?: 'Critical' | 'High' | 'Medium';
}

export type HiddenAssumptionItem = RealityCheckItem;

export interface OneThingToFix {
  title: string;
  whyItMatters: string;
  expectedImpact: string;
  estimatedEffort: string;
  expectedRoi: string;
  actionStep: string;
}

export interface RoadmapItem {
  phase: string;
  title: string;
  duration: string;
  focusArea: string;
  items: string[];
}

export interface PriorityMatrixItem {
  task: string;
  impact: 'High' | 'Low';
  effort: 'High' | 'Low';
  quadrant: 'Quick Win' | 'Major Project' | 'Fill-in' | 'Thankless Task';
}

export type BACSDecision = 'Proceed' | 'Proceed with Validation' | 'Pivot' | 'Pause' | 'Scale' | 'Stop';

export interface FiveCoreAnswers {
  shouldBuildFixScale: string;
  biggestLeak: string;
  leakCause: string;
  cheapestExperiment: string;
  thisWeekActionPlan: string;
}

export interface BACSDecisionEngine {
  decision: BACSDecision;
  decisionRationale: string;
  fiveCoreAnswers: FiveCoreAnswers;
  customerEvidenceScore: number;
  evidenceItemsCollected: string[];
}

export interface CustomerExperienceMetrics {
  score: number;
  responseTime: string;
  complaintHandling: string;
  staffAttitude: string;
  serviceConsistency: string;
  easeOfBusiness: string;
  trustRecovery: string;
  refundExperience: string;
  npsScore: string;
  keyLeakPoint: string;
}

export interface CustomerLeakageMapItem {
  stageName: 'Visitors' | 'Enquiries' | 'Sales' | 'Repeat Customers' | 'Referrals';
  count: number;
  conversionRate: string;
  isPrimaryLeak?: boolean;
  leakReason?: string;
}

export interface JourneyStageItem {
  stage: 'Awareness' | 'Interest' | 'Evaluation' | 'Purchase' | 'Onboarding' | 'Experience' | 'Retention' | 'Advocacy';
  riskLevel: 'Low' | 'Medium' | 'High' | 'Critical';
  evidenceLevel: 'Validated' | 'Partial' | 'Unverified';
  leakDescription: string;
  recommendation: string;
}

export interface IntelligenceAnalysis {
  overallHealthScore: number;
  aiConfidence: number;
  bacsIndexScore: number;
  scores: BACSScoreItem[];
  executiveSummary: string;
  strengths: string[];
  weaknesses: string[];
  growthOpportunities: string[];
  criticalRisks: string[];
  quickWins: string[];
  roadmap: RoadmapItem[];
  priorityMatrix: PriorityMatrixItem[];
  realityCheck: RealityCheckItem[];
  oneThingToFix?: OneThingToFix;
  decisionEngine?: BACSDecisionEngine;
  cxMetrics?: CustomerExperienceMetrics;
  leakageMap?: CustomerLeakageMapItem[];
  businessJourney?: JourneyStageItem[];
}

export interface IndustryKnowledge {
  industry: string;
  commonProblems: string[];
  commonMistakes: string[];
  growthOpportunities: string[];
  typicalKPIs: string[];
  warningSigns: string[];
  quickWins: string[];
  typicalCustomerJourney?: string[];
  operationalRisks?: string[];
  pricingModels?: string[];
  competitiveRisks?: string[];
  marketingChannels?: string[];
  regulatoryConsiderations?: string[];
  validationExperiments?: string[];
}

export interface ActionTaskItem {
  id: string;
  title: string;
  timeframe: 'Today' | 'This Week' | '30-Day Plan' | '90-Day Plan';
  source: string;
  completed: boolean;
  effort?: string;
  impact?: string;
}

export interface InterviewQA {
  questionId: string;
  question: string;
  answer: string;
  category: string;
  suggestedAnswers?: string[];
}

export type AdaptiveInterviewQA = InterviewQA;

export interface CopilotMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  suggestedActions?: string[];
  suggestedPrompts?: string[];
}

export interface SavedProfile {
  id: string;
  createdAt: string;
  updatedAt: string;
  stage: BusinessStage;
  businessJson: BusinessJSON;
  analysis: IntelligenceAnalysis;
  copilotHistory?: CopilotMessage[];
}

export interface DemoPreset {
  id: string;
  name: string;
  industry: string;
  stage: BusinessStage;
  tagline: string;
  iconName: string;
  businessJson: BusinessJSON;
  analysis: IntelligenceAnalysis;
}
