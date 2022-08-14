import type { PageData, PageHelpers } from "#types";

export default (
  { cacheBusting, children, description, importJs, site, title }: PageData,
  { urlFilter }: PageHelpers,
) => (
  <html lang={site.lang}>
    <head>
      <meta charSet="utf-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>{`${title} - ${site.title}`}</title>

      <meta name="title" content={`${title} - ${site.title}`} />
      <meta name="description" content={description || site.description} />
      <meta name="author" content={site.title} />
      <meta name="copyright" content={site.title} />

      <link rel="stylesheet" href={urlFilter!(`/styles.${cacheBusting}.css`)} />
    </head>
    <body>
      <nav>
        <span>jrson.me</span>
        <ul>
          <li>
            <a href="#">Item 1</a>
          </li>
          <li>
            <a href="#">Item 2</a>
          </li>
          <li>
            <a href="#">Item 3</a>
          </li>
        </ul>
      </nav>
      <main>{children}</main>
      <script type="module" src={urlFilter!(`/scripts/main.${cacheBusting}.js`)} defer />
      {importJs && <script type="module" src={urlFilter!(importJs)} />}
    </body>
  </html>
);
