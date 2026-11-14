"use client";

import { BlueBar, Shell } from "../chrome";
import { CourseGrid } from "../catalog";
import "./courses.css";

/** Course catalogue on the blue bar (measured on /courses). */
export function CoursesScreen() {
  return (
    <Shell>
      <BlueBar />
      <main className="dl-courses">
        <div className="dl-courses__head">
          <h1>Courses for speakers of Fennor</h1>
          <label className="dl-courses__lang">
            <span>I speak Fennor</span>
            <svg viewBox="0 0 15 9" aria-hidden="true">
              <path d="M1.5 1.5l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <select defaultValue="Fennor" aria-label="Language you speak">
              {["Aurelan", "Bresko", "Fennor", "Galdic", "Hollish"].map((name) => (
                <option key={name}>{name}</option>
              ))}
            </select>
          </label>
        </div>
        <CourseGrid className="dl-courses__grid" />
      </main>
    </Shell>
  );
}
