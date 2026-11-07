import test from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import { createReviewellProfoundClient } from "../src/profound-sdk.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

test("Profound CLI & MCP integration status is configured across agents", async () => {
  const client = await createReviewellProfoundClient();
  const status = await client.getStatus();
  assert.equal(status.shared_agent_tools_registered, true);
  assert.equal(status.cursor_mcp_configured, true);
  assert.equal(status.shared_skills["profound-aeo"], true);
  assert.equal(status.shared_skills["profound-certifications"], true);
});

test("Reviewell Visibility & Citation reports track all 6 distinct KPIs", async () => {
  const client = await createReviewellProfoundClient();
  const report = await client.getVisibilityReport("reviewell-core");
  const expectedKpis = [
    "ai_visibility_score",
    "share_of_voice",
    "citation_share",
    "referral_traffic",
    "conversion_rate",
    "qualified_recommendations",
  ];
  for (const key of expectedKpis) {
    assert.ok(report.kpis[key], `Missing KPI: ${key}`);
  }
  assert.equal(report.by_engine.length, 5);
});

test("Profound Agent Engineering JSON passes all 8 official rubric requirements (14 nodes across 5 categories)", async () => {
  const client = await createReviewellProfoundClient();
  const agentJson = path.join(ROOT, "certifications/04-agent-engineering/reviewell-autonomous-aeo-agent.json");
  const validation = await client.validateAgent(agentJson);
  assert.equal(validation.valid, true);
  assert.equal(validation.passed_count, 8);
  assert.ok(validation.node_count >= 12);
  assert.deepEqual(validation.categories, ["Data", "Integration", "LLM", "Logic", "Research"]);
});

test("All 4 Profound University Certification tracks and Reviewell AEO Patch deliverables exist", () => {
  const requiredFiles = [
    "certifications/01-aeo-foundation/SUBMISSION.md",
    "certifications/02-marketing-engineering/SUBMISSION.md",
    "certifications/03-aeo-analytics/SUBMISSION.md",
    "certifications/04-agent-engineering/SUBMISSION.md",
    "certifications/04-agent-engineering/reviewell-autonomous-aeo-agent.json",
    "deliverables/reviewell-aeo-patch/public/llms.txt",
    "deliverables/reviewell-aeo-patch/public/llms-full.txt",
    "deliverables/reviewell-aeo-patch/public/robots.txt",
    "deliverables/reviewell-aeo-patch/components/ReviewellAeoSchema.tsx",
  ];
  for (const rel of requiredFiles) {
    assert.equal(fs.existsSync(path.join(ROOT, rel)), true, `Missing deliverable: ${rel}`);
  }
});
