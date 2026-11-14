#!/usr/bin/env node
// Refreshes the public sponsor list shown in the gallery: apps/web/src/data/sponsors.json.
// Usage: node tools/sponsors.mjs   (needs the GitHub CLI, signed in). Private sponsorships are not returned by this query.
import { execFileSync } from "node:child_process";
import { writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const query = `{ user(login: "denizbarish") { sponsors(first: 100) { nodes { ... on User { login name } ... on Organization { login name } } } } }`;
const reply = JSON.parse(execFileSync("gh", ["api", "graphql", "-f", `query=${query}`], { encoding: "utf8" }));
const sponsors = reply.data.user.sponsors.nodes.filter((node) => node?.login).map((node) => ({ login: node.login, name: node.name || node.login }));
writeFileSync(join(root, "apps/web/src/data/sponsors.json"), JSON.stringify(sponsors, null, 2) + "\n");
console.log(`${sponsors.length} sponsors`);
