import { listEvidenceByBusiness } from './evidenceService';

type Evidence = any;

export type VariableReport = {
  variable: string;
  percent: number;
  label: 'High' | 'Medium' | 'Low' | 'Unknown';
  evidenceUsed: string[]; // ids
  missingEvidence: string[]; // fieldKeys
  reason?: string;
};

export type BacsReport = {
  businessId: string;
  halted: boolean;
  haltReason?: string;
  criticalMissing?: { fieldKey: string; status: string }[];
  evidenceSummary: { total: number; verified: number; calculated: number; unknown: number; notApplicable: number };
  groups: Record<string, Evidence[]>;
  variables: VariableReport[];
  recommendations: any[];
  completionPercent: number;
};

const CONTRIBUTING_STATUSES = ['Verified', 'Calculated'];

const VARIABLE_NAMES = ['Motivation', 'Ability', 'Concept', 'Sales'];

function labelFromPercent(p: number): VariableReport['label'] {
  if (p === -1) return 'Unknown';
  if (p >= 75) return 'High';
  if (p >= 40) return 'Medium';
  return 'Low';
}

function groupEvidence(evidence: Evidence[]) {
  const groups: Record<string, Evidence[]> = {
    customer: [],
    market: [],
    competition: [],
    financial: [],
    validation: [],
    operations: [],
    other: []
  };
  for (const e of evidence) {
    const fk = (e.fieldKey || '').toLowerCase();
    if (fk.includes('customer') || fk.includes('target') || fk.includes('pain') || fk.includes('persona')) groups.customer.push(e);
    else if (fk.includes('market') || fk.includes('trend') || fk.includes('competition') && fk.includes('market')) groups.market.push(e);
    else if (fk.includes('competitor') || fk.includes('alternative') || fk.includes('competitors')) groups.competition.push(e);
    else if (fk.includes('revenue') || fk.includes('expenses') || fk.includes('margin') || fk.includes('cac') || fk.includes('ltv') || fk.includes('financial')) groups.financial.push(e);
    else if (fk.includes('validation') || fk.includes('interview') || fk.includes('pilot') || fk.includes('proof')) groups.validation.push(e);
    else if (fk.includes('operation') || fk.includes('fulfil') || fk.includes('fulfill') || fk.includes('delivery') || fk.includes('refund') || fk.includes('complaint')) groups.operations.push(e);
    else groups.other.push(e);
  }
  return groups;
}

export async function computeBacsReport(businessId: string): Promise<BacsReport> {
  const evidence = await listEvidenceByBusiness(businessId);
  const total = evidence.length;
  const verified = evidence.filter((e: Evidence) => e.status === 'Verified').length;
  const calculated = evidence.filter((e: Evidence) => e.status === 'Calculated').length;
  const unknown = evidence.filter((e: Evidence) => e.status === 'Unknown').length;
  const notApplicable = evidence.filter((e: Evidence) => e.status === 'NotApplicable').length;

  // detect critical missing
  const criticalMissing = evidence
    .filter((e: Evidence) => (e.priority === 'Critical' || (e.requiredFor || []).length > 0) && !CONTRIBUTING_STATUSES.includes(e.status))
    .map((e: Evidence) => ({ fieldKey: e.fieldKey, status: e.status }));

  if (criticalMissing.length > 0) {
    return {
      businessId,
      halted: true,
      haltReason: 'Insufficient critical evidence. Collect required critical evidence before running the diagnostic.',
      criticalMissing,
      evidenceSummary: { total, verified, calculated, unknown, notApplicable },
      groups: groupEvidence(evidence),
      variables: [],
      recommendations: [],
      completionPercent: 0
    };
  }

  const variables: VariableReport[] = [];
  for (const v of VARIABLE_NAMES) {
    const relevant = evidence.filter((e: Evidence) => Array.isArray(e.requiredFor) && e.requiredFor.map((r: string) => r.toLowerCase()).includes(v.toLowerCase()));
    if (!relevant || relevant.length === 0) {
      variables.push({ variable: v, percent: 0, label: 'Unknown', evidenceUsed: [], missingEvidence: [], reason: 'No required evidence fields provided for this variable.' });
      continue;
    }
    const contrib = relevant.filter((e: Evidence) => CONTRIBUTING_STATUSES.includes(e.status));
    const percent = Math.round((contrib.length / relevant.length) * 100);
    const label = labelFromPercent(percent);
    const evidenceUsed = contrib.map((e: Evidence) => e.id);
    const missingEvidence = relevant.filter((e: Evidence) => !CONTRIBUTING_STATUSES.includes(e.status)).map((e: Evidence) => e.fieldKey);
    let reason = '';
    if (missingEvidence.length > 0) reason = `Missing evidence: ${missingEvidence.join(', ')}`;
    variables.push({ variable: v, percent, label, evidenceUsed, missingEvidence, reason });
  }

  // completion: percent of evidence that is Verified or Calculated
  const completionPercent = Math.round(((verified + calculated) / Math.max(total, 1)) * 100);

  // recommendations: for variables not High, recommend collecting missing evidence
  const recommendations: any[] = [];
  for (const varRep of variables) {
    if (varRep.label !== 'High') {
      recommendations.push({
        title: `Collect missing evidence for ${varRep.variable}`,
        why: `${varRep.variable} Evidence Strength is ${varRep.label}.`,
        evidenceUsed: varRep.evidenceUsed,
        missingEvidence: varRep.missingEvidence,
        expectedImprovement: `${varRep.variable} should improve when missing evidence is Verified.`,
        nextAction: varRep.missingEvidence.length > 0 ? `Collect: ${varRep.missingEvidence.join(', ')}` : `Provide Verified evidence for ${varRep.variable}`
      });
    }
  }

  return {
    businessId,
    halted: false,
    evidenceSummary: { total, verified, calculated, unknown, notApplicable },
    groups: groupEvidence(evidence),
    variables,
    recommendations,
    completionPercent
  };
}
