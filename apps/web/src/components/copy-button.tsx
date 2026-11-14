"use client";

import { useRef, useState } from "react";

/** Copies `value`; the label flips to `copiedLabel` for 1.6s and is announced politely. */
export function CopyButton({
  value,
  label,
  copiedLabel,
  className = "btn",
  srLabel,
}: {
  value: string;
  label: string;
  copiedLabel: string;
  className?: string;
  srLabel?: string;
}) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      return; // permission refused or insecure context: leave the label as it is
    }
    setCopied(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <button type="button" className={className} onClick={copy} aria-label={srLabel ? `${label}: ${srLabel}` : undefined}>
      <span aria-live="polite" className="inline-grid">
        {/* Both labels share one grid cell so the button never changes width. */}
        <span className={copied ? "invisible col-start-1 row-start-1" : "col-start-1 row-start-1"}>{label}</span>
        <span className={copied ? "col-start-1 row-start-1" : "invisible col-start-1 row-start-1"}>{copiedLabel}</span>
      </span>
    </button>
  );
}
