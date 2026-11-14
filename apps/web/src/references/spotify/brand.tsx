"use client";

import { useSyncExternalStore } from "react";

const noopSubscribe = () => () => {};

/**
 * `?brand=` swaps the product name client-side for the local pixel comparison (tools/compare.mjs).
 * Ignored on any other host, so a published screen can never show a real product's name.
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

/** Our own mark: a disc with three stacked bars cut out. Not the original logo. */
export function Mark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true" data-compare-mask="">
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M16 0a16 16 0 1 1 0 32a16 16 0 1 1 0-32ZM9 10.5h14v2.6H9zM10.5 15.2h11v2.4h-11zM12 19.8h8V22h-8z"
      />
    </svg>
  );
}
