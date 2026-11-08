import { chromium } from '/Users/philippegodfroy/reviewell-removal-preview/node_modules/playwright/index.mjs';

const urls = [
  'https://university.tryprofound.com/certifications/aeo-foundation/submit',
  'https://university.tryprofound.com/certifications/marketing-engineering-concepts/submit',
  'https://university.tryprofound.com/certifications/aeo-analytics/submit',
  'https://university.tryprofound.com/certifications/agents/submit'
];

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();

for (const u of urls) {
  await page.goto(u, { waitUntil: 'domcontentloaded' });
  const fileInputs = await page.$$('input[type="file"]');
  const textInputs = await page.$$eval('input[type="text"], input[type="email"], textarea', els => els.map(e => ({ id: e.id, name: e.name })));
  console.log(`=== ${u.split('/').slice(-2, -1)[0]} ===`);
  console.log(`File inputs: ${fileInputs.length}`);
  console.log(`Text inputs: ${textInputs.length}`);
}

await browser.close();
