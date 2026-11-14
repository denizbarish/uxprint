import sponsors from "@/data/sponsors.json";
import type { Dictionary } from "@/i18n/dictionaries";

export const SPONSOR_URL = "https://github.com/sponsors/denizbarish";

type Sponsor = { login: string; name: string };

export function SponsorIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true" className="text-[#db61a2]">
      <path
        fill="currentColor"
        d="M8 14.25 2.3 8.6a3.6 3.6 0 0 1 0-5.1 3.6 3.6 0 0 1 5.1 0l.6.6.6-.6a3.6 3.6 0 0 1 5.1 0 3.6 3.6 0 0 1 0 5.1L8 14.25Z"
      />
    </svg>
  );
}

/** The strip reserved for sponsors, at the foot of every gallery page. The list is refreshed with tools/sponsors.mjs. */
export function SponsorStrip({ dict }: { dict: Dictionary["sponsors"] }) {
  const list = sponsors as Sponsor[];
  return (
    <footer className="border-t border-line bg-surface">
      <section aria-labelledby="sponsors-title" className="mx-auto flex max-w-[1400px] flex-wrap items-center gap-x-6 gap-y-4 px-4 py-6 sm:px-6">
        <h2 id="sponsors-title" className="m-0 text-[13px] font-medium text-fg-2">
          {dict.title}
        </h2>
        {list.length > 0 ? (
          <ul className="m-0 flex list-none flex-wrap items-center gap-2 p-0">
            {list.map((sponsor) => (
              <li key={sponsor.login}>
                <a
                  href={`https://github.com/${sponsor.login}`}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex h-9 items-center gap-2 rounded-full border border-line bg-canvas py-1 pr-3 pl-1 text-[13px] font-medium text-fg hover:border-fg-3"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element -- a remote avatar in a static export */}
                  <img src={`https://github.com/${sponsor.login}.png?size=56`} alt="" width={28} height={28} loading="lazy" className="rounded-full" />
                  {sponsor.name}
                </a>
              </li>
            ))}
          </ul>
        ) : null}
        <a className="btn ml-auto gap-1.5" href={SPONSOR_URL} target="_blank" rel="noreferrer noopener">
          <SponsorIcon />
          {dict.become}
        </a>
      </section>
    </footer>
  );
}
