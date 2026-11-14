/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  // tools/compare.mjs opens the dev server by IP; without this Next withholds its dev scripts from that origin.
  allowedDevOrigins: ["127.0.0.1"],
  // Several dev servers can run side by side when each gets its own build folder (UXPRINT_DIST=.next-a next dev -p 4321).
  ...(process.env.UXPRINT_DIST && process.env.NODE_ENV === "development" ? { distDir: process.env.UXPRINT_DIST } : {}),
};

export default nextConfig;
