import test from "node:test";
import assert from "node:assert/strict";
import handler from "../api/skjema.ts";

type MockResponse = {
  ok: boolean;
  status: number;
  json: () => Promise<unknown>;
  text: () => Promise<string>;
};

const validBody = {
  contact: { bedrift: "Testbedrift AS", navn: "Test Person", epost: "test@example.com" },
  services: ["Nettsider"],
  sections: [{ title: "Om bedriften", questions: [{ text: "Hva gjør dere?", answer: "Tester" }] }],
};

function response(body: unknown, status = 200): MockResponse {
  return {
    ok: status >= 200 && status < 300,
    status,
    json: async () => body,
    text: async () => (typeof body === "string" ? body : JSON.stringify(body)),
  };
}

function createRes() {
  let statusCode = 200;
  let body: unknown;
  const headers: Record<string, string> = {};
  return {
    res: {
      status(code: number) {
        statusCode = code;
        return { json(value: unknown) { body = value; } };
      },
      setHeader(key: string, value: string) {
        headers[key] = value;
      },
    },
    get result() {
      return { statusCode, body, headers };
    },
  };
}

function request(body: unknown, ip: string, method = "POST") {
  return {
    method,
    body,
    headers: { "x-forwarded-for": ip },
  };
}

function setFetch(fetchImpl: typeof fetch) {
  const previous = globalThis.fetch;
  globalThis.fetch = fetchImpl;
  return () => {
    globalThis.fetch = previous;
  };
}

function hangingFetch(_input: RequestInfo | URL, init?: RequestInit): Promise<never> {
  return new Promise((_, reject) => {
    const signal = init?.signal;
    if (!signal) return;
    signal.addEventListener("abort", () => reject(signal.reason), { once: true });
  });
}

process.env.VAULT_GITHUB_TOKEN = "fake";

test("GET returns 405", async () => {
  const output = createRes();
  await handler(request(null, "api-get", "GET"), output.res);
  assert.equal(output.result.statusCode, 405);
});

test("honeypot returns success without calling fetch", async () => {
  let calls = 0;
  const restore = setFetch((async () => { calls += 1; return response({}); }) as typeof fetch);
  try {
    const output = createRes();
    await handler(request({ website: "bot", ...validBody }, "api-honeypot"), output.res);
    assert.equal(output.result.statusCode, 200);
    assert.deepEqual(output.result.body, { ok: true, filed: true });
    assert.equal(calls, 0);
  } finally {
    restore();
  }
});

test("invalid body returns 400", async () => {
  const output = createRes();
  await handler(request({ contact: {} }, "api-invalid"), output.res);
  assert.equal(output.result.statusCode, 400);
});

test("blank contact name or email fails server validation like the browser does", async () => {
  let calls = 0;
  const restore = setFetch((async () => { calls += 1; return response({}, 201); }) as typeof fetch);
  try {
    for (const contact of [
      { ...validBody.contact, navn: "   " },
      { ...validBody.contact, navn: "" },
      { ...validBody.contact, epost: " " },
    ]) {
      const output = createRes();
      await handler(request({ ...validBody, contact }, `api-blank-${calls}`), output.res);
      assert.equal(output.result.statusCode, 400);
    }
    assert.equal(calls, 0);
  } finally {
    restore();
  }
});

test("valid submission files markdown with an id and seconds in its path", async () => {
  let body = "";
  const restore = setFetch((async (_input, init) => {
    const sent = JSON.parse(String(init?.body)) as { content: string };
    body = Buffer.from(sent.content, "base64").toString("utf8");
    return response({}, 201);
  }) as typeof fetch);
  try {
    const output = createRes();
    await handler(request(validBody, "api-valid"), output.res);
    const result = output.result.body as { path: string };
    assert.equal(output.result.statusCode, 200);
    assert.match(result.path, /_inbox\/\d{4}-\d{2}-\d{2}-[a-z0-9-]+-[a-z0-9]{12}\.md$/);
    assert.match(body, /\nid: [a-z0-9]{12}\n/);
  } finally {
    restore();
  }
});

test("same-minute submissions receive different paths", async () => {
  const paths: string[] = [];
  const restore = setFetch((async (input) => {
    paths.push(String(input).split("/contents/")[1]);
    return response({}, 201);
  }) as typeof fetch);
  try {
    await handler(request(validBody, "api-collision-1"), createRes().res);
    await handler(request(validBody, "api-collision-2"), createRes().res);
    assert.equal(paths.length, 2);
    assert.notEqual(paths[0], paths[1]);
  } finally {
    restore();
  }
});

test("a retry with the same submissionId targets the same path", async () => {
  const paths: string[] = [];
  const restore = setFetch((async (input) => {
    paths.push(String(input).split("/contents/")[1]);
    return response({}, 201);
  }) as typeof fetch);
  try {
    const body = { ...validBody, submissionId: "retrysameid01" };
    await handler(request(body, "api-retry-1"), createRes().res);
    await handler(request(body, "api-retry-2"), createRes().res);
    assert.equal(paths.length, 2);
    assert.equal(paths[0], paths[1]);
  } finally {
    restore();
  }
});

test("GitHub timeout returns 504 within the bounded window", async () => {
  const previous = process.env.SKJEMA_UPSTREAM_TIMEOUT_MS;
  process.env.SKJEMA_UPSTREAM_TIMEOUT_MS = "50";
  const restore = setFetch(hangingFetch as typeof fetch);
  const started = Date.now();
  try {
    const output = createRes();
    await handler(request(validBody, "api-timeout"), output.res);
    assert.equal(output.result.statusCode, 504);
    assert.deepEqual(output.result.body, { ok: false, filed: false, error: "Vault timeout" });
    assert.ok(Date.now() - started < 500);
  } finally {
    restore();
    if (previous === undefined) delete process.env.SKJEMA_UPSTREAM_TIMEOUT_MS;
    else process.env.SKJEMA_UPSTREAM_TIMEOUT_MS = previous;
  }
});

test("GitHub 500 returns 502", async () => {
  const restore = setFetch((async () => response({ message: "upstream" }, 500)) as typeof fetch);
  try {
    const output = createRes();
    await handler(request(validBody, "api-500"), output.res);
    assert.equal(output.result.statusCode, 502);
  } finally {
    restore();
  }
});

test("GitHub sha collision is treated as an idempotent retry", async () => {
  const restore = setFetch((async () => response({ message: "file already exists, sha required" }, 422)) as typeof fetch);
  try {
    const output = createRes();
    await handler(request({ ...validBody, submissionId: "retryable123" }, "api-retry"), output.res);
    assert.equal(output.result.statusCode, 200);
    assert.equal((output.result.body as { retried: boolean }).retried, true);
  } finally {
    restore();
  }
});

test("invalid submissionId is replaced with a generated id", async () => {
  let url = "";
  const restore = setFetch((async (input) => { url = String(input); return response({}, 201); }) as typeof fetch);
  try {
    const output = createRes();
    await handler(request({ ...validBody, submissionId: "NOT_VALID!" }, "api-invalid-id"), output.res);
    assert.equal(output.result.statusCode, 200);
    assert.match(url, /-[a-z0-9]{12}\.md$/);
  } finally {
    restore();
  }
});
