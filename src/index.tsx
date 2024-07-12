export const renderOrder = 1

export const indexable = true
export const title = 'Home'
export const layout = 'layouts/root.tsx'

export default ({ comp, search }: Lume.Data) => {
  const posts = search.pages('type=post', 'date=desc', 3)

  return (
    <>
      <section>
        <h1>Hi 👋, I'm jrson!</h1>
        <p>
          I am a passionate web developer who likes to experiment with different
          stacks. I am forced to optimize things to infinity.
        </p>
        <p>
          I blog about my experience I like to share, using{' '}
          <a
            href='https://nodejs.org/'
            target='_blank'
            rel='nofollow noopener noreferrer'
          >
            Node.js
          </a>{' '}
          &{' '}
          <a
            href='https://deno.land/'
            target='_blank'
            rel='nofollow noopener noreferrer'
          >
            Deno
          </a>.
        </p>
        <comp.shared.iconbar />
      </section>
      <hr />
      <h2>Recent posts</h2>
      <section itemScope itemType='http://schema.org/Blog'>
        {posts.map(({ data }, index) => (
          <comp.blog.post index={index.toString()} {...data} />
        ))}
        {posts?.length === 0 && <p>Sorry, no posts matched your criteria.</p>}
      </section>
    </>
  )
}
