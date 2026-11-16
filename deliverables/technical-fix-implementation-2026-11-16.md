# Reviewell technical fix implemented and verified live — 2026-11-16

The canonical defects found in the [live 66-URL audit](technical-verification-2026-11-16.md) now have an implemented and verified fix in an isolated website worktree.

- Worktree: `/Users/philippegodfroy/reviewell-aeo-technical-fix`
- Branch: `fix/aeo-canonical-host-2026-11-16`
- Base: `main` at `15036eceec286dae99f9cb6f7ca907eb2251b56c`
- Commit: `a943db7dfd4daa355d2b8436c088c12452852f7e` — `fix(seo): align canonical hosts and company location references`
- Website repository remote: `https://github.com/phlppgdfry/reviewell-removal.git`
- State: [pull request #3](https://github.com/phlppgdfry/reviewell-removal/pull/3) merged by the release coordinator as `13be514d19125a80af6f8acbb95b720d5dc3db92`; intended outputs independently verified live at 2026-11-16 14:59:59 UTC. See [production verification](technical-production-verification-2026-11-16.md).

## Implemented behavior

Root metadata/Organization, sitemap and robots now normalize the configured `https://reviewell.com` origin to `https://www.reviewell.com`. Existing preview and custom origins are preserved, and trailing slashes are trimmed before composing sitemap URLs. About and contact now declare their own page paths as canonicals instead of inheriting the homepage path.

Both llms text files now say Bruges instead of Brussels, matching the existing live `/about` company details and the local Organization data. This reconciles the site's own location references; it is not an independent company-register verification. No prices, payment terms, guarantees, account-access promises or other business claims were changed.

## Verification results

1. The default **Next.js 16.4.6 Turbopack production build passed**, including TypeScript and generation of 148 static pages. The build deliberately used `NEXT_PUBLIC_SITE_URL=https://reviewell.com` to reproduce the problematic apex configuration; Supabase configuration used the repository CI's placeholder values, not production credentials.
2. **22 relevant tests passed** across `tests/site-canonical-host.test.ts`, `tests/site-v6.test.ts`, `tests/site-v7.test.ts` and `tests/ci-and-build-safety.test.ts`. Five new regression cases exercise the actual sitemap/robots generators with apex, apex plus trailing slash, www, preview and custom origins.
3. `node scripts/verify-public-canonicals.mjs` passed against the generated production artifacts: **all 66 sitemap pages use www and have matching self-canonical paths**. This includes generated audience and resource routes.
4. Direct inspection of the generated HTML confirmed `https://www.reviewell.com/about` and `https://www.reviewell.com/contact`; generated robots advertises `https://www.reviewell.com/sitemap.xml`.
5. `git diff --check` passed. The original website checkout's status remained unchanged: only its pre-existing unrelated untracked script/cache entries remain.

The repeatable artifact check is `scripts/verify-public-canonicals.mjs` in the website branch. Run it after a production build; an explicit preview/custom origin can be supplied as its first argument for an intentional nonproduction build.

## Environment notes and remaining work

Existing dependencies were reused without installation. A node_modules symlink initially hit Turbopack's workspace boundary; replacing it with a local APFS clone resolved dependency discovery. The sandboxed compiler subsequently remained idle, so it was stopped and the same build was run outside the sandbox, where compilation completed in 15.8 seconds. The reported successful checks refer to this completed build.

Applicable AGENTS instructions, installed Next.js metadata documentation and current Context7 metadata documentation were reviewed. No source edits were made to the original `/Users/philippegodfroy/reviewell-removal-preview` checkout.

The isolated worktree derived from local main. The release coordinator subsequently verified that the prior production deployment matched the branch base and checked the official Vercel project/repository/alias mapping before merging. After release, an independent live crawl confirmed all 66 sitemap URLs now serve directly on www with matching self-canonicals, robots advertises the preferred sitemap URL and both llms files say Bruges. The original canonical/hostname findings are therefore resolved in the observed production output. The raw pre-fix evidence remains unchanged. No claim is made that this fix improves AI visibility, earns citations or changes search indexation. No Profound credits were consumed.
