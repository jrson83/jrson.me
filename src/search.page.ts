export const url = '/search.json'

export default function (
  { search }: Lume.Data,
  { urlFilter, date }: Lume.Helpers,
) {
  const result = []

  for (const data of search.pages('type=post', 'date=desc')) {
    result.push({
      title: data.title,
      date: date(data.date, 'HUMAN_DATE'),
      readingTime: data.readingTime?.text,
      /* excerpt: post.data.excerpt, */
      url: urlFilter!(data.url),
      tags: data.tags,
    })
  }

  return JSON.stringify(result)
}
