# Live Reviewell technical verification — 2026-11-16

Evidence: [raw curl observations](technical-verification-2026-11-16.json), including UTC check time, requested and final URLs, status, redirect count, HTML hash, canonical, title, H1 and robots metadata. This is a live server-HTML verification, not a Profound visibility measurement or an indexation report. No production changes were made and no Profound credits were used.

## Confirmed findings

The live sitemap contained **66 URLs**. All 66 ended in HTTP 200 after redirects, had a title and exactly one H1 in server HTML, and exposed `index, follow` robots metadata. These checks do not establish actual search-engine indexation, JavaScript rendering quality, accessibility, conversion performance or citation eligibility.

| Priority | Observation | Evidence and implication |
| --- | --- | --- |
| High | `/about` and `/contact` declare the homepage as canonical. | `https://reviewell.com/about` redirects to `https://www.reviewell.com/about`, but its HTML declares `https://reviewell.com`. `/contact` behaves identically. Both have a wrong canonical **path**, beyond the shared hostname issue. |
| High | Canonicals and sitemap point to the redirecting hostname on all 66 pages. | Every sitemap URL uses `reviewell.com`; each redirects once to `www.reviewell.com`. All 66 HTML canonical tags use `reviewell.com`, differing from the final serving hostname. The preferred-host signals therefore disagree. This is not evidence that every page is excluded from search. |
| Medium | Robots sitemap URL also uses the redirecting hostname. | `https://www.reviewell.com/robots.txt` returns 200 but advertises `Sitemap: https://reviewell.com/sitemap.xml`. Align it with the chosen preferred hostname together with metadata and sitemap. |
| Medium | Machine-readable company location disagrees with the company page. | Live `llms.txt` says “Brussels, Belgium”; `/about` and the locally inspected Organization data say Bruges. Ask Reviewell to confirm the correct company location, then update all representations consistently. Public copy alone is not independent business verification. |

The checked www home, about and contact URLs return 200 with no redirect. `http://reviewell.com/` reaches `https://www.reviewell.com/` in two redirects; `http://www.reviewell.com/` reaches it in one. The HTTPS non-www → www redirect was independently checked on `/about` with a HEAD request and returned **308**, with `Location: https://www.reviewell.com/about`.

## Files and crawler access

- `robots.txt`, `llms.txt` and `llms-full.txt` all return HTTP 200 at the final www URL.
- Robots explicitly allows `/` for OAI-SearchBot, ChatGPT-User, GPTBot, PerplexityBot, ClaudeBot, Google-Extended and Applebot-Extended, while excluding account/admin/API routes. No change is required just to “enable AI bots.” Actual crawling, training use or citation cannot be inferred from these rules.
- `llms.txt` already links its main pages using www. The mismatch is with canonical metadata, sitemap URLs and the robots sitemap declaration. Merely having llms files does not demonstrate that any engine consumes them or improves visibility.
- Commercial claims in llms files (price, discount, urgency fee, invoice period and re-post promise) remain subject to the separate business-claim confirmation task. They were captured as current website statements, not endorsed.

## Precise local patch proposal

Read-only inspection of `/Users/philippegodfroy/reviewell-removal-preview` found `app/layout.tsx:13` sets `alternates: { canonical: "/" }`. `app/about/page.tsx:6` and `app/contact/page.tsx:8` set metadata without their own canonical. This source structure matches the observed homepage canonical on those live routes, but deployment provenance was not established in this audit.

1. If this checkout is confirmed as the production source, add `alternates: { canonical: "/about" }` and `alternates: { canonical: "/contact" }` to those two pages. An alternative is to move the homepage canonical out of the root layout and ensure every indexable page supplies its own canonical, including home. Do not remove the root setting without checking full route coverage.
2. Keep the current www redirect direction and set the production `NEXT_PUBLIC_SITE_URL` to `https://www.reviewell.com`, or intentionally choose non-www and change redirects in the same release. The first option matches the observed serving hostname. The actual environment variable value has **not** been read here; the local layout derives metadataBase from it, so validate generated output rather than assuming the current value.
3. Align `app/sitemap.ts`, `app/robots.ts`, JSON-LD URLs and llms links with that chosen hostname. The local sitemap's fallback is already www; the layout and robots fallback use a preview domain. Treat preview deployment indexing separately from production.
4. Confirm the company location with Reviewell and reconcile the machine-readable references.
5. Before release, build using production hostname configuration and inspect generated metadata for home, about, contact and a dynamic audience/resource route. After release, repeat the 66-URL check: each sitemap URL should be a final preferred-host URL with a matching self-canonical path, subject to any intentional canonical exceptions.

No patch was applied to the website checkout. Its unrelated untracked files were left untouched. The earlier report's “missing short answer blocks” is not reclassified as a technical error here: short-answer quality needs a page-by-page editorial review, not a simple tag or word-count test. No broad SEO score was assigned.

## Prepared patch artifact

[`reviewell-canonical-host-fix-2026-11-16.patch`](reviewell-canonical-host-fix-2026-11-16.patch) contains five targeted source changes: normalize the configured HTTPS apex Reviewell origin to www in root metadata/Organization, robots and sitemap; add self-canonicals to about and contact. Existing preview and custom origins are preserved. The company-location contradiction is deliberately excluded until the business confirms it.

`git apply --check /Users/philippegodfroy/reviewell-ai-search-optimization/deliverables/reviewell-canonical-host-fix-2026-11-16.patch` passed against the current `/Users/philippegodfroy/reviewell-removal-preview` checkout. This validates patch applicability only: the patch was not applied, built, committed or deployed. That checkout may differ from production. Review the actual production source and environment before applying; verify generated output and the live redirect/canonical relationship after a release.

The installed Next.js metadata guide and [current Next.js metadata documentation](https://github.com/vercel/next.js/blob/canary/docs/01-app/03-api-reference/04-functions/generate-metadata.mdx) were checked: relative canonical values compose with the inherited metadataBase. No new dependency or API is introduced by this patch.
