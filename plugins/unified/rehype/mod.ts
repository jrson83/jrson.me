import {
  rehypeCodeTitles,
  rehypeCopyCode,
  rehypeExternalLinks,
  rehypeExtractToc,
  rehypeMinifyWhitespace,
  rehypePrismDiff,
  rehypePrismPlus,
  rehypeSlugAnchorSectionize,
} from "../deps.ts";

export default [
  rehypeExternalLinks,
  rehypeExtractToc,
  [rehypeSlugAnchorSectionize, {
    linkProperties: { className: "header-anchor" },
    buttonProperties: { className: ["btn-reset", "btn-header-anchor"] },
  }],
  rehypeCodeTitles,
  [rehypePrismPlus, { ignoreMissing: true }],
  rehypeCopyCode,
  rehypePrismDiff,
  rehypeMinifyWhitespace,
];
