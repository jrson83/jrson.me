export const indexable = false
export const title = '404: Page Not Found'
export const layout = 'layouts/root.tsx'
export const url = '/404/'

export default (_data: Lume.Data, { urlFilter }: Lume.Helpers) => {
  return (
    <>
      <h1>{title}</h1>
      <p>Sorry, the page you are looking for could not be found.</p>
      <p>
        <a href={urlFilter!('/')}>
          Return Home
        </a>
      </p>
    </>
  )
}
