import type { PageData, PageHelpers } from "#types";

export default ({ date }: PageData, filters: PageHelpers) => {
  return (
    <time dateTime={filters.date(date, "DATE")} itemProp="datePublished">
      {filters.date(date, "HUMAN_DATE")}
    </time>
  );
};
