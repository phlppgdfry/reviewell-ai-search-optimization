# Reviewell production verification — 2026-11-16

**Result: the canonical/hostname and llms location changes are now independently confirmed on the live website.** This report preserves the separate [pre-fix audit](technical-verification-2026-11-16.md). It records observed production behavior, not another local build or a predicted deployment outcome.

Checked at **2026-11-16 14:59:59 UTC**. [Raw evidence](technical-production-verification-2026-11-16.json) includes every requested/final URL, status, redirect count, canonical, HTML hash, sitemap XML, robots and llms bodies, plus first-response headers for the redirect samples.

| Check | Live result |
| --- | --- |
| Current sitemap | 66 URLs, all using `https://www.reviewell.com` |
| Sitemap page responses | 66/66 HTTP 200, zero redirects on the listed preferred URLs |
| Canonical origin and page path | 66/66 match their final served URL, allowing the equivalent homepage trailing-slash form |
| About | `https://www.reviewell.com/about` |
| Contact | `https://www.reviewell.com/contact` |
| Sitemap declaration in robots | `Sitemap: https://www.reviewell.com/sitemap.xml` |
| Public crawler/reference files | robots.txt, llms.txt and llms-full.txt return 200 at www |
| llms company location | Both text files say Bruges, Belgium; neither retains Brussels, Belgium |
| Other basic server-HTML checks | All 66 pages have a title, exactly one H1 and no noindex robots metadata |

The HTTPS apex home, about and contact URLs each issue **308** redirects to their equivalent www URL and then return 200. The HTTP www homepage upgrades in one redirect; the HTTP apex homepage still takes two redirects (HTTP apex → HTTPS apex → HTTPS www). That extra HTTP hop is a remaining optimization, not a failure of the corrected canonical relationship.

Robots still permits the named AI/search crawlers and excludes private account/admin/API routes. This confirms the file contents, not actual crawling or citations. All 66 sitemap pages were fetched as server HTML; no browser-rendering, search-indexation, Search Console or AI visibility claim is implied.

## Release attribution and limits

The release coordinator reported [merged PR #3](https://github.com/phlppgdfry/reviewell-removal/pull/3), squash commit `13be514d19125a80af6f8acbb95b720d5dc3db92`, after GitHub CI and the Vercel preview passed. The coordinator also verified the production Vercel project, aliases and repository mapping. This verification independently establishes that the intended public outputs are live; it does not infer a deployment identity from HTML hashes alone.

No new production changes, builds or tests were performed for this verification, and no Profound credits were consumed. The commercial-claim confirmation and editorial brief QA remain separate tasks. The findings here do not prove changed rankings, increased AI visibility, citations, referrals or conversions.
