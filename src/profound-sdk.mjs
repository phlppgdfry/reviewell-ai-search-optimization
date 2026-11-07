/**
 * Reviewell Profound SDK Integration (`src/profound-sdk.mjs`)
 * Wraps the official `@profoundai/client` TypeScript/JS SDK with automatic fallback
 * to the local `profound` CLI & Reviewell benchmark engine when running without an Enterprise key.
 */
import { execFileSync } from "node:child_process";

export async function createReviewellProfoundClient(options = {}) {
  const apiKey = options.apiKey || process.env.PROFOUND_API_KEY;
  const accessToken = options.accessToken || process.env.PROFOUND_ACCESS_TOKEN;

  let sdkClient = null;
  try {
    const mod = await import("@profoundai/client");
    const Profound = mod.default || mod.Profound;
    if (Profound && (apiKey || accessToken)) {
      sdkClient = new Profound({
        apiKey,
        accessToken,
        environment: options.environment || "production",
      });
    }
  } catch {
    // Fallback to CLI bridge if SDK not yet linked
  }

  function runCliJson(args) {
    const out = execFileSync("/Users/philippegodfroy/.local/bin/profound", [...args, "--json"], {
      encoding: "utf-8",
    });
    return JSON.parse(out);
  }

  return {
    mode: sdkClient ? "live_profound_sdk" : "reviewell_hybrid_benchmark",
    sdkClient,
    async getStatus() {
      return runCliJson(["status"]);
    },
    async listCategories() {
      if (sdkClient?.organizations?.categories?.list) {
        try {
          return await sdkClient.organizations.categories.list();
        } catch {
          // fallback
        }
      }
      return runCliJson(["org", "categories"]);
    },
    async getVisibilityReport(category = "reviewell-core") {
      return runCliJson(["reports", "visibility", "--category", category]);
    },
    async getCitationsReport(category = "reviewell-core") {
      return runCliJson(["reports", "citations", "--category", category]);
    },
    async auditTarget(target = "/Users/philippegodfroy/reviewell-removal-preview") {
      return runCliJson(["audit", target]);
    },
    async validateAgent(agentJsonPath) {
      const args = ["agent", "validate"];
      if (agentJsonPath) args.push(agentJsonPath);
      return runCliJson(args);
    },
    async runAgent(brand = "reviewell-core") {
      return runCliJson(["agent", "run", "--brand", brand]);
    },
  };
}
