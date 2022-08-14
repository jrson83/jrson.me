import type { Page } from "lume/core.ts";

import lume from "lume/mod.ts";
import date from "lume/plugins/date.ts";
import slugify_urls from "lume/plugins/slugify_urls.ts";
import sass from "lume/plugins/sass.ts";
import terser from "lume/plugins/terser.ts";

import unified from "#plugins/unified/mod.ts";
import remarkPlugins from "#plugins/unified/remark/mod.ts";
import rehypePlugins from "#plugins/unified/rehype/mod.ts";
import preactjsx from "#plugins/preactjsx/mod.ts";
import sitemap from "#plugins/sitemap/mod.ts";

const site = lume({
  src: "./src",
  server: {
    page404: "/404/",
  },
}, {
  url: {
    names: {
      url: "urlFilter",
      htmlUrl: "htmlUrlFilter",
    },
  },
});

site
  .use(date())
  .use(slugify_urls())
  .use(unified({
    remarkPlugins,
    rehypePlugins,
  }))
  .use(preactjsx())
  .use(sass())
  .loadAssets([".js"])
  .use(terser())
  .copy("assets", ".")
  .use(sitemap({
    query: ["url!=/404/"],
  }));

site.process([".html"], (page: Page) => {
  if (!page.content?.toString().trim().startsWith("<!DOCTYPE")) {
    page.content = `<!DOCTYPE html>${page.content}`;
  }
});

export default site;
