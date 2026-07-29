import { BusinessJSON, BusinessStage } from '../../types';

export interface BACSSystemFormula {
  M: number; // Motivation (1 - 10)
  D: number; // Diagnosis (1 - 10)
  F: number; // Customer Feasibility (1 - 10)
  P: number; // Proof (1 - 10)
  rawB: number; // M * (D + F) * P (Max 10 * 20 * 10 = 2000)
  conversionIndex: number; // Normalized (0 - 100)
}

export type ComplexityLevel = 'Low' | 'Medium' | 'High' | 'Critical';

export interface ComplexityBarrierDetails {
  overallLevel: ComplexityLevel;
  score: number; // 0 - 100 friction level
  decisionCount: number;
  readingComplexity: 'Simple' | 'Moderate' | 'Dense' | 'Overwhelming';
  timeRequired: string;
  workflowChanges: 'Zero' | 'Minor Adjustment' | 'Moderate Shift' | 'Heavy Disruption';
  cognitiveLoad: 'Minimal' | 'Moderate' | 'High' | 'Cognitive Fatigue';
  userEffort: 'Frictionless' | 'Manageable' | 'Taxing' | 'Barrier to Purchase';
  keyFrictionDrivers: string[];
}

export interface FeasibilityScorecard {
  overallScore: number; // 1 - 10
  timeToValue: number; // 1 - 10
  brainCyclesRequired: number; // 1 - 10
  workflowDisruption: number; // 1 - 10
  decisionCountFriction: number; // 1 - 10
  learningCurve: number; // 1 - 10
  commitmentRequired: number; // 1 - 10
}

export type BACSVariable = 'M' | 'D' | 'F' | 'P';

export interface MicroLeakItem {
  id: string;
  leakName: string;
  affectedVariable: BACSVariable;
  severityScore: number; // 1 - 10
  estimatedConversionLoss: 'Low' | 'Medium' | 'High' | 'Critical (-25%+)';
  supportingEvidence: string;
  rootCause: string;
  recommendedMechanism: string;
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
}

export type EvidenceStarRating = 1 | 2 | 3 | 4 | 5;
export type EvidencePyramidLevel = 'Verified' | 'Strong' | 'Moderate' | 'Weak' | 'Assumption';

export interface EvidenceClassification {
  claim: string;
  level: EvidencePyramidLevel;
  stars: EvidenceStarRating;
  starDisplay: string;
  sourceType: string;
  confidenceScore: number; // 0 - 100%
  supportingData: string;
}

export interface EvidenceQualitySummary {
  overallConfidenceScore: number;
  verifiedCount: number;
  strongCount: number;
  moderateCount: number;
  weakCount: number;
  assumptionCount: number;
  classifiedClaims: EvidenceClassification[];
}

export interface HiddenBusinessAssumption {
  id: string;
  statement: string;
  affectedVariable: BACSVariable;
  evidenceStrength: EvidencePyramidLevel;
  riskLevel: 'Critical' | 'High' | 'Medium';
  whyItMatters: string;
  riskIfWrong: string;
  validationExperiment: string;
  expectedLearning: string;
  estimatedCost: string;
  expectedTime: string;
}

export interface RemediationAction {
  id: string;
  problem: string;
  evidence: string;
  bacsVariable: BACSVariable;
  reasoning: string;
  recommendedMechanism: string;
  validationExperiment: string;
  successMetric: string;
  expectedImpact: string;
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  estimatedEffort: string;
  completed: boolean;
}

export interface FourPhaseAuditProgress {
  phase1DataVerification: 'Passed' | 'In Progress' | 'Incomplete';
  phase2FormulaQuantification: 'Passed' | 'In Progress' | 'Incomplete';
  phase3MicroLeakAudit: 'Passed' | 'In Progress' | 'Incomplete';
  phase4RemediationMapping: 'Passed' | 'In Progress' | 'Incomplete';
  completedPhasesCount: number;
  auditPassed: boolean;
}

export interface CriticalScoreLeakAlert {
  variable: BACSVariable;
  variableName: string;
  score: number;
  title: string;
  whyItMatters: string;
  businessImpact: string;
  mandatoryRemediation: string;
}

export interface IndustryBACSBenchmark {
  industry: string;
  buyingTriggers: string[];
  buyingBarriers: string[];
  commonMotivationPatterns: string[];
  typicalComplexityBarriers: string[];
  proofExpectations: string[];
  industryKPIs: string[];
  conversionBenchmarks: string;
  commonScoreLeaks: string[];
  recommendedBACSFixes: string[];
}

export interface BACSCompleteAnalysis {
  formula: BACSSystemFormula;
  complexityBarrier: ComplexityBarrierDetails;
  feasibilityScorecard: FeasibilityScorecard;
  microLeaks: MicroLeakItem[];
  evidenceQuality: EvidenceQualitySummary;
  criticalScoreLeaks: CriticalScoreLeakAlert[];
  hiddenAssumptions: HiddenBusinessAssumption[];
  remediationPlan: RemediationAction[];
  fourPhaseAudit: FourPhaseAuditProgress;
  industryBenchmark: IndustryBACSBenchmark;
  executiveDiagnosticSummary: string;
}
