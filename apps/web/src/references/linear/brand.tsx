"use client";

import { useSyncExternalStore } from "react";

export const noopSubscribe = () => () => {};

export function readParam(name: string): string | null {
  return new URLSearchParams(window.location.search).get(name);
}

/**
 * `?brand=` swaps the product name client-side for the local pixel comparison (tools/compare.mjs).
 * Ignored on any other host, so a published screen can never be made to show a real product's name.
 */
export function useBrand(): string {
  return useSyncExternalStore(
    noopSubscribe,
    () =>
      (["localhost", "127.0.0.1"].includes(window.location.hostname) ? (readParam("brand") ?? "") : "")
        .replace(/[^\p{L}\p{N} .-]/gu, "")
        .slice(0, 32) || "Acme",
    () => "Acme",
  );
}

/** Our own mark: a disc with an offset circular cut-out. Not the original logo. */
export function Mark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 42 42" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M21 0a21 21 0 1 1 0 42a21 21 0 1 1 0-42Zm6 9a8 8 0 1 0 0 16a8 8 0 1 0 0-16Z"
      />
    </svg>
  );
}
