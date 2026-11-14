"use client";

import { Media, SitePage } from "../chrome";
import { Rows } from "./changelog";
import "./changelog.css";
import "./post.css";

/* Post template (rebuilt from a changelog entry page): back link, date and share row, one release note. */

const paragraphs = [
  "You can now connect your own model keys to the remote code helper and keep using the credits and rates you already have with your provider.",
  "Connect through any of the large model providers, a cloud platform of your choice, or any gateway that speaks one of the two common message formats used across the field today.",
  "Your provider bills model usage directly, while the sandbox runtime keeps using Acme credits. You will need an API key, not a chat plan.",
  "Workspace admins can turn this on in Settings. Available on every current plan. Read more in our documentation.",
];

export function PostScreen() {
  return (
    <SitePage className="lr-post" current="Now">
      <div className="lr-container lr-post-grid">
        <a className="lr-post-back" href="#changelog">
          <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
            <path d="M7.5 2.5 4 6l3.5 3.5" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Changelog
        </a>
        <article className="lr-log-entry__body lr-post-body">
          <div className="lr-post-meta">
            <a href="#entry">November 12, 2026</a>
            <button type="button" className="lr-post-share">
              <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
                <path d="M6 8a2.5 2.5 0 0 0 3.5 0l2-2A2.5 2.5 0 0 0 8 2.5l-.5.5M8 6a2.5 2.5 0 0 0-3.5 0l-2 2A2.5 2.5 0 0 0 6 11.5l.5-.5" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
              </svg>
              Share
            </button>
          </div>
          <h1 className="lr-post-title">Use your own model keys</h1>
          <Media className="lr-post-media" label="Release illustration" />
          <div className="lr-log-prose">
            {paragraphs.map((text) => (
              <p key={text.slice(0, 12)}>{text}</p>
            ))}
          </div>
          <Rows rows={["Fixes", "Improvements", "Keyboard shortcuts", "API", "Connector server"]} />
        </article>
      </div>
    </SitePage>
  );
}
