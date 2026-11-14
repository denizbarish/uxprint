"use client";

import { AppShell, Flag } from "../chrome";
import { LANGUAGES } from "../filler";
import "./language-picker.css";

const COUNTS = ["26M", "5M", "4M", "5M", "2M", "2M", "1M", "2M", "4M", "1M", "100K", "16K", "2M", "2M"];

export function LanguagePickerScreen() {
  return (
    <AppShell>
      <div className="bu-pick">
        <h1>Which language do you want to study?</h1>
        <ul className="bu-pick__grid">
          {LANGUAGES.map((name, index) => (
            <li key={name}>
              <a href="#" className="bu-pick__tile">
                <Flag index={index} size={60} />
                <span className="bu-pick__name">{name}</span>
                <span className="bu-pick__count">{COUNTS[index]} learners</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </AppShell>
  );
}
