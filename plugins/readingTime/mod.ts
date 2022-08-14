import { merge } from "lume/core/utils.ts";

import type { Page, Site } from "lume/core.ts";

export interface Options {
  extensions: string[];
  wpm: number;
  text: string;
}

export const defaults: Options = {
  extensions: [".md"],
  wpm: 275,
  text: "min read",
};

export default function (userOptions?: Partial<Options>) {
  const options = merge(defaults, userOptions);

  return (site: Site) => {
    site.preprocess(options.extensions, readTime);

    function readTime(page: Page) {
      const content = page.data.content as string;

      if (!content || typeof content !== "string") {
        return page.data.readingTime = {
          text: `0 ${options.text}`,
          words: 0,
          minutes: 0,
          time: 0,
        };
      }

      const matches = content.match(/\w+/g);

      const wordCount = matches ? matches.length : 0;
      const minutes = wordCount / options.wpm;

      const time = Math.round(minutes * 60 * 1000);
      const displayTime = Math.ceil(parseFloat(minutes.toFixed(2)));

      page.data.readingTime = {
        text: `${displayTime} ${options.text}`,
        words: wordCount,
        minutes: displayTime,
        time,
      };
    }
  };
}
