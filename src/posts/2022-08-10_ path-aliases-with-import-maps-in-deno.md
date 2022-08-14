---
title: Path aliases with import maps on Deno
excerpt: A tiny guide how to resolve paths using path aliases with import maps on Deno.
date: 2022-08-10 09:30:00
draft: false
tags:
  - deno
---

## What are path aliases?

Whether you're working on small or larger projects, long import paths are
impractical and don't look good visually. With path aliases it is possible to
define aliases to use shorter import paths.

```ts:example-before.ts
import { Navbar } from "../../../../navbar.tsx";
import type { Data } from "../../../index.ts";
```

## How to setup path aliases in Deno?

To setup a path alias on Deno, we add the alias to the imports object in our
`import_map.json`.

It is good practice to specify an alias prefix such as tilde, hash or @, to
distinguish project-related imports from 3rd-party modules faster.

```json:import_map.json
{
  "imports": {
    "#src/": "./src/",
    "#types": "./src/types/index.ts"
  }
}
```

The auto-completion in VSCode should work directly after saving the file.

```ts:example-after.ts
import { Navbar } from "#src/navbar.tsx";
import type { Data } from "#types";
```

## Conclusion

To setup a path alias on Deno, we use the Deno `import_map.json`. Using alias
paths makes it much easier for us to work on projects.

**Helpful Resources:**

- [Deno Import maps](https://deno.land/manual@v1.18.2/linking_to_external_code/import_maps)
