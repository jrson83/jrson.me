export const indexable = false
export const layout = 'layouts/posts.tsx'
export const importJs = '/scripts/search.js'

let lastTag: string

export default function* ({ search, paginate }: Lume.Data) {
  for (const tag of search.values<string>('tags')) {
    lastTag = tag

    const posts = search.pages(`type=post '${tag}'`, 'date=desc')

    for (const page of paginate(posts, { url, size: 10 })) {
      page.pathToPage = `/blog/tag/${tag}/`
      page.filteredBy = tag
      page.title = `Blog posts tagged: “${tag}“`

      yield page
    }
  }
}

const url = (n: number) =>
  n == 1 ? `/blog/tag/${lastTag}/` : `/blog/tag/${lastTag}/${n}/`
