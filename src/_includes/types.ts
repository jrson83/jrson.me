import type { Helper } from "lume/core.ts";

export type { Data, Helper, Page } from "lume/core.ts";

export interface Helpers {
  [key: string]: Helper;
}
