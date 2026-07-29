import { BusinessJSON } from '../../types';
import { EvidenceClassification, EvidenceQualitySummary } from './types';

export function evaluateEvidenceQuality(businessJson: BusinessJSON): EvidenceQualitySummary {
  const claims: EvidenceClassification[] = [];

  const valLevel = businessJson.proof?.validationLevel || 'Medium';
  const location = businessJson.business?.location || 'target market';

  // Claim 1: Target Audience Demand
  if (businessJson.customer?.idealPersona) {
    claims.push({
      claim: `Target customer segment in ${location} seeks this solution`,
      level: valLevel === 'High' ? 'Strong' : 'Moderate',
      stars: valLevel === 'High' ? 4 : 3,
      starDisplay: valLevel === 'High' ? '★★★★☆' : '★★★☆☆',
      sourceType: 'Customer Discovery Interviews & Early Validation',
      confidenceScore: valLevel === 'High' ? 82 : 65,
      supportingData: businessJson.customer.idealPersona
    });
  }

  // Claim 2: Traction & Sales Evidence
  if (businessJson.proof?.evidenceAndTraction) {
    const isVerified = businessJson.proof.evidenceAndTraction.toLowerCase().includes('revenue') || businessJson.proof.evidenceAndTraction.toLowerCase().includes('paying');
    claims.push({
      claim: `Market traction and buyer interest`,
      level: isVerified ? 'Verified' : 'Moderate',
      stars: isVerified ? 5 : 3,
      starDisplay: isVerified ? '★★★★★' : '★★★☆☆',
      sourceType: isVerified ? 'Actual Sales & Paying Customers' : 'Waitlist / Discovery',
      confidenceScore: isVerified ? 92 : 60,
      supportingData: businessJson.proof.evidenceAndTraction
    });
  }

  // Claim 3: Pricing & Willingness to Pay
  claims.push({
    claim: `Target price point acceptance (${businessJson.pricing?.averagePricePoint || 'Market competitive'})`,
    level: 'Weak',
    stars: 2,
    starDisplay: '★★☆☆☆',
    sourceType: 'Price Elasticity Assumption',
    confidenceScore: 45,
    supportingData: 'Based on competitor benchmarking rather than live sales experiment.'
  });

  // Claim 4: Core Risk Assumption
  claims.push({
    claim: businessJson.risks?.biggestAssumption || 'Customers will switch from incumbent brands',
    level: 'Assumption',
    stars: 1,
    starDisplay: '★☆☆☆☆',
    sourceType: 'Unvalidated Founder Hypothesis',
    confidenceScore: 30,
    supportingData: 'Requires immediate low-cost smoke test or pre-order campaign.'
  });

  const verifiedCount = claims.filter(c => c.level === 'Verified').length;
  const strongCount = claims.filter(c => c.level === 'Strong').length;
  const moderateCount = claims.filter(c => c.level === 'Moderate').length;
  const weakCount = claims.filter(c => c.level === 'Weak').length;
  const assumptionCount = claims.filter(c => c.level === 'Assumption').length;

  const totalConfidence = claims.reduce((acc, c) => acc + c.confidenceScore, 0);
  const overallConfidenceScore = Math.round(totalConfidence / (claims.length || 1));

  return {
    overallConfidenceScore,
    verifiedCount,
    strongCount,
    moderateCount,
    weakCount,
    assumptionCount,
    classifiedClaims: claims
  };
}
