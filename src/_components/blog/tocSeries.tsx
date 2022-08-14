import type { Page, PageData, PageHelpers } from "#types";

import { capitalize, isEmptyArray } from "#utils";

export default (
  { comp, icons: { unicons }, search, series, url }: PageData,
  { urlFilter }: PageHelpers,
) => {
  const parts: any[] = [];
  const activeUrl = url;

  if (typeof series !== "undefined") {
    for (
      const post of search.pages(
        `series.ident=${series.ident}`,
        "date=asc",
      ) as Page[]
    ) {
      parts.push({
        title: series.title,
        chapter: post.data.title,
        url: urlFilter!(post.data.url),
      });
    }
  }

  return (
    <>
      {!isEmptyArray(parts) && (
        <nav className="series-toc">
          <header>
            <comp.shared.icon
              icon={unicons.listUl}
              size="26"
              color="third-font-color"
            />
            <h1>{capitalize(series.title)} ({parts.length} Part Series)</h1>
          </header>
          <ol className="series-list">
            {parts.map(({ chapter, url }, index) => {
              return (
                <li key={index}>
                  <a
                    href={urlFilter!(url)}
                    {...(url == activeUrl && { className: "is-active" })}
                  >
                    {chapter}
                  </a>
                </li>
              );
            })}
          </ol>
        </nav>
      )}
    </>
  );
};
