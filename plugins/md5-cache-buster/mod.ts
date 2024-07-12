import { merge } from 'lume/core/utils/object.ts'
import modifyUrls from 'lume/plugins/modify_urls.ts'
import { Md5 } from './deps.ts'

import type { Message } from './deps.ts'

export interface Options {
  /** The list of extensions this plugin applies to */
  extensions: string[]
}

// Default options
export const defaults: Options = {
  extensions: ['.css', '.js'],
}

export type HashedAssets = Array<{
  filename: string
  hashFilename: string
  ext: string
  hash: string
}>

/** A plugin to add an MD5 hash (cache buster) to `.css` & `.js` files */
export default function (userOptions?: Partial<Options>) {
  const options = merge(defaults, userOptions)

  const hashedAssets: HashedAssets = []

  return (site: Lume.Site) => {
    site.addEventListener('afterRender', () => {
      site.process(options.extensions, (pages) => pages.forEach(buildHash))

      site.process(['.html'], (pages) => pages.forEach(replaceUrls))
    })

    function buildHash(page: Lume.Page) {
      const hash = new Md5().update(page.content as Message).toString()

      hashedAssets.push({
        filename: `${page.src.path}${page.src.ext}`,
        hashFilename: `${page.src.path}.${hash}${page.src.ext}`,
        ext: page.src.ext,
        hash: hash,
      })

      page.data.url = `${page.src.path}.${hash}${page.src.ext}`
    }

    function replaceUrls() {
      site.use(modifyUrls({
        fn(url, _page) {
          if (url.endsWith('.css') || url.endsWith('.js')) {
            const result = hashedAssets.find((asset) => {
              return asset.filename.toLowerCase() === url.toLowerCase()
            })

            if (result !== undefined) {
              return result?.hashFilename
            }
          }
          return url
        },
      }))
    }
  }
}
