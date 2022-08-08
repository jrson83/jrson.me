import type { Page } from "lume/core.ts";

import lume from "lume/mod.ts";
import date from "lume/plugins/date.ts";
import slugify_urls from "lume/plugins/slugify_urls.ts";

import unified from "@plugins/unified/mod.ts";
import remarkPlugins from "@plugins/unified/remark/mod.ts";
import rehypePlugins from "@plugins/unified/rehype/mod.ts";
import preactjsx from "@plugins/preactjsx/mod.ts";
import sitemap from "@plugins/sitemap/mod.ts";

const site = lume({
  src: "./src",
});

site
  .use(date())
  .use(slugify_urls())
  .use(unified({
    remarkPlugins,
    rehypePlugins,
  }))
  .use(preactjsx())
  .use(sitemap())
  .loadAssets([".js"])
  .copy("assets", ".");

site.process([".html"], (page: Page) => {
  if (!page.content?.toString().trim().startsWith("<!DOCTYPE")) {
    page.content = `<!DOCTYPE html>${page.content}`;
  }
});

export default site;
