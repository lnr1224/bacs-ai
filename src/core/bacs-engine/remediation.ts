import { BusinessJSON } from '../../types';
import { RemediationAction } from './types';

export function buildRemediationPlan(businessJson: BusinessJSON): RemediationAction[] {
  const actions: RemediationAction[] = [];
  const name = businessJson.business?.name || 'Venture';
  const location = businessJson.business?.location || 'target market';

  actions.push({
    id: 'rem_1',
    problem: 'Excessive Decision Friction at Initial Onboarding / Checkout',
    evidence: 'Multiple choice choices and form fields required before value delivery.',
    bacsVariable: 'F',
    reasoning: 'Reduces Brain Cycles and time-to-value to maximize Customer Feasibility (F).',
    recommendedMechanism: '1-Click Starter Choice or 3-Question Guided Customizer',
    validationExperiment: 'Test 3-field simplified lead capture vs full 8-field form on landing traffic.',
    successMetric: '+25% Form Submission / Purchase Conversion',
    expectedImpact: 'Immediate 20-30% Conversion Uplift',
    priority: 'Critical',
    estimatedEffort: '1 Day',
    completed: false
  });

  actions.push({
    id: 'rem_2',
    problem: 'Emotional Trust Deficit for First-Time Visitors',
    evidence: `Lack of verified buyer video reviews or local customer proof in ${location}.`,
    bacsVariable: 'P',
    reasoning: 'Increases Proof (P) to eliminate purchasing doubt and cart abandonment.',
    recommendedMechanism: 'Anchor Verified Case Studies & 100% Risk-Free Guarantee Badge',
    validationExperiment: 'Add 3 verified customer quotes above the fold and track drop-off rate.',
    successMetric: '-15% Checkout Cart Abandonment',
    expectedImpact: '+18% Order Completion',
    priority: 'High',
    estimatedEffort: '2 Days',
    completed: false
  });

  actions.push({
    id: 'rem_3',
    problem: 'Unclear Value Proposition Differentiation',
    evidence: 'Positioning relies on feature lists rather than clear Before/After transformation.',
    bacsVariable: 'D',
    reasoning: 'Elevates Diagnosis (D) by providing immediate intellectual clarity.',
    recommendedMechanism: 'Synthesize 1-Sentence Before/After Transformation Headline',
    validationExperiment: 'A/B test transformed headline against current hero text on $50 ad test.',
    successMetric: '+30% Hero Engagement & Scroll Depth',
    expectedImpact: '+12% Lead Conversion',
    priority: 'High',
    estimatedEffort: '1 Day',
    completed: false
  });

  actions.push({
    id: 'rem_4',
    problem: 'Passive Buyer Urgency (Motivation Gap)',
    evidence: 'Product framed as nice-to-have upgrade rather than urgent expensive pain solver.',
    bacsVariable: 'M',
    reasoning: 'Boosts Motivation (M) by highlighting immediate cost/time loss of status quo.',
    recommendedMechanism: 'Quantify Cost of Inaction / Status Quo Calculator',
    validationExperiment: 'Include "Cost of Waiting" section in primary marketing presentation.',
    successMetric: '+20% Qualified Discovery Call Booking',
    expectedImpact: '+15% Sales Pipeline Speed',
    priority: 'Medium',
    estimatedEffort: '3 Days',
    completed: false
  });

  return actions;
}
