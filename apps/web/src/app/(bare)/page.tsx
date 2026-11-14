import type { Metadata } from "next";

export const metadata: Metadata = { title: "uxprint" };

/** Static redirect to the default locale; works on any static host. */
export default function RootRedirect() {
  return (
    <main style={{ fontFamily: '"Inter Variable", system-ui, sans-serif', padding: 24 }}>
      <meta httpEquiv="refresh" content="0;url=/en/" />
      <a href="/en/">uxprint</a>
    </main>
  );
}
