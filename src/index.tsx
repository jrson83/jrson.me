import type { Data, Helpers } from "@types";

export const title = "Home - jrson.me";
export const layout = "layouts/root.tsx";

export default ({ title }: Data, { url }: Helpers) => (
  <>
    <h1>{title as string}</h1>
    <p>
      This is a JSX page rendered with Preact. <a href={url("/")}>Go to home</a>
    </p>
  </>
);
