import type { PageData, PageHelpers } from "#types";

export default ({ comp, site }: PageData, { urlFilter }: PageHelpers) => {
  return (
    <footer className="container">
      <p>
        designed & built by <a href={urlFilter!("/", true)}>{site.shortUrl}</a>
      </p>
      <comp.shared.iconbar />
    </footer>
  );
};
