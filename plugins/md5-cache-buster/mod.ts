import { Md5 } from './deps.ts'
import { merge } from 'lume/core/utils.ts'
import modifyUrls from 'lume/plugins/modify_urls.ts'

import type { Message } from './deps.ts'
import type { Page, Site } from 'lume/core.ts'

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

  return (site: Site) => {
    site.addEventListener('afterRender', () => {
      site.process(options.extensions, buildHash)

      site.process(['.html'], replaceUrls)
    })

    function buildHash(file: Page) {
      const hash = new Md5().update(file.content as Message).toString()

      hashedAssets.push({
        filename: `${file.dest.path}${file.dest.ext}`,
        hashFilename: `${file.dest.path}.${hash}${file.dest.ext}`,
        ext: file.dest.ext,
        hash: hash,
      })

      file.updateDest({
        path: `${file.dest.path}.${hash}`,
      })
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
