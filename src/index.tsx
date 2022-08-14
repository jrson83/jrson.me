import type { Page, PageData } from "#types";

export const title = "Home";
export const layout = "layouts/root.tsx";

export default ({ comp, search }: PageData) => {
  const posts = search?.pages("type=post", "date=desc", 3) as Page[];

  return (
    <>
      <section>
        <h1 style="margin-top: 1.5rem;">Hi 👋, I'm jrson!</h1>
        <p style="margin-top: 2.5rem;">
          I am a passionate web developer who likes to experiment with different
          stacks. I am forced to optimize things to infinity.
        </p>
        <p>
          I blog about my experience I like to share, using{" "}
          <a href="https://nodejs.org/" rel="noopener" target="_blank">
            Node.js
          </a>{" "}
          &{" "}
          <a href="https://deno.land/" rel="noopener" target="_blank">Deno</a>.
        </p>
        <comp.shared.iconbar />
      </section>
      <hr />
      <h2>Recent posts</h2>
      <section itemScope itemType="http://schema.org/Blog">
        {posts.map(({ data }, index) => (
          <comp.blog.post index={index.toString()} {...data} />
        ))}
        {posts?.length === 0 && <p>Sorry, no posts matched your criteria.</p>}
      </section>
    </>
  );
};
