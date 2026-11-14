"use client";

import { Chevron, Shell } from "../chrome";
import { phrase } from "../filler";
import { Media } from "../parts";
import "./blog.css";

const POSTS: { tags: string[]; title: number; date: string }[] = [
  { tags: ["Backend", "Platform"], title: 25, date: "November 11, 2026" },
  { tags: ["Data", "Platform"], title: 72, date: "November 10, 2026" },
  { tags: ["AI / ML", "Platform", "Security"], title: 54, date: "November 6, 2026" },
  { tags: ["Backend", "Data", "Platform"], title: 71, date: "November 5, 2026" },
  { tags: ["Backend", "Platform"], title: 48, date: "October 29, 2026" },
  { tags: ["Backend", "Platform"], title: 82, date: "October 27, 2026" },
  { tags: ["AI / ML", "Platform"], title: 53, date: "October 22, 2026" },
  { tags: ["Backend", "Platform"], title: 84, date: "October 15, 2026" },
  { tags: ["Search", "Backend", "Platform"], title: 96, date: "October 13, 2026" },
  { tags: ["AI / ML", "Platform"], title: 52, date: "October 8, 2026" },
  { tags: ["Partner tools"], title: 34, date: "October 6, 2026" },
  { tags: ["AI / ML", "Backend", "Platform"], title: 60, date: "October 1, 2026" },
];

const TONES = ["neutral", "night", "cool", "warm", "green", "light"] as const;

export function BlogScreen() {
  return (
    <Shell variant="blog">
      <section className="ub-blog-hero">
        <p className="ub-blog-hero__eyebrow">Journal</p>
        <h1 className="ub-blog-hero__title">Places to see and ways to reach them</h1>
      </section>
      <section className="ub-blog-list">
        <div className="ub-wrap">
          <div className="ub-blog-list__head">
            <h2 className="ub-blog-list__title">Recent posts</h2>
            <label className="ub-blog-filter">
              <span>Show:</span>
              <span className="ub-blog-filter__select">
                <select defaultValue="all" aria-label="Topic">
                  <option value="all">Every topic</option>
                  <option>Platform</option>
                  <option>Data</option>
                </select>
                <Chevron />
              </span>
            </label>
          </div>
          <ul className="ub-blog-grid">
            {POSTS.map((post, index) => (
              <li key={index}>
                <a href="#" className="ub-blog-card">
                  <Media tone={TONES[index % TONES.length]} className="ub-blog-card__media" />
                  <span className="ub-blog-card__tags">
                    {post.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </span>
                  <span className="ub-blog-card__title">{phrase(post.title, index + 3)}</span>
                  <span className="ub-blog-card__date">{post.date}</span>
                </a>
              </li>
            ))}
          </ul>
          <nav className="ub-blog-pages" aria-label="Pages">
            <a href="#">Back</a>
            <span className="ub-blog-pages__current">
              <select defaultValue="1" aria-label="Page">
                <option>1</option>
                <option>2</option>
                <option>3</option>
              </select>
              <Chevron />
            </span>
            <span>of 77</span>
            <a href="#">Forward</a>
          </nav>
        </div>
      </section>
    </Shell>
  );
}
