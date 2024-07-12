export default (
  { activeUrl, comp, icons, search }: Lume.PageProps,
  { urlFilter }: Lume.Helpers,
) => {
  const items = search.pages('menu.visible=true', 'menu.order')

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
            {items.map(({ url, menu, title }) => (
              <li className='menu__item' itemProp='url'>
                <comp.layout.link
                  href={urlFilter!(url)}
                  active={url === activeUrl ||
                    url?.toString().startsWith('/blog') &&
                      activeUrl?.toString().startsWith('/blog')}
                  itemProp='name'
                >
                  {menu?.title || title}
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
