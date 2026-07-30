# Recommendations Logic

## Overview

The recommendation engine scores your business on the **BACS framework** and makes actionable suggestions.

Key principle: **Only recommend based on verified or calculated fields.** If something is "Unknown", we don't make recommendations about it.

---

## BACS Scoring

Every business is scored on four elements:

### Motivation (M): Is there real demand?

**Scored from:**
- Number of customer interviews (0-30 points)
- Specificity of customer pain point (0-30 points)  
- Demonstrated willingness to pay (0-40 points)

**Score breakdown:**
- **75+%**: Strong customer validation. Real demand proven.
- **50-74%**: Some validation but gaps remain. Need more interviews.
- **25-49%**: Early validation only. Major work needed.
- **0-24%**: No validation. High risk.

**Example:**
```
✓ 15 customer interviews
✓ Specific pain: "Vendors waste 3 hours daily managing WhatsApp orders"
✓ WTP: Customers said they'd pay ₦5,000-₦8,000

→ Motivation Score: 85%
```

---

### Ability (A): Can you execute?

**Scored from:**
- Team size and composition (0-30 points)
- Founder experience (0-30 points)
- Operations/delivery method clarity (0-40 points)

**Score breakdown:**
- **75+%**: Experienced team, clear operations. You can execute.
- **50-74%**: Some gaps but workable. Maybe need to hire.
- **25-49%**: Major gaps. Team needs expansion.
- **0-24%**: Undefined operations. Not ready.

**Example:**
```
✓ Co-founder has 5 years in beauty industry
✗ Solo founder (need team)
✓ Clear delivery method: WhatsApp booking + home visits

→ Ability Score: 65%
```

---

### Concept (C): Can you win in the market?

**Scored from:**
- Clarity of USP (0-40 points)
- Strength of competitive moat (0-40 points)  
- Market understanding (0-20 points)

**Score breakdown:**
- **75+%**: Strong differentiation. Hard to compete against.
- **50-74%**: Clear positioning. Some competitive advantage.
- **25-49%**: Weak differentiation. Competitors can easily copy.
- **0-24%**: No clear advantage. High competition risk.

**Example:**
```
✓ USP: "Same-day home service with fixed transparent pricing"
✓ Moat: "Exclusive partnerships with Lagos' top 20 stylists"
? Competitors: Not deeply analyzed

→ Concept Score: 78%
```

---

### Sales (S): Is this economically viable?

**Scored from:**
- Revenue traction (0-30 points)
- CAC viability (0-35 points)
- Gross margin strength (0-35 points)

**Score breakdown:**
- **75+%**: Strong unit economics. Sustainable model.
- **50-74%**: Viable but needs optimization. Watch CAC/margin.
- **25-49%**: Concerning economics. Needs major work.
- **0-24%**: Not viable yet. Business model broken.

**Example:**
```
✓ Revenue: ₦450k/month (not zero)
✓ CAC: ₦2,500 (low!)
✓ Margin: 65% (strong!)

→ Sales Score: 82%
```

---

## Overall Status

Average of all four BACS scores:

| Average | Status | Interpretation |
|---------|--------|----------------|
| **75-100%** | **Strong** | Business model is validated across all dimensions. Focus on scaling. |
| **60-74%** | **Valid** | Solid foundation but some gaps. Address them before major investment. |
| **40-59%** | **Risky** | Significant unknowns or weak areas. Major work needed. |
| **0-39%** | **Not Ready** | Too many gaps. Validate before proceeding. |

---

## Recommendation Types

### Critical (🔴)
Must address before scaling.

**Trigger**: Core BACS element scores < 40%

**Examples:**
- No customer validation (Motivation < 40%)
- No clear differentiation (Concept < 40%)
- Broken unit economics (Sales < 40%)
- Can't execute plan (Ability < 40%)

### High (🟠)  
Important to address soon.

**Trigger**: BACS element scores 40-60%

**Examples:**
- Limited customer validation (need more interviews)
- CAC too high (optimize acquisition)
- Weak margin (reduce delivery costs)
- Team gaps (need to hire)

### Medium (🟡)
Addresses gaps but not blocking.

**Trigger**: BACS element scores 60-75%

**Examples:**
- Improve customer retention
- Expand to new channels
- Build brand recognition
- Document processes

### Low (🟢)
Optional improvements.

**Trigger**: BACS element scores > 75% but still improvements possible

**Examples:**
- Optimize pricing
- Automate operations
- Build community
- International expansion

---

## Example Recommendations

### Scenario: Pre-Launch Beauty Business

**Scores:**
- Motivation: 85% ✓ Strong
- Ability: 60% ⚠ Needs work
- Concept: 78% ✓ Strong  
- Sales: 45% 🔴 Critical

**Overall: 67% - Valid but risky**

**Recommendations:**

#### 🔴 CRITICAL: Validate unit economics
- **Why**: Sales score is 45%. You don't know if you can make money.
- **Based on**: CAC unknown, margin estimated
- **Next steps**:
  1. Run 10 test services at current pricing
  2. Track exact costs (time, products, travel)
  3. Calculate real margin
  4. Adjust pricing if needed
  5. Target margin > 50%

#### 🟠 HIGH: Expand team
- **Why**: Ability score is 60%. Solo founder can't scale.
- **Based on**: Team size = 1, operations clear but understaffed
- **Next steps**:
  1. Hire operations/booking manager
  2. Recruit 2-3 stylists
  3. Define roles and responsibility
  4. Aim for 5-person team by month 3

#### 🟡 MEDIUM: Optimize acquisition channels
- **Why**: You only have Instagram tested. Multiple channels = lower risk.
- **Based on**: Current CAC ₦2,500 on Instagram, but not tested elsewhere
- **Next steps**:
  1. Test referral incentives (₦1,000 per booking)
  2. Try WhatsApp broadcast groups
  3. Partner with corporate wellness programs
  4. Track CAC on each channel
  5. Double down on cheapest channel

---

## Confidence Scoring

Each recommendation includes confidence in the diagnosis:

**High Confidence** (80-100%)
- Based on verified founder input
- Clear gap evident from data

**Medium Confidence** (50-80%)
- Some fields verified, some estimated
- Recommendation likely but not certain

**Low Confidence** (0-50%)  
- Many unknowns
- Recommendation is preliminary

---

## When NOT to Recommend

We never recommend if:

✗ The field is "Unknown"
```
Don't say: "Your CAC should be < ₦3,000"
Why: You haven't told us your CAC, so we can't assess it
```

✗ The field is "Not Applicable"
```
Don't say: "You need to optimize retention"
Why: You haven't launched yet, so retention doesn't apply
```

✗ The recommendation requires multiple unknown fields
```
Don't say: "Your CAC/LTV ratio should be 1:3"
Why: Both CAC and LTV are unknown
```

---

## Critical Gaps

After scoring, we identify **critical gaps**—unknowns that block progress.

**Examples:**

| Gap | Why Critical | Action |
|-----|--------------|--------|
| No customer interviews | Can't validate demand | Interview 10+ customers |
| No revenue yet | Can't assess viability | Launch MVP and sell |
| CAC unknown | Can't optimize acquisition | Track and calculate |
| No clear USP | Can't win against competitors | Define differentiation |
| Solo founder | Can't scale | Hire or recruit co-founder |

---

## Next Milestone

Based on scores and gaps, the engine recommends the **next milestone**.

**Examples:**

```
Motivation: 85% ✓ | Ability: 40% 🔴 | Concept: 70% | Sales: 45% 🔴
→ Next Milestone: "Build your founding team (critical gap)"
```

```
Motivation: 50% | Ability: 75% ✓ | Concept: 60% | Sales: 80% ✓
→ Next Milestone: "Complete 15 customer interviews to validate demand"
```

```  
Motivation: 85% ✓ | Ability: 80% ✓ | Concept: 85% ✓ | Sales: 75% ✓
→ Next Milestone: "Scale customer acquisition—you have strong fundamentals"
```

---

## Using Recommendations

### For Founders
- Focus on **Critical** recommendations first
- Once resolved, move to **High** priority
- Use recommendations to plan next 30/60/90 days

### For Investors
- **75+% score** = Ready to fund/scale
- **60-74% score** = Fundable but has risks  
- **40-59% score** = Early stage, not ready
- **0-39% score** = Not investment-ready

### For Mentors/Advisors  
- Identify where founder needs help (lowest BACS score)
- Use recommendations to guide mentoring
- Re-run diagnostic quarterly to track progress
