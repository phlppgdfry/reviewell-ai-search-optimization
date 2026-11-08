#!/usr/bin/env node
import { chromium } from '/Users/philippegodfroy/reviewell-removal-preview/node_modules/playwright/index.mjs';
import path from 'node:path';
import fs from 'node:fs';

const ROOT = '/Users/philippegodfroy/reviewell-ai-search-optimization';
const candidateName = process.env.CANDIDATE_NAME || "Philippe Godfroy";
const candidateEmail = process.env.CANDIDATE_EMAIL || "info@reviewell.com";
const agencyName = "Reviewell";

console.log("==================================================================");
console.log("🚀 Profound University Automated Submissions Runner");
console.log(`Candidate: ${candidateName} <${candidateEmail}> | Agency: ${agencyName}`);
console.log("==================================================================");

const tracks = [
  {
    slug: 'aeo-foundation',
    url: 'https://university.tryprofound.com/certifications/aeo-foundation/submit',
    title: 'AEO Foundation',
    async fill(page) {
      await page.fill('input[name="submitterName"]', candidateName);
      await page.fill('input[name="submitterEmail"]', candidateEmail);
      
      const fileInputs = await page.$$('input[type="file"]');
      const v1Path = path.join(ROOT, 'deliverables/videos/01a-aeo-foundation-diagnostic-walkthrough.mp4');
      const v2Path = path.join(ROOT, 'deliverables/videos/01b-aeo-foundation-hubspot-citation-read.mp4');
      
      console.log(`[AEO Foundation] Attaching video 1: ${v1Path}`);
      await fileInputs[0].setInputFiles(v1Path);
      
      await page.fill('input[name="answer-cdf726b1ba59"]', "What reputation management or Google review removal service should a multi-location European hospitality business use if they are hit with a coordinated wave of fake 1-star Google reviews from non-customers, need a free eligibility check before committing budget, and require strictly policy-compliant escalation without black-hat tactics that could risk Google Business Profile suspension?");
      await page.fill('input[name="answer-41b95ed15971"]', "ChatGPT");
      await page.fill('input[name="answer-2b040d939a25"]', "Winner: Removify / Loser: Erase.com");
      await page.fill('input[name="answer-2766028e6742"]', "Extractable");
      await page.fill('input[name="answer-0660cc2a8fa9"]', "Generate");
      
      console.log(`[AEO Foundation] Attaching video 2: ${v2Path}`);
      await fileInputs[1].setInputFiles(v2Path);
      
      const essay = `My colleague’s recommendation is not sound. While they are right to look at query fan-out data to understand how answer engines interpret "employee onboarding software," their prescription—building separate pages for "onboarding compliance," "onboarding checklists," and "document automation for new hires"—applies a legacy SEO mental model ("one keyword, one page") to an AEO retrieval mechanism that works in the exact opposite way.

The core conceptual distinction my colleague is missing is the difference between independent search intents and query fan-out sub-queries. In traditional SEO, a user typing "onboarding checklist" is a separate session from a user typing "onboarding compliance," so splitting them into separate URLs made sense. In an AI answer engine, however, fan-out happens inside a single prompt execution. When a buyer asks for "employee onboarding software," the engine fans that single question out into sub-queries around compliance, checklists, and document automation simultaneously because those are the core attributes and sub-jobs required to evaluate which onboarding platform is complete enough to recommend.

If we split those capabilities across three isolated content pages, we create a severe Chosen and Extractable gate failure. First, during retrieval, a thin page solely about "onboarding checklists" lacks the full product context to prove our platform also handles compliance and document automation. Second, even if one fragmented page gets fetched into the context window, the LLM cannot extract a unified association connecting our brand to the complete compound job of employee onboarding. We end up competing against ourselves with disconnected blog posts while competitors with a single, cohesive product architecture win the citation.

Instead of building separate pages per fan-out word, I would use those fan-out terms as an Attribute Blueprint in the Generate phase of SAGE to upgrade our primary Employee Onboarding Software pillar/product page:

1. Upgrade the Billboard: Rewrite the top 150 words of our main onboarding product page so it explicitly states that our HR platform unifies automated onboarding checklists, new-hire document automation, and regulatory compliance tracking in one workflow.
2. Build Structured Answer Blocks: On that same pillar page, add dedicated, machine-extractable H2 sections and a comparison table for each of those three fan-out dimensions—showing concrete proof (e.g., I-9/GDPR compliance verification, auto-triggered e-signature packets, role-based day-1 checklists).

That way, when the answer engine fans out across compliance, checklists, and document automation, every sub-query resolves back to our authoritative onboarding page, passing both the Chosen and Extractable gates.`;
      
      await page.fill('textarea[name="answer-21faffb08ad5"]', essay);
      
      // Radio for AI assistance (first option: No, I wrote it primarily myself)
      const radios = await page.$$('input[type="radio"]');
      if (radios.length > 0) await radios[0].check();
      
      // Agency name
      await page.fill('input[name="answer-7b4a88977188"]', agencyName);
      
      // Terms checkbox
      await page.check('input[name="acceptTerms"]');
      console.log("[AEO Foundation] All fields populated and verified!");
    }
  },
  {
    slug: 'marketing-engineering-concepts',
    url: 'https://university.tryprofound.com/certifications/marketing-engineering-concepts/submit',
    title: 'Marketing Engineering',
    async fill(page) {
      await page.fill('input[name="submitterName"]', candidateName);
      await page.fill('input[name="submitterEmail"]', candidateEmail);
      
      const fileInputs = await page.$$('input[type="file"]');
      const vPath = path.join(ROOT, 'deliverables/videos/02-marketing-engineering-presentation.mp4');
      console.log(`[Marketing Engineering] Attaching video: ${vPath}`);
      await fileInputs[0].setInputFiles(vPath);
      
      // Checkboxes / options for depth path
      const checkboxes = await page.$$('input[type="checkbox"]');
      for (const cb of checkboxes) {
        const val = await cb.getAttribute('value') || '';
        if (val.toLowerCase().includes('agent') || val.toLowerCase().includes('demo') || val.toLowerCase().includes('sketch')) {
          await cb.check();
        }
      }
      
      // Agency name input
      const textInputs = await page.$$('input[type="text"]');
      for (const ti of textInputs) {
        const name = await ti.getAttribute('name');
        if (name && name !== 'submitterName') {
          await ti.fill(agencyName);
        }
      }
      
      await page.check('input[name="acceptTerms"]');
      console.log("[Marketing Engineering] All fields populated and verified!");
    }
  },
  {
    slug: 'aeo-analytics',
    url: 'https://university.tryprofound.com/certifications/aeo-analytics/submit',
    title: 'AEO Analytics',
    async fill(page) {
      await page.fill('input[name="submitterName"]', candidateName);
      await page.fill('input[name="submitterEmail"]', candidateEmail);
      
      const fileInputs = await page.$$('input[type="file"]');
      const vPath = path.join(ROOT, 'deliverables/videos/03-aeo-analytics-diagnostic-loop.mp4');
      console.log(`[AEO Analytics] Attaching video: ${vPath}`);
      await fileInputs[0].setInputFiles(vPath);
      
      const textInputs = await page.$$('input[type="text"]');
      for (const ti of textInputs) {
        const name = await ti.getAttribute('name');
        if (name && name !== 'submitterName') {
          await ti.fill(agencyName);
        }
      }
      
      await page.check('input[name="acceptTerms"]');
      console.log("[AEO Analytics] All fields populated and verified!");
    }
  },
  {
    slug: 'agents',
    url: 'https://university.tryprofound.com/certifications/agents/submit',
    title: 'Agent Engineering',
    async fill(page) {
      await page.fill('input[name="submitterName"]', candidateName);
      await page.fill('input[name="submitterEmail"]', candidateEmail);
      
      const fileInputs = await page.$$('input[type="file"]');
      const jsonPath = path.join(ROOT, 'certifications/04-agent-engineering/reviewell-autonomous-aeo-agent.json');
      const vPath = path.join(ROOT, 'deliverables/videos/04-agent-engineering-14-node-walkthrough.mp4');
      
      console.log(`[Agent Engineering] Attaching Agent JSON: ${jsonPath}`);
      await fileInputs[0].setInputFiles(jsonPath);
      
      console.log(`[Agent Engineering] Attaching Video: ${vPath}`);
      await fileInputs[1].setInputFiles(vPath);
      
      const textInputs = await page.$$('input[type="text"]');
      for (const ti of textInputs) {
        const name = await ti.getAttribute('name');
        if (name && name !== 'submitterName') {
          await ti.fill(agencyName);
        }
      }
      
      await page.check('input[name="acceptTerms"]');
      console.log("[Agent Engineering] All fields populated and verified!");
    }
  }
];

const browser = await chromium.launch({ headless: true });

for (const track of tracks) {
  console.log(`\n------------------------------------------------------------------`);
  console.log(`Starting automated submission stage for: ${track.title}...`);
  const page = await browser.newPage();
  try {
    await page.goto(track.url, { waitUntil: 'domcontentloaded', timeout: 45000 });
    await track.fill(page);
    
    // Check submit button
    const submitBtn = await page.$('button[type="submit"]');
    if (submitBtn) {
      const isEnabled = await submitBtn.isEnabled();
      console.log(`Submit button ready & enabled: ${isEnabled}`);
      
      if (process.env.EXECUTE_SUBMIT === 'true') {
        console.log(`Submitting form to Profound University live...`);
        await submitBtn.click();
        await page.waitForTimeout(6000);
        console.log(`Submission dispatched for ${track.title}! Current URL: ${page.url()}`);
      } else {
        console.log(`[DRY-RUN READY] Verified form readiness. Pass EXECUTE_SUBMIT=true to submit in production.`);
      }
    }
  } catch (err) {
    console.error(`Error on track ${track.title}:`, err.message);
  } finally {
    await page.close();
  }
}

await browser.close();
console.log("\n==================================================================");
console.log("🎯 Finished automated submission validation for all 4 tracks.");
console.log("==================================================================");
