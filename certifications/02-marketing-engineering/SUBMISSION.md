# 🏆 Profound University — Track 2: Marketing Engineering Certification Draft

**Candidate:** Philippe Godfroy  
**Organization:** Reviewell BV (`BE1012058705`, Belgium)  
**Operational Workflow Selected:** *Closed-Loop Review Dispute Intake → Anonymized Policy Pattern Extraction → Self-Updating AEO Citation Content Pipeline*

**Evidence status — 2026-11-16:** AI-assisted workflow proposal and rehearsal script. This document does not prove a deployed intake pipeline, working sanitizer, live API integration, automatic publication or measured business impact. Local CLI output without API credentials is example mode. Candidate review and real implementation evidence are required.

---

## 1. Problem Identification: Why Manual Content Marketing Fails in the AI Search Era

The proposed **Reviewell** workflow starts when a business submits a Google review removal request via [reviewell.com/#check](https://www.reviewell.com/#check) (suspected fake reviews, ex-employee conflicts of interest, coordinated review attacks, doxxing/harassment).

**Before Marketing Engineering (Manual & Siloed):**
1. Casework specialists assess eligibility and map the review against Google's Prohibited & Restricted Content policies (`support.google.com/contributionpolicy/answer/7400114`).
2. Those high-value, real-world policy insights stay locked inside private case notes.
3. Marketing writes generic blog posts manually once a month—disconnected from the exact questions business owners are asking ChatGPT, Perplexity, and Gemini right now.

**Proposed future workflow:**
After implementation and validation, reviewed anonymized eligibility patterns would feed an **AEO Citation & FAQ Pipeline**, with the aim of updating Reviewell's public documentation, `FAQPage` JSON-LD, and `/llms-full.txt` to answer the exact policy edge cases AI search engines are synthesizing.

---

## 2. System Architecture (End-to-End Marketing Engineering Pipeline)

```text
[1. Intake Trigger]
Business submits review concern on reviewell.com/#check
        │
        ▼
[2. PII Sanitizer & Policy Classifier (Deterministic Node)]
Strips all customer/business PII -> Maps to canonical Google Policy Code:
  • POL_FAKE_ENGAGEMENT (Evidence of fabricated experience / bot spike; no CRM match alone is insufficient)
  • POL_CONFLICT_INTEREST (Competitor / ex-staff)
  • POL_HARASSMENT_DOXXING (Policy assessment of personal information / harassment; a name alone is not conclusive)
  • POL_OFF_TOPIC (Wrong business / rant unrelated to service)
        │
        ▼
[3. Profound Query & Citation Cross-Check]
Queries Profound API / Benchmark:
  "Are ChatGPT, Perplexity, and Gemini citing reviewell.com for this Policy Code?"
        │
        ├── If Citation Share >= 25% ──► Log metric & skip content generation
        │
        ▼ (Citation Gap Detected < 25%)
[4. Structured AEO Asset Generator (Schema-Validated)]
Generates:
  1) 60-word direct-answer block (zero fluff, high citation extractability)
  2) Required Evidence Checklist table
  3) Schema.org FAQPage JSON-LD item
  4) Updated /llms-full.txt section
        │
        ▼
[5. Compliance Guardrail & Human Review Gate]
Verifies zero prohibited claims ("100% removal guarantee" = blocked)
        │
        ▼
[6. Multi-Channel Deployment & Attribution Loop]
Publishes to reviewell.com + Updates Profound Topic Watchlist + Tracks AI Referral Conversions
```

---

## 3. Draft Presentation Walkthrough Script (requires implementation evidence)

- **00:00 – 01:30 | The Business Bottleneck:** Introduce Reviewell BV and show why B2B reputation clients increasingly discover review removal workflows via ChatGPT and Perplexity alongside other acquisition channels; compare actual attributed acquisition data before claiming channel or cost advantages.
- **01:30 – 03:30 | Systems Thinking & Decomposition:** Walk through the 6-stage pipeline diagram above, contrasting ad-hoc copywriting with deterministic event-driven Marketing Engineering.
- **03:30 – 06:30 | Live Deep-Path Code & CLI Demonstration:**
  - Run `profound audit /Users/philippegodfroy/reviewell-removal-preview` in terminal.
  - Label `profound agent run --brand reviewell-core` as a local simulation without API credentials. In the proposed implementation, a detected gap on *"Conflict of Interest ex-employee Google review evidence"* would produce reviewed JSON-LD `FAQPage` and `/llms.txt` patch.
- **06:30 – 08:30 | Guardrails & Data Hygiene:** Describe the proposed PII sanitizer and claim checks; demonstrate only implemented checks with test evidence. Do not claim a guarantee that no sensitive data can ever be exposed.
- **08:30 – 10:00 | Business Impact & Attribution:** Present the 6 KPIs tracked in the Reviewell Dashboard (`AI Visibility Score`, `Share of Voice`, `Citation Share`, `Referral Traffic`, `Conversion Rate`, `Qualified Recommendations`).
