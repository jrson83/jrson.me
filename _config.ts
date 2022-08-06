import type { Page } from "@types";

import lume from "lume/mod.ts";
import preactjsx from "@plugins/preactjsx/mod.ts";

const site = lume({
  src: "./src",
});

site
  .use(preactjsx());

site.process([".html"], (page: Page) => {
  if (!page.content?.toString().trim().startsWith("<!DOCTYPE")) {
    page.content = `<!DOCTYPE html>${page.content}`;
  }
});

export default site;
