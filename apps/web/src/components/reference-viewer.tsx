"use client";

import { useEffect, useRef, useState } from "react";
import { ScaledFrame } from "./scaled-frame";

const widths = [
  { key: "desktop", width: 1440 },
  { key: "tablet", width: 768 },
  { key: "phone", width: 390 },
] as const;

type WidthKey = (typeof widths)[number]["key"];
type Mode = "live" | "side" | "overlay";

export type ViewerScreen = {
  id: string;
  title: string;
  /** The platform's own page, opened in a new tab. Its site refuses to be framed, so it cannot be embedded. */
  url?: string;
  /** True when the original is a full page rather than one viewport. */
  fullPage: boolean;
  /** Share of matching pixels against the original, in percent. */
  scores?: { desktop?: number; phone?: number };
};

type Labels = {
  screen: string;
  width: string;
  desktop: string;
  tablet: string;
  phone: string;
  openFull: string;
  mode: string;
  live: string;
  side: string;
  overlay: string;
  ours: string;
  original: string;
  similarity: string;
  openOriginal: string;
  overlayPosition: string;
};

const segment = "flex h-full items-center rounded-[4px] px-2.5 text-[13px] font-medium text-fg-3 hover:text-fg aria-pressed:bg-sunken aria-pressed:text-fg";

export function ReferenceViewer({ slug, locale, screens, labels }: { slug: string; locale: string; screens: ViewerScreen[]; labels: Labels }) {
  const [screenId, setScreenId] = useState(screens[0]?.id ?? "");
  const [widthKey, setWidthKey] = useState<WidthKey>("desktop");
  const [mode, setMode] = useState<Mode>("live");
  // Originals exist only in a local build (public/_originals is not published); which ones loaded is found by trying.
  const [loaded, setLoaded] = useState<Record<string, boolean>>({});

  const current = screens.find((screen) => screen.id === screenId);
  const src = `/ref/${slug}/${screenId}/`;
  // The original was shot at desktop and phone widths only.
  const compareKey = widthKey === "phone" ? "phone" : "desktop";
  const originalSrc = `/_originals/${slug}/${screenId}-${compareKey}.jpg`;
  const hasOriginal = loaded[originalSrc] === true;
  const activeMode = hasOriginal && widthKey !== "tablet" ? mode : "live";
  const width = widths.find((entry) => entry.key === widthKey)?.width ?? 1440;
  const score = widthKey === "tablet" ? undefined : current?.scores?.[compareKey];

  // Syncs with an external resource: whether the original image is served.
  useEffect(() => {
    // Only a local build can have them; elsewhere the request would just log a 404.
    if (!["localhost", "127.0.0.1"].includes(window.location.hostname)) return;
    let cancelled = false;
    const probe = new Image();
    probe.onload = () => !cancelled && setLoaded((state) => ({ ...state, [originalSrc]: true }));
    probe.onerror = () => !cancelled && setLoaded((state) => ({ ...state, [originalSrc]: false }));
    probe.src = originalSrc;
    return () => {
      cancelled = true;
    };
  }, [originalSrc]);

  return (
    <div className="flex flex-col gap-3">
      <div role="group" aria-label={labels.screen} className="flex flex-wrap gap-1.5">
        {screens.map((screen) => (
          <button key={screen.id} type="button" className="chip" aria-pressed={screen.id === screenId} onClick={() => setScreenId(screen.id)}>
            {screen.title}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <div role="group" aria-label={labels.width} className="flex h-8 items-center rounded-md border border-line bg-surface p-0.5">
          {widths.map((entry) => (
            <button key={entry.key} type="button" aria-pressed={entry.key === widthKey} onClick={() => setWidthKey(entry.key)} className={segment}>
              {labels[entry.key]}
              <span className="ml-1.5 hidden font-mono text-[11px] text-fg-3 sm:inline">{entry.width}</span>
            </button>
          ))}
        </div>
        {hasOriginal && widthKey !== "tablet" ? (
          <div role="group" aria-label={labels.mode} className="flex h-8 items-center rounded-md border border-line bg-surface p-0.5">
            {(["live", "side", "overlay"] as const).map((key) => (
              <button key={key} type="button" aria-pressed={key === activeMode} onClick={() => setMode(key)} className={segment}>
                {labels[key]}
              </button>
            ))}
          </div>
        ) : null}
        {score !== undefined ? (
          <span className="flex h-8 items-center gap-1.5 rounded-md border border-line bg-surface px-2.5 text-[13px] text-fg-2">
            {labels.similarity}
            <span className="font-mono text-fg">{new Intl.NumberFormat(locale, { style: "percent", maximumFractionDigits: 1 }).format(score / 100)}</span>
          </span>
        ) : null}
        <span className="ml-auto flex items-center gap-2">
          {current?.url ? (
            <a className="btn" href={current.url} target="_blank" rel="noreferrer noopener">
              {labels.openOriginal}
            </a>
          ) : null}
          <a className="btn" href={src} target="_blank" rel="noreferrer">
            {labels.openFull}
          </a>
        </span>
      </div>
      {activeMode === "live" ? (
        <ScaledFrame key={`${src}-${width}`} src={src} width={width} height={900} title={current?.title ?? screenId} />
      ) : (
        <Compare
          key={`${src}-${width}-${activeMode}`}
          mode={activeMode}
          src={src}
          originalSrc={originalSrc}
          width={width}
          fullPage={current?.fullPage ?? false}
          title={current?.title ?? screenId}
          labels={labels}
        />
      )}
    </div>
  );
}

/**
 * Ours (live, in an iframe) against the original (a screenshot), at the same scale. Both are laid out at
 * their full height inside one scrolling box, so they scroll together without any syncing code.
 */
function Compare({
  mode,
  src,
  originalSrc,
  width,
  fullPage,
  title,
  labels,
}: {
  mode: "side" | "overlay";
  src: string;
  originalSrc: string;
  width: number;
  fullPage: boolean;
  title: string;
  labels: Labels;
}) {
  const box = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLIFrameElement>(null);
  const [available, setAvailable] = useState<number | null>(null);
  const [ours, setOurs] = useState(900);
  const [theirs, setTheirs] = useState(900);
  const [position, setPosition] = useState(50);

  // Syncs with an external system (element size).
  useEffect(() => {
    const element = box.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) => entry && setAvailable(entry.contentRect.width));
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  // Syncs with the framed document: a full page is shown at its own height, which settles after fonts and images load.
  useEffect(() => {
    const element = frame.current;
    if (!element || !fullPage) return;
    let observer: ResizeObserver | undefined;
    const measure = () => {
      const root = element.contentDocument?.documentElement;
      if (!root) return;
      observer?.disconnect();
      observer = new ResizeObserver(() => setOurs(Math.min(root.scrollHeight, 12000)));
      observer.observe(root);
      if (element.contentDocument?.body) observer.observe(element.contentDocument.body);
    };
    measure();
    element.addEventListener("load", measure);
    return () => {
      element.removeEventListener("load", measure);
      observer?.disconnect();
    };
  }, [fullPage]);

  const gap = 12;
  const columns = mode === "side" ? 2 : 1;
  // The scrolling box has a 1px border, and 12px of padding in side-by-side mode.
  const inner = (available ?? 0) - (mode === "side" ? 26 : 2);
  const scale = available === null ? 1 : Math.min(1, (inner - gap * (columns - 1)) / columns / width);
  const scaled = width * scale;
  const heading = "m-0 pb-2 text-[12px] font-medium text-fg-3";

  const oursFrame = (
    <div className="relative overflow-hidden bg-sunken" style={{ width: scaled, height: ours * scale }}>
      <iframe ref={frame} src={src} title={title} width={width} height={ours} className="absolute top-0 left-0 origin-top-left border-0" style={{ transform: `scale(${scale})` }} />
    </div>
  );
  const original = (
    // eslint-disable-next-line @next/next/no-img-element -- a local-only file outside the image pipeline
    <img
      src={originalSrc}
      alt={`${labels.original}: ${title}`}
      width={width}
      onLoad={(event) => setTheirs(event.currentTarget.naturalHeight)}
      className="block max-w-none"
      style={{ width: scaled, height: theirs * scale }}
    />
  );

  return (
    <div ref={box} className="w-full" style={{ visibility: available === null ? "hidden" : "visible" }}>
      {mode === "side" ? (
        <div className="max-h-[80vh] overflow-y-auto rounded-[10px] border border-line bg-surface p-3">
          <div className="mx-auto flex items-start" style={{ gap, width: scaled * 2 + gap }}>
            <div>
              <p className={heading}>{labels.ours}</p>
              {oursFrame}
            </div>
            <div>
              <p className={heading}>{labels.original}</p>
              {original}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <label className="mx-auto flex w-full max-w-[520px] items-center gap-3 text-[12px] font-medium text-fg-3">
            {labels.ours}
            <input
              type="range"
              min={0}
              max={100}
              value={position}
              onChange={(event) => setPosition(Number(event.target.value))}
              aria-label={labels.overlayPosition}
              className="h-8 min-w-0 flex-1 accent-(--fg)"
            />
            {labels.original}
          </label>
          <div className="max-h-[80vh] overflow-y-auto rounded-[10px] border border-line bg-surface">
            <div className="relative mx-auto" style={{ width: scaled }}>
              {oursFrame}
              {/* The original covers ours from the right edge up to the slider position. */}
              <div className="pointer-events-none absolute top-0 left-0" style={{ clipPath: `inset(0 0 0 ${position}%)` }}>
                {original}
              </div>
              <div aria-hidden="true" className="pointer-events-none absolute top-0 bottom-0 w-px bg-[#ff3b30]" style={{ left: `${position}%` }} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
