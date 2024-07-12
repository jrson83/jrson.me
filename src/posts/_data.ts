import type { Page } from '#types'

export const indexable = true
export const type = 'post'
export const layout = 'layouts/post.tsx'
export const importJs = '/scripts/blog.js'

export function url(page: Page): string {
  return `/blog/${page.data.title}/`
}
