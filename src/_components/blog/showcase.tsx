import { truncateString } from '#utils'

export default (
  { comp, icons: { unicons }, search, url }: Lume.PageProps,
  { urlFilter }: Lume.Helpers,
) => {
  const previousPost = search.previousPage(
    url,
    'type=post',
  )

  const nextPost = search.nextPage(
    url,
    'type=post',
  )

  return (
    <nav
      className='showcase'
      role='navigation'
      itemScope
      itemType='http://schema.org/SiteNavigationElement'
      aria-label='Pagination Navigation'
    >
      {previousPost && typeof previousPost.url !== 'undefined'
        ? (
          <a
            href={urlFilter!(previousPost.url)}
            rel='prev'
            className='showcase__item'
            itemProp='url'
          >
            <button className='showcase__btn' title='Previous post'>
              <span>
                <comp.shared.icon
                  icon={unicons.arrowLeft}
                  title=''
                  size='28'
                />
              </span>
              <span className='showcase__text left'>
                <small itemProp='name'>Previous</small>
                <span>
                  {truncateString(
                    previousPost.title!,
                    30,
                    '...',
                    true,
                  )}
                </span>
              </span>
            </button>
          </a>
        )
        : <div className='showcase__item' />}
      {nextPost && typeof nextPost.url !== 'undefined' && (
        <a
          href={urlFilter!(nextPost.url)}
          rel='next'
          className='showcase__item'
          itemProp='url'
        >
          <button className='showcase__btn' title='Next post'>
            <span className='showcase__text right'>
              <small itemProp='name'>Next</small>
              <span>
                {truncateString(
                  nextPost.title!,
                  30,
                  '...',
                  true,
                )}
              </span>
            </span>
            <span>
              <comp.shared.icon
                icon={unicons.arrowRight}
                title=''
                size='28'
              />
            </span>
          </button>
        </a>
      )}
    </nav>
  )
}
