"use client";

import { useState } from "react";
import { CopyButton } from "./copy-button";

type Library = { name: string; npm?: string; purpose: string; evidence?: string };

export function LibraryPicker({
  detected,
  recommended,
  labels,
}: {
  detected: Library[];
  recommended: Library[];
  labels: { detected: string; recommended: string; evidence: string; purpose: string; install: string; noneSelected: string; select: string; copy: string; copied: string };
}) {
  const [selected, setSelected] = useState<string[]>(() => recommended.flatMap((library) => (library.npm ? [library.npm] : [])));
  const command = selected.length ? `pnpm add ${selected.join(" ")}` : "";

  function toggle(npm: string) {
    setSelected(selected.includes(npm) ? selected.filter((entry) => entry !== npm) : [...selected, npm]);
  }

  const group = (title: string, libraries: Library[]) =>
    libraries.length ? (
      <div className="flex flex-col gap-2">
        <h3 className="m-0 text-[15px] font-semibold">{title}</h3>
        <ul className="m-0 flex list-none flex-col divide-y divide-line rounded-[10px] border border-line bg-surface p-0">
          {libraries.map((library) => (
            <li key={`${title}-${library.name}`} className="flex gap-3 px-4 py-3">
              {library.npm ? (
                <input
                  type="checkbox"
                  className="mt-1 size-4 flex-none accent-[var(--fg)]"
                  checked={selected.includes(library.npm)}
                  onChange={() => toggle(library.npm!)}
                  aria-label={labels.select.replace("{name}", library.name)}
                />
              ) : (
                <span className="mt-1 size-4 flex-none" aria-hidden="true" />
              )}
              <div className="flex min-w-0 flex-1 flex-col gap-1">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="text-[14px] font-medium text-fg">{library.name}</span>
                  {library.npm ? (
                    <a className="code break-all text-fg-2 underline decoration-line-strong underline-offset-2 hover:text-fg" href={`https://www.npmjs.com/package/${library.npm}`} target="_blank" rel="noreferrer">
                      {library.npm}
                    </a>
                  ) : null}
                </div>
                <p className="m-0 text-[13px] text-fg-2">{library.purpose}</p>
                {library.evidence ? (
                  <p className="m-0 text-[13px] text-fg-3">
                    <span className="sr-only">{labels.evidence}: </span>
                    <span className="code break-words">{library.evidence}</span>
                  </p>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      </div>
    ) : null;

  return (
    <div className="flex flex-col gap-6">
      <div className="sticky top-16 z-10 flex flex-col gap-2 rounded-[10px] border border-line bg-surface p-3 sm:flex-row sm:items-center">
        <span className="text-[13px] font-medium text-fg-3">{labels.install}</span>
        <code className="code min-w-0 flex-1 break-all text-fg">{command || <span className="font-sans text-fg-3">{labels.noneSelected}</span>}</code>
        {command ? <CopyButton value={command} label={labels.copy} copiedLabel={labels.copied} srLabel={labels.install} /> : null}
      </div>
      {group(labels.detected, detected)}
      {group(labels.recommended, recommended)}
    </div>
  );
}
