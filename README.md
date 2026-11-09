# 🚀 Reviewell AI Visibility & Growth Intelligence (`reviewell-ai-search-optimization`)

**Gecontroleerde status:** zie [PROFOUND_LIVE_STATUS.md](./PROFOUND_LIVE_STATUS.md) voor echte Profound-projectlinks, meetresultaten en beperkingen. De lokale CLI draait zonder API-credentials in voorbeeldmodus. De oude 14-node JSON is bij een echte import afgewezen (`nodes.0.type: Invalid input`). Een lokale rubriekcontrole bewijst geen platformcompatibiliteit of behaald certificaat.

Dit repository bevat een **AEO/GEO-prototype** voor Reviewell BV, lokale voorbeeldgegevens, technische audittools en voorbereide certificeringsmaterialen. Het actuele Profound-project richt zich uitsluitend op [reviewell.com](https://www.reviewell.com); oudere RingSizer- en Mirror Mate-materialen blijven als historische artefacten bewaard.

---

## 1. Architectuur (3 Geïntegreerde Modules)

- **Module A — AEO Visibility & Citation Intelligence (`src/profound-sdk.mjs` & `profound reports`)**
  - Volgt de 6 kern-KPI's (`AI Visibility Score`, `Share of Voice`, `Citation Share`, `Referral Traffic`, `Conversion Rate`, `Qualified Recommendations`) over ChatGPT, Perplexity, Gemini, Claude en Copilot.
  - Werkt direct met de officiële `@profoundai/client` en Python `profound` SDK wanneer `PROFOUND_API_KEY` / `PROFOUND_ACCESS_TOKEN` actief is, én bevat een volledige deterministische offline Reviewell-benchmark zodat het platform 100% gratis en lokaal bruikbaar is.
- **Module B — Technical AEO & Citation Readiness Auditor (`profound audit` & `deliverables/reviewell-aeo-patch/`)**
  - Controleert lokale Next.js-repositories (`/Users/philippegodfroy/reviewell-removal-preview`) en live URL's (`https://www.reviewell.com`) op `/llms.txt`, `/llms-full.txt`, AI-crawler `robots.txt`-regels (`OAI-SearchBot`, `PerplexityBot`, `ClaudeBot`, `GPTBot`, `Google-Extended`), en Schema.org JSON-LD (`Organization`, `Service`, `FAQPage`, `SoftwareApplication`).
- **Module C — 14-Node Autonomous AEO Agent (`certifications/04-agent-engineering/`)**
  - Architectuurvoorstel met 14 beschreven nodes. De lokale validator controleert acht structurele criteria; dit is geen officiële beoordeling. De JSON is nog niet compatibel met de platformimport en is geen bewijs van een werkende agent of certificeringsgereedheid.

---

## 2. Snelstart & CLI-commando's

```bash
# 1. Controleer de volledige Profound MCP-, CLI-, SDK- en skill-setup
profound status

# 2. Voer de technische AEO-audit uit op de Reviewell codebase
profound audit /Users/philippegodfroy/reviewell-removal-preview

# 3. Bekijk Visibility & Citation rapportages voor Reviewell en RingSizer
profound reports visibility --category reviewell-core
profound reports visibility --category reviewell-ringsizer

# 4. Valideer en draai de 14-node Autonomous AEO Agent
profound agent validate
profound agent run --brand reviewell-core

# 5. Controleer de 4 Profound University certificeringstrajecten
profound certs status

# 6. Draai de geautomatiseerde testsuite & start het interactieve dashboard
npm test
npm start
```

---

## 3. De 4 Profound University Certificeringen (`certifications/`)

1. [**Track 1 — AEO Foundation**](./certifications/01-aeo-foundation/SUBMISSION.md) *(Geen betaald abonnement nodig — direct in te dienen)*
2. [**Track 2 — Marketing Engineering**](./certifications/02-marketing-engineering/SUBMISSION.md) *(Systeemarchitectuur + 10-minuten presentatiescript)*
3. [**Track 3 — AEO Analytics**](./certifications/03-aeo-analytics/SUBMISSION.md) *(Volledige nulmeting, gap-analyse en geprioriteerde ROI-roadmap voor Reviewell & RingSizer)*
4. [**Track 4 — Agent Engineering**](./certifications/04-agent-engineering/SUBMISSION.md) + [`reviewell-autonomous-aeo-agent.json`](./certifications/04-agent-engineering/reviewell-autonomous-aeo-agent.json) *(14 nodes, 5 categorieën, 8/8 rubric-checks geslaagd)*
