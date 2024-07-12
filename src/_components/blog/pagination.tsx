import type { PageData, PageHelpers } from '#types'
import { getPaginationPages } from '#utils'

export default (
  { comp, icons: { unicons }, pagination }: PageData,
  { urlFilter }: PageHelpers,
) => {
  return (
    <nav id='pagination'>
      <ul
        className='pagination'
        aria-label='Pagination'
        itemScope
        itemType='http://schema.org/SiteNavigationElement/Pagination'
      >
        {pagination?.previous
          ? (
            <li className='prev'>
              <a
                className='pagination__item'
                href={urlFilter!(pagination.previous)}
                title='Previous page'
                aria-label='Previous page'
              >
                <comp.shared.icon
                  icon={unicons.arrowLeft}
                  title=''
                  size='26'
                />{' '}
                &nbsp;Prev
              </a>
            </li>
          )
          : (
            <li className='hidden--v'>
              <comp.shared.icon
                icon={unicons.arrowLeft}
                title=''
                size='26'
              />{' '}
              &nbsp;Prev
            </li>
          )}
        {pagination &&
          getPaginationPages(pagination.totalPages, pagination.page).map((
            pageNumber,
            idx,
          ) => {
            const isNumber = !isNaN(pageNumber)
            const isActive = pagination?.page === pageNumber

            return (
              <li key={idx}>
                <a
                  {...(isActive && { ariaCurrent: true })}
                  {...(!isNumber
                    ? { role: 'link', 'aria-disabled': true }
                    : { href: urlFilter!(`/blog/${pageNumber}`) })}
                  className={`pagination__item ${isActive ? 'is-active' : ''}`}
                >
                  {isNumber ? pageNumber : '...'}
                </a>
              </li>
            )
          })}
        {pagination?.next
          ? (
            <li>
              <a
                className='pagination__item'
                href={urlFilter!(pagination.next)}
                title='Next page'
                aria-label='Next page'
              >
                Next&nbsp;{' '}
                <comp.shared.icon
                  icon={unicons.arrowRight}
                  title=''
                  size='26'
                />
              </a>
            </li>
          )
          : (
            <li className='hidden--v'>
              Next&nbsp;{' '}
              <comp.shared.icon
                icon={unicons.arrowRight}
                title=''
                size='26'
              />
            </li>
          )}
      </ul>
    </nav>
  )
}
