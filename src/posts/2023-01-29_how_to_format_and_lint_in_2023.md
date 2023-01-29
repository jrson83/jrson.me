---
title: How to Format and Lint code in 2023
excerpt: "Replace Prettier and ESLint now with a lightweight and faster alternative: Rome"
date: 2023-01-29 05:00:00
draft: false
tags:
  - nodejs
---

I always loved to use [Prettier](https://prettier.io/) when coding nodejs
related projects. I always wanted to get into [ESLint](https://eslint.org/), but
never got used to it, maybe because I didn't like the tons of configuration
options and plugins nor the huge size of dependencies.

But now, there is [Rome](https://rome.tools/)!

## A unified formatter & linter

When I was looking for a lightweight alternative for Prettier and ESLint I found
the tool I never heard before.

> [Rome](https://rome.tools/) unifies your development stack by combining the
> functionality of separate tools.

What I really like about Rome:

- Lightweight in comparison to Prettier & ESLint
  ([Rome v11.0.0](https://arve0.github.io/npm-download-size/#rome) is
  `24.76 MiB`)
- Fast
  ([see benchmark](https://github.com/rome/tools/blob/main/benchmark/README.md))
  > ~25x Faster than Prettier when formatting 85,000 lines of code.
- Like [Deno](https://deno.land/) it includes all linting rules, no tons of
  additional deps
- The documentation is straight forward
- The [playground](https://docs.rome.tools/playground/) is great for trying out
  options
- Easy to migrate from Prettier & ESLint
- Has a
  [Rome VS Code extension](https://marketplace.visualstudio.com/items?itemName=rome.rome)

## How to migrate

1. Get the
   [Rome VS Code extension](https://marketplace.visualstudio.com/items?itemName=rome.rome)
2. [Install](https://docs.rome.tools/guides/getting-started/#installation)
   `rome` with your preferred package manager
3. Create a `rome.json` (here is mine):

```json:rome.json
{
  "$schema": "./node_modules/rome/configuration_schema.json",
  "formatter": {
    "enabled": true,
    "formatWithErrors": false,
    "indentSize": 2,
    "indentStyle": "space",
    "lineWidth": 80,
    "ignore": []
  },
  "javascript": {
    "formatter": {
      "quoteStyle": "single",
      "quoteProperties": "asNeeded",
      "semicolons": "asNeeded",
      "trailingComma": "es5"
    }
  },
  "linter": {
    "enabled": true,
    "ignore": [
      "dist"
    ],
    "rules": {
      "recommended": true
    }
  }
}
```

4. Add the `scripts` to `package.json`

```json
"scripts": {
  "fmt": "rome format src --write",
  "lint": "rome check src"
}
```

5. Enjoy!

## Conclusion

I will keep an eye on the [rome dev blog](https://rome.tools/blog/), since there
is much more planed for the future. Thanks for reading.
