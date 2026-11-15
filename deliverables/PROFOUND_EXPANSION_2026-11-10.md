# Reviewell Profound expansion — 2026-11-10

Starting visible balance: 94 existing trial credits. User authorized useful use of the remaining credits; no purchase or upgrade authorized or performed.

Project: https://platform.tryprofound.com/projects/p/95bfc884-a9fa-45db-8f90-f366ee349b07

## Follow-up verification — 2026-11-15

- Visible balance at resumption: **90 trial credits**.
- The native UI marks the technical audit completed (1m56s), with a Sheet and a summary document. It checked 30 of 66 sitemap URLs; its report labels 5 OK, 23 attention, and 2 problem. These are agent audit findings for the sampled pages, not search visibility scores.
- Reported issues include homepage canonicals on `/about` and `/contact`, inconsistent preferred hostname references, and missing short answer blocks on some pages. These require current page-level verification before a production change.
- A local code read independently found `alternates: { canonical: "/" }` in the root layout of `reviewell-removal-preview`. This supports investigation of inherited canonicals but does not prove that checkout exactly matches production.
- Profound's project assistant located outputs for all five previously started runs and began reading them, updating the master index, and correcting the content drafts against live Google policy. No repeat data runs were requested.
- The project assistant created a 20-row page-improvement Sheet using audited URLs, with answer blocks, three FAQs per page, titles/meta and sources: https://platform.tryprofound.com/sheets/s/01a1df95-e074-7530-8adb-534c2502e59e . These are drafts, not published pages.
- The first QA round completed in 9m50s. Visible balance then changed from 90 to 63 credits. A final primary-source and language check is in progress; its result and ending balance must be checked separately.
- QA report: https://platform.tryprofound.com/documents/01a1df96-466b-7653-a20f-25d4fb8dc3e1

Platform master index: https://platform.tryprofound.com/documents/01a1c3a6-e37f-73f0-9354-75c19897e82f

## Native agents and first runs

| Work package | Agent | First run | Verified status |
| --- | --- | --- | --- |
| Technical sitemap audit, up to 30 pages | [Agent](https://platform.tryprofound.com/agents/a/de9efdee-abba-4490-9a60-e94f876f60df) | [Run](https://platform.tryprofound.com/agents/a/de9efdee-abba-4490-9a60-e94f876f60df/chats/c/903ce5f0-6df2-4b11-a93d-42caeb58c751) | Output located by project assistant; linked from master index |
| Price, guarantee and process consistency, up to 20 pages | [Agent](https://platform.tryprofound.com/agents/a/aa651ee7-a03e-443f-8648-276eecf76aec) | [Run](https://platform.tryprofound.com/agents/a/aa651ee7-a03e-443f-8648-276eecf76aec/chats/c/90b2a1a2-dd63-4d25-9d75-97212d4f6fcc) | Output located by project assistant; linked from master index |
| Six EU competitors | [Agent](https://platform.tryprofound.com/agents/a/934e0b65-fa5b-498d-b43e-ea25d65af7fc) | [Run](https://platform.tryprofound.com/agents/a/934e0b65-fa5b-498d-b43e-ea25d65af7fc/chats/c/4ca45265-1c9e-4a52-b508-3a32f90b4d2d) | Output located by project assistant; linked from master index |
| NL/EN cost and comparison article | [Agent](https://platform.tryprofound.com/agents/a/1cb48535-552d-4ae1-908e-2a37034747bb) | [Run](https://platform.tryprofound.com/agents/a/1cb48535-552d-4ae1-908e-2a37034747bb/chats/c/0b2c5fef-b4a9-4bfb-a00b-d21b5f22532f) | Output located by project assistant; linked from master index |
| NL/EN review bombing and extortion article | [Agent](https://platform.tryprofound.com/agents/a/b1b5e9dd-37ca-4a28-8038-e05e212738e8) | [Run](https://platform.tryprofound.com/agents/a/b1b5e9dd-37ca-4a28-8038-e05e212738e8/chats/c/ef25c641-2924-44fc-acc8-ed772fb1cc5c) | Output located by project assistant; linked from master index |
| NL/EN Google review service page, ten FAQs per language and intake checklist | [Agent](https://platform.tryprofound.com/agents/a/67fdb626-b2c7-4da6-bd7d-5e317f267576) | Executed by Profound from project chat | Completed; [output Doc](https://platform.tryprofound.com/documents/01a1c3a6-90f8-7aa1-89d4-cdb616114c43) |

## Quality and measurement boundaries

- These are saved native Profound agents, separate from the older incompatible 14-node JSON architecture.
- The five drafts became runnable after opening them in the native UI. The project assistant could only run the service-page agent directly; the remaining runs were actually started via their UI controls.
- No schedules or public sharing were added. Content remains in draft documents; no changes were published to reviewell.com.
- Draft prices and guarantees are sourced from Reviewell's public pages, not independently confirmed business promises. A website claim is not an issuer certification or proof of commercial results.
- The first QA round corrected policy statements in the service-page and cost drafts. Lack of a CRM record or purchase alone does not prove a fake review; an actual experience and applicable policy are what matter. A further language/source check is in progress.
- Balance after setup and the service-page run: 92 visible credits. All five additional outputs were located on 15 November. See the follow-up section for later balances.

## Public hub and prototype MCP corrections — 2026-11-15

- Public hub now labels fixture KPI cards as fictitious demonstrations and links directly to the real private Profound master index and 20 briefs. The historical 0% baseline states its date and US-only scope.
- Prototype `/api/mcp` no longer invents current visibility, competitor citation shares, a 100/100 crawl result, a completed native agent run, human approval, or a passing certification rubric. Missing data is explicitly unavailable; its simulation is an unexecuted description.
- This prototype is not a live authenticated bridge to Profound. Official MCP OAuth and custom CLI/API access remain separate.
- Seven local tests pass, including three checks against fabricated measurements and execution claims. Local tests do not assess issuer certification requirements or complete MCP protocol conformance.
