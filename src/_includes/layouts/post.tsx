import type { PageData } from '#types'
import { Fragment } from 'npm:preact'

export const layout = 'layouts/root.tsx'

export default (
  data: PageData,
) => {
  const {
    content,
    comp,
    date,
    excerpt,
    icons: { unicons },
    series,
    tags,
    title,
    update,
    url,
    page,
  } = data
  return (
    <Fragment>
      <article
        itemProp='blogPost'
        itemScope
        itemType='http://schema.org/BlogPosting'
      >
        <header className='blog-post-header'>
          <h1 itemProp='headline'>{title}</h1>
          <meta itemProp='description' content={excerpt}></meta>
          <div className='blog-post-meta'>
            {update && (
              <Fragment>
                <span className='mark'>
                  Updated on <comp.blog.time date={update} />
                </span>
                <div className='break-flex'></div>
              </Fragment>
            )}
            <comp.shared.icon
              icon={unicons.calendar}
              size='22'
              title='Calendar'
            />
            <comp.blog.time date={date} />
            <span className='meta-spacer'>&#8226;</span>
            <comp.shared.icon
              icon={unicons.readingTime}
              size='22'
              title='Reading Time'
            />
            <span itemProp='timeRequired'>{page.data.readingTime?.text}</span>
            <div className='break'></div>
            <span className='meta-spacer'>&#8226;</span>
            <div className='blog-post-tags'>
              <comp.blog.tag tags={tags} />
            </div>
          </div>
        </header>
        <comp.blog.tocSeries series={series} url={url} />
        <div
          itemProp='articleBody'
          className='blog-post-body'
          dangerouslySetInnerHTML={{ __html: content as string }}
        />
      </article>
      <comp.blog.showcase url={url} />
    </Fragment>
  )
}
