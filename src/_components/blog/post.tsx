import type { PageData, PageHelpers } from "#types";

export default (
  {
    comp,
    title,
    date,
    icons: { unicons },
    readingTime,
    tags,
    excerpt,
    url,
    index,
  }: PageData,
  { urlFilter }: PageHelpers,
) => {
  return (
    <article
      className="blog-post"
      id={`blog-post-${index}`}
      itemProp="blogPosts"
      itemScope
      itemType="http://schema.org/BlogPosting"
    >
      <comp.blog.header
        title={title}
        date={date}
        readingTime={readingTime}
        tags={tags}
      />
      <div itemProp="description">
        <p>{excerpt}</p>
      </div>
      <p className="read-more">
        Read more{" "}
        <comp.shared.icon
          icon={unicons.arrowRight}
          title=""
          size="26"
        />
      </p>
      <a href={urlFilter!(url)} itemProp="url" aria-label="Read more">
        <span class="blog-post-link"></span>
      </a>
    </article>
  );
};
