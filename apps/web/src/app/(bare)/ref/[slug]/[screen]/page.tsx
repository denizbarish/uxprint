import type { Metadata } from "next";
import { allReferenceScreens, getReferences } from "@/references";
import { ReferenceScreen } from "@/references/screens";

export const dynamicParams = false;

export function generateStaticParams() {
  return allReferenceScreens();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string; screen: string }> }): Promise<Metadata> {
  const { slug, screen } = await params;
  const entry = getReferences(slug)?.screens.find((item) => item.id === screen);
  return { title: entry ? `${entry.title} · ${slug} reference` : "Reference", robots: { index: false } };
}

export default async function ReferencePage({ params }: { params: Promise<{ slug: string; screen: string }> }) {
  const { slug, screen } = await params;
  return <ReferenceScreen slug={slug} screen={screen} />;
}
