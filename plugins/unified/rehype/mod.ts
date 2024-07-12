import { dirname, fromFileUrl } from 'https://deno.land/std@0.203.0/path/mod.ts'
import {
  rehypeCodeTitles,
  rehypeCopyCode,
  rehypeExternalLinks,
  rehypeExtractToc,
  rehypeImgSize,
  rehypeMinifyWhitespace,
  rehypePrismDiff,
  rehypePrismPlus,
  rehypeSlugAnchorSectionize,
  unified,
} from '../deps.ts'

const __dirname = dirname(fromFileUrl(import.meta.url))

export default <unified.PluggableList> [
  [rehypeImgSize, {
    dir: new URL(`${__dirname}/../../../src/assets`, import.meta.url).pathname,
  }],
  [rehypeExternalLinks, { rel: ['noopener'], target: '_blank' }],
  rehypeExtractToc,
  [rehypeSlugAnchorSectionize, {
    wrapperProperties: { className: 'heading-section' },
    linkProperties: { className: 'heading-anchor' },
    buttonProperties: { className: 'heading-anchor__symbol' },
  }],
  rehypeCodeTitles,
  [rehypePrismPlus, { ignoreMissing: true }],
  rehypeCopyCode,
  rehypePrismDiff,
  rehypeMinifyWhitespace,
]
