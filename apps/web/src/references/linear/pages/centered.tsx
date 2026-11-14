import { Media, SitePage } from "../chrome";
import "./centered.css";

/* Centered template (rebuilt from linear.app/download, also covers /brand): app icon, centered title and action,
   then ruled blocks with a short lead on the left and a list of rows on the right. */

type Row = { label: string; action: string; qr?: boolean; icon: "grid" | "globe" | "phone" | "play" };

const webRow: Row = { label: "Web app", action: "Open", icon: "globe" };

const desktopRows: Row[] = [{ label: "Windows", action: "Download", icon: "grid" }, webRow];

const mobileRows: Row[] = [
  { label: "Phone OS A", action: "Open store", qr: true, icon: "phone" },
  { label: "Phone OS B", action: "Open store", qr: true, icon: "play" },
];

const icons = {
  grid: "M2 2h4.5v4.5H2zM7.5 2H12v4.5H7.5zM2 7.5h4.5V12H2zM7.5 7.5H12V12H7.5z",
  globe: "M7 1.5a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11z",
  phone: "M4.5 1.5h5a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1z",
  play: "M3.5 2v10l8.5-5z",
};

function RowList({ rows }: { rows: Row[] }) {
  return (
    <ul className="lr-centered-rows">
      {rows.map((row) => (
        <li key={row.label}>
          <span className="lr-centered-rows__label">
            <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
              <path d={icons[row.icon]} fill="currentColor" />
            </svg>
            {row.label}
          </span>
          <span className="lr-centered-rows__actions">
            {row.qr ? (
              <button type="button" className="lr-centered-pill lr-centered-pill--quiet">
                Scan QR
              </button>
            ) : null}
            <a className="lr-centered-pill" href="#get">
              {row.action}
            </a>
          </span>
        </li>
      ))}
    </ul>
  );
}

export function CenteredScreen() {
  return (
    <SitePage className="lr-centered">
      <section className="lr-centered-hero">
        <Media className="lr-centered-icon" label="App icon" />
        <h1>Download Acme</h1>
        <p className="lr-centered-lead lr-centered-lead--wide">Available for desktop, web, and both phone systems.</p>
        <p className="lr-centered-lead lr-centered-lead--phone">Available for web, desktop, and both phone systems today.</p>
        <div className="lr-centered-get lr-centered-get--wide">
          <a className="lr-btn lr-btn--40 lr-btn--primary" href="#get">
            Download for desktop <kbd>D</kbd>
          </a>
          <span>Version 1.32.8</span>
        </div>
        <div className="lr-centered-get lr-centered-get--phone">
          <a className="lr-btn lr-btn--40 lr-btn--primary" href="#get">
            Download on the phone store
          </a>
          <a className="lr-btn lr-btn--40 lr-btn--primary" href="#get">
            Get it on the app shop
          </a>
        </div>
      </section>
      <div className="lr-centered-blocks">
        <section className="lr-centered-block lr-centered-block--desktop" aria-labelledby="h-desktop">
          <p>
            <strong id="h-desktop">Acme Desktop.</strong> A fast and focused place to plan and build your product.
          </p>
          <RowList rows={desktopRows} />
        </section>
        <section className="lr-centered-block lr-centered-block--mobile" aria-labelledby="h-mobile">
          <p>
            <strong id="h-mobile">Acme Mobile.</strong> Made for work away from the keyboard that adds to the desktop
            experience.
          </p>
          <RowList rows={mobileRows} />
          <div className="lr-centered-phone-web">
            <RowList rows={[webRow]} />
          </div>
        </section>
      </div>
    </SitePage>
  );
}
