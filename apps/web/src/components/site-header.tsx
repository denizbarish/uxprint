import Link from "next/link";
import type { Dictionary, Locale } from "@/i18n/dictionaries";
import { LocaleSwitch } from "./locale-switch";
import { SPONSOR_URL, SponsorIcon } from "./sponsors";
import { ThemeToggle } from "./theme-toggle";

export function SiteHeader({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Pick<Dictionary, "gallery" | "language" | "theme" | "sponsors">;
}) {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-canvas/90 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-[1400px] items-center justify-between gap-4 px-4 sm:px-6">
        <Link href={`/${locale}/`} className="flex items-center gap-2 rounded-md text-[15px] font-semibold tracking-[-0.01em]">
          <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
            <rect x="1" y="1" width="18" height="18" rx="5" fill="currentColor" />
            <rect x="5" y="5" width="4" height="10" rx="1" fill="var(--canvas)" />
            <rect x="11" y="5" width="4" height="6" rx="1" fill="var(--canvas)" />
          </svg>
          uxprint
          <span className="sr-only">{dict.gallery}</span>
        </Link>
        <div className="flex items-center gap-2">
          <a className="btn gap-1.5" href={SPONSOR_URL} target="_blank" rel="noreferrer noopener">
            <SponsorIcon />
            <span className="hidden sm:inline">{dict.sponsors.sponsor}</span>
            <span className="sr-only sm:hidden">{dict.sponsors.sponsor}</span>
          </a>
          <LocaleSwitch locale={locale} label={dict.language} />
          <ThemeToggle labels={dict.theme} />
        </div>
      </div>
    </header>
  );
}
