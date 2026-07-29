import { BusinessJSON } from '../../types';
import { extractHiddenAssumptions } from './assumptions';
import { evaluateEvidenceQuality } from './evidence';
import { calculateBACSFormula, calculateComplexityBarrier, calculateFeasibilityScorecard, checkFourPhaseAudit, detectCriticalScoreLeaks } from './formula';
import { getIndustryBenchmark } from './industry';
import { generateMicroLeaks } from './microleaks';
import { buildRemediationPlan } from './remediation';
import { BACSCompleteAnalysis } from './types';

export function runBACSAnalysisEngine(businessJson: BusinessJSON): BACSCompleteAnalysis {
  const formula = calculateBACSFormula(businessJson);
  const feasibilityScorecard = calculateFeasibilityScorecard(formula.F, businessJson);
  const complexityBarrier = calculateComplexityBarrier(formula.F, businessJson);
  const microLeaks = generateMicroLeaks(businessJson);
  const evidenceQuality = evaluateEvidenceQuality(businessJson);
  const criticalScoreLeaks = detectCriticalScoreLeaks(formula);
  const hiddenAssumptions = extractHiddenAssumptions(businessJson);
  const remediationPlan = buildRemediationPlan(businessJson);
  const fourPhaseAudit = checkFourPhaseAudit(businessJson);
  const industryBenchmark = getIndustryBenchmark(businessJson.business?.industry || '');

  const executiveDiagnosticSummary = `BACS Conversion Index for ${businessJson.business?.name || 'Venture'} is ${formula.conversionIndex}/100. Formula Parameters: Motivation M=${formula.M}/10, Diagnosis D=${formula.D}/10, Feasibility F=${formula.F}/10, Proof P=${formula.P}/10. ${criticalScoreLeaks.length > 0 ? `🚨 ${criticalScoreLeaks.length} Critical Score Leak(s) identified in ${criticalScoreLeaks.map(c => c.variableName).join(', ')}.` : 'Balanced conversion foundation.'}`;

  return {
    formula,
    complexityBarrier,
    feasibilityScorecard,
    microLeaks,
    evidenceQuality,
    criticalScoreLeaks,
    hiddenAssumptions,
    remediationPlan,
    fourPhaseAudit,
    industryBenchmark,
    executiveDiagnosticSummary
  };
}
