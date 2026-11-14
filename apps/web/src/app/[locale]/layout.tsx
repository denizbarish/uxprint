import "@fontsource-variable/inter/opsz.css";
import "@fontsource-variable/jetbrains-mono";
import "@fontsource-variable/geist";
import "@fontsource-variable/geist-mono";
import "../globals.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { SponsorStrip } from "@/components/sponsors";
import { getDictionary, isLocale, locales } from "@/i18n/dictionaries";
import { themeScript } from "@/lib/theme";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: { default: "uxprint", template: "%s · uxprint" },
};

export default async function LocaleLayout({ children, params }: { children: ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-screen bg-canvas text-fg">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-md focus:bg-surface focus:px-3 focus:py-2"
        >
          {dict.skipToContent}
        </a>
        <SiteHeader locale={locale} dict={{ gallery: dict.gallery, language: dict.language, theme: dict.theme, sponsors: dict.sponsors }} />
        {children}
        <SponsorStrip dict={dict.sponsors} />
      </body>
    </html>
  );
}
