import { spawn } from "node:child_process";
import path from "node:path";
import { setTimeout as delay } from "node:timers/promises";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const node = process.execPath;
const nextBin = path.join(root, "node_modules", "next", "dist", "bin", "next");
const playwrightBin = path.join(root, "node_modules", "@playwright", "test", "cli.js");
const serverUrl = "http://127.0.0.1:3000";

function spawnServer() {
  const server = spawn(node, [nextBin, "start", "-p", "3000", "-H", "127.0.0.1"], {
    cwd: root,
    env: { ...process.env, NODE_ENV: "production" },
    stdio: ["ignore", "pipe", "pipe"]
  });

  server.stdout.on("data", (chunk) => process.stdout.write(`[next] ${chunk}`));
  server.stderr.on("data", (chunk) => process.stderr.write(`[next] ${chunk}`));

  return server;
}

async function waitForServer(server) {
  const startedAt = Date.now();

  while (Date.now() - startedAt < 60_000) {
    if (server.exitCode !== null) {
      throw new Error(`Next server exited before becoming ready with code ${server.exitCode}`);
    }

    try {
      const response = await fetch(serverUrl);
      if (response.ok) {
        return;
      }
    } catch {
      // Server is still starting.
    }

    await delay(400);
  }

  throw new Error("Timed out waiting for Next server");
}

function runPlaywright() {
  return new Promise((resolve) => {
    const runner = spawn(node, [playwrightBin, "test"], {
      cwd: root,
      env: process.env,
      stdio: "inherit"
    });

    runner.on("exit", (code) => resolve(code ?? 1));
  });
}

const server = spawnServer();

let exitCode;
try {
  await waitForServer(server);
  exitCode = await runPlaywright();
} finally {
  if (server.exitCode === null) {
    server.kill();
    await delay(500);
  }
}

process.exit(exitCode ?? 1);
