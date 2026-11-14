import { getAllPrints, getPrint } from "@/lib/prints";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPrints().map((print) => ({ slug: print.slug }));
}

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return Response.json(getPrint(slug));
}
