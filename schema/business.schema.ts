import { EvidenceMetadata } from './evidence.types';

/**
 * BACS Business Schema
 * 
 * Every field is an evidence object, never a raw value.
 * This ensures we never hallucinate data or mix founder input with AI assumptions.
 */

export interface BusinessProfile {
  /** Legal business name */
  businessName: EvidenceMetadata;
  
  /** What does this business do? */
  businessDescription: EvidenceMetadata;
  
  /** Industry classification */
  industry: EvidenceMetadata;
  
  /** Current stage of business */
  stage: EvidenceMetadata; // "idea", "pre-launch", "launched", "scaling"
  
  /** Date business was started or incorporated */
  foundedDate: EvidenceMetadata;
  
  /** Country of operation */
  country: EvidenceMetadata;
  
  /** Primary city/region */
  location: EvidenceMetadata;
}

export interface CustomerProfile {
  /** Who are your target customers? */
  targetAudience: EvidenceMetadata;
  
  /** Their specific pain points */
  customerPainPoints: EvidenceMetadata[];
  
  /** How many customers have you interviewed? */
  customersInterviewed: EvidenceMetadata;
  
  /** What do they currently use instead? */
  alternatives: EvidenceMetadata[];
  
  /** How often do they face this problem? */
  frequencyOfProblem: EvidenceMetadata;
  
  /** Willingness to pay (if known) */
  willingnessToPay: EvidenceMetadata;
}

export interface CompetitiveAdvantage {
  /** What makes this business different? */
  uniqueSellingProposition: EvidenceMetadata;
  
  /** What makes it hard to copy? */
  competitiveModat: EvidenceMetadata;
  
  /** Who are the main competitors? */
  competitors: EvidenceMetadata[];
  
  /** Why customers choose you over alternatives */
  differentiators: EvidenceMetadata[];
}

export interface FinancialMetrics {
  /** Monthly revenue (if any) */
  monthlyRevenue: EvidenceMetadata;
  
  /** Average transaction value */
  averageTransactionValue: EvidenceMetadata;
  
  /** Cost per customer acquisition */
  customerAcquisitionCost: EvidenceMetadata;
  
  /** Customer lifetime value */
  customerLifetimeValue: EvidenceMetadata;
  
  /** Monthly burn rate (spending before revenue) */
  burnRate: EvidenceMetadata;
  
  /** Gross margin percentage */
  grossMargin: EvidenceMetadata;
  
  /** Pricing strategy */
  pricingStrategy: EvidenceMetadata;
}

export interface MarketingAndSales {
  /** Primary channels for customer acquisition */
  primaryChannels: EvidenceMetadata;
  
  /** Channels already tested */
  testedChannels: EvidenceMetadata;
  
  /** Current customer acquisition strategy */
  acquisitionStrategy: EvidenceMetadata;
  
  /** Monthly customer acquisition rate (if tracked) */
  monthlyAcquisitionRate: EvidenceMetadata;
  
  /** Customer retention rate */
  retentionRate: EvidenceMetadata;
}

export interface Operations {
  /** How is the product/service delivered? */
  deliveryMethod: EvidenceMetadata;
  
  /** Cost to deliver one sale */
  costPerDelivery: EvidenceMetadata;
  
  /** How long does it take? */
  deliveryTimeline: EvidenceMetadata;
  
  /** Current team size */
  teamSize: EvidenceMetadata;
  
  /** Key team roles and experience */
  teamComposition: EvidenceMetadata;
  
  /** Fixed monthly expenses */
  monthlyFixedCosts: EvidenceMetadata;
}

export interface ValidationStatus {
  /** Which BACS elements have been validated */
  motivationValidated: boolean;
  abilityValidated: boolean;
  conceptValidated: boolean;
  salesValidated: boolean;
  
  /** Overall confidence in this business model */
  overallConfidence: number; // 0-100
  
  /** Critical unknowns blocking progress */
  criticalGaps: string[];
  
  /** When was the last full review */
  lastReviewDate: string; // ISO 8601
}

/**
 * Complete Business Model
 * 
 * This is the "Knowledge Graph"—internal representation never shown raw to users.
 * The UI layer converts this into Business Facts cards.
 */
export interface BusinessModel {
  id: string; // Unique business ID
  createdAt: string; // ISO 8601
  updatedAt: string; // ISO 8601
  
  profile: BusinessProfile;
  customer: CustomerProfile;
  competitive: CompetitiveAdvantage;
  financial: FinancialMetrics;
  marketing: MarketingAndSales;
  operations: Operations;
  validation: ValidationStatus;
}

/**
 * User-friendly representation for the UI
 * 
 * This is what users see—organized into cards, no raw JSON.
 */
export interface BusinessFact {
  label: string; // e.g., "Monthly Revenue"
  value: string | number | null; // Formatted display value
  status: "verified" | "inferred" | "unknown" | "not_applicable";
  source?: string; // "Founder Input", "BACS Calculation", etc.
  explanation?: string; // Why this matters
  icon?: string; // UI icon
}

export interface BusinessFactsCard {
  title: string; // e.g., "Business Profile", "Financial Evidence"
  description: string;
  facts: BusinessFact[];
  completionPercentage: number; // 0-100
  criticalGaps?: string[]; // What's missing
}
