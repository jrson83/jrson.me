import type { PageData } from "#types";

export const layout = "layouts/root.tsx";

export default (
  {
    children,
    comp,
    date,
    excerpt,
    icons: { unicons },
    readingTime,
    series,
    tags,
    title,
    url,
  }: PageData,
) => {
  return (
    <>
      <article
        itemProp="blogPost"
        itemScope
        itemType="http://schema.org/BlogPosting"
      >
        <header className="blog-post-header">
          <h1 itemProp="headline">{title}</h1>
          <meta itemProp="description" content={excerpt}></meta>
          <div className="blog-post-meta">
            <comp.shared.icon
              icon={unicons.calendar}
              size="22"
              title="Calendar"
            />
            <comp.blog.time date={date} />
            <span className="meta-spacer">&#8226;</span>
            <comp.shared.icon
              icon={unicons.readingTime}
              size="22"
              title="Reading Time"
            />
            <span itemProp="timeRequired">{readingTime?.text}</span>
            <div className="break"></div>
            <span className="meta-spacer">&#8226;</span>
            <comp.blog.tag tags={tags} />
          </div>
        </header>
        <comp.blog.tocSeries series={series} url={url} />
        <div itemProp="articleBody">
          {children}
        </div>
      </article>
      <comp.blog.showcase url={url} />
    </>
  );
};
