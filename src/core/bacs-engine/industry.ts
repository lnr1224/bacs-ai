import { IndustryBACSBenchmark } from './types';

export const INDUSTRY_BACS_DATABASE: Record<string, IndustryBACSBenchmark> = {
  Beauty: {
    industry: 'Beauty & Skincare',
    buyingTriggers: ['Visible fast results', 'Skin sensitivity solutions', 'Influencer/Dermatologist endorsement', 'Clean organic ingredients'],
    buyingBarriers: ['Fear of skin breakouts', 'High price uncertainty', 'Overcrowded market claims', 'Skepticism of before/after photos'],
    commonMotivationPatterns: ['High aesthetic confidence desire', 'Urgency to solve skin flare-ups', 'Self-care ritual positioning'],
    typicalComplexityBarriers: ['Over-complicated 10-step routines', 'Confusing chemical ingredient lists', 'Unclear shade/skin type selector'],
    proofExpectations: ['Dermatologist clinical trial data', 'Unfiltered video testimonials', 'Before/After photo verification', '30-day money-back guarantee'],
    industryKPIs: ['Conversion Rate: 2.8% - 4.2%', 'Repeat Order Rate: 35%', 'AOV: $65 - $95', 'LTV: $220'],
    conversionBenchmarks: 'Average E-commerce Beauty Conversion: 3.2%. High Proof brands reach 5.5%+',
    commonScoreLeaks: ['Weak ingredient proof (P ≤ 3)', 'Overly complex routine subscription flow (F ≤ 4)', 'Generic brand messaging (D ≤ 4)'],
    recommendedBACSFixes: ['3-Question Custom Skin Quiz', 'Dermatologist Clinical Badge Placement', '1-Click Starter Kit Bundle']
  },
  Furniture: {
    industry: 'Furniture & Home Decor',
    buyingTriggers: ['Home renovation/moving house', 'Need for ergonomic comfort', 'Aesthetic social flexing', 'Durability & eco-materials'],
    buyingBarriers: ['Shipping cost surprises', 'Will it fit in my room?', 'Return hassle anxiety', 'Long delivery wait times'],
    commonMotivationPatterns: ['Life stage upgrade (new apartment/home)', 'Remote work posture improvement'],
    typicalComplexityBarriers: ['Assembly nightmare fears', 'Unclear dimension diagrams', 'Complex custom fabric options'],
    proofExpectations: ['AR 3D Room Viewer', 'Real customer room photos', 'Material swatch samples', 'Clear delivery timeline calculator'],
    industryKPIs: ['Conversion Rate: 1.2% - 2.1%', 'AOV: $450 - $1,200', 'Cart Abandonment: 72%'],
    conversionBenchmarks: 'High ticket item requiring high Proof (P >= 8) and AR Feasibility friction reduction.',
    commonScoreLeaks: ['High shipping friction at checkout (F ≤ 3)', 'Lack of in-room scale proof (P ≤ 4)'],
    recommendedBACSFixes: ['Free Fabric Swatch Request', 'Flat-rate transparent shipping indicator', 'Interactive 3D Room Visualizer']
  },
  Software: {
    industry: 'Software & SaaS',
    buyingTriggers: ['Workflow bottleneck pain', 'Team productivity loss', 'Executive mandate to automate', 'Tool consolidation'],
    buyingBarriers: ['Implementation headache', 'Data security concerns', 'Budget approval hierarchy', 'Employee onboarding resistance'],
    commonMotivationPatterns: ['Urgent time-saving need', 'Fear of falling behind competitors'],
    typicalComplexityBarriers: ['Lengthy mandatory demo booking required', 'Complex pricing tiers without calculator', 'Clunky onboarding setup'],
    proofExpectations: ['SOC2 / Security Compliance badges', 'Enterprise case study ROI metrics', 'Interactive sandbox product tour', 'Free 14-day trial without credit card'],
    industryKPIs: ['Trial-to-Paid Conversion: 8% - 15%', 'Monthly Churn: <2%', 'LTV/CAC Ratio: >3.5x'],
    conversionBenchmarks: 'Self-serve SaaS converts 2.5x higher when Feasibility (F) has zero-friction instant sandbox access.',
    commonScoreLeaks: ['Forced sales demo call wall (F ≤ 3)', 'Unclear ROI quantification (D ≤ 4)'],
    recommendedBACSFixes: ['Instant Interactive Product Sandbox', 'Live ROI Savings Calculator', 'No-Credit-Card Free Trial']
  },
  Healthcare: {
    industry: 'Healthcare & Wellness',
    buyingTriggers: ['Chronic discomfort/fatigue', 'Preventative health optimization', 'Doctor advice', 'Life longevity goals'],
    buyingBarriers: ['Skepticism of efficacy', 'Safety & side effect fears', 'Insurance coverage ambiguity', 'Regulatory distrust'],
    commonMotivationPatterns: ['High emotional urgency to eliminate pain', 'Desire for trusted medical guidance'],
    typicalComplexityBarriers: ['Medical jargon confusion', 'Complex intake questionnaires', 'Unclear dosage or regime'],
    proofExpectations: ['Peer-reviewed clinical studies', 'Medical board advisory approval', 'Third-party lab certificate of analysis (COA)', 'Verified patient case studies'],
    industryKPIs: ['Conversion Rate: 3.0% - 5.0%', 'Subscription Retention: 6+ months'],
    conversionBenchmarks: 'Requires maximum Proof (P >= 8) and simple Diagnosis (D >= 8).',
    commonScoreLeaks: ['Lack of clinical evidence or doctor backing (P ≤ 3)', 'Jargon-heavy explanation (D ≤ 4)'],
    recommendedBACSFixes: ['Third-Party Lab COA Viewer', 'Medical Advisory Board Profile Bar', 'Plain-Language Benefit Explainer']
  },
  Food: {
    industry: 'Food & Beverage / Restaurants',
    buyingTriggers: ['Hunger / Craving impulse', 'Special dietary needs (Keto, Vegan, Organic)', 'Convenience & speed', 'Gourmet social experience'],
    buyingBarriers: ['Taste uncertainty', 'High delivery fees', 'Spoilage during shipping', 'Allergen risks'],
    commonMotivationPatterns: ['Impulse craving', 'Health transformation goal', 'Meal prep time saving'],
    typicalComplexityBarriers: ['Confusing menu customization', 'High minimum order threshold', 'Subscription lock-in anxiety'],
    proofExpectations: ['High-res appetizing macro food photography', 'Unboxing video shorts', 'Taste guarantee policy', 'Nutritional ingredient transparency'],
    industryKPIs: ['Repeat Purchase Rate: 45%', 'Cart Abandonment: 65%', 'AOV: $40 - $80'],
    conversionBenchmarks: 'Impulse food purchases require high Motivation (M >= 8) and zero-friction Feasibility (F >= 8).',
    commonScoreLeaks: ['Hidden delivery fee at checkout (F ≤ 3)', 'Low-quality imagery (P ≤ 4)'],
    recommendedBACSFixes: ['Taste Risk-Free Guarantee', '1-Click Variety Sampler Box', 'Transparent Upfront Delivery Timer']
  },
  Default: {
    industry: 'General Business & Retail',
    buyingTriggers: ['Unmet practical need', 'Desire for efficiency or quality', 'Peer recommendation'],
    buyingBarriers: ['Unclear product value', 'Price sensitivity', 'Trust deficit in unknown brand'],
    commonMotivationPatterns: ['Problem resolution', 'Convenience', 'Value for money'],
    typicalComplexityBarriers: ['Too many checkout steps', 'Lack of immediate live chat / support', 'Complex returns policy'],
    proofExpectations: ['Verified customer reviews', 'Secure checkout badges', 'Clear warranty policy', 'Social proof counter'],
    industryKPIs: ['Conversion Rate: 2.0% - 3.5%', 'Customer Acquisition Cost: Varies', 'AOV: $75'],
    conversionBenchmarks: 'Balanced BACS profile required across Motivation, Diagnosis, Feasibility, and Proof.',
    commonScoreLeaks: ['Low emotional certainty / missing social proof (P ≤ 3)', 'Unclear value message (D ≤ 4)'],
    recommendedBACSFixes: ['Add Verified Customer Review Widget', 'Simplify Checkout to 2 Steps', 'Highlight 100% Risk-Free Guarantee']
  }
};

export function getIndustryBenchmark(industryName: string): IndustryBACSBenchmark {
  if (!industryName) return INDUSTRY_BACS_DATABASE.Default;
  const matchKey = Object.keys(INDUSTRY_BACS_DATABASE).find(key =>
    industryName.toLowerCase().includes(key.toLowerCase()) || key.toLowerCase().includes(industryName.toLowerCase())
  );
  return matchKey ? INDUSTRY_BACS_DATABASE[matchKey] : INDUSTRY_BACS_DATABASE.Default;
}
