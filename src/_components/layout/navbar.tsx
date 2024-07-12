import type { Page, PageData, PageHelpers } from '#types'

export default (
  { activeUrl, comp, icons, search }: PageData,
  { urlFilter }: PageHelpers,
) => {
  const items = search?.pages('menu.visible=true', 'menu.order') as Page[]

  return (
    <>
      <div
        id='scroll-progress'
        className='scroll-progress'
        role='progressbar'
        title='Reading progress'
      />
      <nav
        className='nav'
        id='main-nav'
        role='navigation'
        itemScope
        itemType='http://schema.org/SiteNavigationElement'
        aria-label='Main Navigation'
      >
        <div className='container'>
          <a
            href='/'
            itemProp='url'
            aria-label='Return home'
          >
            <comp.shared.icon icon={icons.unicons.home} title='Home' />
          </a>
          <ul id='nav-menu' className='menu'>
            {items.map(({ data }) => (
              <li className='menu__item' itemProp='url'>
                <comp.layout.link
                  href={urlFilter!(data.url)}
                  active={data.url === activeUrl ||
                    data?.url?.toString().startsWith('/blog') &&
                      activeUrl?.toString().startsWith('/blog')}
                  itemProp='name'
                >
                  {data?.menu?.title || data.title}
                </comp.layout.link>
              </li>
            ))}
            <li className='menu__item'>
              <button
                className='theme-toggle'
                id='theme-toggle'
                title='Toggles light & dark'
                aria-label='auto'
                aria-live='polite'
              >
                <comp.shared.icon
                  icon={icons.unicons.sun}
                  title='Sun'
                  className='display-dark hidden'
                />
                <comp.shared.icon
                  icon={icons.unicons.moon}
                  title='Moon'
                  size='27'
                  className='display-light hidden'
                />
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </>
  )
}
