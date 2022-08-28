import type { Page, PageData } from "#types";

export const layout = "layouts/posts.tsx";
export const importJs = "/scripts/search.js";

export default function* ({ paginate, search }: PageData) {
  const posts = search?.pages("type=post", "date=desc") as Page[];
  const options = {
    url: (n: number) => n == 1 ? `/blog/` : `/blog/${n}/`,
    size: 4,
  };

  for (const page of paginate(posts, options)) {
    if (page.pagination?.page === 1) {
      page.menu = {
        title: "Blog",
        visible: true,
        order: 0,
      };
    }
    page.type = "posts";
    yield page;
  }
}
