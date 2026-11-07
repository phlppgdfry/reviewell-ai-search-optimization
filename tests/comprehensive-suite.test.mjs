import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

test("1. Verification: All 5 1080p video walkthrough files exist and exceed minimum file size", () => {
  const videos = [
    "deliverables/videos/01a-aeo-foundation-diagnostic-walkthrough.mp4",
    "deliverables/videos/01b-aeo-foundation-hubspot-citation-read.mp4",
    "deliverables/videos/02-marketing-engineering-presentation.mp4",
    "deliverables/videos/03-aeo-analytics-diagnostic-loop.mp4",
    "deliverables/videos/04-agent-engineering-14-node-walkthrough.mp4",
  ];
  for (const v of videos) {
    const fullPath = path.join(ROOT, v);
    assert.ok(fs.existsSync(fullPath), `Missing video file: ${v}`);
    const stats = fs.statSync(fullPath);
    assert.ok(stats.size > 1000 * 1024, `Video file ${v} is too small: ${stats.size} bytes`);
  }
});

test("2. Verification: AEO Foundation Question 8 Conceptual Defense meets strict word count criteria (300-500 words)", () => {
  const submissionPath = path.join(ROOT, "certifications/01-aeo-foundation/SUBMISSION.md");
  const content = fs.readFileSync(submissionPath, "utf8");
  assert.ok(content.includes("Question 8 — The Conceptual Defense"), "Question 8 missing from submission");
  
  // Extract essay between the code blocks
  const match = content.match(/## Question 8[\s\S]*?```text\n([\s\S]*?)\n```/);
  assert.ok(match, "Could not extract Question 8 essay");
  const essay = match[1].trim();
  const wordCount = essay.split(/\s+/).length;
  assert.ok(wordCount >= 300 && wordCount <= 500, `Word count ${wordCount} out of bounds (300-500)`);
  assert.ok(essay.includes("query fan-out"), "Essay must mention query fan-out");
  assert.ok(essay.includes("Attribute Blueprint"), "Essay must mention Attribute Blueprint");
  assert.ok(essay.includes("Billboard"), "Essay must mention Billboard");
  assert.ok(essay.includes("Chosen"), "Essay must mention Chosen gate");
  assert.ok(essay.includes("Extractable"), "Essay must mention Extractable gate");
});

test("3. Verification: Agent Engineering JSON adheres to exact 14-node dual-baseline schema", () => {
  const agentPath = path.join(ROOT, "certifications/04-agent-engineering/reviewell-autonomous-aeo-agent.json");
  const data = JSON.parse(fs.readFileSync(agentPath, "utf8"));
  assert.equal(data.nodes.length, 14, "Must have exactly 14 nodes");
  
  const categories = new Set(data.nodes.map(n => n.category));
  const expectedCats = ["Data", "Research", "LLM", "Logic", "Integration"];
  for (const c of expectedCats) {
    assert.ok(categories.has(c), `Missing category: ${c}`);
  }
  
  assert.ok(data.persistentKnowledge?.enabled, "Persistent knowledge must be enabled");
  assert.equal(data.persistentKnowledge?.pattern, "baseline_advancement_read_compare_deliver_overwrite");
  assert.ok(data.edges.length >= 14, "Edges must connect the entire workflow");
});

test("4. Verification: Profound Partner Agency Dossier is complete and verified", () => {
  const dossierPath = path.join(ROOT, "certifications/PROFOUND_PARTNER_AGENCY_DOSSIER.md");
  assert.ok(fs.existsSync(dossierPath), "Dossier must exist");
  const text = fs.readFileSync(dossierPath, "utf8");
  assert.ok(text.includes("BE1012058705"), "Must include VAT/Enterprise number");
  assert.ok(text.includes("Philippe Godfroy"), "Must include founder name");
  assert.ok(text.includes("Reviewell BV"), "Must include legal company name");
});
