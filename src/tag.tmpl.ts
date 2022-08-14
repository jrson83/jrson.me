import type { Page, PageData } from "#types";

export const layout = "layouts/posts.tsx";
export const importJs = "/scripts/search.js";

// deno-lint-ignore no-explicit-any
let lastTag: any;

export default function* ({ search, paginate }: PageData) {
  for (const tag of search.tags() as Page[]) {
    lastTag = tag;

    const posts = search.pages(`type=post '${tag}'`, "date=desc") as Page[];

    for (const page of paginate(posts, { url, size: 10 })) {
      page.pathToPage = `/blog/tag/${tag}/`;
      page.filteredBy = tag;

      yield page;
    }
  }
}

const url = (n: number) =>
  n == 1 ? `/blog/tag/${lastTag}/` : `/blog/tag/${lastTag}/${n}/`;
