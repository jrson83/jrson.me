import { config } from "./_build.ts";

import lume from "lume/mod.ts";
import date from "lume/plugins/date.ts";
import slugify_urls from "lume/plugins/slugify_urls.ts";
import jsx from "lume/plugins/jsx_preact.ts";
import sass from "lume/plugins/sass.ts";
import terser from "lume/plugins/terser.ts";
import inline from "lume/plugins/inline.ts";

import unified from "lume/plugins/remark.ts";
import remarkPlugins from "#plugins/unified/remark/mod.ts";
import rehypePlugins from "#plugins/unified/rehype/mod.ts";
import atomFeed from "#plugins/atom-feed/mod.ts";
import sitemap from "lume/plugins/sitemap.ts";
import md5CacheBuster from "#plugins/md5-cache-buster/mod.ts";

const site = lume({
  location: config.location,
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
  .copy("assets", ".")
  .use(date())
  .use(slugify_urls({
    replace: {
      "&": "and",
    },
  }))
  .use(unified({
    remarkPlugins,
    rehypePlugins,
  }))
  .use(jsx())
  .use(sass())
  .loadAssets([".js"])
  .use(terser())
  .use(inline())
  .use(atomFeed())
  .use(sitemap({
    query: "indexable=true"
  }));

if (config.mode === "prod") {
  site.use(md5CacheBuster());
}

export default site;
