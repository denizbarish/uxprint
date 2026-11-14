#!/usr/bin/env node
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { parseArgs } from "node:util";
import { addPrintToProject } from "./add.js";
import { renderDesignMd } from "./design-md.js";
import { listSlugs, loadAllPrints, loadPrint, searchPrints } from "./library.js";
import { runMcpServer } from "./mcp.js";

const HELP = `uxprint: UI/UX prints of well-designed platforms, ready for AI coding agents.

Usage:
  uxprint list [query] [--json] List prints, optionally filtered ("dark dashboard")
  uxprint show <slug> [--json]  Print a print as DESIGN.md (or the full JSON record)
  uxprint add <slug>            Write DESIGN.md into the current project
      --dir <path>              Project folder (default: current folder)
      --force                   Replace an existing DESIGN.md
  uxprint validate              Check every print against the schema
  uxprint mcp                   Run the MCP server on stdin/stdout
`;

const { version } = JSON.parse(readFileSync(new URL("../package.json", import.meta.url), "utf8")) as { version: string };

async function main(): Promise<void> {
  const { positionals, values } = parseArgs({
    allowPositionals: true,
    options: {
      json: { type: "boolean", default: false },
      force: { type: "boolean", default: false },
      dir: { type: "string", default: "." },
      help: { type: "boolean", short: "h", default: false },
      version: { type: "boolean", short: "v", default: false },
    },
  });
  const [command, ...rest] = positionals;

  if (values.version) return void console.log(version);
  if (values.help || !command) return void console.log(HELP);

  switch (command) {
    case "list": {
      const all = loadAllPrints();
      const prints = rest.length ? searchPrints(all, rest.join(" ")) : all;
      if (values.json) return void console.log(JSON.stringify(prints.map(({ slug, name, category, theme, tags, summary }) => ({ slug, name, category, theme, tags, summary })), null, 2));
      for (const print of prints) console.log(`${print.slug.padEnd(16)} ${print.category.padEnd(15)} ${print.theme.padEnd(6)} ${print.summary}`);
      if (prints.length === 0) console.log("No prints match.");
      return;
    }
    case "show": {
      const print = loadPrint(requireSlug(rest));
      return void process.stdout.write(values.json ? JSON.stringify(print, null, 2) + "\n" : renderDesignMd(print));
    }
    case "add": {
      const result = addPrintToProject(loadPrint(requireSlug(rest)), resolve(values.dir), { force: values.force });
      console.log(`Wrote ${result.written}`);
      for (const file of result.linked) console.log(`Linked from ${file}`);
      if (result.hint) console.log(result.hint);
      return;
    }
    case "validate": {
      let failed = 0;
      for (const slug of listSlugs()) {
        try {
          loadPrint(slug);
          console.log(`ok    ${slug}`);
        } catch (error) {
          failed += 1;
          console.error(`FAIL  ${slug}\n${(error as Error).message}`);
        }
      }
      if (failed) process.exitCode = 1;
      return;
    }
    case "mcp":
      return runMcpServer(version);
    default:
      console.error(`Unknown command "${command}".\n\n${HELP}`);
      process.exitCode = 2;
  }
}

function requireSlug(rest: string[]): string {
  const slug = rest[0];
  if (!slug) throw new Error("Give a print slug. Run `uxprint list` to see them.");
  return slug;
}

main().catch((error: Error) => {
  console.error(error.message);
  process.exitCode = 1;
});
