"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Renders a page at its natural width inside an iframe and scales it down to fit the container,
 * so a 1440px screen keeps its real layout in a narrow column.
 */
export function ScaledFrame({ src, width, height, title }: { src: string; width: number; height: number; title: string }) {
  const box = useRef<HTMLDivElement>(null);
  const [available, setAvailable] = useState<number | null>(null);

  // Syncs with an external system (element size). ResizeObserver has no React equivalent.
  useEffect(() => {
    const element = box.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) => {
      if (entry) setAvailable(entry.contentRect.width);
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const scale = available === null ? 1 : Math.min(1, available / width);
  return (
    <div ref={box} className="w-full">
      <div
        className="relative mx-auto overflow-hidden rounded-[10px] border border-line bg-sunken"
        style={{ width: width * scale, height: height * scale, visibility: available === null ? "hidden" : "visible" }}
      >
        <iframe
          src={src}
          title={title}
          loading="lazy"
          width={width}
          height={height}
          className="absolute top-0 left-0 origin-top-left border-0"
          style={{ transform: `scale(${scale})` }}
        />
      </div>
    </div>
  );
}
