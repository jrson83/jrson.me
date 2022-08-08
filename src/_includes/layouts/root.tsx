import type { Data } from "@types";

export default ({ children, title }: Data) => (
  <html>
    <head>
      <title>{title}</title>
    </head>
    <body>
      <main>{children}</main>
    </body>
  </html>
);
