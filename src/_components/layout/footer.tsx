export default (
  { comp, site }: Lume.PageProps,
  { urlFilter }: Lume.Helpers,
) => {
  return (
    <footer className='container'>
      <p>
        designed & built by{' '}
        <a href={urlFilter!('/', true)} target='_blank' rel='noopener'>
          {site.shortUrl}
        </a>
      </p>
      <comp.shared.iconbar />
    </footer>
  )
}
