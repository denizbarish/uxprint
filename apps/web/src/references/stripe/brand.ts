import { useSyncExternalStore } from "react";

const noopSubscribe = () => () => {};

/**
 * `?brand=` swaps the product name client-side for the local pixel comparison (tools/compare.mjs).
 * Ignored on any other host, so a published screen can never be made to show a real product's name.
 */
export function useBrand(): string {
  return useSyncExternalStore(
    noopSubscribe,
    () =>
      (["localhost", "127.0.0.1"].includes(window.location.hostname)
        ? (new URLSearchParams(window.location.search).get("brand") ?? "")
        : ""
      )
        .replace(/[^\p{L}\p{N} .-]/gu, "")
        .slice(0, 32) || "Acme",
    () => "Acme",
  );
}

/** Replaces the placeholder name in neutral copy with the active brand. */
export function withBrand(text: string, brand: string): string {
  return brand === "Acme" ? text : text.replaceAll("Acme", brand);
}
