/** Small line icons drawn for these screens; not the original icon set. */

export function Chevron({ className }: { className?: string }) {
  return (
    <svg className={className} width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
      <path d="M3.5 1.5 7 5l-3.5 3.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function ChevronDown({ className }: { className?: string }) {
  return (
    <svg className={className} width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
      <path d="M1.5 3.5 5 7l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function ChevronLeft({ className }: { className?: string }) {
  return (
    <svg className={className} width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
      <path d="M6.5 1.5 3 5l3.5 3.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function Plus({ className }: { className?: string }) {
  return (
    <svg className={className} width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
      <path d="M6 1v10M1 6h10" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function Close({ className }: { className?: string }) {
  return (
    <svg className={className} width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
      <path d="m2 2 8 8M10 2l-8 8" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function Burger({ className }: { className?: string }) {
  return (
    <svg className={className} width="14" height="12" viewBox="0 0 14 12" aria-hidden="true">
      <path d="M1 2h12M1 6h12M1 10h12" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function Spark({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M8 1v4M8 11v4M1 8h4M11 8h4" fill="none" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

export function Globe({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      <circle cx="8" cy="8" r="6.3" fill="none" stroke="currentColor" strokeWidth="1.3" />
      <path d="M1.8 8h12.4M8 1.7c2 2 2 10.6 0 12.6M8 1.7c-2 2-2 10.6 0 12.6" fill="none" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}

/** Our own mark: a lowercase wordmark set in the page face. Not the original logo. */
export function Wordmark({ brand, className }: { brand: string; className?: string }) {
  return (
    <span className={`s-wordmark ${className ?? ""}`} data-compare-mask="">
      {brand.toLowerCase()}
    </span>
  );
}
