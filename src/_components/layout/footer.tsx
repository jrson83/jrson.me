import type { PageData, PageHelpers } from "#types";

export default ({ comp, site }: PageData, { urlFilter }: PageHelpers) => {
  return (
    <footer className="container">
      <p>
        designed & built by{" "}
        <a href={urlFilter!("/", true)} target="_blank" rel="noopener">
          {site.shortUrl}
        </a>
      </p>
      <comp.shared.iconbar />
    </footer>
  );
};
