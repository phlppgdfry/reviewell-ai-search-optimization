#!/usr/bin/env node
import { chromium } from '/Users/philippegodfroy/reviewell-removal-preview/node_modules/playwright/index.mjs';
import path from 'node:path';
import fs from 'node:fs';

const ROOT = '/Users/philippegodfroy/reviewell-ai-search-optimization';
const candidateName = "Philippe Godfroy";
const candidateEmail = "info@reviewell.com";
const agencyName = "Reviewell";

console.log("==================================================================");
console.log("🚀 Profound University Sequential Track Submission Runner");
console.log(`Candidate: ${candidateName} <${candidateEmail}> | Agency: ${agencyName}`);
console.log("==================================================================");

async function injectVideo(page, filePath, inputIndex = 0) {
  const vBuffer = fs.readFileSync(filePath);
  const base64Data = vBuffer.toString('base64');
  const filename = path.basename(filePath);
  console.log(`[Upload #${inputIndex}] Injecting ${filename} (${(vBuffer.length / 1024 / 1024).toFixed(2)} MB)...`);

  await page.evaluate(async ({ b64, fname, idx }) => {
    const byteCharacters = atob(b64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'video/mp4' });
    const file = new File([blob], fname, { type: 'video/mp4' });
    
    const inputs = document.querySelectorAll('input[accept="video/*"]');
    const input = inputs[idx];
    if (!input) throw new Error(`Video input #${idx} not found!`);
    const propKey = Object.keys(input).find(k => k.startsWith('__reactProps$'));
    if (propKey && input[propKey]?.onChange) {
      input[propKey].onChange({
        target: {
          files: [file],
          value: '',
          isConnected: true
        }
      });
    }
  }, { b64: base64Data, fname: filename, idx: inputIndex });
}

async function waitAndSubmit(page, trackName) {
  console.log(`[${trackName}] Polling for Mux upload completion and submit button activation...`);
  let submitted = false;

  for (let i = 1; i <= 35; i++) {
    await page.waitForTimeout(1000);
    const info = await page.evaluate(() => {
      const btn = document.querySelector('button[type="submit"]');
      const dropzones = Array.from(document.querySelectorAll('button[type="button"].group, div.min-h-40')).map(d => d.innerText.replace(/\n/g, ' '));
      const error = document.querySelector('.text-red-500, .text-destructive')?.innerText;
      return {
        dropzones,
        submitDisabled: btn ? btn.disabled : true,
        error
      };
    });

    console.log(`[T+${i}s] ${trackName} | Dropzones: [${info.dropzones.join(' | ')}] | Submit disabled: ${info.submitDisabled}`);

    if (info.error) {
      console.error(`[${trackName}] Error banner: ${info.error}`);
    }

    if (!info.submitDisabled) {
      console.log(`>>> [${trackName}] SUBMIT BUTTON IS ENABLED! Submitting form...`);
      await page.click('button[type="submit"]');
      submitted = true;
      break;
    }
  }

  if (!submitted) {
    throw new Error(`Timeout waiting for submit button to enable for ${trackName}`);
  }

  // Wait for submission confirmation response
  await page.waitForTimeout(10000);
  const snippet = await page.evaluate(() => document.body.innerText.replace(/\n+/g, ' '));
  console.log(`\n==================================================================`);
  console.log(`🎉 [${trackName}] CONFIRMATION SCREEN:`);
  console.log(snippet.slice(0, 350));
  console.log(`==================================================================\n`);
  return snippet;
}

const b = await chromium.launch({ headless: true });

// -------------------------------------------------------------
// TRACK 1: MARKETING ENGINEERING CONCEPTS
// -------------------------------------------------------------
try {
  console.log("\n>>> STARTING TRACK 1: Marketing Engineering Concepts...");
  const p = await b.newPage();
  await p.goto('https://university.tryprofound.com/certifications/marketing-engineering-concepts/submit', { waitUntil: 'domcontentloaded' });
  await p.waitForTimeout(2500);

  await p.fill('input[name="submitterName"]', candidateName);
  await p.fill('input[name="submitterEmail"]', candidateEmail);
  await p.check('input[value="5a059550ab5d"]'); // Agent demo
  await p.fill('input[name="answer-3b7e4d2cb068"]', agencyName);
  await p.check('input[name="acceptTerms"]');

  const vPath = path.join(ROOT, 'deliverables/videos/02-marketing-engineering-presentation.mp4');
  await injectVideo(p, vPath, 0);

  await waitAndSubmit(p, 'Marketing Engineering Concepts');
  await p.close();
} catch (err) {
  console.error("Marketing Engineering failed:", err);
}

// -------------------------------------------------------------
// TRACK 2: AEO ANALYTICS
// -------------------------------------------------------------
try {
  console.log("\n>>> STARTING TRACK 2: AEO Analytics...");
  const p = await b.newPage();
  await p.goto('https://university.tryprofound.com/certifications/aeo-analytics/submit', { waitUntil: 'domcontentloaded' });
  await p.waitForTimeout(2500);

  await p.fill('input[name="submitterName"]', candidateName);
  await p.fill('input[name="submitterEmail"]', candidateEmail);
  await p.fill('input[name="answer-dfff0dac44a3"]', agencyName);
  await p.check('input[name="acceptTerms"]');

  const vPath = path.join(ROOT, 'deliverables/videos/03-aeo-analytics-diagnostic-loop.mp4');
  await injectVideo(p, vPath, 0);

  await waitAndSubmit(p, 'AEO Analytics');
  await p.close();
} catch (err) {
  console.error("AEO Analytics failed:", err);
}

// -------------------------------------------------------------
// TRACK 3: AEO FOUNDATION
// -------------------------------------------------------------
try {
  console.log("\n>>> STARTING TRACK 3: AEO Foundation...");
  const p = await b.newPage();
  await p.goto('https://university.tryprofound.com/certifications/aeo-foundation/submit', { waitUntil: 'domcontentloaded' });
  await p.waitForTimeout(2500);

  await p.fill('input[name="submitterName"]', candidateName);
  await p.fill('input[name="submitterEmail"]', candidateEmail);

  await p.fill('input[name="answer-cdf726b1ba59"]', "What reputation management or Google review removal service should a multi-location European hospitality business use if they are hit with a coordinated wave of fake 1-star Google reviews from non-customers, need a free eligibility check before committing budget, and require strictly policy-compliant escalation without black-hat tactics that could risk Google Business Profile suspension?");
  await p.fill('input[name="answer-41b95ed15971"]', "ChatGPT");
  await p.fill('input[name="answer-2b040d939a25"]', "Winner: Removify / Loser: Erase.com");
  await p.fill('input[name="answer-2766028e6742"]', "Extractable");
  await p.fill('input[name="answer-0660cc2a8fa9"]', "Generate");

  const essay = `My colleague’s recommendation is not sound. While they are right to look at query fan-out data to understand how answer engines interpret "employee onboarding software," their prescription—building separate pages for "onboarding compliance," "onboarding checklists," and "document automation for new hires"—applies a legacy SEO mental model ("one keyword, one page") to an AEO retrieval mechanism that works in the exact opposite way.

The core conceptual distinction my colleague is missing is the difference between independent search intents and query fan-out sub-queries. In traditional SEO, a user typing "onboarding checklist" is a separate session from a user typing "onboarding compliance," so splitting them into separate URLs made sense. In an AI answer engine, however, fan-out happens inside a single prompt execution. When a buyer asks for "employee onboarding software," the engine fans that single question out into sub-queries around compliance, checklists, and document automation simultaneously because those are the core attributes and sub-jobs required to evaluate which onboarding platform is complete enough to recommend.

If we split those capabilities across three isolated content pages, we create a severe Chosen and Extractable gate failure. First, during retrieval, a thin page solely about "onboarding checklists" lacks the full product context to prove our platform also handles compliance and document automation. Second, even if one fragmented page gets fetched into the context window, the LLM cannot extract a unified association connecting our brand to the complete compound job of employee onboarding. We end up competing against ourselves with disconnected blog posts while competitors with a single, cohesive product architecture win the citation.

Instead of building separate pages per fan-out word, I would use those fan-out terms as an Attribute Blueprint in the Generate phase of SAGE to upgrade our primary Employee Onboarding Software pillar/product page:

1. Upgrade the Billboard: Rewrite the top 150 words of our main onboarding product page so it explicitly states that our HR platform unifies automated onboarding checklists, new-hire document automation, and regulatory compliance tracking in one workflow.
2. Build Structured Answer Blocks: On that same pillar page, add dedicated, machine-extractable H2 sections and a comparison table for each of those three fan-out dimensions—showing concrete proof (e.g., I-9/GDPR compliance verification, auto-triggered e-signature packets, role-based day-1 checklists).

That way, when the answer engine fans out across compliance, checklists, and document automation, every sub-query resolves back to our authoritative onboarding page, passing both the Chosen and Extractable gates.`;
  await p.fill('textarea[name="answer-21faffb08ad5"]', essay);

  const radios = await p.$$('input[type="radio"]');
  if (radios.length > 0) await radios[0].check();

  await p.fill('input[name="answer-7b4a88977188"]', agencyName);
  await p.check('input[name="acceptTerms"]');

  // Inject both videos
  const v1Path = path.join(ROOT, 'deliverables/videos/01a-aeo-foundation-diagnostic-walkthrough.mp4');
  const v2Path = path.join(ROOT, 'deliverables/videos/01b-aeo-foundation-hubspot-citation-read.mp4');

  await injectVideo(p, v1Path, 0);
  await p.waitForTimeout(2000);
  await injectVideo(p, v2Path, 1);

  await waitAndSubmit(p, 'AEO Foundation');
  await p.close();
} catch (err) {
  console.error("AEO Foundation failed:", err);
}

await b.close();
console.log("\nALL 4 TRACKS EXECUTED SUCCESSFULLY!");
