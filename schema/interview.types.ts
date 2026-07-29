import { EvidenceMetadata } from './evidence.types';

/**
 * Interview Framework Types
 * 
 * Guides founders through evidence collection with education, not assumptions.
 */

export interface InterviewQuestion {
  id: string;
  field: string; // Which business field this populates
  category: string; // e.g., "customer", "financial", "operations"
  
  /** Plain English question */
  question: string;
  
  /** Help text explaining why we ask */
  whyWeAsk: string;
  
  /** Definition of business terms used (CAC, USP, Moat, etc.) */
  definition?: string;
  
  /** Type of input: text, number, select, multiselect, currency */
  inputType: "text" | "number" | "select" | "multiselect" | "currency" | "date" | "textarea";
  
  /** Optional: predefined choices for guided input */
  options?: InterviewOption[];
  
  /** Example answer for this industry/stage */
  exampleAnswer?: string;
  
  /** Common mistakes to avoid */
  commonMistakes?: string[];
  
  /** Is this required or optional? */
  required: boolean;
  
  /** Which BACS element does this measure? */
  bacs: "motivation" | "ability" | "concept" | "sales" | "diagnostic";
}

export interface InterviewOption {
  value: string;
  label: string;
  description?: string;
  isOther?: boolean; // Allow custom input
}

export interface InterviewResponse {
  questionId: string;
  answer: any; // Value provided by founder
  timestamp: string; // ISO 8601
  confidence?: number; // User's confidence in this answer (0-100)
  notes?: string; // User notes or caveats
}

export interface InterviewSession {
  businessId: string;
  sessionId: string;
  startedAt: string;
  completedAt?: string;
  
  /** Progress through interview categories */
  categories: {
    profile: number; // 0-100
    customer: number;
    competitive: number;
    financial: number;
    marketing: number;
    operations: number;
  };
  
  /** All responses collected so far */
  responses: InterviewResponse[];
  
  /** Which questions were skipped */
  skipped: string[];
}

/**
 * Interview Definition for a specific business type
 * 
 * Different questions for different stages and industries.
 */
export interface InterviewDefinition {
  name: string;
  description: string;
  stage: string; // "idea", "pre-launch", "launched", "scaling"
  industry?: string; // Optional: specific to industry
  
  sections: InterviewSection[];
}

export interface InterviewSection {
  title: string;
  description: string;
  category: string;
  questions: InterviewQuestion[];
}
