# 🏆 Profound University — Track 4: Agent Engineering Certification Submission

**Candidate:** Philippe Godfroy  
**Organization:** Reviewell BV (`BE1012058705`, Belgium)  
**Agent Name:** `Reviewell Autonomous AEO & Citation Intelligence Agent`  
**Agent JSON File:** [`reviewell-autonomous-aeo-agent.json`](./reviewell-autonomous-aeo-agent.json)  
**Automated Rubric Verification:** **8 / 8 Passed (`100%`)** via `profound agent validate`

---

## 1. Official Rubric Verification Matrix

| Official Profound Requirement | Required | Implemented in Reviewell Agent | Status |
|---|---|---|---|
| **Functional Node Count** | `>= 12` nodes | **14 distinct functional nodes** across 10 lifecycle stages (`DETECT` → `MEASURE`) | ✅ PASS |
| **5 Node Categories** | `Data`, `Research`, `LLM`, `Integration`, `Logic` | `Data` (3), `Logic` (4), `LLM` (3), `Research` (2), `Integration` (2) | ✅ PASS |
| **Persistent Knowledge** | Historical state across runs | `persistentKnowledge` (`~/.config/profound/persistent_knowledge.json`) storing 30d baselines, cooldown windows & prior patches | ✅ PASS |
| **Structured Outputs** | Strict JSON Schema contracts | JSON Schema validation on `node_01`, `node_02`, `node_05`, `node_10`, `node_11` | ✅ PASS |
| **Conditional Logic** | Noise filtering & branching | Significance gate (`abs(delta) >= 3.5%`, `sample_size >= 15`, `cooldown == false`) + confidence guardrail (`>= 0.82`) | ✅ PASS |
| **Profound Data** | Native Profound metrics | `Visibility Score`, `Share of Voice`, `Citation Share`, `Citation Pages`, `Prompt Answer Executions` | ✅ PASS |
| **Responsible Automation** | Prevent spam & unsafe edits | Quiet heartbeat when within stochastic variance + mandatory Human-in-the-Loop approval gate (`node_12`) | ✅ PASS |
| **Explainable Architecture** | Documented edges & variables | 14 directed edges, explicit threshold variables, and full execution audit trail | ✅ PASS |

---

## 2. 14-Node Architecture Breakdown by Category

### Category 1: `Data` (3 Nodes)
1. **`node_01_profound_visibility_ingest`** (`DETECT`): Calls Profound `POST /v1/reports/visibility` & `/v2/prompts/answers` across ChatGPT, Perplexity, Gemini, Claude, and Copilot.
2. **`node_02_profound_citation_ingest`** (`DETECT`): Calls Profound `POST /v1/reports/citations` to retrieve owned-domain `Citation Share` and top competitor `Citation Pages`.
3. **`node_03_historical_baseline_compare`** (`COMPARE`): Reads longitudinal baselines and alert cooldown timestamps from `persistentKnowledge` and computes period-over-period deltas.

### Category 2: `Logic` (4 Nodes)
4. **`node_04_significance_noise_gate`** (`ANALYZE`): Filters out normal LLM non-determinism (`|delta| < 3.5%` or `sample_size < 15` or active 72h cooldown).
8. **`node_08_evidence_uncertainty_verifier`** (`EVALUATE`): Verifies cross-engine reproducibility (`confidence >= 0.82`) and blocks any hallucinated or non-compliant review-removal guarantee claims.
9. **`node_09_action_decision_router`** (`DECIDE`): Routes to recommendation synthesis only when actionable root causes pass verification.
12. **`node_12_human_approval_gate`** (`APPROVAL`): Pauses execution until Philippe Godfroy approves the executive diff digest.

### Category 3: `LLM` (3 Nodes)
5. **`node_05_topic_cluster_analyzer`** (`ANALYZE`): Groups underperforming prompts into intent clusters (*Conflict-of-Interest Evidence*, *Free Eligibility Check*, *RingSizer ISO Conversion*).
10. **`node_10_structured_aeo_recommender`** (`RECOMMEND`): Generates schema-validated AEO patches (`/llms.txt`, `FAQPage` JSON-LD, policy evidence tables).
11. **`node_11_executive_brief_composer`** (`RECOMMEND`): Produces a structured executive summary with KPI snapshot, diff preview, and risk assessment.

### Category 4: `Research` (2 Nodes)
6. **`node_06_competitor_citation_crawler`** (`RESEARCH`): Inspects top-cited competitor pages (`support.google.com`, `removify.com`, `erase.com`) for structural extractability patterns.
7. **`node_07_owned_asset_aeo_auditor`** (`RESEARCH`): Audits `reviewell.com` and `/Users/philippegodfroy/reviewell-removal-preview` for `/llms.txt`, `robots.txt` AI bot rules, and JSON-LD completeness.

### Category 5: `Integration` (2 Nodes)
13. **`node_13_github_cms_patch_publisher`** (`EXECUTE`): Writes approved AEO patch artifacts into `deliverables/reviewell-aeo-patch/` and stages a Git branch/PR.
14. **`node_14_persistent_baseline_updater`** (`MEASURE`): Updates `persistentKnowledge` baseline snapshot and schedules +7d/+14d post-deployment lift verification.

---

## 3. 10-Minute Video Walkthrough Script (For Submission Upload)

1. **00:00 – 01:30 | Architecture Overview:** Show the 14-node graph in the Reviewell AI Visibility Dashboard (`npm start`) and explain the 5 node categories (`Data`, `Research`, `LLM`, `Logic`, `Integration`).
2. **01:30 – 03:30 | Profound Data & Persistent Knowledge:** Show `node_01`, `node_02`, and `node_03` ingesting Profound `Visibility Score` (34.2%), `Share of Voice` (18.4%), and `Citation Share` (14.8%) and comparing against `~/.config/profound/persistent_knowledge.json`.
3. **03:30 – 05:30 | Conditional Logic & Anti-Noise Guardrails:** Highlight `node_04_significance_noise_gate` and `node_08_evidence_uncertainty_verifier`, explaining why single-prompt variance never triggers false alarms.
4. **05:30 – 07:30 | Research & Structured Output Synthesis:** Walk through `node_06`, `node_07`, and `node_10`, showing the strict JSON Schema validation and the generated `/llms.txt` and `ReviewellAeoSchema.tsx` files.
5. **07:30 – 10:00 | Live End-to-End Execution & Rubric Validation:** Run `profound agent validate` and `profound agent run --brand reviewell-core` live in the terminal, inspect the updated persistent state, and show the human approval gate (`node_12`).

---

## 4. Authorship Attestation

> I, **Philippe Godfroy**, confirm that this 14-node `Reviewell Autonomous AEO & Citation Intelligence Agent` architecture, JSON configuration, codebase implementation, and evaluation pipeline are my own original engineering work designed for Reviewell BV.
