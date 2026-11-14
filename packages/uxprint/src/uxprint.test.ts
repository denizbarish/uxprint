import { existsSync, mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { addPrintToProject } from "./add.js";
import { renderDesignMd } from "./design-md.js";
import { listSlugs, loadAllPrints, loadPrint, searchPrints } from "./library.js";

describe("library", () => {
  it("loads every print in the repository against the schema", () => {
    expect(listSlugs().length).toBeGreaterThan(0);
    expect(() => loadAllPrints()).not.toThrow();
  });

  it("names the available prints when a slug is unknown or unsafe", () => {
    expect(() => loadPrint("nope")).toThrow(/Available: /);
    expect(() => loadPrint("../linear")).toThrow(/No print named/);
  });

  it("matches every word of a search across name, tags and theme", () => {
    const prints = loadAllPrints();
    expect(searchPrints(prints, "dark linear").map((print) => print.slug)).toContain("linear");
    expect(searchPrints(prints, "linear nonexistent-tag")).toEqual([]);
  });
});

describe("renderDesignMd", () => {
  const markdown = renderDesignMd(loadPrint("linear"));

  it("carries the measured sections an agent builds from", () => {
    for (const heading of ["## Principles", "## Color", "## Typography", "## Components", "## Motion", "## Flow: Log in", "## Libraries"]) {
      expect(markdown).toContain(heading);
    }
    expect(markdown).toContain("cubic-bezier(0.25, 0.46, 0.45, 0.94)");
    expect(markdown).toContain("@keyframes scale-in");
  });

  it("fills the line height column from the lineHeight field", () => {
    expect(markdown).toMatch(/\| display \| 64px \| 510 \| 1\.06 \| -0\.022em \|/);
  });
});

describe("addPrintToProject", () => {
  it("writes DESIGN.md, links agent files once and refuses to overwrite", () => {
    const dir = mkdtempSync(join(tmpdir(), "uxprint-"));
    writeFileSync(join(dir, "AGENTS.md"), "# Agents\n");
    const print = loadPrint("linear");

    const first = addPrintToProject(print, dir, { force: false });
    expect(existsSync(first.written)).toBe(true);
    expect(first.linked).toEqual([join(dir, "AGENTS.md")]);
    expect(readFileSync(join(dir, "AGENTS.md"), "utf8")).toContain("DESIGN.md");

    expect(() => addPrintToProject(print, dir, { force: false })).toThrow(/--force/);
    expect(addPrintToProject(print, dir, { force: true }).linked).toEqual([]);
  });

  it("gives a hint when the project has no agent instruction file", () => {
    const dir = mkdtempSync(join(tmpdir(), "uxprint-"));
    expect(addPrintToProject(loadPrint("linear"), dir, { force: false }).hint).toMatch(/DESIGN\.md/);
  });
});
