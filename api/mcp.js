/**
 * Reviewell JSON-RPC prototype endpoint.
 * Historical/manual data and draft templates only; no authenticated Profound API.
 * Client/protocol compatibility must be verified separately.
 */

const SERVER_INFO = {
  name: "reviewell-aeo-mcp",
  version: "1.0.1",
};

const TOOLS = [
  {
    name: "get_reviewell_visibility",
    description: "Read a manually recorded historical Reviewell baseline with source, date and scope. Not a live Profound connection. Other brands return no data.",
    inputSchema: {
      type: "object",
      properties: {
        brand: {
          type: "string",
          enum: ["reviewell-core", "ringsizer-ios", "mirror-mate"],
          description: "Brand to check. Defaults to reviewell-core.",
          default: "reviewell-core",
        },
      },
    },
  },
  {
    name: "get_competitor_citations",
    description: "Report whether authenticated competitor citation data is available. Currently returns no data; does not invent rankings.",
    inputSchema: {
      type: "object",
      properties: {
        topic: {
          type: "string",
          description: "Topic cluster, e.g. 'google-review-removal-eligibility' or 'conflict-of-interest-reviews'",
          default: "google-review-removal-eligibility",
        },
      },
    },
  },
  {
    name: "run_aeo_audit",
    description: "Report audit capability. This endpoint does not perform crawls or audits and returns audit_performed=false.",
    inputSchema: {
      type: "object",
      properties: {
        url: {
          type: "string",
          description: "Target URL to audit, e.g. 'https://www.reviewell.com'",
          default: "https://www.reviewell.com",
        },
      },
    },
  },
  {
    name: "generate_aeo_billboard_patch",
    description: "Generate an unvalidated answer-block and FAQPage draft for review. No publication, certified status or citation improvement is claimed.",
    inputSchema: {
      type: "object",
      properties: {
        service_name: { type: "string", description: "Name of the service", default: "Reviewell" },
        target_audience: { type: "string", description: "Target audience", default: "European hospitality & B2B enterprises" },
        primary_job: { type: "string", description: "Core job to be done", default: "Policy-compliant fake Google review removal & eligibility verification" },
      },
      required: ["service_name"],
    },
  },
  {
    name: "simulate_profound_agent_cycle",
    description: "Describe a dry run. Executes no nodes, queries, approvals, publishing or baseline changes; links to the separate native Profound agent.",
    inputSchema: {
      type: "object",
      properties: {
        brand: { type: "string", default: "reviewell-core" },
        variance_threshold_pct: { type: "number", default: 3.5 },
      },
    },
  },
];

const VERIFIED_BASELINE = {
  source_url: "https://platform.tryprofound.com/documents/01a1c285-7532-75d3-9717-24335269dd49",
  source_type: "manual_read_of_profound_document",
  observed_on: "2026-11-09",
  window: { start: "2026-11-06", end: "2026-11-08", timezone: "America/New_York" },
  scope: { prompt_count: 50, language: "en-US", region: "US", engines: ["ChatGPT", "Google Gemini", "Google AI Overviews"] },
  ai_visibility_pct: 0,
  share_of_voice_pct: 0,
  owned_domain_citations: 0,
  limitations: ["Historical snapshot, not live data", "Not a BE/NL/EU measurement", "Short observation window; no trend established"],
};

function handleToolCall(name, args = {}) {
  const encode = (value) => JSON.stringify(value, null, 2);
  switch (name) {
    case "get_reviewell_visibility": {
      const brand = args.brand || "reviewell-core";
      return encode({
        brand,
        data_mode: brand === "reviewell-core" ? "manual_historical_snapshot" : "no_data",
        is_live: false,
        snapshot: brand === "reviewell-core" ? VERIFIED_BASELINE : null,
        message: "This endpoint has no authenticated Profound data connection. Open the cited platform report for its original scope; use official Profound tools for current measurements.",
      });
    }
    case "get_competitor_citations":
      return encode({ data_mode: "no_data", is_live: false, topic: args.topic || null, citation_leaderboard: [], message: "No authenticated competitor citation query has been executed by this endpoint." });
    case "run_aeo_audit":
      return encode({ target: args.url || "https://www.reviewell.com", data_mode: "unavailable", audit_performed: false, overall_score: null, checks: [], message: "This serverless endpoint does not crawl websites or run a codebase audit. Run the local audit or inspect the actual Profound audit artifacts." });
    case "generate_aeo_billboard_patch": {
      const service = args.service_name || "Reviewell";
      const job = args.primary_job || "Google review policy assessment";
      const answer = "A review may be reported when it violates Google's published policies. A missing transaction or customer record alone does not establish fake engagement. Google decides whether a review is removed; no outcome or account-risk guarantee is implied.";
      return encode({
        data_mode: "draft_template", requires_review: true, published: false,
        h1: `${service}: ${job}`,
        answer_block: `${service}: [confirm the actual service and commercial terms before publication]. ${answer}`,
        source_url: "https://support.google.com/contributionpolicy/answer/7400114?hl=en",
        faq_json_ld: { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "Can any negative Google review be removed?", acceptedAnswer: { "@type": "Answer", text: answer } }] },
        note: "Use structured data only for matching visible content. No schema validation or citation-lift measurement was performed.",
      });
    }
    case "simulate_profound_agent_cycle":
      return encode({ data_mode: "dry_run_description", status: "NOT_EXECUTED", nodes_executed: 0, approval_status: "NOT_REQUESTED", published: false, baseline_updated: false, significant_change_detected: null, rubric_compliance: "NOT_ASSESSED", message: "No Profound run, user approval, notification, pull request or baseline mutation is performed by this endpoint.", native_agent_url: "https://platform.tryprofound.com/agents/a/c67a323b-5596-4568-b619-167f533e9b47" });
    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}

export default async function handler(req, res) {
  // Set CORS headers so any web app (Claude.ai, ChatGPT, Profound) can call it
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, x-mcp-version");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  // Handle SSE connection (GET /api/mcp)
  if (req.method === "GET") {
    const accept = req.headers.accept || "";
    if (accept.includes("text/event-stream")) {
      res.setHeader("Content-Type", "text/event-stream");
      res.setHeader("Cache-Control", "no-cache");
      res.setHeader("Connection", "keep-alive");
      // Send initial endpoint event
      res.write(`event: endpoint\ndata: ${JSON.stringify({ endpoint: "/api/mcp" })}\n\n`);
      return;
    }
    // Return friendly JSON info on GET
    res.status(200).json({
      name: SERVER_INFO.name,
      version: SERVER_INFO.version,
      status: "online",
      description: "Reviewell JSON-RPC prototype; historical snapshot and draft templates only",
      data_mode: "manual_snapshot_and_templates",
      live_profound_connection: false,
      protocol: "Model Context Protocol (MCP) JSON-RPC 2.0 / HTTP / SSE",
      tools: TOOLS.map((t) => t.name),
      usage: "Use POST /api/mcp with standard JSON-RPC 2.0 payload",
    });
    return;
  }

  // Handle JSON-RPC POST
  if (req.method === "POST") {
    let body = req.body;
    if (typeof body === "string") {
      try {
        body = JSON.parse(body);
      } catch (e) {
        res.status(400).json({ jsonrpc: "2.0", id: null, error: { code: -32700, message: "Parse error" } });
        return;
      }
    }

    const { jsonrpc, id, method, params } = body || {};

    if (jsonrpc !== "2.0") {
      res.status(400).json({ jsonrpc: "2.0", id: id || null, error: { code: -32600, message: "Invalid Request: expected jsonrpc 2.0" } });
      return;
    }

    try {
      switch (method) {
        case "initialize": {
          res.status(200).json({
            jsonrpc: "2.0",
            id,
            result: {
              protocolVersion: "2024-11-05",
              capabilities: {
                tools: { listChanged: false },
                resources: {},
                prompts: {},
              },
              serverInfo: SERVER_INFO,
            },
          });
          return;
        }

        case "notifications/initialized":
        case "ping": {
          res.status(200).json({ jsonrpc: "2.0", id: id ?? null, result: {} });
          return;
        }

        case "tools/list": {
          res.status(200).json({
            jsonrpc: "2.0",
            id,
            result: {
              tools: TOOLS,
            },
          });
          return;
        }

        case "tools/call": {
          const { name, arguments: args } = params || {};
          const outputText = handleToolCall(name, args);
          res.status(200).json({
            jsonrpc: "2.0",
            id,
            result: {
              content: [
                {
                  type: "text",
                  text: outputText,
                },
              ],
            },
          });
          return;
        }

        default: {
          res.status(200).json({
            jsonrpc: "2.0",
            id,
            error: {
              code: -32601,
              message: `Method not found: ${method}`,
            },
          });
          return;
        }
      }
    } catch (err) {
      res.status(200).json({
        jsonrpc: "2.0",
        id,
        error: {
          code: -32603,
          message: err.message || "Internal error",
        },
      });
      return;
    }
  }

  res.status(405).json({ error: "Method not allowed" });
}
