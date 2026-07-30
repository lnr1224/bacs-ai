export type GraphNodeType =
  | 'CustomerSegment'
  | 'PainPoint'
  | 'Competitor'
  | 'PricingPoint'
  | 'ValidationEvent'
  | 'CXMetric'
  | 'FinancialSnapshot'
  | 'OperationalIssue'
  | 'BusinessProfile';

export interface GraphNode {
  id: string;
  businessId: string;
  type: GraphNodeType;
  canonical: Record<string, any>;
  evidenceIds: string[];
  createdAt: string;
  lastUpdated: string;
  status?: 'Active' | 'Archived';
}

export interface CollectionSummary {
  collection: string;
  completion: number; // 0..100
  verifiedCount: number;
  unknownCount: number;
  missingCount: number;
}
