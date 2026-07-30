export type EvidenceStatus =
  | 'Verified'
  | 'Calculated'
  | 'Observed'
  | 'Imported'
  | 'Unknown'
  | 'Missing'
  | 'NotApplicable';

export type EvidenceFreshness = 'Fresh' | 'Aging' | 'Outdated';

export interface EvidenceSource {
  type: 'interview' | 'file' | 'analytics' | 'manual' | 'import' | 'other';
  reference?: string; // external id or upload id
}

export interface Attachment {
  id: string;
  filename: string;
  url: string;
  mimeType?: string;
}

export interface Evidence {
  id: string; // uuid
  businessId: string;
  fieldKey: string; // e.g., target_customers, monthly_revenue
  value: any; // typed value (number, string, object, array)
  status: EvidenceStatus;
  source?: EvidenceSource;
  confidence?: number; // 0..1 -- derived from evidence quality
  lastUpdated: string; // ISO timestamp
  requiredFor?: string[]; // e.g., ['Motivation', 'Diagnosis']
  usedByBacs?: boolean;
  notes?: string;
  attachments?: Attachment[];
  computedFromEvidenceIds?: string[];
  freshness?: EvidenceFreshness;
  priority?: 'Critical' | 'Supporting' | 'Optional';
}
