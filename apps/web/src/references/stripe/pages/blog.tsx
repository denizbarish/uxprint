"use client";

import { useState } from "react";
import { LegacyPage, Media } from "../chrome";
import { useBrand, withBrand } from "../brand";
import { Chevron } from "../icons";

type Post = { cat: string; title: string; date: string; authors: [string, string][]; excerpt: string };

const posts: Post[] = [
  { cat: "Product", title: "Acme on Acme: what we learned moving $1B in vendor payments to Global Payouts", date: "October 30, 2026", authors: [["Sam Patel", "Software Engineer, Finance Engineering"], ["Hana Akers", "Software Engineer, Finance Engineering"]], excerpt: "Early this year, we began moving our own vendor payments to Payouts, the tool we sell for paying recipients in many countries. Payouts now moves more than a billion dollars a year for us, with less effort and better tracking. Here is what we learned along the way." },
  { cat: "Industry", title: "How the fastest-growing companies on Acme scale around the world", date: "October 27, 2026", authors: [["Fran Rios", "Chief Business Officer"]], excerpt: "Despite slower global growth and more trade friction, the fastest-growing companies on our platform keep expanding into new markets. We looked at what sets them apart, from local payment methods to how they plan for new regions." },
  { cat: "Industry", title: "Trends from a fintech conference: the rise of quiet financial services", date: "October 22, 2026", authors: [["Tom Webb", "Head of Partnerships"]], excerpt: "As software products get more capable, the financial plumbing behind them fades into the background. Three trends from this year's event show where embedded finance is heading, and what it means for the teams who build it." },
  { cat: "Industry", title: "Acme survey: four trends changing how software platforms compete in the AI era", date: "October 19, 2026", authors: [["Mia Brandt", "Head of Platform Research"]], excerpt: "AI is creating more competition for software platforms, and platforms feel the pressure. We asked hundreds of leaders how they plan to respond, and four clear trends came out." },
  { cat: "Product", title: "New ways for fintechs to move money and expand around the world", date: "October 16, 2026", authors: [["Nadia Romero", "Product Lead, Money Movement"]], excerpt: "We are introducing three updates to help fintechs launch products and grow faster: broader payout coverage, faster account setup in new markets, and simpler tools for holding balances in more currencies." },
  { cat: "Product", title: "Sync real-time Acme data to your database with Data Sync", date: "October 15, 2026", authors: [["Leo Chen", "Product Manager, Data"]], excerpt: "Applications rely on current account data to fill orders, update customer records, and run reports. Until now, teams had to build and maintain their own sync jobs to keep a copy of that data in their database. Data Sync keeps your tables up to date in near real time, with no code to write or jobs to watch. Here is how it works and how to set it up." },
  { cat: "Industry", title: "The strange economics of AI pricing", date: "October 13, 2026", authors: [["Jamie Brown", "Product Manager, Pricing"]], excerpt: "As usage, costs, and customer expectations shift, AI companies are moving away from simple seat-based pricing. We looked at how leading teams price, package, and bill their products, and what still trips them up when usage swings from day to day." },
  { cat: "Product", title: "Why I tried to retire usage billing (and why we kept it)", date: "October 1, 2026", authors: [["Scott Moore", "Head of Plans"]], excerpt: "Usage billing is useful plumbing, but it is usually a poor price to show customers. Here is what we tried instead, and why we ended up keeping it under the hood." },
  { cat: "Product", title: "A new stable digital dollar is now the default on Acme", date: "September 30, 2026", authors: [["Ines Hart", "Product Lead, Digital Assets"]], excerpt: "A stable digital dollar built for global money movement is now available to every business on the platform, with lower fees and faster settlement for payouts." },
];

const highlights = [
  { title: "Rethinking risk in the age of AI", date: "June 4, 2026", body: "Join risk and payments leaders in Seattle to explore how AI is changing fraud and how teams respond.", color: "#00a8f0" },
  { title: "The future of agent-led commerce is here", date: "June 4, 2026", body: "See how AI agents are changing the way people shop online, and what that means for checkout and payments.", color: "#0073e6" },
  { title: "Introducing next-day payouts, a faster way to reach your earnings", date: "December 17, 2025", body: "Get next-day access to cash and use funds where they are needed, with no change to your setup.", color: "#3b4fd8" },
  { title: "Bank pay available in Australia", date: "December 15, 2025", body: "Businesses in Australia can now offer direct bank payments. Accept one-off and recurring payments straight from customer bank accounts, with instant confirmation and lower fees than cards on most orders.", color: "#6142d6" },
  { title: "Introducing a payments-first ledger network", date: "September 4, 2025", body: "A new ledger network built for payments, with fast settlement and low fees for businesses everywhere.", color: "#4a2ab0" },
];

const filters = ["All", "Corporate", "Engineering", "Industry", "Product"];

function PostItem({ post, brand }: { post: Post; brand: string }) {
  const wide = post.authors.length < 2;
  return (
    <article className={`g-post${wide ? " g-post--wide" : ""}`}>
      <div className="g-post__meta">
        <a href="#" className="g-cat">
          {post.cat}
        </a>
        <h2 className="g-post__title">
          <a href="#">{withBrand(post.title, brand)}</a>
        </h2>
      </div>
      <div className="g-post__side">
        <time>{post.date}</time>
        <div className="g-authors">
          {post.authors.map(([name, role]) => (
            <div key={name} className="g-author">
              <span className="g-avatar" data-compare-mask="" />
              <div>
                <a href="#">{name}</a>
                <p>{role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="g-post__body">
        <p className="g-excerpt">{withBrand(post.excerpt, brand)}</p>
        <a href="#" className="s-pill s-pill--ghost">
          Read more
          <Chevron />
        </a>
      </div>
      <Media className="g-post__media" tone="cool" />
    </article>
  );
}

export function BlogScreen() {
  const brand = useBrand();
  const b = (text: string) => withBrand(text, brand);
  const [filter, setFilter] = useState(0);

  return (
    <LegacyPage accent="#635bff">
      <nav className="s-subnav g-subnav" aria-label="Blog">
        <a href="#" className="s-subnav__name">
          Blog
        </a>
        <a href="#" className="s-pill s-pill--ghost">
          {b("Acme on X")}
          <Chevron />
        </a>
      </nav>

      <section className="g-hero">
        <div className="g-ribbon" aria-hidden="true" />
        <article className="g-feature">
          <div className="g-feature__copy">
            <a href="#" className="g-cat">
              Product
            </a>
            <h1 className="g-feature__title">
              <a href="#">{b("Analyze your Acme data directly with your agent")}</a>
            </h1>
            <div className="g-author">
              <span className="g-avatar" data-compare-mask="" />
              <div>
                <a href="#">Aria Sloan</a>
                <p>Product Manager, Data Products</p>
              </div>
            </div>
            <p className="g-excerpt">You can now use plain language to build an investor slide deck that highlights where your business outperformed in the last quarter, or a customer dashboard that shows which plans grow fastest, straight from your agent.</p>
            <a href="#" className="s-pill s-pill--ghost">
              Read more
              <Chevron />
            </a>
          </div>
          <Media className="g-feature__media" tone="plain" />
        </article>
      </section>

      <div className="g-filters" role="tablist" aria-label="Filter posts">
        {filters.map((label, index) => (
          <button key={label} type="button" role="tab" aria-selected={filter === index} onClick={() => setFilter(index)}>
            {label}
          </button>
        ))}
      </div>

      <section className="g-list">
        {posts.slice(0, 3).map((post) => (
          <PostItem key={post.title} post={post} brand={brand} />
        ))}
      </section>

      <section className="g-highlights">
        <div className="p-container">
          <h2 className="p-h3">Recent highlights</h2>
        </div>
        <div className="g-track">
          {highlights.map((item) => (
            <a key={item.title} href="#" className="g-card" style={{ background: item.color }}>
              <h3>{b(item.title)}</h3>
              <time>{item.date}</time>
              <p>{b(item.body)}</p>
              <span className="g-card__more">
                Learn more <Chevron />
              </span>
            </a>
          ))}
        </div>
      </section>

      <section className="g-list g-list--more">
        {posts.slice(3).map((post) => (
          <PostItem key={post.title} post={post} brand={brand} />
        ))}
        <div className="p-container g-all">
          <a href="#" className="s-pill c-ink">
            View all posts
            <Chevron />
          </a>
        </div>
      </section>

      <section className="g-subscribe">
        <div className="p-container g-subscribe__grid">
          <div>
            <h2 className="g-subscribe__title">{b("Subscribe to the Acme Blog")}</h2>
            <p className="p-lead">{b("Stay connected with Acme and receive new blog posts in your inbox.")}</p>
            <form className="g-subscribe__form" onSubmit={(event) => event.preventDefault()}>
              <label className="g-sr" htmlFor="g-email">
                Email
              </label>
              <input id="g-email" type="email" autoComplete="email" inputMode="email" placeholder="you@example.com" />
              <button type="submit" className="s-pill">
                Subscribe
                <Chevron />
              </button>
            </form>
            <p className="g-fine">
              {b("Acme will handle your data according to its")} <a href="#">Privacy Policy</a>
            </p>
          </div>
          <div className="p-feature">
            <h3 className="p-feature__title">Like this post? Join our team.</h3>
            <p className="p-body">{b("Acme builds financial tools and business infrastructure for the internet.")}</p>
            <a href="#" className="s-pill s-pill--ghost">
              View roles
              <Chevron />
            </a>
          </div>
          <div className="p-feature">
            <h3 className="p-feature__title">Have any feedback or questions?</h3>
            <p className="p-body">We would love to hear from you.</p>
            <a href="#" className="s-pill s-pill--ghost">
              Contact us
              <Chevron />
            </a>
          </div>
        </div>
      </section>
    </LegacyPage>
  );
}
