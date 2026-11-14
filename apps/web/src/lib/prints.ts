import { join } from "node:path";
import { loadAllPrints, loadPrint, renderDesignMd, type Print } from "uxprint";

/** Prints live at the repository root; `next build` runs with apps/web as the working directory. */
const PRINTS_DIR = join(process.cwd(), "..", "..", "prints");

export function getAllPrints(): Print[] {
  return loadAllPrints(PRINTS_DIR);
}

export function getPrint(slug: string): Print {
  return loadPrint(slug, PRINTS_DIR);
}

export function getDesignMd(print: Print): string {
  return renderDesignMd(print);
}
