"use client";

import { HdsPage, Media } from "../chrome";
import { useBrand, withBrand } from "../brand";
import { Chevron } from "../icons";

const rows = [
  ["Have a question?", "Get in touch"],
  ["Building with Acme?", "Explore our Docs"],
  ["Want to work at Acme?", "View open roles"],
] as const;

export function AboutScreen() {
  const brand = useBrand();
  const b = (text: string) => withBrand(text, brand);

  return (
    <HdsPage footer="mini">
      <article className="a-page">
        <Media className="a-art" tone="plain" />
        <div className="a-copy">
          <p>{b("Acme is a software company focused on making it easier for businesses to start, grow, and last.")}</p>
          <p>We build programmable business tools, rethinking from first principles how money should move, to make it simpler, faster, and cheaper for any team anywhere to start and scale.</p>
          <p>
            More than a million <a href="#">teams</a> build on Acme, from solo founders to large companies, united by a practical focus on growth. Many of the most ambitious companies in the world use our tools as core infrastructure to grow faster, and they move large volumes through the platform every year.
          </p>
          <p>While growth makes everyone better off, open markets also make room for more variety. When any business can reach a global customer base, the quality and range of products in the world goes up, and craft and creativity reach even the smallest niches.</p>
          <p>
            Our own growth depends on the success of the businesses building with us. We therefore invest back into our tools at an unusual rate. We ship <a href="#">updates to our products</a> every single day to deliver compounding gains to our customers, and we hold ourselves to a high bar for quality and speed. We maintain some of the most <a href="#">reliable APIs</a> on the internet. We build entirely new <a href="#">pieces</a> of <a href="#">business</a>{" "}
            <a href="#">infrastructure</a> to enable new ideas. And our work in <a href="#">risk and fraud</a> tooling over many years keeps the internet economy safer and more open.
          </p>
          <p>
            We believe that markets work best when they are part of open cultures. In addition to building tools for businesses, we also <a href="#">publish</a> <a href="#">ideas</a> that we think are good for economic and technological progress, and make <a href="#">unconventional</a> <a href="#">bets</a> that we think will have a long-term effect on growth. In the words of one economist, growth follows when people have the freedom to try, and we think that free exchange and free societies go hand in hand.
          </p>
        </div>
        <ul className="a-links">
          {rows.map(([label, link]) => (
            <li key={label}>
              <span>{b(label)}</span>
              <a href="#">
                {link}
                <Chevron />
              </a>
            </li>
          ))}
        </ul>
      </article>
    </HdsPage>
  );
}
