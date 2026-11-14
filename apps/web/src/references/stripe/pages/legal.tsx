"use client";

import type { CSSProperties } from "react";
import { LegacyPage } from "../chrome";
import { useBrand, withBrand } from "../brand";
import { legalBlocks, type LegalBlock } from "./legal-data";

const sideLinks = [
  "Acme Privacy Center",
  "Data Processing Agreement",
  "Data Transfer Addendum",
  "Supplier Data Processing Agreement",
  "Supplier Data Transfers Addendum",
  "Data Privacy Framework",
  "Sub-Processors List",
  "Cookies Policy",
];

function Block({ block, brand }: { block: LegalBlock; brand: string }) {
  const style = { "--mt": `${block.mt}px` } as CSSProperties;
  const text = withBrand(block.t ?? "", brand);
  switch (block.k) {
    case "h1":
      return (
        <h1 className="l-h1" style={style}>
          {text}
        </h1>
      );
    case "h2":
      return (
        <h2 className="l-h2" style={style}>
          {text}
        </h2>
      );
    case "h3":
      return (
        <h3 className="l-h3" style={style}>
          {text}
        </h3>
      );
    case "h4":
      return (
        <h4 className="l-h4" style={style}>
          {text}
        </h4>
      );
    case "toc":
      return (
        <a href="#" className="l-toc" style={style}>
          {text}
        </a>
      );
    case "box":
      return (
        <div className={`l-box${block.h && block.h < 100 ? " l-box--notice" : ""}`} style={{ ...style, minHeight: block.h }}>
          <p>{block.h && block.h < 100 ? <>This policy will be updated soon. Please review the upcoming changes <a href="#">here</a>.</> : text}</p>
        </div>
      );
    case "p":
      return (
        <p className={`l-p${block.indent ? " l-p--indent" : ""}`} style={style}>
          {block.lead ? <strong>{withBrand(block.lead, brand)} </strong> : null}
          {text}
        </p>
      );
  }
  return block.k satisfies never;
}

export function LegalScreen() {
  const brand = useBrand();
  return (
    <LegacyPage accent="#635bff" tone="white" footerTone="tint" header="logo">
      <div className="l-layout">
        <aside className="l-side">
          <a href="#" className="l-side__kicker">
            Legal
          </a>
          <nav aria-label="Privacy documents">
            <a href="#" className="l-side__current" aria-current="page">
              {withBrand("Acme Privacy Policy & Privacy Center", brand)}
            </a>
            <ul>
              {sideLinks.map((link) => (
                <li key={link}>
                  <a href="#">{withBrand(link, brand)}</a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
        <article className="l-main">
          {legalBlocks.map((block, index) => (
            <Block key={index} block={block} brand={brand} />
          ))}
        </article>
      </div>
    </LegacyPage>
  );
}
