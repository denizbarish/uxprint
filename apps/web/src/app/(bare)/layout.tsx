import "@fontsource-variable/inter/opsz.css";
import type { ReactNode } from "react";

/** Shell-less root for the redirect page and the full-screen reference screens. */
export default function BareLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
