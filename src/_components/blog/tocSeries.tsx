import { capitalize, isEmptyArray } from '#utils'

export default (
  { comp, icons: { unicons }, search, series, url }: Lume.PageProps,
  { urlFilter }: Lume.Helpers,
) => {
  const parts: { title: string; url: string; chapter?: string }[] = []
  const activeUrl = url

  if (typeof series !== 'undefined') {
    for (
      const data of search.pages(
        `series.ident=${series.ident}`,
        'date=asc',
      )
    ) {
      parts.push({
        title: series.title,
        url: urlFilter!(data.url),
        chapter: data.title,
      })
    }
  }

  return (
    <>
      {!isEmptyArray(parts) && (
        <nav className='series-toc'>
          <header>
            <comp.shared.icon
              icon={unicons.listUl}
              size='26'
              color='third-font-color'
            />
            <h1>{capitalize(series.title)} ({parts.length} Part Series)</h1>
          </header>
          <ol className='series-list'>
            {parts.map(({ chapter, url }, index) => {
              return (
                <li key={index}>
                  <a
                    href={urlFilter!(url)}
                    {...(url == activeUrl && { className: 'is-active' })}
                  >
                    {chapter}
                  </a>
                </li>
              )
            })}
          </ol>
        </nav>
      )}
    </>
  )
}
