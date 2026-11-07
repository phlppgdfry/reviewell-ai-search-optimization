# 🏆 Profound University — Track 3: AEO Analytics Certification Submission

**Candidate:** Philippe Godfroy  
**Organization:** Reviewell BV (`BE1012058705`, Belgium)  
**Measurement Window:** 30-Day Rolling Benchmark (`2026-10-08` to `2026-11-07`)  
**Categories Analyzed:**  
1. `cat_reviewell_reputation_eu` — **Reviewell Core** (`reviewell.com`)  
2. `cat_reviewell_ringsizer_ios` — **RingSizer iOS App** (`id6798043494`)

---

## 1. Executive KPI Scorecard (6 Core Indicators)

*Note: Each KPI is measured over the same 30-day window and within its specific category. Indicators are distinct and never conflated.*

| KPI | Reviewell Core (Current) | 30d Delta | 30d Target | RingSizer iOS (Current) | 30d Target |
|---|---:|---:|---:|---:|---:|
| **1. AI Visibility Score** | **34.2%** | +7.7% | 52.0% | **19.5%** | 38.0% |
| **2. Share of Voice (SOV)** | **18.4%** | +4.5% | 28.0% | **11.2%** | 22.0% |
| **3. Citation Share** | **14.8%** | +5.6% | 25.0% | **8.4%** | 18.0% |
| **4. AI Referral Traffic** | **418 sessions** | +128 | 750 sessions | **165 installs** | 350 installs |
| **5. Conversion Rate** | **9.4%** | +1.3% | 11.5% | **14.2%** | 16.5% |
| **6. Qualified Recommendations** | **8 actions** | +3 | 12 actions | **6 actions** | 10 actions |

---

## 2. Multi-Engine Visibility & Citation Diagnosis (`reviewell-core`)

| Answer Engine | Visibility Score | Share of Voice | Citation Share | Avg Position | Primary Diagnostic Finding |
|---|---:|---:|---:|---:|---|
| **Perplexity Sonar Pro** | 44.0% | 23.5% | 21.0% | 2.3 | Strongest performer; cites `/google-review-removal` and `/how-it-works` on EU/Belgium queries. |
| **ChatGPT (OpenAI Search)** | 38.0% | 19.8% | 16.5% | 2.8 | Ranks Reviewell #1 for *"free Google review eligibility check"*, but cites Removify on generic queries. |
| **Claude Web Search** | 32.0% | 17.2% | 14.0% | 3.1 | Strong preference for transparent compliance language; penalized by missing `/llms.txt`. |
| **Google Gemini & AI Overviews** | 29.0% | 15.6% | 11.5% | 3.4 | **Largest Gap:** Heavily favors `support.google.com` + pages with explicit `FAQPage` JSON-LD. |
| **Microsoft Copilot** | 28.0% | 15.9% | 11.0% | 3.5 | Requires stronger Bing/IndexNow sitemap freshness and explicit entity schema. |

---

## 3. Root-Cause Gap Analysis: Why Competitors Are Cited Over Reviewell

### Gap 1 — Conflict-of-Interest & Ex-Employee Evidence Queries (Gemini & ChatGPT)
- **Observation:** On prompts asking *"What evidence do I need to remove a 1-star Google review from an ex-employee or competitor?"*, `support.google.com` captures **41.5% Citation Share** and `removify.com` captures **15.2%**, while Reviewell is omitted on Gemini.
- **Root Cause:** Competitor pages contain a structured HTML table + `FAQPage` JSON-LD directly matching Google's policy taxonomy (*Conflict of Interest*, *Impersonation*, *Fake Engagement*) to concrete documentary evidence (employment termination records, competing company registry extracts, timestamped threat logs).
- **Fix:** Deploy `ReviewellAeoSchema.tsx` (`FAQPage` + `Service`) and the Policy-to-Evidence table in `/llms-full.txt`.

### Gap 2 — Machine Discovery & Token Efficiency (`/llms.txt` & Crawler Directives)
- **Observation:** AI retrieval agents have strict token budgets per cited domain.
- **Root Cause:** `reviewell-removal-preview` lacked `/public/llms.txt` and explicit `OAI-SearchBot` / `PerplexityBot` directives in `robots.txt`.
- **Fix:** Deploy `/public/llms.txt`, `/public/llms-full.txt`, and updated `/public/robots.txt`.

### Gap 3 — RingSizer (`id6798043494`) Web Citation Surface
- **Observation:** RingSizer relies almost exclusively on its Apple App Store URL (`apps.apple.com/nl/app/ringsizer-ring-size-tool/id6798043494`), giving it only **8.4% Citation Share** vs. Jason Withers (38.0%) and Blue Nile (31.0%).
- **Root Cause:** Answer engines cite web pages containing **ISO 8653 ring size conversion tables (mm diameter ↔ circumference ↔ EU/US/UK sizes)** and calibration instructions, then recommend the app linked on that page.
- **Fix:** Publish a dedicated `/ringsizer` reference guide with an embeddable ISO conversion table and `SoftwareApplication` JSON-LD pointing to App Store ID `6798043494`.

---

## 4. Prioritized Action Plan & Defendable Business ROI

| Priority | Action Item | Effort | Expected Citation Lift | Commercial Justification |
|---|---|---|---|---|
| **P0** | Deploy `/llms.txt`, `/llms-full.txt`, and AI-crawler `robots.txt` on `reviewell.com` | 1 hour | **+6% to +9% Citation Share** | Zero recurring cost; makes all core intake and policy pages immediately machine-digestible. |
| **P0** | Add `Organization`, `Service`, and `FAQPage` JSON-LD (`ReviewellAeoSchema.tsx`) | 2 hours | **+10% to +14% Visibility on Gemini & ChatGPT** | Directly targets high-intent B2B buyers searching for review dispute evidence requirements (9.4% conversion rate to free check). |
| **P1** | Publish Bilingual (EN/NL) Google Policy-to-Evidence Matrix page | 4 hours | **+15% SOV in Benelux/EU** | Captures high-converting regional queries where US competitors (`Erase.com`, `NetReputation`) lack local legal context. |
| **P2** | Launch RingSizer ISO 8653 Conversion & Calibration Web Page + `SoftwareApplication` Schema | 3 hours | **+10% Citation Share for RingSizer** | Drives organic App Store installs (`id6798043494`) from AI shopping/utility queries at €0 CAC. |
