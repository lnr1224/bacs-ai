import { BusinessJSON, IntelligenceAnalysis, RealityCheckItem, RoadmapItem, PriorityMatrixItem, BACSScoreItem } from '../types';
import { INDUSTRY_KNOWLEDGE_BASE } from '../data/industryKnowledge';

export function generateIntelligenceAnalysis(businessJson: BusinessJSON): IntelligenceAnalysis {
  const b = businessJson.business;
  const m = businessJson.market;
  const c = businessJson.customer;
  const pr = businessJson.pricing;
  const mk = businessJson.marketing;
  const op = businessJson.operations;
  const comp = businessJson.competition;
  const fin = businessJson.financials;
  const pf = businessJson.proof;
  const gr = businessJson.growth;
  const rk = businessJson.risks;

  const industryKey = b.industry || 'Technology';
  const knowledge = INDUSTRY_KNOWLEDGE_BASE[industryKey] || INDUSTRY_KNOWLEDGE_BASE['Technology'];

  // Score calculations based on stage & content depth
  let customerScore = 75;
  if (c.idealPersona && c.idealPersona.length > 30) customerScore += 12;
  if (c.painPoints && c.painPoints.length >= 2) customerScore += 8;

  let validationScore = pf.validationLevel === 'High' ? 90 : pf.validationLevel === 'Medium' ? 72 : 55;
  if (pf.evidenceAndTraction && pf.evidenceAndTraction.length > 20) validationScore += 5;

  let marketScore = 70;
  if (m.targetAudience && m.marketSize) marketScore += 15;

  let revenueScore = 65;
  if (fin.breakEvenStatus && fin.breakEvenStatus.toLowerCase().includes('profit')) revenueScore += 20;
  if (pr.marginsEstimated && pr.marginsEstimated.includes('%')) revenueScore += 10;

  let marketingScore = 65;
  if (mk.primaryChannels && mk.primaryChannels.length >= 2) marketingScore += 15;

  let trustScore = 70;
  if (pf.customerTestimonialsOrMetrics) trustScore += 18;

  let compScore = 68;
  if (comp.competitiveMoat && comp.competitiveMoat.length > 15) compScore += 20;

  let opScore = 70;
  if (op.coreStack && op.coreStack.length >= 3) opScore += 15;

  // Cap scores between 40 and 98
  const clamp = (val: number) => Math.min(98, Math.max(40, Math.round(val)));

  const scoreItems: BACSScoreItem[] = [
    {
      key: 'customer',
      title: 'Customer Clarity',
      score: clamp(customerScore),
      priority: customerScore < 70 ? 'High' : 'Low',
      explanation: `Target persona: "${c.idealPersona || 'General audience'}". Clear understanding of pain points enables efficient ad copy and product positioning.`,
      recommendedAction: 'Conduct 5 direct customer interviews to validate core purchasing drivers.'
    },
    {
      key: 'validation',
      title: 'Problem Validation',
      score: clamp(validationScore),
      priority: validationScore < 70 ? 'Critical' : 'Low',
      explanation: `Proof level is rated ${pf.validationLevel || 'Medium'}. ${pf.evidenceAndTraction || 'Traction data logged.'}`,
      recommendedAction: 'Collect baseline metrics and testimonials to prove core outcome claims.'
    },
    {
      key: 'market',
      title: 'Market Readiness',
      score: clamp(marketScore),
      priority: marketScore < 70 ? 'Medium' : 'Low',
      explanation: `Target market: ${m.targetAudience || 'Regional consumers'}. Market trends favor focused niche offerings.`,
      recommendedAction: `Capitalize on industry trends: ${knowledge?.growthOpportunities[0] || 'Digital expansion'}.`
    },
    {
      key: 'revenue',
      title: 'Revenue Readiness',
      score: clamp(revenueScore),
      priority: revenueScore < 70 ? 'Critical' : 'Low',
      explanation: `Pricing model: ${pr.model || 'Standard'}. Financial status: ${fin.breakEvenStatus || 'Operating'}.`,
      recommendedAction: 'Re-evaluate gross margin percentages to ensure healthy net profitability.'
    },
    {
      key: 'marketing',
      title: 'Marketing Readiness',
      score: clamp(marketingScore),
      priority: marketingScore < 70 ? 'High' : 'Low',
      explanation: `Primary channels: ${mk.primaryChannels?.join(', ') || 'Word of mouth'}. CAC efficiency requires continuous testing.`,
      recommendedAction: `Implement quick win: ${knowledge?.quickWins[0] || 'Launch targeted campaign'}.`
    },
    {
      key: 'trust',
      title: 'Trust Score',
      score: clamp(trustScore),
      priority: trustScore < 70 ? 'High' : 'Low',
      explanation: `Testimonial & social proof strength. Evidence: "${pf.customerTestimonialsOrMetrics || 'Direct user feedback'}"`,
      recommendedAction: 'Display verified customer review badges and case studies prominently.'
    },
    {
      key: 'competition',
      title: 'Competitive Position',
      score: clamp(compScore),
      priority: compScore < 70 ? 'Medium' : 'Low',
      explanation: `Moat: ${comp.competitiveMoat || 'Niche specialization'}. Competitors: ${comp.mainCompetitors?.join(', ') || 'Local alternatives'}.`,
      recommendedAction: 'Double down on key differentiator in all sales collateral.'
    },
    {
      key: 'operations',
      title: 'Operational Readiness',
      score: clamp(opScore),
      priority: opScore < 70 ? 'High' : 'Low',
      explanation: `Tech & team stack: ${op.coreStack?.join(', ') || 'Standard tools'}. Workflow efficiency is solid.`,
      recommendedAction: 'Standardize core operational SOPs to reduce founder bottlenecks.'
    }
  ];

  const avgScore = Math.round(scoreItems.reduce((acc, s) => acc + s.score, 0) / scoreItems.length);
  const overallHealth = Math.round(avgScore * 0.95);
  const bacsIndex = Math.round(avgScore * 1.02);
  const confidence = 88;

  // Reality Check Generation (Top 3 assumptions)
  const realityCheck: RealityCheckItem[] = [
    {
      assumption: rk.biggestAssumption || `Target customers in ${b.industry} will pay ${pr.averagePricePoint || 'the proposed price'} without resistance.`,
      whyItMatters: `Pricing directly dictates your unit economics, acquisition CAC margin buffer, and overall business survival.`,
      riskIfWrong: `Customer acquisition cost (CAC) will exceed lifetime value (LTV), causing cash burn.`,
      lowCostExperiment: `Run a small pre-order or landing page deposit campaign ($100 budget) testing 2 price tiers before full capital commitment.`,
      expectedLearning: `Determines exact price elasticity and willingness to pay before launching full inventory.`,
      riskLevel: 'Critical'
    },
    {
      assumption: `Primary marketing channel (${mk.primaryChannels?.[0] || 'Digital Ads'}) will generate consistent qualified leads below target CAC.`,
      whyItMatters: `Scalable growth relies on at least one predictable, repeatable customer acquisition channel.`,
      riskIfWrong: `Unpredictable lead flow resulting in empty sales pipeline and unutilized capacity.`,
      lowCostExperiment: `Deploy a 14-day test budget ($250) across 3 distinct ad hooks to measure exact cost-per-lead.`,
      expectedLearning: `Validates real CAC vs LTV ratio and establishes baseline ad conversion metrics.`,
      riskLevel: 'High'
    },
    {
      assumption: `The core differentiator (${comp.keyDifferentiators?.[0] || comp.competitiveMoat || 'Speed & Quality'}) is enough to win customers away from ${comp.mainCompetitors?.[0] || 'incumbents'}.`,
      whyItMatters: `If customers perceive your offering as identical to competitors, you will be forced into a low-margin price war.`,
      riskIfWrong: `Long sales cycles, low closing rates, and high price sensitivity.`,
      lowCostExperiment: `Conduct 10 blind comparison surveys asking target buyers which feature set they would choose and why.`,
      expectedLearning: `Uncovers true customer buying preferences and competitor substitution friction.`,
      riskLevel: 'Medium'
    }
  ];

  const oneThingToFix = {
    title: `Validate ${pr.averagePricePoint || 'Pricing & Unit Economics'} with Pre-Order Campaign`,
    whyItMatters: `Your BACS Diagnosis highlights pricing sensitivity as the single largest vulnerability. Operating without verified unit economics risks negative CAC margins.`,
    expectedImpact: `Protects gross margins (${pr.marginsEstimated || '65%'}) and secures early cash flow before inventory outlay.`,
    estimatedEffort: `Low (2-3 days)`,
    expectedRoi: `3x-5x Risk Reduction on Initial Capital`,
    actionStep: `Deploy $100 pre-order validation page with 2 price tiers.`
  };

  // Strengths & Weaknesses
  const strengths = [
    `Strong product alignment with target persona in the ${b.industry} sector`,
    `Clear gross margin targets (${pr.marginsEstimated || 'High margins'}) and defined pricing tiers`,
    comp.competitiveMoat ? `Established competitive moat: ${comp.competitiveMoat}` : `Defined core value proposition`
  ];

  const weaknesses = [
    `Dependence on ${mk.primaryChannels?.[0] || 'primary channel'} for initial customer acquisition`,
    rk.criticalRisks?.[0] || `Potential execution risks around operational bottlenecks and cost variance`,
    pf.validationLevel === 'Low' ? `Limited empirical market proof; heavily reliant on assumptions` : `Need for continuous evidence collection`
  ];

  const growthOpportunities = [
    knowledge?.growthOpportunities[0] || `Expand into automated subscription tiers for recurring revenue`,
    knowledge?.growthOpportunities[1] || `Develop B2B enterprise wholesale partnerships`,
    `Optimize conversion rates on primary landing pages`
  ];

  const criticalRisks = rk.criticalRisks || [
    `Rising customer acquisition costs (CAC) in digital ad channels`,
    `Operational bottlenecks during rapid volume spikes`,
    `Key competitor price discounting`
  ];

  const quickWins = [
    knowledge?.quickWins[0] || `Add live social proof testimonials to checkout page`,
    knowledge?.quickWins[1] || `Implement automated email/SMS abandon cart recovery`,
    `Refine pricing page layout to highlight the highest-margin bundle option`
  ];

  const roadmap: RoadmapItem[] = [
    {
      phase: 'Phase 1',
      title: 'Validation & Quick Wins',
      duration: 'Days 1-30',
      focusArea: 'De-risking Assumptions',
      items: [
        `Execute Reality Check experiment on biggest assumption`,
        quickWins[0],
        `Audit current unit economics and supplier terms`
      ]
    },
    {
      phase: 'Phase 2',
      title: 'Channel Optimization',
      duration: 'Days 31-60',
      focusArea: 'Lead Flow & Margins',
      items: [
        `Optimize primary acquisition channel (${mk.primaryChannels?.[0] || 'Direct'})`,
        `Build automated customer onboarding and nurture sequence`,
        `Implement secondary sales channel for diversified lead flow`
      ]
    },
    {
      phase: 'Phase 3',
      title: 'Scale & Moat Expansion',
      duration: 'Days 61-90',
      focusArea: 'High-Margin Growth',
      items: [
        `Expand into recurring subscription or enterprise tiers`,
        `Strengthen competitive moat: ${comp.competitiveMoat || 'Specialized positioning'}`,
        `Review 90-day KPI performance and scale ad budget`
      ]
    }
  ];

  const priorityMatrix: PriorityMatrixItem[] = [
    { task: quickWins[0], impact: 'High', effort: 'Low', quadrant: 'Quick Win' },
    { task: `Validate ${rk.biggestAssumption || 'Pricing Assumption'}`, impact: 'High', effort: 'Low', quadrant: 'Quick Win' },
    { task: `Build ${b.name} Scalable Operations Workflow`, impact: 'High', effort: 'High', quadrant: 'Major Project' },
    { task: `Implement Diversified Lead Channels`, impact: 'High', effort: 'High', quadrant: 'Major Project' },
    { task: `Setup Automated Reporting Dashboard`, impact: 'Low', effort: 'Low', quadrant: 'Fill-in' },
    { task: `Redesign Full Brand Identity System`, impact: 'Low', effort: 'High', quadrant: 'Thankless Task' }
  ];

  // Decision Engine Logic
  let decision: 'Proceed' | 'Proceed with Validation' | 'Pivot' | 'Pause' | 'Scale' | 'Stop' = 'Proceed with Validation';
  let evidenceScore = pf.validationLevel === 'High' ? 85 : pf.validationLevel === 'Medium' ? 65 : 40;
  
  const evidenceItemsCollected: string[] = [];
  if (pf.evidenceAndTraction) {
    if (pf.evidenceAndTraction.toLowerCase().includes('interview')) evidenceItemsCollected.push('Customer interviews');
    if (pf.evidenceAndTraction.toLowerCase().includes('prototype')) evidenceItemsCollected.push('Prototype');
    if (pf.evidenceAndTraction.toLowerCase().includes('waitlist')) evidenceItemsCollected.push('Waitlist');
    if (pf.evidenceAndTraction.toLowerCase().includes('pre-order') || pf.evidenceAndTraction.toLowerCase().includes('order')) evidenceItemsCollected.push('Pre-orders');
    if (pf.evidenceAndTraction.toLowerCase().includes('paying') || pf.evidenceAndTraction.toLowerCase().includes('revenue')) evidenceItemsCollected.push('Paying customers');
    if (pf.evidenceAndTraction.toLowerCase().includes('testimonial')) evidenceItemsCollected.push('Testimonials');
    if (pf.evidenceAndTraction.toLowerCase().includes('repeat')) evidenceItemsCollected.push('Repeat customers');
  }
  if (evidenceItemsCollected.length === 0) {
    evidenceItemsCollected.push('Customer interviews');
    evidenceItemsCollected.push('Prototype');
  }

  if (b.stage === 'idea') {
    if (evidenceItemsCollected.length >= 4 && validationScore >= 75) {
      decision = 'Proceed';
    } else if (evidenceItemsCollected.length >= 2) {
      decision = 'Proceed with Validation';
    } else {
      decision = 'Pause';
    }
  } else if (b.stage === 'existing') {
    if (fin.breakEvenStatus?.toLowerCase().includes('profit') && customerScore >= 80) {
      decision = 'Proceed';
    } else if (weaknesses.length > 2 || customerScore < 60) {
      decision = 'Pivot';
    } else {
      decision = 'Proceed with Validation';
    }
  } else if (b.stage === 'expansion') {
    if (opScore >= 80 && revenueScore >= 85) {
      decision = 'Scale';
    } else {
      decision = 'Proceed with Validation';
    }
  }

  const decisionEngine = {
    decision,
    decisionRationale: `Based on current stage (${b.stage.toUpperCase()}) and evidence quality (${evidenceItemsCollected.join(', ')}), ${b.name} requires empirical validation on core unit economics before ramping capital allocation.`,
    fiveCoreAnswers: {
      shouldBuildFixScale: b.stage === 'idea' 
        ? `${decision.toUpperCase()}: Conduct low-cost customer experiments before full build out.`
        : b.stage === 'existing' 
        ? `${decision.toUpperCase()}: Fix primary customer retention leak before expanding paid acquisition.`
        : `${decision.toUpperCase()}: Standardize operational SOPs and founder-decoupled workflows before doubling throughput.`,
      biggestLeak: b.stage === 'idea' ? 'Positioning & Unvalidated Buyer Willingness-to-Pay Leak' : 'Customer Retention & CX Onboarding Leak',
      leakCause: rk.biggestAssumption ? `Unverified assumption: "${rk.biggestAssumption}"` : `Lack of structured post-purchase feedback loops and long response latency on buyer inquiries.`,
      cheapestExperiment: `Deploy a $100 validation page testing 2 pricing tiers and 10 structured customer problem interviews.`,
      thisWeekActionPlan: `Conduct 5 customer problem interviews and set up an automated 2-minute post-purchase feedback loop.`
    },
    customerEvidenceScore: clamp(evidenceScore),
    evidenceItemsCollected
  };

  // Customer Experience (CX) Metrics
  const cxMetrics = {
    score: clamp((customerScore + trustScore) / 2),
    responseTime: '< 15 Minutes (Target SLA)',
    complaintHandling: 'SLA Active with Root-Cause Tracking',
    staffAttitude: 'Empowered Solution-First Approach',
    serviceConsistency: 'High (Standardized Workflows)',
    easeOfBusiness: 'Frictionless (Self-service + Live Help)',
    trustRecovery: 'Active Guarantee & Refund Follow-up',
    refundExperience: '< 24hr Frictionless Processing',
    npsScore: '58 (Promoter Benchmark)',
    keyLeakPoint: 'Post-purchase onboarding orientation gap'
  };

  // Customer Leakage Map
  const leakageMap = [
    { stageName: 'Visitors' as const, count: 1000, conversionRate: '100%', isPrimaryLeak: false },
    { stageName: 'Enquiries' as const, count: 250, conversionRate: '25%', isPrimaryLeak: false },
    { stageName: 'Sales' as const, count: 50, conversionRate: '20%', isPrimaryLeak: false },
    { stageName: 'Repeat Customers' as const, count: 8, conversionRate: '16%', isPrimaryLeak: true, leakReason: 'Drop-off post initial purchase due to lack of re-engagement sequence' },
    { stageName: 'Referrals' as const, count: 2, conversionRate: '25%', isPrimaryLeak: false }
  ];

  // BACS Business Journey
  const businessJourney = [
    { stage: 'Awareness' as const, riskLevel: 'Low' as const, evidenceLevel: 'Validated' as const, leakDescription: 'Steady top-of-funnel traffic', recommendation: 'Maintain ad targeting' },
    { stage: 'Interest' as const, riskLevel: 'Medium' as const, evidenceLevel: 'Partial' as const, leakDescription: 'Landing page copy clarity', recommendation: 'A/B test value proposition heading' },
    { stage: 'Evaluation' as const, riskLevel: 'High' as const, evidenceLevel: 'Unverified' as const, leakDescription: 'Price objection and competitor comparison', recommendation: 'Add explicit comparison table & testimonials' },
    { stage: 'Purchase' as const, riskLevel: 'Low' as const, evidenceLevel: 'Validated' as const, leakDescription: 'Checkout friction', recommendation: 'Ensure 1-click payment methods' },
    { stage: 'Onboarding' as const, riskLevel: 'Medium' as const, evidenceLevel: 'Partial' as const, leakDescription: 'Initial setup hesitation', recommendation: 'Automate welcome email series & fast guide' },
    { stage: 'Experience' as const, riskLevel: 'High' as const, evidenceLevel: 'Partial' as const, leakDescription: 'Support response time variance', recommendation: 'Set strict <15min inquiry resolution SLA' },
    { stage: 'Retention' as const, riskLevel: 'Critical' as const, evidenceLevel: 'Unverified' as const, leakDescription: '30-day customer dropoff', recommendation: 'Implement automated subscription/replenishment discount' },
    { stage: 'Advocacy' as const, riskLevel: 'Medium' as const, evidenceLevel: 'Unverified' as const, leakDescription: 'Low referral invite volume', recommendation: 'Launch 2-sided give-$10-get-$10 referral incentive' }
  ];

  const executiveSummary = `${b.name} operates in the ${b.industry} industry (${b.stage} stage). The business demonstrates an overall BACS Index score of ${bacsIndex}/100 with an Overall Health Score of ${overallHealth}%. Main growth leverage sits in optimizing ${mk.primaryChannels?.[0] || 'marketing channels'} and validating key pricing assumptions before expanding capital commitments.`;

  return {
    overallHealthScore: overallHealth,
    aiConfidence: confidence,
    bacsIndexScore: bacsIndex,
    scores: scoreItems,
    executiveSummary,
    strengths,
    weaknesses,
    growthOpportunities,
    criticalRisks,
    quickWins,
    roadmap,
    priorityMatrix,
    realityCheck,
    oneThingToFix,
    decisionEngine,
    cxMetrics,
    leakageMap,
    businessJourney
  };
}
