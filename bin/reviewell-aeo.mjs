#!/usr/bin/env node
/**
 * Reviewell AI Visibility & Growth Intelligence Platform CLI & Dashboard Server
 */
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createReviewellProfoundClient } from "../src/profound-sdk.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const cmd = process.argv[2] || "summary";
const client = await createReviewellProfoundClient();

if (cmd === "dashboard") {
  const port = Number(process.env.PORT || 4321);
  const server = http.createServer(async (req, res) => {
    const url = new URL(req.url || "/", `http://localhost:${port}`);
    if (url.pathname === "/api/overview") {
      const [status, coreVis, ringVis, audit, validation, agentRun] = await Promise.all([
        client.getStatus(),
        client.getVisibilityReport("reviewell-core"),
        client.getVisibilityReport("reviewell-ringsizer"),
        client.auditTarget("/Users/philippegodfroy/reviewell-removal-preview"),
        client.validateAgent(path.join(ROOT, "certifications/04-agent-engineering/reviewell-autonomous-aeo-agent.json")),
        client.runAgent("reviewell-core"),
      ]);
      const agentSpec = JSON.parse(
        fs.readFileSync(path.join(ROOT, "certifications/04-agent-engineering/reviewell-autonomous-aeo-agent.json"), "utf-8")
      );
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ status, coreVis, ringVis, audit, validation, agentRun, agentSpec }, null, 2));
      return;
    }
    const htmlPath = path.join(ROOT, "dashboard/index.html");
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end(fs.readFileSync(htmlPath, "utf-8"));
  });
  server.listen(port, () => {
    console.log(`🚀 Reviewell AI Visibility & Profound Dashboard running at http://localhost:${port}`);
  });
} else {
  const status = await client.getStatus();
  const validation = await client.validateAgent(
    path.join(ROOT, "certifications/04-agent-engineering/reviewell-autonomous-aeo-agent.json")
  );
  console.log(JSON.stringify({ mode: client.mode, status, agentValidation: validation }, null, 2));
}
