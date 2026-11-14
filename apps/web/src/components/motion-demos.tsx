"use client";

import { useState } from "react";
import { CopyButton } from "./copy-button";

const NAMED: Record<string, [number, number, number, number]> = {
  linear: [0, 0, 1, 1],
  ease: [0.25, 0.1, 0.25, 1],
  "ease-in": [0.42, 0, 1, 1],
  "ease-out": [0, 0, 0.58, 1],
  "ease-in-out": [0.42, 0, 0.58, 1],
};

function parseEasing(value: string): [number, number, number, number] | null {
  const named = NAMED[value.trim()];
  if (named) return named;
  const match = value.match(/cubic-bezier\(([^)]+)\)/);
  if (!match?.[1]) return null;
  const parts = match[1].split(",").map(Number);
  return parts.length === 4 && parts.every(Number.isFinite) ? (parts as [number, number, number, number]) : null;
}

/** Draws the curve, and on Play moves a dot along a track with the same timing function. */
export function EasingDemo({ name, value, playLabel }: { name: string; value: string; playLabel: string }) {
  const [moved, setMoved] = useState(false);
  const points = parseEasing(value);
  const W = 96;
  const H = 72;
  const pad = 8;
  const x = (t: number) => pad + t * (W - pad * 2);
  const y = (t: number) => H - pad - t * (H - pad * 2);

  return (
    <div className="flex items-center gap-4">
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`${name}: ${value}`} className="flex-none rounded-md border border-line bg-sunken">
        <line x1={x(0)} y1={y(0)} x2={x(1)} y2={y(1)} stroke="var(--line-strong)" strokeDasharray="2 3" />
        {points ? (
          <path
            d={`M${x(0)},${y(0)} C${x(points[0])},${y(points[1])} ${x(points[2])},${y(points[3])} ${x(1)},${y(1)}`}
            fill="none"
            stroke="var(--fg)"
            strokeWidth="1.75"
          />
        ) : null}
      </svg>
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <div className="relative h-6 rounded-full border border-line bg-sunken">
          <div className="absolute inset-0 [container-type:inline-size]" aria-hidden="true">
            <span
              className="absolute top-1/2 left-1 size-4 rounded-full bg-fg"
              style={{
                transform: `translate(${moved ? "calc(100cqw - 24px)" : "0px"}, -50%)`,
                transition: `transform 1s ${value}`,
              }}
            />
          </div>
        </div>
        <button type="button" className="btn self-start" onClick={() => setMoved(!moved)} aria-label={`${playLabel}: ${name}`}>
          {playLabel}
        </button>
      </div>
    </div>
  );
}

/** Injects the keyframe under a scoped name and replays it on demand; nothing runs on its own. */
export function KeyframeDemo({
  scope,
  name,
  css,
  timing,
  labels,
}: {
  scope: string;
  name: string;
  css: string;
  timing?: string;
  labels: { play: string; copyCss: string; copied: string };
}) {
  const [run, setRun] = useState(0);
  const scoped = `uxp-${scope}-${name}`;
  const injected = css.replace(/@keyframes\s+[\w-]+/, `@keyframes ${scoped}`);
  const shimmer = /background-position/.test(css);
  const duration = timing?.match(/\d+(\.\d+)?m?s/)?.[0] ?? "0.6s";

  return (
    <div className="flex flex-col gap-3">
      <style>{injected}</style>
      <div className="flex h-24 items-center justify-center overflow-hidden rounded-md border border-line bg-sunken">
        <div
          key={run}
          className="rounded-md border border-line-strong px-4 py-2 text-[13px] font-medium"
          style={{
            background: shimmer ? "linear-gradient(90deg, var(--surface) 25%, var(--line-strong) 50%, var(--surface) 75%) 0 0 / 200% 100%" : "var(--surface)",
            animation: run > 0 ? `${scoped} ${duration} cubic-bezier(0.25, 0.46, 0.45, 0.94) both` : "none",
            ["--anim-amount" as string]: "48px",
            ["--marquee-gap" as string]: "16px",
          }}
        >
          {name}
        </div>
      </div>
      <div className="flex gap-2">
        <button type="button" className="btn" onClick={() => setRun(run + 1)} aria-label={`${labels.play}: ${name}`}>
          {labels.play}
        </button>
        <CopyButton value={css} label={labels.copyCss} copiedLabel={labels.copied} srLabel={name} />
      </div>
    </div>
  );
}
