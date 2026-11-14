import { existsSync, readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { printSchema, type Print } from "./schema.js";

/** The published package ships prints/ beside dist/; in the repository they live at the root. */
export function defaultPrintsDir(): string {
  const here = dirname(fileURLToPath(import.meta.url));
  const candidates = [join(here, "..", "prints"), join(here, "..", "..", "..", "prints")];
  const found = candidates.find((candidate) => existsSync(candidate));
  if (!found) throw new Error(`No prints folder found (looked in ${candidates.join(", ")})`);
  return found;
}

export function loadPrint(slug: string, dir = defaultPrintsDir()): Print {
  const file = join(dir, slug, "print.json");
  if (!/^[a-z0-9-]+$/.test(slug) || !existsSync(file)) {
    const known = listSlugs(dir).join(", ");
    throw new Error(`No print named "${slug}". Available: ${known}`);
  }
  const parsed = printSchema.safeParse(JSON.parse(readFileSync(file, "utf8")));
  if (!parsed.success) throw new Error(`${file} is not a valid print:\n${formatIssues(parsed.error.issues)}`);
  if (parsed.data.slug !== slug) throw new Error(`${file}: slug "${parsed.data.slug}" does not match its folder "${slug}"`);
  return parsed.data;
}

export function listSlugs(dir = defaultPrintsDir()): string[] {
  return readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && existsSync(join(dir, entry.name, "print.json")))
    .map((entry) => entry.name)
    .sort();
}

export function loadAllPrints(dir = defaultPrintsDir()): Print[] {
  return listSlugs(dir).map((slug) => loadPrint(slug, dir));
}

/** Case-insensitive match on name, slug, category, tags and summary; every word must match. */
export function searchPrints(prints: Print[], query: string): Print[] {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  return prints.filter((print) => {
    const haystack = [print.name, print.slug, print.category, print.theme, print.summary, ...print.tags].join(" ").toLowerCase();
    return words.every((word) => haystack.includes(word));
  });
}

function formatIssues(issues: { path: PropertyKey[]; message: string }[]): string {
  return issues.map((issue) => `  ${issue.path.join(".") || "(root)"}: ${issue.message}`).join("\n");
}
