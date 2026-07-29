import { BusinessJSON } from '../../types';
import {
  BACSSystemFormula,
  ComplexityBarrierDetails,
  CriticalScoreLeakAlert,
  FeasibilityScorecard,
  FourPhaseAuditProgress
} from './types';

export function calculateBACSFormula(businessJson: BusinessJSON): BACSSystemFormula {
  // Extract signal values from BusinessJSON
  const proofLevel = businessJson.proof?.validationLevel || 'Medium';
  const hasTestimonials = Boolean(businessJson.proof?.customerTestimonialsOrMetrics && businessJson.proof.customerTestimonialsOrMetrics.length > 10);
  const targetAudienceClear = Boolean(businessJson.customer?.idealPersona && businessJson.customer.idealPersona.length > 10);
  const pricingModelClear = Boolean(businessJson.pricing?.model && businessJson.pricing.model.length > 3);
  const channelsClear = Boolean(businessJson.marketing?.primaryChannels && businessJson.marketing.primaryChannels.length > 0);
  const risksIdentified = Boolean(businessJson.risks?.criticalRisks && businessJson.risks.criticalRisks.length > 0);

  // 1. Motivation (M): 1 - 10
  let M = 6;
  if (businessJson.customer?.painPoints && businessJson.customer.painPoints.length >= 2) M += 1.5;
  if (businessJson.customer?.purchasingDrivers && businessJson.customer.purchasingDrivers.length >= 2) M += 1.5;
  if (businessJson.market?.trends && businessJson.market.trends.length >= 2) M += 1;
  M = Math.min(10, Math.max(1, Math.round(M)));

  // 2. Diagnosis (D): 1 - 10
  let D = 5;
  if (targetAudienceClear) D += 1.5;
  if (businessJson.business?.description && businessJson.business.description.length > 25) D += 1.5;
  if (businessJson.competition?.keyDifferentiators && businessJson.competition.keyDifferentiators.length > 0) D += 2;
  D = Math.min(10, Math.max(1, Math.round(D)));

  // 3. Feasibility (F): 1 - 10 (Customer Simplicity & Ease)
  let F = 6;
  if (pricingModelClear) F += 1.5;
  if (channelsClear) F += 1;
  if (businessJson.operations?.supplyChainOrWorkflow && businessJson.operations.supplyChainOrWorkflow.length > 15) F += 1.5;
  if (risksIdentified) F -= 1; // Risk adds friction if unaddressed
  F = Math.min(10, Math.max(1, Math.round(F)));

  // 4. Proof (P): 1 - 10
  let P = 4;
  if (proofLevel === 'High') P += 3;
  else if (proofLevel === 'Medium') P += 1.5;
  if (hasTestimonials) P += 2;
  if (businessJson.proof?.evidenceAndTraction && businessJson.proof.evidenceAndTraction.length > 20) P += 1;
  P = Math.min(10, Math.max(1, Math.round(P)));

  // BACS Formula: B = M * (D + F) * P
  const rawB = M * (D + F) * P; // Max: 10 * (10 + 10) * 10 = 2000
  const conversionIndex = Math.min(100, Math.max(10, Math.round((rawB / 2000) * 100)));

  return {
    M,
    D,
    F,
    P,
    rawB,
    conversionIndex
  };
}

export function calculateFeasibilityScorecard(F: number, businessJson: BusinessJSON): FeasibilityScorecard {
  const isIdea = businessJson.business?.stage === 'idea';
  const hasComplexWorkflow = Boolean(businessJson.operations?.supplyChainOrWorkflow?.toLowerCase().includes('custom') || businessJson.operations?.supplyChainOrWorkflow?.toLowerCase().includes('manual'));

  const brainCycles = isIdea ? Math.max(3, F - 2) : Math.min(9, F + 1);
  const timeToValue = isIdea ? Math.max(4, F - 1) : Math.min(9, F);
  const workflowDisruption = hasComplexWorkflow ? 4 : Math.min(8, F + 2);
  const decisionCountFriction = Math.min(9, F + 1);
  const learningCurve = Math.min(8, F);
  const commitmentRequired = isIdea ? 4 : Math.min(8, F + 1);

  return {
    overallScore: F,
    timeToValue,
    brainCyclesRequired: brainCycles,
    workflowDisruption,
    decisionCountFriction,
    learningCurve,
    commitmentRequired
  };
}

export function calculateComplexityBarrier(F: number, businessJson: BusinessJSON): ComplexityBarrierDetails {
  const frictionScore = Math.max(10, Math.min(95, 100 - F * 10));
  
  let overallLevel: 'Low' | 'Medium' | 'High' | 'Critical' = 'Medium';
  if (frictionScore >= 75) overallLevel = 'Critical';
  else if (frictionScore >= 55) overallLevel = 'High';
  else if (frictionScore >= 35) overallLevel = 'Medium';
  else overallLevel = 'Low';

  const isIdea = businessJson.business?.stage === 'idea';

  return {
    overallLevel,
    score: frictionScore,
    decisionCount: frictionScore > 60 ? 7 : frictionScore > 35 ? 4 : 2,
    readingComplexity: frictionScore > 65 ? 'Dense' : frictionScore > 40 ? 'Moderate' : 'Simple',
    timeRequired: isIdea ? '10 - 15 mins friction' : '2 - 5 mins frictionless',
    workflowChanges: frictionScore > 60 ? 'Moderate Shift' : 'Minor Adjustment',
    cognitiveLoad: frictionScore > 65 ? 'High' : frictionScore > 35 ? 'Moderate' : 'Minimal',
    userEffort: frictionScore > 70 ? 'Barrier to Purchase' : frictionScore > 40 ? 'Taxing' : 'Frictionless',
    keyFrictionDrivers: [
      'Multi-step decision choices required before value demo',
      'Uncertain pricing or hidden shipping/setup costs',
      'High reading complexity in product value proposition'
    ]
  };
}

export function detectCriticalScoreLeaks(formula: BACSSystemFormula): CriticalScoreLeakAlert[] {
  const alerts: CriticalScoreLeakAlert[] = [];

  if (formula.M <= 3) {
    alerts.push({
      variable: 'M',
      variableName: 'Motivation (M)',
      score: formula.M,
      title: '🚨 Critical Score Leak: Low Customer Motivation',
      whyItMatters: 'Customers do not feel acute urgency or emotional drive to solve this problem right now.',
      businessImpact: 'High bounce rates, poor ad CTR, and prolonged sales cycles.',
      mandatoryRemediation: 'Re-frame messaging around an expensive, urgent pain point or high-desire transformation.'
    });
  }

  if (formula.D <= 3) {
    alerts.push({
      variable: 'D',
      variableName: 'Diagnosis (D)',
      score: formula.D,
      title: '🚨 Critical Score Leak: Low Intellectual Certainty (Diagnosis)',
      whyItMatters: 'Target buyers do not clearly understand what problem is being solved or why this specific solution fits.',
      businessImpact: 'Prospects leave confused without taking action ("I do not get what this does").',
      mandatoryRemediation: 'Simplify positioning statement to a 1-sentence Before/After value promise.'
    });
  }

  if (formula.F <= 3) {
    alerts.push({
      variable: 'F',
      variableName: 'Customer Feasibility (F)',
      score: formula.F,
      title: '🚨 Critical Score Leak: High Customer Friction (Feasibility)',
      whyItMatters: 'The buying or onboarding process requires too many brain cycles, decisions, or effort.',
      businessImpact: 'Massive checkout or lead form abandonment at the final step.',
      mandatoryRemediation: 'Eliminate 50% of input fields and offer a 1-click starter option or instant demo.'
    });
  }

  if (formula.P <= 3) {
    alerts.push({
      variable: 'P',
      variableName: 'Proof & Trust (P)',
      score: formula.P,
      title: '🚨 Critical Score Leak: Low Emotional Certainty (Proof Deficit)',
      whyItMatters: 'Prospects doubt whether the product will deliver on its promises.',
      businessImpact: 'High cart abandonment and price resistance despite high product interest.',
      mandatoryRemediation: 'Add verified customer video reviews, clinical/technical proof, and a 100% risk-free guarantee.'
    });
  }

  return alerts;
}

export function checkFourPhaseAudit(businessJson: BusinessJSON): FourPhaseAuditProgress {
  const hasData = Boolean(businessJson.business?.name && businessJson.business?.industry);
  const hasQA = Boolean(businessJson.customer?.idealPersona);

  return {
    phase1DataVerification: hasData ? 'Passed' : 'In Progress',
    phase2FormulaQuantification: hasData ? 'Passed' : 'In Progress',
    phase3MicroLeakAudit: hasQA ? 'Passed' : 'In Progress',
    phase4RemediationMapping: hasQA ? 'Passed' : 'In Progress',
    completedPhasesCount: 4,
    auditPassed: true
  };
}
