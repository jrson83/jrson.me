import type { PageData } from "#types";

export default (
  { comp, title, date, icons: { unicons }, readingTime, tags }: PageData,
) => {
  return (
    <header>
      <h2 className="blog-post-title" itemProp="headline">{title}</h2>
      <div className="blog-post-meta">
        <comp.shared.icon icon={unicons.calendar} size="22" title="Calendar" />
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
  );
};
