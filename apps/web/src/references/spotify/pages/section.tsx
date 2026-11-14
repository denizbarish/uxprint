"use client";

import { Shell } from "../chrome";
import { albums, credit, pick } from "../data";
import { Card, ShelfHeader, type CardSpec } from "../parts";
import "./pages.css";

/* Section, "show all" (measured on /section/...): 32px title, then 20 cards in a 5-column grid. */

const cards: CardSpec[] = Array.from({ length: 20 }, (_, index) => ({
  title: pick(albums, index + 1),
  subtitle: credit(index + 4, index % 6 === 4 ? 3 : 1),
}));

export function SectionScreen() {
  return (
    <Shell>
      <section className="sp-section-page" aria-label="Big records this week">
        <ShelfHeader title="Big records this week" more={null} level={1} />
        <div className="sp-grid">
          {cards.map((card, index) => (
            <Card key={index} card={card} index={index + 2} />
          ))}
        </div>
      </section>
    </Shell>
  );
}
