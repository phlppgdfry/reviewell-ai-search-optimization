# Website claims correction implemented and verified live — 2026-11-16

An isolated, reviewable website change corrects the specific removal-policy and account-access contradictions found in the existing source. It does not integrate the twenty Profound briefs.

- Worktree: `/Users/philippegodfroy/reviewell-claims-fix`
- Branch: `fix/policy-claims-2026-11-16`
- Base: fetched remote main `13be514d19125a80af6f8acbb95b720d5dc3db92`
- Commit: `1d67665a902dab10cad24185d1ce2159d8d04c2e`
- Scope: 13 existing files, 55 changed copy lines; no new dependency, component, business logic or API.
- State: [pull request #4](https://github.com/phlppgdfry/reviewell-removal/pull/4) merged by the coordinator as `9309d0d767d79b02c16ffae9b45c1305b2233946`; intended wording independently verified live on representative pages and both llms files at 15:34–15:35 UTC. See [production verification](website-claims-production-verification-2026-11-16.md).

## Corrected statements

| Existing problem | Resulting wording |
| --- | --- |
| A missing booking/customer record presented as a clear breach or sufficient explanation for removal | Missing records are a reason to investigate. The actual experience and additional evidence determine whether an applicable policy ground exists. Shared price/ground copy, illustrative examples, guides and sector introductions now say this. |
| Honest negative criticism presented as something that always stays online | Negativity alone is not a removal ground; a separate privacy or other policy breach may still apply. Shared assessment copy, platform boundaries and the boundaries page metadata are qualified accordingly. |
| Extortion hero promised “we'll get the reviews removed” | Reviewell prepares an evidence-based report; Google decides whether and when to remove reviews. The same distinction appears in the helper and shared extortion steps. |
| “Never account access” contradicted optional Google manager access | No password sharing. The first assessment does not require account access; Google Business Profile manager access is optional, separately agreed and revocable. The existing permission guide remains linked. |
| Unqualified same-day urgency in forms, pricing snippets and extortion copy | The urgent €49 review service covers assessment and filing on the same business day for requests before 15:00. Platform removal timing is separate. The form's success heading now says “Priority assessment” instead of unconditionally promising “Today.” |
| Airbnb no-show presented as sufficient for removal | First-hand experience and arrival/cancellation circumstances are assessed; no-show or absence of an overnight stay alone does not automatically qualify. The existing Airbnb landing copy, related guide and machine-readable summary agree. |

These edits use the previously checked official-policy sources documented in [policy-source-verification-2026-11-16.md](policy-source-verification-2026-11-16.md): Google genuine experience/content/reporting/extortion policies, Google's manager permissions and Airbnb's reviews policy. This work does not provide a case-specific legal assessment or guarantee a platform result.

The user's confirmed business terms were preserved: €99 starting price excluding VAT, 20% discount from five reviews, €49 urgent review fee, 14-day payment term and the existing 30-day re-post service guarantee. Legal consumer-withdrawal wording, nonreview fees and the rating calculator/arithmetic disclaimer were not changed. No backend assessment or removal decision logic was changed.

## Verification

- **30 existing relevant tests passed**, across focus-check, site-v6, site-v7, site-canonical-host and ci-and-build-safety suites. No copy-mirroring tests were added.
- The default **Next.js 16.4.6 Turbopack production build passed**, including TypeScript and generation of 148 static pages. Build configuration used the existing CI placeholder Supabase values and `NEXT_PUBLIC_SITE_URL=https://reviewell.com`; dependencies were reused through a local APFS clone, without installation. The build ran outside the sandbox because the earlier identical canonical-fix build had established the sandbox worker limitation.
- The existing generated-artifact canonical check passed for **all 66 public sitemap pages**. The previously released hostname fix is preserved.
- Server-rendered visible text and descriptions for all 66 sitemap pages were checked for the specific old absolute claims; none of those phrases remained. Eight positive checks passed for homepage missing-record qualification, optional manager access in FAQ, urgent cutoff versus platform deadline, Google decision language, boundaries metadata, Airbnb no-show context, unchanged payment term and unchanged price/VAT.
- `git diff --check` passed. The original website checkout retains only its pre-existing unrelated untracked files; the prior canonical worktree was preserved.

This is a targeted source correction, not a complete audit of every existing sentence, translated audio/video asset, third-party testimonial, sector claim or nonreview service. Production behavior was subsequently verified on eight representative pages and both llms files; the separate production report records that scope and evidence. No Profound credits were used.

## Final review correction

The release review corrected 12 newly introduced “weekday” phrases across eight files to “business day”, preserving the confirmed business-day promise, 15:00 cutoff and platform-outcome caveat. The final amended commit is `1d67665a902dab10cad24185d1ce2159d8d04c2e`. The same 30-test set passed again and `git diff --check` passed. A source search found no remaining “same weekday” or “same-weekday” wording in app, components, lib or either llms file. The production build and rendered-artifact checks above were completed before this final copy-only substitution; the build was not repeated. No push or deployment was performed by this agent.

## Full local CI-equivalent verification

After the coordinator created PR #4, the final commit `1d67665a902dab10cad24185d1ce2159d8d04c2e` passed these additional checks:

- `npx tsc --noEmit -p .` — passed.
- `npm test` — **40 test files, 326 tests passed**.
- `CI=1 NEXT_PUBLIC_SUPABASE_URL=https://placeholder.supabase.co NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_placeholder SUPABASE_SECRET_KEY=sb_secret_placeholder NEXT_PUBLIC_SITE_URL=https://reviewell.com npm run test:e2e -- --workers=4` — **all 33 Chromium tests passed** in one minute, including page and step-two accessibility, intake validation, mocked form submission, homepage interactions, pricing, redirect and sector landing checks.

The browser suite ran against a newly started local dev server with placeholder credentials. The submission test intercepted POST `/api/cases`; no real workspace or email was created. Browser/server execution required running outside the sandbox. No test failed and no source fix was required. The dev server's generated-only `next-env.d.ts` change was restored afterwards. The website branch is clean at the same commit; no new commit or push was made. The earlier production build remains the build evidence; it was not repeated for these checks.
