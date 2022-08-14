import type { Page as BasePage, PageData as BasePageData } from "lume/core.ts";
import type { ComponentChildren } from "#plugins/preactjsx/deps.ts";
import type SiteMeta from "../_data/site.ts";

export type { PaginateResult } from "lume/plugins/paginate.ts";
export type { PageHelpers } from "lume/core.ts";
export type { ComponentChildren };

export interface Menu {
  title: string;
  visible: boolean;
  order: number;
}

export type ReadingTime = {
  minutes: number;
  text: string;
  time: number;
  words: number;
};

export interface PageData extends BasePageData {
  /** The page description */
  description?: string;

  /** The page excerpt */
  excerpt?: string;

  /** Helper for the active page url */
  activeUrl?: string;

  /** The site navigation menu */
  menu?: Menu;

  /** The post reading time */
  readingTime?: ReadingTime;

  /** The site icons */
  icons: {
    unicons: {
      [key: string]: string | number;
    };
    stack: {
      [key: string]: string | number;
    };
  };

  filteredBy: string;

  series: {
    title: string;
    ident: string;
  };

  /** The site metadata */
  site: typeof SiteMeta;

  cacheBusting: string;
}

export interface Page extends BasePage {
  data: PageData;
}

export interface AboutData extends PageData {
  header: {
    title: string;
    description: string;
  };
  stacks: {
    title: string;
    icons: Array<{
      title: string;
      items: Array<{
        title: string;
        icon: string;
        color: number | string;
        url: string;
      }>;
    }>;
  };
  blogstacks: {
    title: string;
    lists: Array<{
      description: string;
      items: Array<{
        title: string;
        description: string;
        url: string;
      }>;
    }>;
  };
}
