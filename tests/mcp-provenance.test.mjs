import test from 'node:test';
import assert from 'node:assert/strict';
import handler from '../api/mcp.js';

async function call(name, args = {}) {
  let response;
  const res = {
    setHeader() {},
    status() { return this; },
    json(value) { response = value; },
  };
  await handler({ method: 'POST', headers: {}, body: {
    jsonrpc: '2.0', id: 1, method: 'tools/call', params: { name, arguments: args },
  } }, res);
  assert.equal(response.error, undefined);
  return JSON.parse(response.result.content[0].text);
}

test('historical measurements disclose their provenance and unsupported brands have no data', async () => {
  const baseline = await call('get_reviewell_visibility');
  assert.equal(baseline.is_live, false);
  assert.equal(baseline.snapshot.ai_visibility_pct, 0);
  assert.equal(baseline.snapshot.scope.region, 'US');
  assert.equal(baseline.snapshot.window.end, '2026-11-08');
  assert.match(baseline.snapshot.source_url, /^https:\/\/platform\.tryprofound\.com\/documents\//);
  const missing = await call('get_reviewell_visibility', { brand: 'ringsizer-ios' });
  assert.equal(missing.data_mode, 'no_data');
  assert.equal(missing.snapshot, null);
});

test('unsupported live queries never return a fabricated citation leaderboard or audit score', async () => {
  const citations = await call('get_competitor_citations');
  assert.equal(citations.is_live, false);
  assert.deepEqual(citations.citation_leaderboard, []);
  const audit = await call('run_aeo_audit', { url: 'https://example.com' });
  assert.equal(audit.target, 'https://example.com');
  assert.equal(audit.audit_performed, false);
  assert.equal(audit.overall_score, null);
  assert.deepEqual(audit.checks, []);
});

test('simulation and generated content never claim execution, approval or guaranteed outcomes', async () => {
  const cycle = await call('simulate_profound_agent_cycle');
  assert.equal(cycle.status, 'NOT_EXECUTED');
  assert.equal(cycle.nodes_executed, 0);
  assert.equal(cycle.approval_status, 'NOT_REQUESTED');
  assert.equal(cycle.baseline_updated, false);
  assert.equal(cycle.published, false);
  const draft = await call('generate_aeo_billboard_patch', { service_name: 'Reviewell' });
  assert.equal(draft.requires_review, true);
  assert.equal(draft.published, false);
  assert.doesNotMatch(JSON.stringify(draft), /certified dispute specialists|without risk of|successful platform escalation/);
  assert.match(draft.answer_block, /missing transaction or customer record alone does not establish/);
});
