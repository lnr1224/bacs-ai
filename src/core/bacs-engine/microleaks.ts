import { BusinessJSON } from '../../types';
import { MicroLeakItem } from './types';

export function generateMicroLeaks(businessJson: BusinessJSON): MicroLeakItem[] {
  const leaks: MicroLeakItem[] = [];
  const name = businessJson.business?.name || 'Venture';
  const location = businessJson.business?.location || 'target region';

  // 1. Lead/Onboarding Friction (Feasibility F)
  leaks.push({
    id: 'leak_onboarding_friction',
    leakName: 'Lead / Onboarding Decision Friction',
    affectedVariable: 'F',
    severityScore: 8,
    estimatedConversionLoss: 'Critical (-25%+)',
    supportingEvidence: 'High number of choices and form steps before demonstrating value.',
    rootCause: 'Cognitive overload requiring too many brain cycles upfront.',
    recommendedMechanism: 'Implement 1-Click Starter Choice or Frictionless Quiz',
    priority: 'Critical'
  });

  // 2. Proof Deficit (Proof P)
  if (!businessJson.proof?.customerTestimonialsOrMetrics || businessJson.proof.validationLevel !== 'High') {
    leaks.push({
      id: 'leak_proof_deficit',
      leakName: 'Proof & Trust Deficit',
      affectedVariable: 'P',
      severityScore: 7,
      estimatedConversionLoss: 'High',
      supportingEvidence: `Lack of verified local buyer reviews or video proof in ${location}.`,
      rootCause: 'Emotional uncertainty: buyers fear making a bad financial decision.',
      recommendedMechanism: 'Anchor High-Impact Verified Customer Case Studies & Guarantee',
      priority: 'High'
    });
  }

  // 3. Unclear Value Proposition (Diagnosis D)
  leaks.push({
    id: 'leak_value_clarity',
    leakName: 'Value Proposition Ambiguity',
    affectedVariable: 'D',
    severityScore: 6,
    estimatedConversionLoss: 'Medium',
    supportingEvidence: `Messaging uses industry jargon instead of 1-sentence Before/After problem transformation.`,
    rootCause: 'Intellectual uncertainty: customer cannot quickly grasp why this fits their exact need.',
    recommendedMechanism: 'Synthesize 1-Sentence Before/After Transformation Promise',
    priority: 'Medium'
  });

  // 4. Urgency/Motivation Gap (Motivation M)
  leaks.push({
    id: 'leak_motivation_gap',
    leakName: 'Problem Urgency Gap',
    affectedVariable: 'M',
    severityScore: 7,
    estimatedConversionLoss: 'High',
    supportingEvidence: 'Core positioning highlights nice-to-have features rather than urgent, costly pain.',
    rootCause: 'Customer motivation is passive, leading to high window-shopping abandonment.',
    recommendedMechanism: 'Frame Offer Around Expensive/Urgent Pain Point Resolution',
    priority: 'High'
  });

  return leaks;
}
