"use client";

import { LegacyFooter, LegacyHeader, useBrand } from "../chrome";
import { filler } from "../filler";
import { Media } from "../parts";
import "./statement.css";

export function StatementScreen() {
  const brand = useBrand();
  return (
    <div className="busuu-ref bu-legacy bu-stmt">
      <LegacyHeader />
      <main>
        <header className="bu-stmt__band">
          <Media className="bu-stmt__bg" onBlue />
          <div className="bu-stmt__titles">
            <h1>About {brand}</h1>
            <p>Helping people connect through words</p>
          </div>
        </header>
        <article className="bu-stmt__body">
          <h2>Supply chain fairness statement</h2>
          <p>{filler(560, 31)}</p>
          <p>
            <strong>Download our</strong> <a href="#">full supply chain transparency report</a> <strong>to read more</strong>.
          </p>
          <p>
            <em>{filler(84, 32)}</em>
          </p>
        </article>
      </main>
      <LegacyFooter variant="statement" />
    </div>
  );
}
