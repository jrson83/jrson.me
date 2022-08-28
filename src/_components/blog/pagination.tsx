import type { PageData, PageHelpers } from "#types";

import { getPaginationPages } from "#utils";

export default (
  { comp, icons: { unicons }, pagination }: PageData,
  { urlFilter }: PageHelpers,
) => {
  return (
    <nav id="pagination">
      <ul
        className="pagination"
        aria-label="Pagination"
        itemScope
        itemType="http://schema.org/SiteNavigationElement/Pagination"
      >
        {pagination?.previous
          ? (
            <li className="prev">
              <a
                className="pagination__item"
                href={urlFilter!(pagination.previous)}
                title="Previous page"
                aria-label="Previous page"
              >
                <comp.shared.icon
                  icon={unicons.arrowLeft}
                  title=""
                  size="26"
                />{" "}
                &nbsp;Prev
              </a>
            </li>
          )
          : (
            <li className="v-hidden">
              <comp.shared.icon
                icon={unicons.arrowLeft}
                title=""
                size="26"
              />{" "}
              &nbsp;Prev
            </li>
          )}
        {getPaginationPages(pagination?.totalPages!, pagination?.page!).map((
          index,
        ) => (
          <li key={index}>
            <a
              href={urlFilter!(`/blog${index > 1 && `/${index}` || ``}`)}
              className={`pagination__item ${
                pagination?.page === index ? "is-active" : ""
              }`}
              {...(pagination?.page === index && { ariaCurrent: true })}
            >
              {index}
            </a>
          </li>
        ))}
        {pagination?.next
          ? (
            <li>
              <a
                className="pagination__item"
                href={urlFilter!(pagination.next)}
                title="Next page"
                aria-label="Next page"
              >
                Next&nbsp;{" "}
                <comp.shared.icon
                  icon={unicons.arrowRight}
                  title=""
                  size="26"
                />
              </a>
            </li>
          )
          : (
            <li className="v-hidden">
              Next&nbsp;{" "}
              <comp.shared.icon
                icon={unicons.arrowRight}
                title=""
                size="26"
              />
            </li>
          )}
      </ul>
    </nav>
  );
};
