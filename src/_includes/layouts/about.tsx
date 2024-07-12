import type { AboutData } from '#types'

export const layout = 'layouts/root.tsx'

export default (
  { blogstacks, icons: { stack }, comp, header, stacks, title }: AboutData,
) => {
  return (
    <section>
      <h1>{title}</h1>
      <h2>{header.title}</h2>
      <blockquote>
        <q>{header.description}</q>
        <footer>— i quote myself</footer>
      </blockquote>
      <hr />
      <h3>{stacks.title}</h3>
      {stacks.icons.map(({ title, items }, index) => (
        <>
          <h4 key={index}>{title}</h4>
          <div className='stack-icon-wrapper'>
            {items.map(({ icon, color, title, url }, index) => (
              <a
                href={url}
                aria-label={title}
                target='_blank'
                rel='nofollow noopener noreferrer'
                className='no-ext'
              >
                <comp.shared.icon
                  key={index}
                  icon={stack[icon]}
                  color={`#${color}`}
                  size='60'
                  title={title}
                />
              </a>
            ))}
          </div>
        </>
      ))}
      <hr />
      <h3>{blogstacks.title}</h3>
      {blogstacks.lists.map(({ description, items }, index) => (
        <>
          <p key={index}>{description}</p>
          <ul>
            {items.map(({ description, title, url }, index) => (
              <li key={index}>
                <a
                  href={url}
                  target='_blank'
                  rel='nofollow noopener noreferrer'
                >
                  {title}
                </a>{' '}
                - {description}
              </li>
            ))}
          </ul>
        </>
      ))}
    </section>
  )
}
