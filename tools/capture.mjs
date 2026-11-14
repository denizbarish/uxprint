#!/usr/bin/env node
// Captures a website with Craft Anything (one MCP session) into captures/<slug>/.
// Usage: node tools/capture.mjs <slug> <url> [more urls of the same site...]
// Runs in deep mode, so the capture may read the page's source as well as its rendering.
// The raw capture stays local (captures/ is gitignored); prints are written from it.
import { spawn } from "node:child_process";
import { existsSync, mkdirSync, renameSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { pageNames, requireSlug } from "./lib.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const cli = process.env.CRAFT_ANYTHING_CLI ?? "craft-anything-cli";
const USAGE = "usage: node tools/capture.mjs <slug> <url> [url...]";
const [slugArg, ...urls] = process.argv.slice(2);
const slug = requireSlug(slugArg, USAGE);
if (urls.length === 0) {
  console.error(USAGE);
  process.exit(2);
}

const child = spawn(cli, ["--allow-run", "--deep", "mcp"], { stdio: ["pipe", "pipe", "inherit"] });
const pending = new Map();
let nextId = 1;
let buffer = "";
// A CLI that is missing or dies must fail the waiting requests, not leave them hanging.
const failPending = (reason) => {
  for (const waiter of pending.values()) waiter.reject(new Error(reason));
  pending.clear();
};
child.on("error", (error) => failPending(`could not run ${cli}: ${error.message}`));
child.on("exit", (code) => failPending(`${cli} exited (code ${code}) before answering`));
child.stdin.on("error", () => {});
child.stdout.on("data", (chunk) => {
  buffer += chunk;
  let newline;
  while ((newline = buffer.indexOf("\n")) >= 0) {
    const line = buffer.slice(0, newline).trim();
    buffer = buffer.slice(newline + 1);
    if (!line) continue;
    let message;
    try {
      message = JSON.parse(line);
    } catch {
      continue; // a log line on stdout, not a JSON-RPC message
    }
    const waiter = pending.get(message.id);
    if (!waiter) continue;
    pending.delete(message.id);
    if (message.error) waiter.reject(new Error(message.error.message));
    else waiter.resolve(message.result);
  }
});

function request(method, params) {
  const id = nextId++;
  child.stdin.write(JSON.stringify({ jsonrpc: "2.0", id, method, params }) + "\n");
  return new Promise((resolveRequest, reject) => pending.set(id, { resolve: resolveRequest, reject }));
}

async function tool(name, args) {
  const result = await request("tools/call", { name, arguments: args });
  const text = (result.content ?? []).map((part) => part.text ?? "").join("\n");
  if (result.isError) throw new Error(`${name}: ${text.slice(0, 500)}`);
  return text;
}

// Capture into a sibling folder and swap it in at the end, so a failed run keeps the previous capture.
const finalRoot = join(root, "captures", slug);
const outRoot = `${finalRoot}.tmp`;
rmSync(outRoot, { recursive: true, force: true });
mkdirSync(outRoot, { recursive: true });

try {
  await request("initialize", {
    protocolVersion: "2025-06-18",
    capabilities: {},
    clientInfo: { name: "uxprint-capture", version: "0.1.0" },
  });
  child.stdin.write(JSON.stringify({ jsonrpc: "2.0", method: "notifications/initialized" }) + "\n");

  const pages = [];
  const names = pageNames(urls);
  for (const [index, url] of urls.entries()) {
    const name = names[index];
    const dir = join(outRoot, name);
    // Heavily animated pages can outlast the full capture; the second attempt drops the noise pass and caps the height.
    const attempts = [
      { noise_pass: true, timeout_secs: 240 },
      { noise_pass: false, max_height: 8000, timeout_secs: 300 },
    ];
    let states = "skipped";
    let failure;
    for (const options of attempts) {
      rmSync(dir, { recursive: true, force: true });
      try {
        await tool("web_site_open", { url, settle_ms: 4000, timeout_secs: 120 });
        await tool("web_site_capture", { output_directory: dir, widths: [1440, 768, 390], ...options });
        try {
          await tool("web_page_states_capture", { output_directory: join(dir, "states"), max_states: 8, timeout_secs: 180 });
          states = "ok";
        } catch (error) {
          states = `failed: ${error.message.slice(0, 160)}`;
        }
        failure = undefined;
      } catch (error) {
        failure = error.message.slice(0, 200);
      }
      await tool("web_site_close", {}).catch(() => {});
      if (!failure) break;
    }
    const captured = !failure && existsSync(join(dir, "capture.json"));
    pages.push({ name, url, states, captured, ...(failure ? { failure } : {}) });
    console.log(`${slug}/${name}: capture=${captured} states=${states}${failure ? ` failure=${failure}` : ""}`);
  }
  if (!pages.some((page) => page.captured)) throw new Error("no page was captured");
  writeFileSync(join(outRoot, "pages.json"), JSON.stringify({ slug, capturedAt: new Date().toISOString(), pages }, null, 2));
  rmSync(finalRoot, { recursive: true, force: true });
  renameSync(outRoot, finalRoot);
} catch (error) {
  console.error(`capture failed: ${error.message}`);
  rmSync(outRoot, { recursive: true, force: true });
  process.exitCode = 1;
} finally {
  child.stdin.end();
  child.kill();
}
