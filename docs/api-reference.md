# API Reference

## Schema Types

### EvidenceMetadata
```typescript
interface EvidenceMetadata {
  value: any;
  status: "verified" | "inferred" | "observed" | "unknown" | "not_applicable";
  source: "founder_input" | "bacs_calculation" | "external_evidence" | "interview_response" | "not_provided";
  confidence: number; // 0-100
  lastUpdated: string; // ISO 8601
  purpose?: string;
  notes?: string;
  contributesTo?: "motivation" | "ability" | "concept" | "sales" | "multiple";
}
```

### BusinessModel
```typescript
interface BusinessModel {
  id: string;
  createdAt: string;
  updatedAt: string;
  profile: BusinessProfile;
  customer: CustomerProfile;
  competitive: CompetitiveAdvantage;
  financial: FinancialMetrics;
  marketing: MarketingAndSales;
  operations: Operations;
  validation: ValidationStatus;
}
```

### DiagnosticResult  
```typescript
interface DiagnosticResult {
  overallStatus: "strong" | "valid" | "risky" | "not_ready";
  scoreByBacs: {
    motivation: number;
    ability: number;
    concept: number;
    sales: number;
  };
  recommendations: Recommendation[];
  criticalGaps: string[];
  nextMilestone: string;
}
```

---

## Helper Functions

### Evidence Creation

#### `verifyInput<T>(value: T, confidence?: number)`
Create a verified evidence object from founder input.

```typescript
const revenue = verifyInput(450000, 100);
// {
//   value: 450000,
//   status: "verified",
//   source: "founder_input",
//   confidence: 100,
//   lastUpdated: "2026-08-15T..."
// }
```

#### `unknownEvidence(reason?: string)`
Mark a field as unknown (not yet collected).

```typescript
const cac = unknownEvidence("Not yet measured");
// {
//   value: null,
//   status: "unknown",
//   source: "not_provided",
//   confidence: 0,
//   notes: "Not yet measured"
// }
```

#### `notApplicableEvidence(reason: string)`
Mark a field as not applicable to this business stage.

```typescript
const retention = notApplicableEvidence("Not launched yet");
// {
//   value: null,
//   status: "not_applicable",
//   source: "not_provided",
//   confidence: 0,
//   notes: "Not launched yet"
// }
```

#### `toEvidence<T>(value, source, status, confidence, purpose?)`
General evidence creation from any source.

```typescript
const cac = toEvidence(
  2500,
  "founder_input",
  "verified",
  100,
  "Needed for unit economics"
);
```

---

### Validation

#### `validateInput(fieldName: string, value: any, type: string)`
Validate input before storing.

```typescript
const result = validateInput("monthlyRevenue", "450k", "currency");
if (!result.valid) {
  console.error(result.error); // "monthlyRevenue must be a valid amount"
}
```

**Supported types:**
- `number` - Must be numeric, non-negative
- `currency` - Must be numeric, non-negative  
- `email` - Must contain @
- `date` - Must be valid ISO 8601

---

### Calculations

#### `calculations.cacPaybackPeriod(cac: number, monthlyRevenuePerCustomer: number)`
Months to recover customer acquisition cost.

```typescript
const payback = calculations.cacPaybackPeriod(2500, 6500);
// 0.4 months (customer pays back acquisition cost in 0.4 months)
```

#### `calculations.runway(cashOnHand: number, burnRate: number)`
Months until money runs out.

```typescript
const months = calculations.runway(500000, 50000);
// 10 months of runway
```

#### `calculations.ltv(monthlyRevenue, grossMarginPercent, customerLifespanMonths?)`
Customer lifetime value (defaults to 12 months).

```typescript
const ltv = calculations.ltv(6500, 65, 24); // 24 month lifespan
// ₦202,800 lifetime value
```

#### `calculations.cacLtvRatio(cac: number, ltv: number)`
CAC to LTV ratio (should be < 3).

```typescript
const ratio = calculations.cacLtvRatio(2500, 202800);
// 0.01 (excellent ratio—you earn 81x what you spend)
```

#### `calculations.breakEvenRevenue(burnRate: number)`
Monthly revenue needed to cover burn rate.

```typescript
const breakEven = calculations.breakEvenRevenue(50000);
// ₦50,000 needed monthly
```

#### `calculations.customersForBreakEven(burnRate, revenuePerCustomer)`
Number of customers needed monthly to break even.

```typescript
const customers = calculations.customersForBreakEven(50000, 6500);
// 8 customers needed per month
```

---

### Diagnostics

#### `diagnoseBusiness(business: BusinessModel)`
Run full BACS diagnostic.

```typescript
const diagnosis = diagnoseBusiness(businessModel);

console.log(diagnosis.overallStatus); // "valid"
console.log(diagnosis.scoreByBacs);
// {
//   motivation: 85,
//   ability: 60,
//   concept: 78,
//   sales: 72
// }
console.log(diagnosis.criticalGaps);
// ["Expand team (Ability is weak)"]
console.log(diagnosis.nextMilestone);
// "Address this: Expand team"
```

---

### Business Facts (UI)

#### `buildProfileCard(business: BusinessModel)`
Generate user-friendly Business Profile card.

```typescript
const card = buildProfileCard(business);
// {
//   title: "Business Profile",
//   facts: [
//     { label: "Business Name", value: "Glam Lagos", status: "verified" },
//     { label: "Industry", value: "Beauty", status: "verified" },
//     { label: "Stage", value: "Launched", status: "verified" },
//   ],
//   completionPercentage: 75
// }
```

#### `buildCustomerCard(business: BusinessModel)`
#### `buildCompetitionCard(business: BusinessModel)`
#### `buildFinancialCard(business: BusinessModel)`
#### `buildValidationCard(business: BusinessModel)`
#### `buildAllCards(business: BusinessModel)`

Generate all cards at once.

```typescript
const cards = buildAllCards(business);
cards.forEach(card => {
  console.log(card.title);
  console.log(`${card.completionPercentage}% complete`);
});
// Output:
// Business Profile
// 100% complete
// Customer Evidence
// 80% complete
// ...
```

---

## Interview

#### Interview Questions

```typescript
import { interviewDefinition } from "./interview/questions";

console.log(interviewDefinition.sections[0].questions);
// Array of InterviewQuestion objects
```

#### Processing Responses

```typescript
import { responseToEvidence } from "./interview/helpers";

const response = {
  questionId: "target-audience",
  answer: "Working mothers in Lagos",
  timestamp: new Date().toISOString(),
  confidence: 95,
};

const evidence = responseToEvidence(response);
// {
//   value: "Working mothers in Lagos",
//   status: "verified",
//   source: "founder_input",
//   confidence: 95,
//   lastUpdated: "..."
// }
```

---

## Confidence Assessment

#### `assessConfidence(field: EvidenceMetadata)`
Get confidence level (0-100).

```typescript
const confidence = assessConfidence(revenue);
// 100 (if founder_input), 75 (if bacs_calculation), 0 (if unknown)
```

#### `confidenceExplanation(confidence: number)`
Get human-readable explanation.

```typescript
const text = confidenceExplanation(100);
// "Verified by founder"

const text = confidenceExplanation(75);
// "BACS calculation (depends on inputs)"

const text = confidenceExplanation(0);
// "Not measured yet"
```

---

## Error Handling

All functions return values or null on error.

```typescript
const revenue = calculations.runway(0, 50000);
if (revenue === null) {
  console.log("Cannot calculate: missing data");
}

const result = validateInput("revenue", "abc", "number");
if (!result.valid) {
  console.error(result.error);
}
```

---

## Complete Example

```typescript
import {
  verifyInput,
  diagnoseBusiness,
  buildAllCards,
  calculations,
} from "bacs-ai";

// Create business model
const business = {
  id: "biz-123",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  profile: {
    businessName: verifyInput("Glam Lagos"),
    businessDescription: verifyInput("Same-day beauty services"),
    industry: verifyInput("Beauty"),
    stage: verifyInput("launched"),
    location: verifyInput("Lagos"),
  },
  customer: {
    targetAudience: verifyInput("Working mothers, Lagos"),
    customersInterviewed: verifyInput(12),
    customerPainPoints: [
      verifyInput("3-week wait times for appointments"),
    ],
    alternatives: [verifyInput("Local salons")],
    willingnessToPay: verifyInput(6500),
    frequencyOfProblem: verifyInput("Weekly"),
  },
  // ... rest of model
};

// Run diagnostic
const diagnosis = diagnoseBusiness(business);
console.log(`Overall Status: ${diagnosis.overallStatus}`);
console.log(`Motivation: ${diagnosis.scoreByBacs.motivation}%`);
console.log(`Next step: ${diagnosis.nextMilestone}`);

// Get user-friendly cards
const cards = buildAllCards(business);
cards.forEach(card => {
  console.log(`\n${card.title}`);
  card.facts.forEach(fact => {
    console.log(`  ${fact.label}: ${fact.value}`);
  });
});

// Calculate unit economics
const cacPayback = calculations.cacPaybackPeriod(2500, 6500);
console.log(`CAC payback: ${cacPayback} months`);
```
