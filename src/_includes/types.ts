import type { Children } from 'lume/plugins/jsx_preact.ts'
import type SiteMeta from '../_data/site.ts'

export type { Children }

declare global {
  namespace Lume {
    interface PageProps extends Data {
      /** The page description */
      description?: string

      /** The page excerpt */
      excerpt?: string

      /** The last modification date of the page */
      update?: Date

      /** Helper for the active page url */
      activeUrl?: string

      /** The site navigation menu */
      menu?: {
        title: string
        visible: boolean
        order: number
      }

      /** The post reading time */
      readingTime?: {
        minutes: number
        text: string
        time: number
        words: number
      }

      /** The site icons */
      icons: {
        unicons: {
          [key: string]: string | number
        }
        stack: {
          [key: string]: string | number
        }
      }

      /** The tag filter */
      filteredBy: string

      /** Blog post series */
      series: {
        title: string
        ident: string
      }

      /** The site metadata */
      site: typeof SiteMeta

      /** Cache busting plugin */
      cacheBusting: string
    }

    export interface AboutPageProps extends PageProps {
      header: {
        title: string
        description: string
      }
      stacks: {
        title: string
        icons: Array<{
          title: string
          items: Array<{
            title: string
            icon: string
            color: number | string
            url: string
          }>
        }>
      }
      blogstacks: {
        title: string
        lists: Array<{
          description: string
          items: Array<{
            title: string
            description: string
            url: string
          }>
        }>
      }
    }
  }
}
