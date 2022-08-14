import {
  rehypeCodeTitles,
  rehypeCopyCode,
  rehypeExternalLinks,
  rehypeExtractToc,
  rehypeMinifyWhitespace,
  rehypePrismDiff,
  rehypePrismPlus,
  rehypeSlugSectionizeAnchorize,
} from "../deps.ts";

export default [
  rehypeExternalLinks,
  rehypeExtractToc,
  rehypeSlugSectionizeAnchorize,
  rehypeCodeTitles,
  [rehypePrismPlus, { ignoreMissing: true }],
  rehypeCopyCode,
  rehypePrismDiff,
  rehypeMinifyWhitespace,
];
