export interface QuestionMeta {
  plainEnglish: string;
  whyBacsAsks: string;
  definition: string;
  goodExample: string;
  weakExample: string;
  tooltipVideoUrl?: string;
}

export type QuestionType =
  | 'guided_text'
  | 'checkboxes'
  | 'number'
  | 'currency'
  | 'file'
  | 'choice'
  | 'yes_no';

export interface Question {
  id: string; // question id
  fieldKey: string; // evidence field key this question maps to
  stage: 'idea' | 'prelaunch' | 'existing';
  section: string;
  type: QuestionType;
  options?: string[]; // for checkboxes / choice
  weight_for_variables?: { Motivation?: number; Diagnosis?: number; Feasibility?: number; Proof?: number };
  requiredFor?: string[]; // BACS variables
  priority?: 'Critical' | 'Supporting' | 'Optional';
  meta: QuestionMeta;
  uiHints?: { allowIdontKnow?: boolean; allowFileUpload?: boolean };
}

export const QUESTIONS: Question[] = [
  {
    id: 'target_customers',
    fieldKey: 'target_customers',
    stage: 'idea',
    section: 'Customer',
    type: 'guided_text',
    weight_for_variables: { Motivation: 2 },
    requiredFor: ['Motivation'],
    priority: 'Critical',
    meta: {
      plainEnglish: 'Who exactly are your target customers? (be as specific as possible)',
      whyBacsAsks: 'Without a clear target customer, marketing and product decisions are guesswork.',
      definition: 'Target Audience = the group most likely to buy (demographic, behaviours, location).',
      goodExample: 'Working mothers in Lagos with children under five who shop online for baby products.',
      weakExample: 'Everyone.'
    },
    uiHints: { allowIdontKnow: true }
  },
  {
    id: 'pain_point',
    fieldKey: 'pain_point',
    stage: 'idea',
    section: 'Problem',
    type: 'guided_text',
    weight_for_variables: { Diagnosis: 3 },
    requiredFor: ['Diagnosis'],
    priority: 'Critical',
    meta: {
      plainEnglish: 'What painful problem are you solving for the customer?',
      whyBacsAsks: 'BACS needs to see a clear problem to assess whether customers would adopt a solution.',
      definition: 'Pain point = specific problem causing measurable friction or cost to the customer.',
      goodExample: 'Customers spend 2+ hours weekly traveling to buy fresh produce; delivery is inconsistent.',
      weakExample: 'People sometimes don\'t like bad service.'
    },
    uiHints: { allowIdontKnow: true }
  },
  {
    id: 'existing_alternatives',
    fieldKey: 'existing_alternatives',
    stage: 'idea',
    section: 'Existing Alternatives',
    type: 'checkboxes',
    options: ['Competitors', 'Manual process', 'Nothing'],
    weight_for_variables: { Diagnosis: 2 },
    requiredFor: ['Diagnosis'],
    priority: 'Supporting',
    meta: {
      plainEnglish: 'How do customers solve this problem today?',
      whyBacsAsks: 'Understanding alternatives shows where you can win and what barriers exist.',
      definition: 'Existing Alternatives = current solutions customers use (products, manual workflows).',
      goodExample: 'Customers currently pay a garage to deliver parts via motorcycle couriers daily.',
      weakExample: 'They use the internet.'
    },
    uiHints: { allowIdontKnow: true }
  },
  {
    id: 'validation_interviews_count',
    fieldKey: 'validation_interviews_count',
    stage: 'idea',
    section: 'Validation',
    type: 'number',
    weight_for_variables: { Motivation: 2, Proof: 2 },
    requiredFor: ['Motivation', 'Proof'],
    priority: 'Critical',
    meta: {
      plainEnglish: 'How many potential customers have you interviewed about this idea?',
      whyBacsAsks: 'Interview counts help quantify direct customer interest and evidence quality.',
      definition: 'Number of distinct target-customer interviews with notes or recordings.',
      goodExample: '12
',
      weakExample: 'A few'
    },
    uiHints: { allowIdontKnow: true }
  },
  {
    id: 'pricing_willingness',
    fieldKey: 'pricing_willingness',
    stage: 'idea',
    section: 'Pricing',
    type: 'currency',
    weight_for_variables: { Feasibility: 2, Diagnosis: 1 },
    requiredFor: ['Feasibility'],
    priority: 'Critical',
    meta: {
      plainEnglish: 'How much would customers be willing to pay for this product/service?',
      whyBacsAsks: 'Pricing evidence is crucial for feasibility and revenue modelling.',
      definition: 'A representative price point validated by customer feedback or willingness-to-pay tests.',
      goodExample: '₦5,000 (validated by 7 of 10 interviews)',
      weakExample: 'About 50-100 bucks'
    },
    uiHints: { allowIdontKnow: true }
  },
  {
    id: 'biggest_assumption',
    fieldKey: 'biggest_assumption',
    stage: 'idea',
    section: 'Assumptions',
    type: 'guided_text',
    weight_for_variables: { Diagnosis: 2 },
    requiredFor: ['Diagnosis'],
    priority: 'Critical',
    meta: {
      plainEnglish: 'What is the single biggest assumption that must be true for this business to succeed?',
      whyBacsAsks: 'Pinpointing assumptions focuses validation efforts on the riskiest beliefs.',
      definition: 'Biggest assumption = the most critical untested belief that would invalidate the business if false.',
      goodExample: 'Customers are willing to pay ₦5,000 for weekly home delivery of fresh produce.',
      weakExample: 'People will like it.'
    },
    uiHints: { allowIdontKnow: true }
  }
];

export function getQuestionsByStage(stage: 'idea' | 'prelaunch' | 'existing') {
  return QUESTIONS.filter(q => q.stage === stage);
}
