"use client";

import { useBrand } from "../brand";
import { Shell } from "../chrome";
import "./pages.css";

/* Download (measured on /download): framed two-gradient promo, copy column at left, app screenshot at right. */

export function DownloadScreen() {
  const brand = useBrand();
  return (
    <Shell>
      <section className="sp-dl" aria-label="Desktop app">
        <div className="sp-dl__inner">
          <div className="sp-dl__copy">
            <span className="sp-dl__wordmark" data-compare-mask="" />
            <h1>{`Get ${brand} on your Mac`}</h1>
            <p>Enjoy richer sound, listening without a connection, and a live feed that shows what your friends are playing at this very moment.</p>
            <a className="sp-pill" href="#">
              Get the free desktop app
            </a>
          </div>
          <div className="sp-dl__shot" data-compare-mask="" />
        </div>
      </section>
    </Shell>
  );
}
