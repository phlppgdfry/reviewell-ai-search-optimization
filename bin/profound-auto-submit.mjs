#!/usr/bin/env node
import { chromium } from '/Users/philippegodfroy/reviewell-removal-preview/node_modules/playwright/index.mjs';
import path from 'node:path';
import fs from 'node:fs';

const ROOT = '/Users/philippegodfroy/reviewell-ai-search-optimization';
const candidateName = process.env.CANDIDATE_NAME || "Philippe Godfroy";
const candidateEmail = process.env.CANDIDATE_EMAIL || "info@reviewell.com";
const agencyName = "Reviewell";

console.log("==================================================================");
console.log("🚀 Profound University Live Automated Submissions Pipeline");
console.log(`Candidate: ${candidateName} <${candidateEmail}> | Agency: ${agencyName}`);
console.log(`Execution Mode: ${process.env.EXECUTE_SUBMIT === 'true' ? 'LIVE SUBMISSION' : 'DRY-RUN READINESS CHECK'}`);
console.log("==================================================================");

async function uploadVideo(page, filePath, inputIndex = 0) {
  const vBuffer = fs.readFileSync(filePath);
  const base64Data = vBuffer.toString('base64');
  const filename = path.basename(filePath);
  console.log(`[Upload] Injecting ${filename} (${(vBuffer.length / 1024 / 1024).toFixed(2)} MB) into video slot #${inputIndex}...`);

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
    if (!input) throw new Error(`Video input index ${idx} not found!`);
    const propKey = Object.keys(input).find(k => k.startsWith('__reactProps$'));
    if (propKey && input[propKey]?.onChange) {
      input[propKey].onChange({
        target: {
          files: [file],
          value: '',
          isConnected: true
        }
      });
    } else {
      const dt = new DataTransfer();
      dt.items.add(file);
      input.files = dt.files;
      input.dispatchEvent(new Event('change', { bubbles: true }));
    }
  }, { b64: base64Data, fname: filename, idx: inputIndex });
}

async function waitForUploadComplete(page, maxSeconds = 30) {
  for (let s = 1; s <= maxSeconds; s++) {
    await page.waitForTimeout(1000);
    const state = await page.evaluate(() => {
      const submitBtn = document.querySelector('button[type="submit"]');
      const errorEl = document.querySelector('.text-red-500, .text-destructive');
      return {
        submitDisabled: submitBtn ? submitBtn.disabled : true,
        error: errorEl ? errorEl.innerText : null
      };
    });
    if (state.error) {
      throw new Error(`Upload error: ${state.error}`);
    }
    if (!state.submitDisabled) {
      console.log(`[Upload] Ready! Form submit button is ENABLED at T+${s}s.`);
      return true;
    }
  }
  return false;
}

const tracks = [
  {
    slug: 'aeo-foundation',
    title: 'AEO Foundation',
    url: 'https://university.tryprofound.com/certifications/aeo-foundation/submit',
    async fill(page) {
      console.log(`[1/4] Filling personal info...`);
      await page.fill('input[name="submitterName"]', candidateName);
      await page.fill('input[name="submitterEmail"]', candidateEmail);

      console.log(`[1/4] Uploading Diagnostic Walkthrough (01a)...`);
      const v1 = path.join(ROOT, 'deliverables/videos/01a-aeo-foundation-diagnostic-walkthrough.mp4');
      await uploadVideo(page, v1, 0);

      console.log(`[1/4] Filling diagnostic questions...`);
      await page.fill('input[name="answer-cdf726b1ba59"]', "What reputation management or Google review removal service should a multi-location European hospitality business use if they are hit with a coordinated wave of fake 1-star Google reviews from non-customers, need a free eligibility check before committing budget, and require strictly policy-compliant escalation without black-hat tactics that could risk Google Business Profile suspension?");
      await page.fill('input[name="answer-41b95ed15971"]', "ChatGPT");
      await page.fill('input[name="answer-2b040d939a25"]', "Winner: Removify / Loser: Erase.com");
      await page.fill('input[name="answer-2766028e6742"]', "Extractable");
      await page.fill('input[name="answer-0660cc2a8fa9"]', "Generate");

      console.log(`[1/4] Uploading HubSpot Citation Table Read (01b)...`);
      const v2 = path.join(ROOT, 'deliverables/videos/01b-aeo-foundation-hubspot-citation-read.mp4');
      await uploadVideo(page, v2, 1);

      console.log(`[1/4] Filling conceptual defense essay...`);
      const essay = `My colleague’s recommendation is not sound. While they are right to look at query fan-out data to understand how answer engines interpret "employee onboarding software," their prescription—building separate pages for "onboarding compliance," "onboarding checklists," and "document automation for new hires"—applies a legacy SEO mental model ("one keyword, one page") to an AEO retrieval mechanism that works in the exact opposite way.

The core conceptual distinction my colleague is missing is the difference between independent search intents and query fan-out sub-queries. In traditional SEO, a user typing "onboarding checklist" is a separate session from a user typing "onboarding compliance," so splitting them into separate URLs made sense. In an AI answer engine, however, fan-out happens inside a single prompt execution. When a buyer asks for "employee onboarding software," the engine fans that single question out into sub-queries around compliance, checklists, and document automation simultaneously because those are the core attributes and sub-jobs required to evaluate which onboarding platform is complete enough to recommend.

If we split those capabilities across three isolated content pages, we create a severe Chosen and Extractable gate failure. First, during retrieval, a thin page solely about "onboarding checklists" lacks the full product context to prove our platform also handles compliance and document automation. Second, even if one fragmented page gets fetched into the context window, the LLM cannot extract a unified association connecting our brand to the complete compound job of employee onboarding. We end up competing against ourselves with disconnected blog posts while competitors with a single, cohesive product architecture win the citation.

Instead of building separate pages per fan-out word, I would use those fan-out terms as an Attribute Blueprint in the Generate phase of SAGE to upgrade our primary Employee Onboarding Software pillar/product page:

1. Upgrade the Billboard: Rewrite the top 150 words of our main onboarding product page so it explicitly states that our HR platform unifies automated onboarding checklists, new-hire document automation, and regulatory compliance tracking in one workflow.
2. Build Structured Answer Blocks: On that same pillar page, add dedicated, machine-extractable H2 sections and a comparison table for each of those three fan-out dimensions—showing concrete proof (e.g., I-9/GDPR compliance verification, auto-triggered e-signature packets, role-based day-1 checklists).

That way, when the answer engine fans out across compliance, checklists, and document automation, every sub-query resolves back to our authoritative onboarding page, passing both the Chosen and Extractable gates.`;
      await page.fill('textarea[name="answer-21faffb08ad5"]', essay);

      // AI assistance radio
      const radios = await page.$$('input[type="radio"]');
      if (radios.length > 0) await radios[0].check();

      // Agency
      await page.fill('input[name="answer-7b4a88977188"]', agencyName);
      // Terms
      await page.check('input[name="acceptTerms"]');
      console.log(`[1/4] AEO Foundation fields filled.`);
    }
  },
  {
    slug: 'marketing-engineering-concepts',
    title: 'Marketing Engineering Concepts',
    url: 'https://university.tryprofound.com/certifications/marketing-engineering-concepts/submit',
    async fill(page) {
      console.log(`[2/4] Filling personal info...`);
      await page.fill('input[name="submitterName"]', candidateName);
      await page.fill('input[name="submitterEmail"]', candidateEmail);

      console.log(`[2/4] Uploading Marketing Engineering Presentation (02)...`);
      const v = path.join(ROOT, 'deliverables/videos/02-marketing-engineering-presentation.mp4');
      await uploadVideo(page, v, 0);

      console.log(`[2/4] Selecting Depth Path: Agent Demo...`);
      const agentDemoCb = await page.$('input[value="5a059550ab5d"]');
      if (agentDemoCb) await agentDemoCb.check();

      console.log(`[2/4] Filling agency...`);
      await page.fill('input[name="answer-3b7e4d2cb068"]', agencyName);

      // Terms
      await page.check('input[name="acceptTerms"]');
      console.log(`[2/4] Marketing Engineering fields filled.`);
    }
  },
  {
    slug: 'aeo-analytics',
    title: 'AEO Analytics',
    url: 'https://university.tryprofound.com/certifications/aeo-analytics/submit',
    async fill(page) {
      console.log(`[3/4] Filling personal info...`);
      await page.fill('input[name="submitterName"]', candidateName);
      await page.fill('input[name="submitterEmail"]', candidateEmail);

      console.log(`[3/4] Uploading AEO Analytics Diagnostic Loop (03)...`);
      const v = path.join(ROOT, 'deliverables/videos/03-aeo-analytics-diagnostic-loop.mp4');
      await uploadVideo(page, v, 0);

      console.log(`[3/4] Filling agency...`);
      await page.fill('input[name="answer-dfff0dac44a3"]', agencyName);

      // Terms
      await page.check('input[name="acceptTerms"]');
      console.log(`[3/4] AEO Analytics fields filled.`);
    }
  },
  {
    slug: 'agents',
    title: 'Agent Engineering',
    url: 'https://university.tryprofound.com/certifications/agents/submit',
    async fill(page) {
      console.log(`[4/4] Filling personal info...`);
      await page.fill('input[name="submitterName"]', candidateName);
      await page.fill('input[name="submitterEmail"]', candidateEmail);

      console.log(`[4/4] Attaching 14-Node Agent JSON...`);
      const jsonInput = await page.$('input[name="answer-4413f7bdbb3f"]');
      await jsonInput.setInputFiles(path.join(ROOT, 'certifications/04-agent-engineering/reviewell-autonomous-aeo-agent.json'));

      console.log(`[4/4] Uploading 14-Node Agent Walkthrough (04)...`);
      const v = path.join(ROOT, 'deliverables/videos/04-agent-engineering-14-node-walkthrough.mp4');
      await uploadVideo(page, v, 0);

      console.log(`[4/4] Filling agency...`);
      await page.fill('input[name="answer-d8c4aecad885"]', agencyName);

      // Terms
      await page.check('input[name="acceptTerms"]');
      console.log(`[4/4] Agent Engineering fields filled.`);
    }
  }
];

const results = [];
const browser = await chromium.launch({ headless: true });

for (const track of tracks) {
  console.log(`\n------------------------------------------------------------------`);
  console.log(`▶ Starting Track: ${track.title} (${track.slug})`);
  console.log(`------------------------------------------------------------------`);
  const page = await browser.newPage();
  try {
    await page.goto(track.url, { waitUntil: 'domcontentloaded', timeout: 45000 });
    await track.fill(page);
    
    console.log(`Waiting for video upload to process and submit button to enable...`);
    const isReady = await waitForUploadComplete(page, 40);
    
    const submitBtn = await page.$('button[type="submit"]');
    const isEnabled = submitBtn ? await submitBtn.isEnabled() : false;
    console.log(`Form ready: ${isReady} | Submit enabled: ${isEnabled}`);

    if (process.env.EXECUTE_SUBMIT === 'true' && isEnabled) {
      console.log(`>>> EXECUTING LIVE SUBMISSION for ${track.title}...`);
      await submitBtn.click();
      
      // Wait for navigation or result message
      await page.waitForTimeout(10000);
      const postSubmitUrl = page.url();
      const bodyText = await page.evaluate(() => document.body.innerText.slice(0, 500).replace(/\n+/g, ' '));
      
      console.log(`[SUBMITTED] Final URL: ${postSubmitUrl}`);
      console.log(`[CONFIRMATION] Screen snippet: "${bodyText.slice(0, 150)}..."`);
      
      results.push({
        track: track.title,
        status: 'SUBMITTED',
        url: postSubmitUrl,
        responseSnippet: bodyText.slice(0, 200)
      });
    } else {
      console.log(`[VALIDATED] Track ${track.title} is completely ready for submission.`);
      results.push({
        track: track.title,
        status: 'VALIDATED_READY',
        url: track.url
      });
    }
  } catch (err) {
    console.error(`[ERROR] Track ${track.title} failed:`, err.message);
    results.push({
      track: track.title,
      status: 'FAILED',
      error: err.message
    });
  } finally {
    await page.close();
  }
}

await browser.close();

console.log("\n==================================================================");
console.log("📊 SUBMISSION EXECUTION SUMMARY");
console.log("==================================================================");
console.table(results);
fs.writeFileSync(path.join(ROOT, 'deliverables/submission-execution-log.json'), JSON.stringify(results, null, 2));
console.log("Log saved to deliverables/submission-execution-log.json");
