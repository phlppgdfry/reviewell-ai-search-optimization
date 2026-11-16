# Website claims production verification — 2026-11-16

**The reviewed claims correction is now confirmed on the live website.** Eight representative pages and both llms text files were checked between **15:34 and 15:35 UTC**. All ten resources returned HTTP 200 on www without redirects. [Raw observations](website-claims-production-verification-2026-11-16.json) preserve URLs, hashes, visible server text, descriptions, JSON-LD, per-claim excerpts and the isolated browser observation.

| Live page/file | Confirmed behavior |
| --- | --- |
| Homepage | Missing booking/purchase records alone are expressly not proof of a fake review. |
| FAQ | No password sharing; optional Google manager access by agreement; urgent handling is separate from the platform's removal deadline. |
| How it works | The shared step explains no password and optional Google manager access by agreement. |
| Pricing | Urgent assessment/filing is on the same **business day** for requests before 15:00, expressly not a platform removal deadline. |
| Google review extortion | The hero now offers an evidence-based report and says Google decides on removal. The old guaranteed-result sentence is absent. |
| What we cannot remove | The metadata qualifies negativity alone as insufficient; it does not imply every genuine negative review is exempt from all other policy grounds. |
| Dental/clinic landing page | Missing patient records alone are expressly not proof. |
| Airbnb landing page | No-show/cancellation alone does not automatically qualify; actual circumstances and Airbnb's decision matter. |
| llms.txt and llms-full.txt | Both reflect the business-day cutoff and optional manager access. Old absolute account-access language is absent. |

The extortion helper's fourth panel is client-rendered and initially closed, so its deadline wording could not be confirmed from initial server HTML. An isolated browser opened the live page and expanded that panel, without filling or submitting a form. All five panel checks passed: evidence-based route, business-day handling, 15:00 cutoff, Google's decision and explicit separation from Google's removal deadline. The initial HTML probe and its scope limitation are retained in the raw record.

## Confirmed commercial terms

The live pricing page still states **from €99 per review excluding VAT**, **20% discount from five reviews**, **+€49 urgent review handling**, an **invoice due within 14 days**, and the existing **30-day re-post guarantee**. This verifies that the displayed terms were preserved; the business confirmation was provided separately by the user.

Eleven positive content checks passed, plus the five live helper-panel checks. None of the specifically targeted old absolute claims or “same weekday”/“same-weekday” wording was found in the checked visible text, descriptions or JSON-LD. This is representative-page verification, not a new 66-page crawl or an audit of every historical audio/video/translated asset.

## Release attribution

The coordinator reported [PR #4](https://github.com/phlppgdfry/reviewell-removal/pull/4) merged as `9309d0d767d79b02c16ffae9b45c1305b2233946` and verified the production Vercel project/source mapping. This report independently confirms the intended public outputs; it does not infer the deployment commit solely from page hashes.

No website mutation, new build or test-suite run was performed during this production verification. The isolated browser made only read-only navigation and a panel expansion. No Profound credits were consumed. These copy corrections do not establish changed AI visibility, rankings, citations or conversions.
