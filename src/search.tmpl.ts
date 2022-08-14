import type { Page, PageData, PageHelpers } from "#types";

export const url = "/search.json";

export default function (
  { search }: PageData,
  { urlFilter, date }: PageHelpers,
) {
  const result = [];

  for (const post of search.pages("type=post", "date=desc") as Page[]) {
    result.push({
      title: post.data.title,
      date: date(post.data.date, "HUMAN_DATE"),
      readingTime: post.data.readingTime?.text,
      /* excerpt: post.data.excerpt, */
      url: urlFilter!(post.data.url),
      tags: post.data.tags,
    });
  }

  return JSON.stringify(result);
}
