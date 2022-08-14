import type { PageData } from "#types";

export const title = "Blog posts";
export const layout = "layouts/root.tsx";
export const url = "/blog/";

export default ({ comp, filteredBy, pagination, results, title }: PageData) => {
  return (
    <>
      <section>
        <h1>{title}</h1>
        <p>
          Search a total of <strong>{pagination?.totalResults}</strong>{" "}
          posts, by <code>title</code> or <code>tag</code>.
        </p>
      </section>
      {/* Browse the following posts, or use the search below to filter. */}
      <section id="search-wrapper" class="search-wrapper">
        <comp.blog.search query={filteredBy} />
      </section>
      <h2>{filteredBy && `Tagged “${filteredBy}”`}</h2>
      <section
        id="blog-posts-section"
        itemScope
        itemType="http://schema.org/Blog"
      >
        {results?.map(({ data }, index) => (
          <comp.blog.post index={index.toString()} {...data} />
        ))}
        {results?.length === 0 && <p>Sorry, no posts matched your criteria.</p>}
      </section>
      {pagination?.totalPages! > 1 && (
        <comp.blog.pagination pagination={pagination} />
      )}
    </>
  );
};
