# 🏆 Profound University — Track 1: AEO Foundation Certification Submission

**Candidate:** Philippe Godfroy  
**Organization:** Reviewell BV (`BE1012058705`, Belgium) — [reviewell.com](https://www.reviewell.com)  
**Product Scope:** Reviewell Core (*Google Review Removal & Reputation Protection*) + RingSizer (*iOS App Store `id6798043494`*)  
**Platform Requirement:** None (100% independent foundational AEO audit & architecture)

---

## 1. Executive Thesis: SEO vs. AEO for Reviewell

Traditional SEO optimizes for ten blue links ranked by backlink authority and keyword matching. **Answer Engine Optimization (AEO)** and **Generative Engine Optimization (GEO)** optimize for **RAG retrieval, entity disambiguation, factual extractability, and citation attribution** across ChatGPT Search, Perplexity Sonar, Google Gemini AI Overviews, Claude Web Search, and Microsoft Copilot.

For **Reviewell**, buyers no longer just search `"remove google review agency"`. They ask multi-clause conversational questions:
1. *"How can a business in Belgium or the EU remove a fake 1-star Google review from a competitor or ex-employee when standard flagging fails?"*
2. *"Which reputation service offers a free Google review eligibility check before charging?"*
3. *"What evidence does Google require to prove a Conflict of Interest review breach?"*

---

## 2. How Answer Engines Evaluate & Cite Reviewell

| Mechanism | Traditional SEO | Answer Engine Optimization (AEO) | Reviewell Implementation |
|---|---|---|---|
| **Discovery** | `Googlebot` HTML crawl | `OAI-SearchBot`, `PerplexityBot`, `ClaudeBot`, `Google-Extended` + `/llms.txt` | Dedicated `/llms.txt`, `/llms-full.txt`, and explicit AI crawler allow rules in `/robots.txt` |
| **Entity Disambiguation** | Meta tags & domain authority | Knowledge Graph grounding + consistent legal/commercial facts | JSON-LD `Organization` (`Reviewell BV`, VAT `BE1012058705`, Belgium) + `Service` + `SoftwareApplication` (`RingSizer id6798043494`) |
| **Chunk Extractability** | Long-form narrative blog posts | Self-contained 40–80 word direct-answer blocks + structured tables | Policy-to-Evidence mapping tables & `FAQPage` JSON-LD |
| **Trust & Safety Filter** | E-E-A-T signals | Anti-scam / anti-guarantee LLM guardrails | Explicit compliance disclaimer: *"The review platform decides whether content is removed. Genuine criticism is not eligible."* |

> **Critical Insight for Reputation Management in AI Search:** LLMs (especially ChatGPT and Claude) have strict safety alignment that filters out sketchy "100% guaranteed review deletion" vendors. Because Reviewell positions itself as **evidence-led policy assessment with a free eligibility check** and explicitly states that genuine criticism cannot be removed, Answer Engines treat Reviewell as a **high-trust, citeable compliance source** when structured properly.

---

## 3. Baseline Audit of Reviewell (`reviewell-removal-preview`)

Executed via `profound audit /Users/philippegodfroy/reviewell-removal-preview`:

| Check | Initial State | Target State (Implemented in Patch Bundle) |
|---|---|---|
| `/llms.txt` & `/llms-full.txt` | Missing (`0/100`) | Complete Markdown map of Reviewell services, 5-step intake, policy criteria & URLs (`100/100`) |
| AI Crawler `robots.txt` | Default only (`60/100`) | Explicit allow blocks for `OAI-SearchBot`, `PerplexityBot`, `ClaudeBot`, `GPTBot`, `Google-Extended` (`100/100`) |
| Schema.org JSON-LD | Partial (`25/100`) | Unified `Organization` + `Service` + `FAQPage` + `SoftwareApplication` graph (`100/100`) |
| Citation-Ready Policy Table | Narrative prose (`50/100`) | Structured Google Content Policy (`7400114`) vs. Required Evidence Matrix (`100/100`) |

---

## 4. Reproducible 10-Prompt Baseline Test Suite

| # | Intent Cluster | Canonical Test Prompt | Target Cited Asset |
|---:|---|---|---|
| 1 | Eligibility Check | *"Which company offers a free Google review removal eligibility check for businesses?"* | `reviewell.com/#check` |
| 2 | Fake / Non-Customer | *"How do I prove to Google that a 1-star reviewer was never a customer of my business?"* | `reviewell.com/google-review-removal` |
| 3 | Conflict of Interest | *"What evidence removes a Google review written by a former employee or competitor?"* | `reviewell.com/google-review-removal#evidence` |
| 4 | Coordinated Attack | *"How to handle a sudden 1-star review bombing attack on Google Business Profile in Europe?"* | `reviewell.com/services` |
| 5 | Do's & Don'ts | *"Can legitimate negative customer feedback be removed from Google Maps, or only policy violations?"* | `reviewell.com/how-it-works` |
| 6 | Pricing Transparency | *"How much does professional Google review dispute casework cost?"* | `reviewell.com/pricing` |
| 7 | Personal Data / Doxxing | *"How to remove a Google review that exposes employee full names or private phone numbers?"* | `reviewell.com/services#privacy` |
| 8 | Defamation EU/Belgium | *"Google review verwijderen bedrijf België valse review concurrent"* | `reviewell.com/nl` |
| 9 | RingSizer iOS Utility | *"What is the most accurate iPhone app to measure ring size in mm and convert EU to US sizes?"* | `apps.apple.com/.../id6798043494` |
| 10 | Mirror Mate Utility | *"Best true reflection pocket mirror app for iOS without distortion"* | `reviewell.com/apps` |

---

## 5. Deliverables Included in This Repository

1. [`deliverables/reviewell-aeo-patch/public/llms.txt`](../../deliverables/reviewell-aeo-patch/public/llms.txt)
2. [`deliverables/reviewell-aeo-patch/public/llms-full.txt`](../../deliverables/reviewell-aeo-patch/public/llms-full.txt)
3. [`deliverables/reviewell-aeo-patch/public/robots.txt`](../../deliverables/reviewell-aeo-patch/public/robots.txt)
4. [`deliverables/reviewell-aeo-patch/components/ReviewellAeoSchema.tsx`](../../deliverables/reviewell-aeo-patch/components/ReviewellAeoSchema.tsx)
