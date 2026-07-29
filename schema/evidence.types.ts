/**
 * Evidence Base Type
 * 
 * Every field in BACS follows this pattern: structured data with metadata.
 * Like a medical record—never just a value, always evidence supporting it.
 */

export type EvidenceStatus = "verified" | "inferred" | "observed" | "unknown" | "not_applicable";

export type EvidenceSource = 
  | "founder_input"
  | "bacs_calculation"
  | "external_evidence"
  | "interview_response"
  | "not_provided";

export interface EvidenceMetadata {
  /** The actual value or data point */
  value: any;
  
  /** Current state of evidence for this field */
  status: EvidenceStatus;
  
  /** Where this data came from */
  source: EvidenceSource;
  
  /** How confident we are in this data (0-100) */
  confidence: number;
  
  /** When was this last updated or verified */
  lastUpdated: string; // ISO 8601 date
  
  /** Why we're asking for this in the BACS framework */
  purpose?: string;
  
  /** Free-form notes or context about this field */
  notes?: string;
  
  /** Which BACS element this contributes to (Motivation, Ability, Concept, Sales) */
  contributesTo?: "motivation" | "ability" | "concept" | "sales" | "multiple";
}

/**
 * Optional fields still in evidence collection
 */
export interface OptionalEvidence extends EvidenceMetadata {
  status: "unknown" | "not_applicable";
  value: null;
}

/**
 * Verified fields with actual data
 */
export interface VerifiedEvidence<T> extends EvidenceMetadata {
  status: "verified" | "inferred" | "observed";
  value: T;
  confidence: number; // 0-100, typically 70+ for verified
}

/**
 * Convert string value to evidence metadata
 */
export function toEvidence<T>(
  value: T,
  source: EvidenceSource = "not_provided",
  status: EvidenceStatus = "unknown",
  confidence: number = 0,
  purpose?: string
): EvidenceMetadata {
  return {
    value,
    status,
    source,
    confidence,
    lastUpdated: new Date().toISOString(),
    purpose,
  };
}

/**
 * Mark field as unknown with explanation
 */
export function unknownEvidence(reason: string = "Not yet measured"): OptionalEvidence {
  return {
    value: null,
    status: "unknown",
    source: "not_provided",
    confidence: 0,
    lastUpdated: new Date().toISOString(),
    notes: reason,
  };
}

/**
 * Mark field as not applicable to this business
 */
export function notApplicableEvidence(reason: string): OptionalEvidence {
  return {
    value: null,
    status: "not_applicable",
    source: "not_provided",
    confidence: 0,
    lastUpdated: new Date().toISOString(),
    notes: reason,
  };
}

/**
 * Verify founder input
 */
export function verifyInput<T>(
  value: T,
  confidence: number = 100
): VerifiedEvidence<T> {
  return {
    value,
    status: "verified",
    source: "founder_input",
    confidence,
    lastUpdated: new Date().toISOString(),
  };
}
