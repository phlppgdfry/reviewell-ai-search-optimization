#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const ROOT = '/Users/philippegodfroy/reviewell-ai-search-optimization';
const strategyPath = path.join(ROOT, 'certifications/reviewell-profound-90credits-strategy.json');
const strategy = JSON.parse(fs.readFileSync(strategyPath, 'utf8'));

console.log("==================================================================");
console.log("🎯 REVIEWELL 100% FOCUS — 90 PROFOUND CREDITS ALLOCATION STRATEGY");
console.log(`Brand: ${strategy.client} (${strategy.domain})`);
console.log(`Total Credits: ${strategy.total_credits_allocated} | Focus: ${strategy.focus}`);
console.log("==================================================================\n");

console.log("📊 CREDIT BREAKDOWN:");
const breakdown = [
  {
    Tier: "Tier 1: Commercial High-Intent",
    Credits: strategy.credit_breakdown.tier_1_commercial_high_intent.credits,
    Prompts: strategy.credit_breakdown.tier_1_commercial_high_intent.prompts.length,
    Objective: "Capture in-market European business owners ready to hire dispute services"
  },
  {
    Tier: "Tier 2: Policy & Evidence Extraction",
    Credits: strategy.credit_breakdown.tier_2_policy_evidence_answer_engine.credits,
    Prompts: strategy.credit_breakdown.tier_2_policy_evidence_answer_engine.prompts.length,
    Objective: "Win AI citations via Policy 7400114 & Documentary Evidence Answer Blocks"
  },
  {
    Tier: "Tier 3: Competitor Displacement",
    Credits: strategy.credit_breakdown.tier_3_competitor_displacement.credits,
    Prompts: strategy.credit_breakdown.tier_3_competitor_displacement.prompts.length,
    Objective: "Displace Removify, Erase.com, and NetReputation in comparison answers"
  }
];
console.table(breakdown);

console.log("\n📋 TOP PROMPTS READY TO MONITOR ON PROFOUND PLATFORM:");
const allPrompts = [
  ...strategy.credit_breakdown.tier_1_commercial_high_intent.prompts.map(p => ({ Category: "Tier 1 (Commercial)", Prompt: p })),
  ...strategy.credit_breakdown.tier_2_policy_evidence_answer_engine.prompts.map(p => ({ Category: "Tier 2 (Policy/Evidence)", Prompt: p })),
  ...strategy.credit_breakdown.tier_3_competitor_displacement.prompts.map(p => ({ Category: "Tier 3 (Competitor)", Prompt: p }))
];
console.table(allPrompts.slice(0, 15));

// This command prints a proposal. It has no authenticated platform write path.
// Never turn a planned prompt count or credit budget into a measured baseline.
console.log(`\nProposed prompts: ${allPrompts.length}. No prompts were activated.`);
console.log('Credit amounts are planning limits, not verified per-prompt costs.');

console.log("\n==================================================================");
console.log("Local strategy preview only. No platform changes or credit spending performed.");
console.log("==================================================================");
