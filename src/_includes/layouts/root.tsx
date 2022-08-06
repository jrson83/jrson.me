import type { Data } from "@types";
import { ComponentChildren } from "../../../plugins/preactjsx/deps.ts";

export default ({ children, title }: Data) => (
  <html>
    <head>
      <title>{title as string}</title>
    </head>
    <body>
      <main>{children as ComponentChildren}</main>
    </body>
  </html>
);
