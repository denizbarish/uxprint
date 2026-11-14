"use client";

import { useSyncExternalStore } from "react";
import { THEME_KEY, type ThemeChoice } from "@/lib/theme";

const EVENT = "uxprint-theme";

function subscribe(onChange: () => void) {
  window.addEventListener(EVENT, onChange);
  return () => window.removeEventListener(EVENT, onChange);
}

function readChoice(): ThemeChoice {
  const value = document.documentElement.dataset.theme;
  return value === "light" || value === "dark" ? value : "system";
}

function apply(choice: ThemeChoice) {
  const root = document.documentElement;
  if (choice === "system") {
    delete root.dataset.theme;
    localStorage.removeItem(THEME_KEY);
  } else {
    root.dataset.theme = choice;
    localStorage.setItem(THEME_KEY, choice);
  }
  window.dispatchEvent(new Event(EVENT));
}

const icons: Record<ThemeChoice, string> = {
  system: "M3 4.5h10v7H3zM6 13.5h4",
  light: "M8 5a3 3 0 1 0 0 6a3 3 0 1 0 0-6ZM8 1.5v1.5M8 13v1.5M1.5 8H3M13 8h1.5M3.4 3.4l1 1M11.6 11.6l1 1M3.4 12.6l1-1M11.6 4.4l1-1",
  dark: "M13 9.5A5.5 5.5 0 0 1 6.5 3a5.5 5.5 0 1 0 6.5 6.5Z",
};

export function ThemeToggle({ labels }: { labels: { label: string; system: string; light: string; dark: string } }) {
  const choice = useSyncExternalStore(subscribe, readChoice, () => "system" as const);
  const options: ThemeChoice[] = ["system", "light", "dark"];
  return (
    <div role="radiogroup" aria-label={labels.label} className="flex h-8 items-center rounded-md border border-line bg-surface p-0.5">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          role="radio"
          aria-checked={choice === option}
          title={labels[option]}
          onClick={() => apply(option)}
          className="grid h-full w-7 place-items-center rounded-[4px] text-fg-3 hover:text-fg aria-checked:bg-sunken aria-checked:text-fg"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d={icons[option]} stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="sr-only">{labels[option]}</span>
        </button>
      ))}
    </div>
  );
}
