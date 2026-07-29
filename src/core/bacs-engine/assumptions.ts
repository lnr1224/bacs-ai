import { BusinessJSON } from '../../types';
import { HiddenBusinessAssumption } from './types';

export function extractHiddenAssumptions(businessJson: BusinessJSON): HiddenBusinessAssumption[] {
  const assumptions: HiddenBusinessAssumption[] = [];
  const name = businessJson.business?.name || 'Venture';
  const location = businessJson.business?.location || 'target location';

  // Assumption 1: Conversion Switching Behavior
  assumptions.push({
    id: 'hba_1',
    statement: `Target buyers in ${location} will switch from existing incumbent solutions to ${name} for a 20% value improvement.`,
    affectedVariable: 'M',
    evidenceStrength: 'Weak',
    riskLevel: 'Critical',
    whyItMatters: 'If buyer inertia is stronger than motivation, customer acquisition costs will explode.',
    riskIfWrong: 'High ad burn rate without matching customer acquisition.',
    validationExperiment: 'Run a $100 3-day landing page smoke test offering early VIP access.',
    expectedLearning: 'Baseline customer click-through and email conversion rate.',
    estimatedCost: '$100',
    expectedTime: '3 Days'
  });

  // Assumption 2: Pricing Acceptance
  assumptions.push({
    id: 'hba_2',
    statement: `Buyers will pay ${businessJson.pricing?.averagePricePoint || 'target price point'} without requiring high sales friction.`,
    affectedVariable: 'F',
    evidenceStrength: 'Moderate',
    riskLevel: 'High',
    whyItMatters: 'Pricing friction directly impacts Feasibility (F) and conversion velocity.',
    riskIfWrong: 'Extended sales conversations required for low-margin products.',
    validationExperiment: 'A/B test two pricing tiers on 100 customer discovery interviews/visits.',
    expectedLearning: 'Price elasticity boundary where conversion drops sharply.',
    estimatedCost: '$0',
    expectedTime: '5 Days'
  });

  // Assumption 3: Primary Channel Scalability
  assumptions.push({
    id: 'hba_3',
    statement: `${businessJson.marketing?.primaryChannels?.[0] || 'Social Media Ads'} will deliver CAC below $30.`,
    affectedVariable: 'D',
    evidenceStrength: 'Assumption',
    riskLevel: 'High',
    whyItMatters: 'Channel saturation or poor message clarity can drain marketing budgets.',
    riskIfWrong: 'Unprofitable unit economics.',
    validationExperiment: 'Launch 3 creative ad variants testing pain-point vs benefit messaging.',
    expectedLearning: 'Winning ad hook CAC and CTR.',
    estimatedCost: '$150',
    expectedTime: '7 Days'
  });

  return assumptions;
}
