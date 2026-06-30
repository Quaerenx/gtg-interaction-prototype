import { spawn } from "node:child_process";
import net from "node:net";
import path from "node:path";
import { setTimeout as delay } from "node:timers/promises";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const node = process.execPath;
const nextBin = path.join(root, "node_modules", "next", "dist", "bin", "next");
const playwrightBin = path.join(root, "node_modules", "@playwright", "test", "cli.js");
const playwrightArgs = process.argv.slice(2);

function canListen(port) {
  return new Promise((resolve) => {
    const probe = net.createServer();
    probe.once("error", () => resolve(false));
    probe.once("listening", () => {
      probe.close(() => resolve(true));
    });
    probe.listen(port, "127.0.0.1");
  });
}

async function findAvailablePort(startPort = 3000) {
  for (let port = startPort; port < startPort + 50; port += 1) {
    if (await canListen(port)) {
      return port;
    }
  }

  throw new Error(`No available localhost port found from ${startPort} to ${startPort + 49}`);
}

function spawnServer(port) {
  const server = spawn(node, [nextBin, "start", "-p", String(port), "-H", "127.0.0.1"], {
    cwd: root,
    env: { ...process.env, NODE_ENV: "production" },
    stdio: ["ignore", "pipe", "pipe"]
  });

  server.stdout.on("data", (chunk) => process.stdout.write(`[next] ${chunk}`));
  server.stderr.on("data", (chunk) => process.stderr.write(`[next] ${chunk}`));

  return server;
}

async function waitForServer(server, serverUrl) {
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

function runPlaywright(serverUrl) {
  return new Promise((resolve) => {
    const runner = spawn(node, [playwrightBin, "test", ...playwrightArgs], {
      cwd: root,
      env: { ...process.env, PLAYWRIGHT_BASE_URL: serverUrl },
      stdio: "inherit"
    });

    runner.on("exit", (code) => resolve(code ?? 1));
  });
}

const port = await findAvailablePort();
const serverUrl = `http://127.0.0.1:${port}`;
const server = spawnServer(port);

let exitCode;
try {
  await waitForServer(server, serverUrl);
  exitCode = await runPlaywright(serverUrl);
} finally {
  if (server.exitCode === null) {
    server.kill();
    await delay(500);
  }
}

process.exit(exitCode ?? 1);
