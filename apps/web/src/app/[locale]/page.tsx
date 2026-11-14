import type { Metadata } from "next";
import { Gallery } from "@/components/gallery";
import { getDictionary, isLocale, type Locale } from "@/i18n/dictionaries";
import { getAllPrints } from "@/lib/prints";
import { toCardData } from "@/lib/preview";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return { title: { absolute: `uxprint · ${getDictionary(locale as Locale).gallery}` } };
}

export default async function GalleryPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return null;
  const dict = getDictionary(locale);
  const cards = getAllPrints().map(toCardData);
  return (
    <main id="main" className="mx-auto max-w-[1400px] px-4 pt-8 pb-16 sm:px-6">
      <h1 className="mt-0 mb-6 text-[28px] font-semibold tracking-[-0.02em]">{dict.gallery}</h1>
      <Gallery
        cards={cards}
        locale={locale}
        dict={{
          search: dict.search,
          filters: dict.filters,
          categories: dict.categories,
          themes: dict.themes,
          results: dict.results,
          empty: dict.empty,
        }}
      />
    </main>
  );
}
