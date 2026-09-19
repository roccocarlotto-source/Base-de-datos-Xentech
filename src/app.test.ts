import assert from "node:assert/strict";
import { test } from "node:test";
import { createApp } from "./app";

test("GET /health responde ok", async () => {
  const app = createApp();
  const server = app.listen(0);
  const { port } = server.address() as { port: number };

  try {
    const res = await fetch(`http://127.0.0.1:${port}/health`);
    const body = (await res.json()) as { status: string };
    assert.equal(res.status, 200);
    assert.equal(body.status, "ok");
  } finally {
    server.close();
  }
});
