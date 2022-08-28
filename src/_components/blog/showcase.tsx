import type { Page, PageData, PageHelpers } from "#types";

import { isEmptyArray, truncateString } from "#utils";

export default (
  { comp, icons: { unicons }, search, url }: PageData,
  { urlFilter }: PageHelpers,
) => {
  const previousPost = search?.previousPage(
    url?.toString(),
    "type=post",
  ) as Page;

  const nextPost = search?.nextPage(
    url?.toString(),
    "type=post",
  ) as Page;

  return (
    <nav
      className="showcase"
      role="navigation"
      itemScope
      itemType="http://schema.org/SiteNavigationElement"
      aria-label="Pagination Navigation"
    >
      {previousPost && !isEmptyArray(previousPost)
        ? (
          <a
            href={urlFilter!(previousPost?.data?.url)}
            rel="prev"
            className="showcase__item"
            itemProp="url"
          >
            <button className="showcase__btn" title="Previous post">
              <span>
                <comp.shared.icon
                  icon={unicons.arrowLeft}
                  title=""
                  size="28"
                />
              </span>
              <span className="showcase__text left">
                <small itemProp="name">Previous</small>
                <span>
                  {truncateString(
                    previousPost.data.title as string,
                    30,
                    "...",
                    true,
                  )}
                </span>
              </span>
            </button>
          </a>
        )
        : <div className="showcase__item" />}
      {nextPost && !isEmptyArray(nextPost) && (
        <a
          href={urlFilter!(nextPost?.data?.url)}
          rel="next"
          className="showcase__item"
          itemProp="url"
        >
          <button className="showcase__btn" title="Next post">
            <span className="showcase__text right">
              <small itemProp="name">Next</small>
              <span>
                {truncateString(
                  nextPost.data.title as string,
                  30,
                  "...",
                  true,
                )}
              </span>
            </span>
            <span>
              <comp.shared.icon
                icon={unicons.arrowRight}
                title=""
                size="28"
              />
            </span>
          </button>
        </a>
      )}
    </nav>
  );
};
