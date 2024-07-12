export const title = 'Blog posts'
export const layout = 'layouts/root.tsx'
export const url = '/blog/'

export default (
  { comp, filteredBy, pagination, results, title }: Lume.PageProps,
) => {
  return (
    <>
      <section>
        <h1>{title}</h1>
        <p>
          Search a total of <strong>{pagination?.totalResults}</strong>{' '}
          posts, by <code>title</code> or <code>tag</code>.
        </p>
      </section>
      <section id='search-wrapper' className='search-wrapper'>
        <comp.blog.search query={filteredBy} />
      </section>
      <section
        id='blog-posts-section'
        itemScope
        itemType='http://schema.org/Blog'
      >
        {results?.map((data, index) => (
          <comp.blog.post index={index.toString()} {...data} />
        ))}
        {results?.length === 0 && <p>Sorry, no posts matched your criteria.</p>}
      </section>
      {pagination?.totalPages! > 1 && (
        <comp.blog.pagination pagination={pagination} />
      )}
    </>
  )
}
