import Link from "next/link";
import type { CardData } from "@/lib/preview";

/** A small composition painted with the print's own tokens: the card's image. */
export function PrintPreview({ preview, name }: { preview: CardData["preview"]; name: string }) {
  return (
    <div
      aria-hidden="true"
      className="relative flex aspect-[16/10] flex-col justify-between overflow-hidden p-5"
      style={{ background: preview.canvas, color: preview.text, fontFamily: preview.fontFamily }}
    >
      <div className="flex items-center justify-between" style={{ color: preview.muted, fontSize: 11 }}>
        <span className="flex items-center gap-1.5" style={{ color: preview.text, fontWeight: 600 }}>
          <span className="inline-block size-2.5 rounded-full" style={{ background: preview.text }} />
          {name}
        </span>
        <span className="flex gap-3">
          <span>Product</span>
          <span>Pricing</span>
        </span>
      </div>
      <div>
        <p
          className="m-0"
          style={{
            fontSize: 26,
            lineHeight: 1.05,
            fontWeight: preview.heading.weight,
            letterSpacing: preview.heading.tracking,
          }}
        >
          Plan the work,
          <br />
          ship the product
        </p>
        <div className="mt-4 flex gap-2" style={{ fontSize: 11, fontWeight: 500 }}>
          <span
            className="inline-flex h-7 items-center px-3"
            style={{ background: preview.primary.background, color: preview.primary.color, borderRadius: preview.primary.radius }}
          >
            Get started
          </span>
          <span
            className="inline-flex h-7 items-center px-3"
            style={{
              background: preview.secondary.background,
              color: preview.secondary.color,
              borderRadius: preview.secondary.radius,
              boxShadow: `inset 0 0 0 1px ${preview.border}`,
            }}
          >
            Contact
          </span>
        </div>
      </div>
      <div className="flex h-2.5 overflow-hidden rounded-full" style={{ boxShadow: `0 0 0 1px ${preview.border}` }}>
        {preview.strip.map((value) => (
          <span key={value} className="flex-1" style={{ background: value }} />
        ))}
      </div>
    </div>
  );
}

export function PrintCard({ card, href, categoryLabel, themeLabel }: { card: CardData; href: string; categoryLabel: string; themeLabel: string }) {
  return (
    <li className="list-none">
      <Link
        href={href}
        className="group block overflow-hidden rounded-[10px] border border-line bg-surface transition-[border-color] duration-[120ms] hover:border-line-strong"
      >
        <div className="border-b border-line">
          <PrintPreview preview={card.preview} name={card.name} />
        </div>
        <div className="flex items-baseline justify-between gap-3 px-4 py-3">
          <h2 className="m-0 text-[15px] font-semibold tracking-[-0.01em] text-fg">{card.name}</h2>
          <p className="m-0 truncate text-[13px] text-fg-3">
            {categoryLabel} · {themeLabel}
          </p>
        </div>
      </Link>
    </li>
  );
}
