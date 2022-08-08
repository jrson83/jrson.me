import type { Data as BaseData, Helper, Page as BasePage } from "lume/core.ts";
import type { Search } from "lume/plugins/search.ts";
import type { ComponentChildren } from "@plugins/preactjsx/deps.ts";
import type SiteMeta from "../_data/site.ts";

export type Menu = {
  title: string;
  visible: boolean;
  order: number;
};

export interface Data extends BaseData {
  /** The title of the page */
  title?: string;

  /** The page description */
  description?: string;

  /** The page url */
  url: string | false;

  /** The page menuItem */
  menu?: Menu;

  /** The page reading time */
  readingTime?: {
    minutes: number;
    text: string;
    time: number;
    words: number;
  };

  site: typeof SiteMeta;

  /**
   * The available components
   * @see https://lume.land/docs/core/components/
   */
  // deno-lint-ignore no-explicit-any
  comp?: any;

  /**
   * The paginator helper
   * @see https://lume.land/plugins/paginate/
   */
  paginate: Paginator;

  /**
   * The pagination info
   * @see https://lume.land/plugins/paginate/
   */
  pagination?: Pagination;

  /**
   * The pagination result
   * @see https://lume.land/plugins/paginate/
   */
  results?: Page[];

  /**
   * The searcher helper
   * @see https://lume.land/plugins/search/
   */
  search: Search;

  /**
   * The JSX children elements
   * @see https://lume.land/plugins/jsx/
   */
  children: ComponentChildren;
}

export interface Page extends BasePage {
  data: Data;
}

export type Paginator = (
  results: unknown[],
  userOptions?: Partial<never>,
) => Generator<PaginateResult, void, unknown>;

export interface Pagination {
  /** The current page number */
  page: number;

  /** The total number of pages */
  totalPages: number;

  /** The total number of elements */
  totalResults: number;

  /** The url of the previous page */
  previous: string | null;

  /** The url of the next page */
  next: string | null;
}

export interface PaginateResult<T = Page> {
  /** The page url */
  url: string;

  /** The page elements */
  results: T[];

  /** The pagination info */
  pagination: Pagination;

  /** Important when defining `page.menu` or `page.type` inside `paginate()` */
  [index: string]: unknown;
}

export interface PageHelpers {
  /** @see https://lume.land/plugins/attributes/ */
  attr: Helper;

  /** @see https://lume.land/plugins/attributes/ */
  class: Helper;

  /** @see https://lume.land/plugins/date/ */
  date: Helper;

  /** @see https://lume.land/plugins/liquid/ */
  liquid: Helper;

  /** @see https://lume.land/plugins/markdown/ */
  md: Helper;

  /** @see https://lume.land/plugins/nunjucks/ */
  njk: Helper;

  /** @see https://lume.land/plugins/postcss/ */
  postcss: Helper;

  /** @see https://lume.land/plugins/pug/ */
  pug: Helper;

  /** @see https://lume.land/plugins/slugify_urls/ */
  slugify: Helper;

  /** @see https://lume.land/plugins/terser/#the-terser-filter */
  terser: Helper;

  /** @see https://lume.land/plugins/url/#url-filter */
  url: Helper;

  /** @see https://lume.land/plugins/url/#htmlurl-filter */
  htmlUrl: Helper;

  [key: string]: Helper | undefined;
}
