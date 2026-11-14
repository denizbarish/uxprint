"use client";

import { useId, useState, type FormEvent, type KeyboardEvent } from "react";
import { Shell, useBrand } from "../chrome";
import "./feedback.css";

const CATEGORIES = ["Bug Report", "Feature Request", "Extension", "Account and Billing", "Other"];

/** Category picker: a button that opens a listbox, as on the original form. */
function CategorySelect({ id }: { id: string }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string | null>(null);
  const listId = `${id}-list`;

  function choose(option: string) {
    setValue(option);
    setOpen(false);
  }

  function onListKey(event: KeyboardEvent<HTMLUListElement>) {
    if (event.key === "Escape") setOpen(false);
  }

  return (
    <div className="rc-fb__select">
      <button
        type="button"
        id={id}
        className="rc-fb__control rc-fb__trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        data-empty={value ? undefined : ""}
        onClick={() => setOpen(!open)}
      >
        {value ?? "Select a category"}
        <svg viewBox="0 0 16 16" aria-hidden="true">
          <path d="M4.5 6.5 8 10l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open ? (
        <ul className="rc-fb__options" role="listbox" id={listId} aria-labelledby={id} tabIndex={-1} onKeyDown={onListKey}>
          {CATEGORIES.map((option) => (
            <li key={option} role="option" aria-selected={option === value}>
              <button type="button" onClick={() => choose(option)}>
                {option}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

/** Form template (measured on /feedback). Submits nowhere. */
export function FeedbackScreen() {
  const brand = useBrand();
  const id = useId();
  const [files, setFiles] = useState<string[]>([]);
  return (
    <Shell className="rc-fb-page">
      <div className="rc-fb">
        <h1>Feedback</h1>
        <p className="rc-fb__lead">We&apos;re all ears! Let us know how we can make your experience even better.</p>
        <form className="rc-fb__form" onSubmit={(event: FormEvent) => event.preventDefault()}>
          <div className="rc-fb__field">
            <label htmlFor={`${id}-category`}>Category</label>
            <CategorySelect id={`${id}-category`} />
          </div>
          <div className="rc-fb__field">
            <label htmlFor={`${id}-email`}>Email</label>
            <input className="rc-fb__control" id={`${id}-email`} type="email" autoComplete="email" placeholder="Your email address" />
          </div>
          <div className="rc-fb__field">
            <label htmlFor={`${id}-version`}>{brand} Version</label>
            <input className="rc-fb__control" id={`${id}-version`} type="text" inputMode="decimal" placeholder={`Your ${brand} version`} />
          </div>
          <div className="rc-fb__field">
            <label htmlFor={`${id}-description`}>Description</label>
            <textarea className="rc-fb__control" id={`${id}-description`} placeholder="Please provide details about your feedback..." />
          </div>
          <div className="rc-fb__field">
            <span className="rc-fb__label" id={`${id}-files`}>
              Attach Files
            </span>
            <label className="rc-fb__drop" aria-labelledby={`${id}-files`}>
              <input
                type="file"
                multiple
                className="rc-visually-hidden"
                onChange={(event) => setFiles([...(event.target.files ?? [])].map((file) => file.name))}
              />
              <span className="rc-fb__drop-title">
                {files.length ? files.join(", ") : "Drag and drop files here or click to browse"}
              </span>
              <span className="rc-fb__drop-note">
                Accepted files: Text files (.txt, .log), PDFs (.pdf), Images (.jpg, .png, .gif), Archives (.zip) and
                Videos (.mp4, .mov)
              </span>
              <span className="rc-fb__drop-note">Maximum file size: 20MB. Up to 5 attachments.</span>
            </label>
          </div>
          <button type="submit" className="rc-fb__submit">
            Send
          </button>
        </form>
      </div>
    </Shell>
  );
}
