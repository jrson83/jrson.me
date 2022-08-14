export type FormatOptions = {
  indentation?: string;
  // deno-lint-ignore no-explicit-any
  filter?: (node: any) => boolean;
  stripComments?: boolean;
  collapseContent?: boolean;
  lineSeparator?: string;
  whiteSpaceAtEndOfSelfclosingTag?: boolean;
};
export { default as formatXML } from "https://esm.sh/xml-formatter@2.6.1";
