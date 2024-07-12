import type { PageData, PageHelpers } from '#types'

export default (
  { comp, icons: { unicons }, site }: PageData,
  { urlFilter }: PageHelpers,
) => (
  <ul className='li-i'>
    <li>
      <a
        className='no-ext'
        href="javascript:location='mailto:\u0074\u0065\u0073\u0074\u0040\u0062\u006c\u0061\u002e\u0064\u0065';void 0"
        aria-label='Contact me by email'
      >
        <comp.shared.icon
          icon={unicons.envelope}
          title='Contact me by email'
        />
      </a>
    </li>
    <li>
      <a
        className='no-ext'
        href={site.github.url}
        target='_blank'
        rel='noopener'
        aria-label='Visit my Github profile'
      >
        <comp.shared.icon
          icon={unicons.github}
          title='Visit my Github profile'
        />
      </a>
    </li>
    <li>
      <a
        className='no-ext'
        href={site.twitter.url}
        target='_blank'
        rel='noopener'
        aria-label='Visit my Twitter profile'
      >
        <comp.shared.icon
          icon={unicons.twitter}
          title='Visit my Twitter profile'
        />
      </a>
    </li>
    <li>
      <a
        className='no-ext'
        href={urlFilter!('/feed.xml', true)}
        target='_blank'
        rel='noopener'
        aria-label='Visit my XML Feed'
      >
        <comp.shared.icon
          icon={unicons.rss}
          title='Visit my XML Feed'
        />
      </a>
    </li>
  </ul>
)
