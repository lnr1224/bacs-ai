# BACS AI: Evidence-Driven Business Diagnosis

**BACS AI** is an evidence-driven business diagnosis and decision intelligence platform that validates ideas, diagnoses business bottlenecks, and recommends grounded actions.

## Core Philosophy

BACS doesn't make assumptions. Like a medical record, every field requires evidence.

Instead of:
```json
"customerAcquisitionCost": "Target low CAC"
```

We use:
```json
"customerAcquisitionCost": {
  "value": null,
  "status": "unknown",
  "evidence": "Not yet measured",
  "source": "Not Provided",
  "confidence": "None",
  "requiredFor": "Existing Business"
}
```

## Architecture

- **Evidence JSON Schema** - Structured business data with metadata
- **Interview Framework** - Educational, guided questions with explanations
- **BACS Knowledge Graph** - Internal representation (never exposed as raw JSON)
- **Business Facts UI** - User-friendly cards showing verified vs. unknown data
- **Recommendation Engine** - Only references verified or mathematically derived facts

## Field States

Every field has one of five states:
- **Verified** - Provided by the user (trusted source)
- **Inferred** - Derived mathematically by BACS
- **Observed** - Calculated from evidence
- **Unknown** - No evidence provided
- **Not Applicable** - Doesn't apply to this business stage

## Project Structure

```
bacs-ai/
├── schema/                 # JSON schema definitions
│   ├── business.schema.ts
│   └── evidence.types.ts
├── interview/              # Interview framework & questions
│   ├── questions/
│   ├── helpers.ts
│   └── explanations.ts
├── engine/                 # BACS reasoning engine
│   ├── calculator.ts
│   └── validator.ts
└── ui/                     # UI components for Business Facts
```

## Quick Start

1. Install dependencies
2. Run the interview
3. View Business Facts dashboard
4. Get recommendations

## Documentation

- [Evidence Schema](./docs/evidence-schema.md)
- [Interview Guide](./docs/interview-guide.md)
- [Recommendation Logic](./docs/recommendations.md)
