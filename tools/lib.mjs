// Shared by the capture tools: both write under captures/<slug>/<page>/, so they must agree on names.

/** Stops a slug such as "../.." from pointing a tool (and its rmSync) outside captures/. */
export function requireSlug(slug, usage) {
  if (!slug || !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) {
    console.error(`${usage}\nslug must be lowercase letters, digits and single hyphens`);
    process.exit(2);
  }
  return slug;
}

/** One folder name per URL: "home" for the first, the path for the rest, numbered when two paths collide. */
export function pageNames(urls) {
  const used = new Set();
  return urls.map((url, index) => {
    const fromPath = new URL(url).pathname.replace(/^\/|\/$/g, "").replace(/[^a-zA-Z0-9_-]+/g, "-");
    const base = index === 0 ? "home" : fromPath || `page-${index}`;
    let name = base;
    for (let n = 2; used.has(name); n += 1) name = `${base}-${n}`;
    used.add(name);
    return name;
  });
}
