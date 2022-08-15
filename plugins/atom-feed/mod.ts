import { merge } from "lume/core/utils.ts";
import { Page } from "lume/core/filesystem.ts";
import { buildSort } from "lume/plugins/search.ts";

import { isString } from "#utils";

import { formatXML } from "./deps.ts";
import type { FormatOptions } from "./deps.ts";

import type { Site } from "lume/core.ts";
import type { Search } from "lume/plugins/search.ts";
import type { MetaData } from "lume/plugins/metas.ts";

export interface Options {
  /** The query to search pages included in the feed. defaults to `type=post` */
  query: string[];

  /** The values to sort the feeds pages. defaults to `date=desc` */
  sort: string[];

  /** The limit to display pages. defaults to `10` */
  limit: number;

  /** Options passed to xml-formatter */
  options: Partial<FormatOptions>;
}

// Default options
export const defaults: Options = {
  query: ["type=post"],
  sort: ["date=desc"],
  limit: 10,
  options: {
    indentation: "  ",
    collapseContent: true,
    lineSeparator: "\n",
  },
};

export interface FeedMetaData extends MetaData {
  author: {
    name: string;
    email: string;
    url: string;
  };
}

/** A plugin to <description> */
export default function (userOptions?: Partial<Options>) {
  const options = merge(defaults, userOptions);

  return (site: Site) => {
    site.addEventListener("afterRender", () => {
      // Create the sitemap.xml page
      const feed = Page.create("feed.xml", getFeedContent(site));

      // Add to the sitemap page to pages
      site.pages.push(feed);
    });

    function getFeedContent(site: Site) {
      // Get the pages
      const search = site.globalData.search as Search;
      const feedPages = search.pages(
        options.query,
        options.sort,
        options.limit,
      );

      // Sort the pages
      feedPages.sort(buildSort(options.sort));

      const metas = isActiveProcessor(site, "metas")
        ? feedPages[0].data.metas as FeedMetaData
        : feedPages[0].data.site as FeedMetaData;

      // deno-fmt-ignore
      const atomfeed = `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>${metas.title}</title>
  <subtitle>${metas.description.replace(/\s\&\s/, " and ")}</subtitle>
  <link href="${site.url("feed.xml", true)}" rel="self" type="application/rss+xml"/>
  <link href="${site.url("/", true)}"/>
  <updated>${feedPages[0].data.date?.toISOString()}</updated>
  <id>${site.url("/", true)}</id>
  <author>
    <name>${metas.author.name}</name>
  </author>

  ${feedPages.map((post: Page) => {
    return `<entry>
    <title>${post.data.title}</title>
    <link href="${site.url(post.data.url as string, true)}"/>
    <id>${site.url(post.data.url as string, true)}</id>
    <updated>${post.data.date?.toISOString()}</updated>
    <summary>${isString(post.data.excerpt) && post.data.excerpt.replace(/\s\&\s/, " and ")}</summary>
  </entry>
  `}).join("").trim()}
</feed>`.trim();

      return formatXML(atomfeed, options.options);
    }

    function isActiveProcessor(site: Site, processor: string): boolean {
      const { processors } = site.processors;

      // deno-lint-ignore no-unused-vars
      for (const [value, key] of processors) {
        if (typeof value === "function" && value.name === processor) {
          return true;
        }
      }
      return false;
    }
  };
}
