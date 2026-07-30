# Contributing

## Code Structure

```
bacs-ai/
├── schema/              # Type definitions
│   ├── evidence.types.ts       # EvidenceMetadata base type
│   ├── business.schema.ts      # BusinessModel structure
│   ├── interview.types.ts      # Interview framework types
│   └── index.ts                # Exports
├── interview/           # Interview framework
│   ├── questions.ts            # Interview questions
│   ├── explanations.ts         # Business term definitions
│   ├── helpers.ts              # Validation, conversion, calculations
│   └── index.ts                # Exports
├── engine/              # Recommendation engine
│   ├── recommendation.ts       # BACS diagnostic scoring
│   ├── business-facts-cards.ts # UI card generation
│   └── index.ts                # Exports
└── docs/                # Documentation
    ├── architecture.md
    ├── evidence-schema.md
    ├── interview-guide.md
    ├── recommendations.md
    ├── api-reference.md
    └── CONTRIBUTING.md
```

## Adding a New Business Field

### Step 1: Add to Schema

**File: `schema/business.schema.ts`**

```typescript
export interface FinancialMetrics {
  monthlyRevenue: EvidenceMetadata;
  // NEW: Customer lifetime value
  customerLifetimeValue: EvidenceMetadata;
}
```

### Step 2: Add Interview Question

**File: `interview/questions.ts`**

```typescript
export const financialQuestions: InterviewQuestion[] = [
  // ... existing questions
  {
    id: "ltv",
    field: "customerLifetimeValue",
    category: "financial",
    question: "How much profit does a customer generate over their lifetime?",
    whyWeAsk: "Customer lifetime value (LTV) tells us if customers are worth acquiring.",
    definition: "Total profit you make from a customer before they stop buying.",
    exampleAnswer: "If customers buy 24 times per year at ₦6,500 with 65% margin, that's ₦101,400/year LTV.",
    inputType: "currency",
    required: false,
    bacs: "sales",
  },
];
```

### Step 3: Update Diagnostic Logic

**File: `engine/recommendation.ts`**

```typescript
function scoreSales(business: BusinessModel): number {
  let score = 0;
  let maxScore = 0;

  // ... existing scoring

  // NEW: LTV scoring
  if (hasEvidence(business.financial.customerLifetimeValue.status, business.financial.customerLifetimeValue.value)) {
    maxScore += 25;
    const ltv = Number(business.financial.customerLifetimeValue.value);
    if (ltv > 50000) score += 25;
    else if (ltv > 10000) score += 15;
  }

  return maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;
}
```

### Step 4: Add UI Card (if needed)

**File: `ui/business-facts-cards.ts`**

```typescript
export function buildFinancialCard(business: BusinessModel): BusinessFactsCard {
  const facts: BusinessFact[] = [
    // ... existing facts
    evidenceToFact("Customer Lifetime Value", business.financial.customerLifetimeValue),
  ].filter((f) => f !== null) as BusinessFact[];

  // ... rest of card
}
```

---

## Adding a New Calculation

**File: `interview/helpers.ts`**

```typescript
export const calculations = {
  // ... existing calculations
  
  /**
   * Customer Acquisition Efficiency: Revenue per ₦1 spent
   * Formula: First Year Revenue / Total Acquisition Spend
   */
  acquisitionEfficiency(firstYearRevenue: number, totalSpend: number): number | null {
    if (!firstYearRevenue || !totalSpend || totalSpend <= 0) {
      return null;
    }
    return Math.round((firstYearRevenue / totalSpend) * 100) / 100;
  },
};
```

---

## Adding a New Recommendation

**File: `engine/recommendation.ts`**

```typescript
function generateRecommendations(
  business: BusinessModel,
  bacs: { motivation: number; ability: number; concept: number; sales: number }
): Recommendation[] {
  const recommendations: Recommendation[] = [];

  // ... existing recommendations

  // NEW: Retention recommendation
  if (business.marketing.retentionRate.status === "unknown") {
    recommendations.push({
      title: "Track customer retention",
      priority: "medium",
      description: "You don't know what percentage of customers return. This is critical for growth.",
      reasoning: "High retention customers are cheaper to serve than new acquisitions.",
      basedOn: ["retentionRate"],
      nextSteps: [
        "Define 'repeat customer' (2+ purchases? 30-day window?)",
        "Calculate: # of repeat customers / # of total customers",
        "Aim for 30%+ retention initially",
        "Identify why customers don't return",
      ],
      relatedSection: "Marketing & Sales",
    });
  }

  return recommendations;
}
```

---

## Testing

### Test a Diagnostic

```typescript
import { diagnoseBusiness } from "./engine/recommendation";
import { verifyInput, unknownEvidence } from "./schema/evidence.types";

// Create test business
const testBusiness = {
  id: "test-1",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  profile: {
    businessName: verifyInput("Test Co"),
    // ... minimal fields
  },
  // ... rest of model
};

// Run diagnostic
const result = diagnoseBusiness(testBusiness);

// Assert
console.assert(result.scoreByBacs.motivation >= 0 && result.scoreByBacs.motivation <= 100);
console.assert(["strong", "valid", "risky", "not_ready"].includes(result.overallStatus));
console.assert(Array.isArray(result.recommendations));
```

---

## Documentation Standards

### For Code

```typescript
/**
 * What this does
 * 
 * Example usage
 */
export function doSomething(param: Type): ReturnType {
  // Implement
}
```

### For Business Logic

```markdown
### Feature Name

**What it solves**: Problem statement

**When to use**: Conditions

**Example**:
```

### For Interview Questions

```typescript
{
  id: "unique-id",
  question: "Plain English question",
  whyWeAsk: "Why this matters for BACS",
  definition: "Business term definition",
  exampleAnswer: "Industry-specific example",
  // ... other fields
}
```

---

## Design Principles

### 1. Evidence First
Every piece of data is wrapped in evidence metadata.

```typescript
// ✗ Bad
{
  monthlyRevenue: 450000
}

// ✓ Good
{
  monthlyRevenue: {
    value: 450000,
    status: "verified",
    source: "founder_input",
    confidence: 100
  }
}
```

### 2. No Hallucination
Unknown data must be explicitly marked unknown, never generated.

```typescript
// ✗ Bad
{
  customerAcquisitionCost: "Target low CAC"
}

// ✓ Good
{
  customerAcquisitionCost: unknownEvidence("Not yet measured")
}
```

### 3. Educational
Every interview question teaches a business concept.

```typescript
// ✗ Bad
{
  question: "What's your USP?"
}

// ✓ Good
{
  question: "Why should someone choose you instead of competitors?",
  whyWeAsk: "This is your Unique Selling Proposition...",
  definition: "A USP is...",
  exampleAnswer: "Good example of USP in beauty industry..."
}
```

### 4. Confidence Matters
Recommendations only reference verified or calculated fields.

```typescript
// ✗ Bad
if (cac > 5000) {
  // recommend something
}

// ✓ Good
if (hasEvidence(cac.status, cac.value) && Number(cac.value) > 5000) {
  // recommend something
}
```

---

## PR Checklist

Before submitting:

- [ ] Code follows existing patterns
- [ ] Types are defined (no `any`)
- [ ] New fields have evidence metadata
- [ ] Interview questions have explanations
- [ ] Recommendations only reference verified fields
- [ ] Documentation is updated
- [ ] Tests pass
- [ ] No hallucinated/placeholder values

---

## Questions?

Open an issue or start a discussion.
