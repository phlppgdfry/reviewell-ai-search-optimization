# 🏆 Profound University — Track 2: Marketing Engineering Certification Submission

**Candidate:** Philippe Godfroy  
**Organization:** Reviewell BV (`BE1012058705`, Belgium)  
**Operational Workflow Selected:** *Closed-Loop Review Dispute Intake → Anonymized Policy Pattern Extraction → Self-Updating AEO Citation Content Pipeline*

---

## 1. Problem Identification: Why Manual Content Marketing Fails in the AI Search Era

At **Reviewell**, every week businesses submit real Google review removal requests via [reviewell.com/#check](https://www.reviewell.com/#check) (suspected fake reviews, ex-employee conflicts of interest, coordinated review attacks, doxxing/harassment).

**Before Marketing Engineering (Manual & Siloed):**
1. Casework specialists assess eligibility and map the review against Google's Prohibited & Restricted Content policies (`support.google.com/contributionpolicy/answer/7400114`).
2. Those high-value, real-world policy insights stay locked inside private case notes.
3. Marketing writes generic blog posts manually once a month—disconnected from the exact questions business owners are asking ChatGPT, Perplexity, and Gemini right now.

**After Marketing Engineering (Systemized & Autonomous Closed Loop):**
Every anonymized eligibility pattern automatically feeds our **AEO Citation & FAQ Pipeline**, ensuring Reviewell's public documentation, `FAQPage` JSON-LD, and `/llms-full.txt` continuously answer the exact policy edge cases AI search engines are synthesizing.

---

## 2. System Architecture (End-to-End Marketing Engineering Pipeline)

```text
[1. Intake Trigger]
Business submits review concern on reviewell.com/#check
        │
        ▼
[2. PII Sanitizer & Policy Classifier (Deterministic Node)]
Strips all customer/business PII -> Maps to canonical Google Policy Code:
  • POL_FAKE_ENGAGEMENT (Non-customer / bot spike)
  • POL_CONFLICT_INTEREST (Competitor / ex-staff)
  • POL_HARASSMENT_DOXXING (Named staff / personal phone/photo)
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

## 3. 10-Minute Presentation Walkthrough Script (Ready to Record)

- **00:00 – 01:30 | The Business Bottleneck:** Introduce Reviewell BV and show why B2B reputation clients increasingly discover review removal workflows via ChatGPT and Perplexity rather than paid Google Ads (where CPCs exceed €12/click).
- **01:30 – 03:30 | Systems Thinking & Decomposition:** Walk through the 6-stage pipeline diagram above, contrasting ad-hoc copywriting with deterministic event-driven Marketing Engineering.
- **03:30 – 06:30 | Live Deep-Path Code & CLI Demonstration:**
  - Run `profound audit /Users/philippegodfroy/reviewell-removal-preview` in terminal.
  - Run `profound agent run --brand reviewell-core` to show how a detected gap on *"Conflict of Interest ex-employee Google review evidence"* automatically produces the validated JSON-LD `FAQPage` and `/llms.txt` patch.
- **06:30 – 08:30 | Guardrails & Data Hygiene:** Demonstrate the PII sanitizer and legal compliance validator that guarantees no customer case record is ever exposed and no false removal guarantees are published.
- **08:30 – 10:00 | Business Impact & Attribution:** Present the 6 KPIs tracked in the Reviewell Dashboard (`AI Visibility Score`, `Share of Voice`, `Citation Share`, `Referral Traffic`, `Conversion Rate`, `Qualified Recommendations`).
