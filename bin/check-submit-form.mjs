import { execSync } from 'node:child_process';

// Use local installed node_modules or curl
console.log("Checking reviewell-removal-preview node_modules playwright...");
try {
  const p = await import('/Users/philippegodfroy/reviewell-removal-preview/node_modules/playwright/index.mjs');
  console.log("Found playwright in reviewell-removal-preview!");
  const browser = await p.chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://university.tryprofound.com/certifications/aeo-foundation/submit', { waitUntil: 'domcontentloaded' });
  console.log("Title:", await page.title());
  
  // Inspect input fields
  const fields = await page.$$eval('input, textarea', els => els.map(el => ({
    name: el.name,
    type: el.type,
    id: el.id,
    placeholder: el.placeholder
  })));
  console.log("Form fields:", JSON.stringify(fields, null, 2));
  
  await browser.close();
} catch (e) {
  console.log("Error:", e.message);
}
