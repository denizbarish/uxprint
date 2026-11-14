"use client";

import { useDeferredValue, useState } from "react";
import type { Dictionary, Locale } from "@/i18n/dictionaries";
import type { CardData } from "@/lib/preview";
import { PrintCard } from "./print-card";

type GalleryDict = Pick<Dictionary, "search" | "filters" | "categories" | "themes" | "results" | "empty">;

/** Same rule as searchPrints() in packages/uxprint: every word must appear in name, slug, category, theme, tags or summary. */
function matches(card: CardData, words: string[]): boolean {
  const haystack = [card.name, card.slug, card.category, card.theme, card.summary, ...card.tags].join(" ").toLowerCase();
  return words.every((word) => haystack.includes(word));
}

export function Gallery({ cards, locale, dict }: { cards: CardData[]; locale: Locale; dict: GalleryDict }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CardData["category"] | null>(null);
  const [theme, setTheme] = useState<CardData["theme"] | null>(null);
  const deferredQuery = useDeferredValue(query);

  const categories = [...new Set(cards.map((card) => card.category))];
  const themes = [...new Set(cards.map((card) => card.theme))];
  const words = deferredQuery.toLowerCase().split(/\s+/).filter(Boolean);
  const visible = cards.filter(
    (card) => (category === null || card.category === category) && (theme === null || card.theme === theme) && matches(card, words),
  );
  const filtered = query !== "" || category !== null || theme !== null;
  const count = visible.length === 1 ? dict.results.one : dict.results.many.replace("{count}", String(visible.length));

  function clear() {
    setQuery("");
    setCategory(null);
    setTheme(null);
  }

  return (
    <>
      <div className="flex flex-col gap-4 border-b border-line pb-5 lg:flex-row lg:items-center lg:justify-between">
        <label className="relative block w-full lg:max-w-sm">
          <span className="sr-only">{dict.search.label}</span>
          <svg className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-fg-3" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M7 2.5a4.5 4.5 0 1 0 0 9a4.5 4.5 0 1 0 0-9ZM10.5 10.5l3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
          <input
            type="search"
            inputMode="search"
            autoComplete="off"
            spellCheck={false}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={dict.search.placeholder}
            className="h-9 w-full rounded-md border border-line bg-surface pr-3 pl-9 text-[14px] text-fg placeholder:text-fg-3 hover:border-line-strong"
          />
        </label>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
          <ChipGroup
            label={dict.filters.category}
            allLabel={dict.filters.all}
            options={categories.map((value) => ({ value, label: dict.categories[value] }))}
            value={category}
            onChange={setCategory}
          />
          <ChipGroup
            label={dict.filters.theme}
            allLabel={dict.filters.all}
            options={themes.map((value) => ({ value, label: dict.themes[value] }))}
            value={theme}
            onChange={setTheme}
          />
        </div>
      </div>

      <p className="mt-4 mb-4 text-[13px] text-fg-3" aria-live="polite">
        {count}
      </p>

      {visible.length > 0 ? (
        <ul className="m-0 grid grid-cols-1 gap-5 p-0 sm:grid-cols-2 xl:grid-cols-3">
          {visible.map((card) => (
            <PrintCard
              key={card.slug}
              card={card}
              href={`/${locale}/p/${card.slug}/`}
              categoryLabel={dict.categories[card.category]}
              themeLabel={dict.themes[card.theme]}
            />
          ))}
        </ul>
      ) : (
        <div className="flex flex-col items-start gap-3 rounded-[10px] border border-dashed border-line-strong p-8">
          <p className="m-0 text-[15px] text-fg-2">{dict.empty}</p>
          {filtered ? (
            <button type="button" className="btn" onClick={clear}>
              {dict.filters.clear}
            </button>
          ) : null}
        </div>
      )}
    </>
  );
}

function ChipGroup<T extends string>({
  label,
  allLabel,
  options,
  value,
  onChange,
}: {
  label: string;
  allLabel: string;
  options: { value: T; label: string }[];
  value: T | null;
  onChange: (value: T | null) => void;
}) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap items-center gap-1.5">
      <span className="mr-1 text-[13px] text-fg-3" aria-hidden="true">
        {label}
      </span>
      <button type="button" className="chip" aria-pressed={value === null} onClick={() => onChange(null)}>
        {allLabel}
      </button>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          className="chip"
          aria-pressed={value === option.value}
          onClick={() => onChange(value === option.value ? null : option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
