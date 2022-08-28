import type { PageData, PageHelpers } from "#types";

export default (
  { children, comp, description, excerpt, importJs, site, title, url }:
    PageData,
  { urlFilter }: PageHelpers,
) => {
  return (
    <html itemScope itemType="http://schema.org/WebPage" lang={site.lang}>
      <head>
        <meta charSet="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{`${title} - ${site.title}`}</title>
        <link
          rel="preload"
          href="/fonts/Inter-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />

        <meta name="title" content={`${title} - ${site.title}`} />
        <meta name="description" content={excerpt || site.description} />
        <meta name="author" content={site.title} />
        <meta name="copyright" content={site.title} />

        <meta name="robots" content="index,follow" />
        <meta name="google" content="nositelinkssearchbox" />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={site.title} />
        <meta property="og:locale" content={site.lang} />
        <meta property="og:title" content={`${title} - ${site.title}`} />
        <meta
          property="og:description"
          content={excerpt || site.description}
        />
        <meta property="og:url" content={urlFilter!(site.url)} />
        <meta
          property="og:image"
          content={`${urlFilter!(site.ogImage, true)}`}
        />

        <meta name="twitter:title" content={`${title} - ${site.title}`} />
        <meta
          name="twitter:description"
          content={excerpt || site.description}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:image"
          content={`${urlFilter!(site.ogImage, true)}`}
        />
        <meta name="twitter:creator" content={site.twitter} />
        <meta name="twitter:site" content={site.twitter} />

        <meta itemProp="name" content={site.title} />
        <meta itemProp="url" content={urlFilter!(site.url)} />
        <meta itemProp="creator" content={site.author.name} />

        <link
          rel="sitemap"
          type="application/xml"
          title="Sitemap"
          href={urlFilter!("/sitemap.xml")}
        />
        <link
          rel="alternate"
          type="application/atom+xml"
          title="Atom feed"
          href={urlFilter!("/feed.xml")}
        />

        <link rel="manifest" href={urlFilter!("/manifest.json")} />

        <meta
          name="theme-color"
          content="#F2F2F2"
          media="(prefers-color-scheme: light)"
        />
        <meta
          name="theme-color"
          content="#1F2428"
          media="(prefers-color-scheme: dark)"
        />

        <link
          rel="icon"
          type="image/x-icon"
          href={urlFilter!("/images/pwa/favicon.ico")}
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={urlFilter!("/images/pwa/apple-touch-icon.png")}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={urlFilter!("/images/pwa/favicon-32x32.png")}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href={urlFilter!("/images/pwa/favicon-16x16.png")}
        />

        <link rel="stylesheet" href={urlFilter!(`/styles.css`)} />
      </head>
      <body>
        <comp.layout.navbar activeUrl={url} />
        <main
          id="page-content"
          className="container"
          itemScope
          itemProp="mainContentOfPage"
          itemType="https://schema.org/Blog"
        >
          {children}
        </main>
        <comp.layout.footer />
        <script
          type="module"
          nonce="CSP_NONCE"
          src={urlFilter!(`/scripts/main.js`)}
        />
        {importJs && (
          <script
            type="module"
            nonce="CSP_NONCE"
            src={urlFilter!(importJs)}
          />
        )}
      </body>
    </html>
  );
};
