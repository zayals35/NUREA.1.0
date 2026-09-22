import test from "node:test";
import assert from "node:assert/strict";
import { deliverSubmission, type Payload } from "../src/lib/submitSkjema.ts";

type MockResponse = {
  ok: boolean;
  status: number;
  json: () => Promise<unknown>;
};

const payload: Payload = {
  website: "",
  contact: { bedrift: "Testbedrift AS", navn: "Test Person", epost: "test@example.com" },
  services: ["Nettsider"],
  sections: [{ title: "Om bedriften", questions: [{ text: "Hva gjør dere?", answer: "Tester" }] }],
  submissionId: "submission12",
};

function response(body: unknown, status = 200): MockResponse {
  return {
    ok: status >= 200 && status < 300,
    status,
    json: async () => body,
  };
}

function hangingFetch(_input: RequestInfo | URL, init?: RequestInit): Promise<never> {
  return new Promise((_, reject) => {
    const signal = init?.signal;
    if (!signal) return;
    signal.addEventListener("abort", () => reject(signal.reason), { once: true });
  });
}

test("both delivery channels succeed", async () => {
  let emailBody: Record<string, unknown> | undefined;
  const fetchMock = (async (input, init) => {
    if (String(input) === "/api/skjema") return response({ ok: true, path: "_inbox/file.md" });
    emailBody = JSON.parse(String(init?.body));
    return response({ success: true });
  }) as typeof fetch;
  const result = await deliverSubmission(payload, { fetch: fetchMock, timeoutMs: 50 });
  assert.deepEqual(result, { filed: true, filedPath: "_inbox/file.md", emailed: true, outcome: "ok" });
  assert.match(String(emailBody?.Arkivering), /_inbox\/file\.md/);
});

test("vault timeout still delivers email as partial", async () => {
  const fetchMock = (async (input, init) => {
    if (String(input) === "/api/skjema") return hangingFetch(input, init);
    return response({ success: true });
  }) as typeof fetch;
  const started = Date.now();
  const result = await deliverSubmission(payload, { fetch: fetchMock, timeoutMs: 50 });
  assert.equal(result.outcome, "partial");
  assert.equal(result.emailed, true);
  assert.equal(result.filed, false);
  assert.ok(Date.now() - started < 300);
});

test("email timeout leaves a successful vault delivery as partial", async () => {
  const fetchMock = (async (input, init) => {
    if (String(input) === "/api/skjema") return response({ ok: true, path: "_inbox/file.md" });
    return hangingFetch(input, init);
  }) as typeof fetch;
  const result = await deliverSubmission(payload, { fetch: fetchMock, timeoutMs: 50 });
  assert.equal(result.outcome, "partial");
  assert.equal(result.filed, true);
  assert.equal(result.emailed, false);
});

test("both channels timing out fails within two bounded windows", async () => {
  const started = Date.now();
  const result = await deliverSubmission(payload, { fetch: hangingFetch as typeof fetch, timeoutMs: 50 });
  assert.equal(result.outcome, "failed");
  assert.ok(Date.now() - started < 300);
});

test("vault failure and unsuccessful email fail", async () => {
  const fetchMock = (async (input) => {
    if (String(input) === "/api/skjema") return response({}, 500);
    return response({ success: false });
  }) as typeof fetch;
  const result = await deliverSubmission(payload, { fetch: fetchMock, timeoutMs: 50 });
  assert.equal(result.outcome, "failed");
});

test("vault fetch errors do not prevent the email attempt", async () => {
  const calls: string[] = [];
  const fetchMock = (async (input) => {
    calls.push(String(input));
    if (calls.length === 1) throw new Error("vault down");
    return response({ success: true });
  }) as typeof fetch;
  const result = await deliverSubmission(payload, { fetch: fetchMock, timeoutMs: 50 });
  assert.equal(result.outcome, "partial");
  assert.deepEqual(calls, ["/api/skjema", "https://api.web3forms.com/submit"]);
});

test("submissionId is sent to the vault endpoint", async () => {
  let sent: Record<string, unknown> | undefined;
  const fetchMock = (async (input, init) => {
    if (String(input) === "/api/skjema") sent = JSON.parse(String(init?.body));
    return response({ ok: true, path: "_inbox/file.md" });
  }) as typeof fetch;
  await deliverSubmission(payload, { fetch: fetchMock, timeoutMs: 50 });
  assert.equal(sent?.submissionId, "submission12");
});
