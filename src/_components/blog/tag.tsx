export default ({ tags }: Lume.Data, { urlFilter }: Lume.Helpers) => {
  return (
    <>
      {tags?.map((tag: string, index: number) => {
        return (
          <div key={index} className='bdg bdg--tag' itemProp='keywords'>
            #{tag}
            <a href={urlFilter!(`/blog/tag/${tag}/`)} rel='tag'>
              <span
                className='bdg__link'
                role='link'
                tabIndex={0}
                aria-label={tag}
              >
              </span>
            </a>
          </div>
        )
      })}
    </>
  )
}
