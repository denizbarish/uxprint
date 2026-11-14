import { appendFileSync, existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { renderDesignMd } from "./design-md.js";
import type { Print } from "./schema.js";

const POINTER = "\n## Design\n\nRead `DESIGN.md` before any UI work and build every screen to it.\n";

export type AddResult = { written: string; linked: string[]; hint?: string };

/** Writes DESIGN.md into a project and points the project's agent instruction files at it. */
export function addPrintToProject(print: Print, projectDir: string, options: { force: boolean }): AddResult {
  const target = join(projectDir, "DESIGN.md");
  if (existsSync(target) && !options.force) {
    throw new Error(`${target} already exists. Pass --force to replace it.`);
  }
  writeFileSync(target, renderDesignMd(print));

  const linked: string[] = [];
  const agentFiles = ["AGENTS.md", "CLAUDE.md"].map((name) => join(projectDir, name)).filter((file) => existsSync(file));
  for (const file of agentFiles) {
    if (readFileSync(file, "utf8").includes("DESIGN.md")) continue;
    appendFileSync(file, POINTER);
    linked.push(file);
  }
  return {
    written: target,
    linked,
    hint: agentFiles.length === 0 ? "No AGENTS.md or CLAUDE.md here: tell your agent to read DESIGN.md before UI work." : undefined,
  };
}
