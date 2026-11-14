"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/i18n/dictionaries";

export function LocaleSwitch({ locale, label }: { locale: Locale; label: string }) {
  const pathname = usePathname();
  return (
    <nav aria-label={label} className="flex h-8 items-center rounded-md border border-line bg-surface p-0.5">
      {locales.map((target) => {
        const href = pathname.replace(/^\/(en|tr)(?=\/|$)/, `/${target}`);
        return (
          <Link
            key={target}
            href={href}
            hrefLang={target}
            aria-current={target === locale ? "true" : undefined}
            className="flex h-full items-center rounded-[4px] px-2 text-xs font-medium uppercase text-fg-3 hover:text-fg aria-[current=true]:bg-sunken aria-[current=true]:text-fg"
          >
            {target}
          </Link>
        );
      })}
    </nav>
  );
}
