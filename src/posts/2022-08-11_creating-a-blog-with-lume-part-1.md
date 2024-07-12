---
title: "Creating a Blog with Lume Part 1: Install & config"
excerpt: This is a walkthrough of using Lume to set up a prerendered static blog with Preact, TypeScript, Markdown and SASS/SCSS.
date: 2022-08-11 12:00:00
updated: 2022-08-23 12:00:00
draft: false
tags:
  - deno
  - lume
  - typescript
series:
  title: Creating a Blog with Lume
  ident: lume
---

## Intro

Webdesign is fun. It should be. Nowadays, when a web developer makes the
decision to create a personal blog, the fun really begins. That's what I thought
when I started diving into the JavaScript world about 10 months ago.

Years ago I started web development as a hobby. Since 2020 I am a trained web
developer, focused on PHP frameworks, like Laravel, Wordpress, SilverStripe and
Magento. Of course, I know pure JavaScript & jQuery, but hadn't really got to
grips with the JavaScript universe until now.

Anyway, after looking into various JavaScript frameworks, I got to a point where
I spent more time dealing with compiler settings, plugins, and development
environment settings than actually programming. And this is where the fun ends,
this is where the passion and love begins.

## What we cover in the Tutorial

This is a walkthrough of using [Lume](https://lume.land/) to set up a
prerendered static blog with [Preact](https://preactjs.com/),
[TypeScript](https://www.TypeScriptlang.org/),
[Markdown](https://www.markdownguide.org/) and
[SASS/SCSS](https://sass-lang.com/). Since I am in the process of creating the
blog myself, I am trying to create a series of tutorials at the same time, to
show step by step how to work with Lume.

A good source to start with Lume:

- [Lume: General concepts](https://lume.land/docs/core/concepts/)

Note that we use Preact components to create pages and layouts, but in Lumes
build process these components will be rendered to static HTML pages. The
purpose of Lume's [JSX plugins](https://lume.land/plugins/jsx/) is to make it
possible to code a website using JSX, but not transpile the JSX. It would of
course be possible to use Preact for interactive components by additionally
using the Lume [ESBuild plugin](https://lume.land/plugins/esbuild/) to transpile
the JSX, but this is not in the current scope of the tutorial.

Since the site I'm going to create requires very little JavaScript for
interactivity, I decided to code these functions in pure JavaScript instead of
using Preact components. So actually we are programming a page with Preact,
without Preact.

If you just want to skip ahead and see the current work in progress state of the
project, you can check out [this repo](https://github.com/jrson83/jrson.me). I
will submit a repo based on tutorial parts later.

## Prerequirements

### Deno

[Lume](https://lume.land/) is a static site generator for
[Deno](https://deno.land/). Under the premise we need to
[install Deno](https://deno.land/#installation).

I'm currently using Windows 11, with Git bash for Windows as shell.

```shell
curl -fsSL https://deno.land/install.sh | sh
```

### Deno for VS Code

We install the available
[Deno extension](https://marketplace.visualstudio.com/items?itemName=denoland.vscode-deno)
on [VS Code](https://code.visualstudio.com/).

In my experience there can be compatibility problems between the Deno extension
and other extensions like Prettier or ESLint. I recommend to disable the Deno
extension completely by default. This can be activated for Deno workspaces if
needed.

## Installing Lume

Let's follow the
[installation instructions](https://lume.land/docs/overview/installation/) on
the website:

```shell
deno run -A https://deno.land/x/lume/install.ts
```

Create a project folder:

```shell
mkdir lume-app
cd lume-app
```

and init a new Lume project running:.

```shell
lume init

Use TypeScript for the configuration file? [y/N]
y

Type the plugins separated by comma or space.

All available options:
- attributes https://lume.land/plugins/attributes/
  ...
- terser https://lume.land/plugins/terser/

Example: postcss terser base_path
```

Which creates the
[configuration file](https://lume.land/docs/configuration/config-file/),
`deno.json` and `import_map.json`. Let's skip all plugins for now.

## Configuring VS Code

After initializing the project, we create an
[.editorconfig](https://github.com/jrson83/jrson.me/blob/main/.editorconfig)
file with my preferred settings, disable [Prettier](https://prettier.io/) for
the current workspace, enable the
[Deno extension](https://marketplace.visualstudio.com/items?itemName=denoland.vscode-deno)
and initialize the current workspace `Ctrl+Shift+P`:

```shell
Deno: Initialize Workspace Configuration command.
```

We replace the content of the newly created `./vscode/settings.json` file. It
makes sense to add `deno.config` here, because it references to the
`import_map.json`. With this step the IDE and also TypeScript will recognize
local import paths for sure.

```json:deno.config
{
  "deno.enable": true,
  "deno.lint": true,
  "deno.unstable": true,
  "deno.config": "./deno.json",
  "[typescript]": {
    "editor.defaultFormatter": "denoland.vscode-deno"
  },
  "deno.suggest.imports.hosts": {
    "https://deno.land": true,
    "https://esm.sh": true
  }
}
```

You can read a more in depth guide about configuring VS Code/workspaces with
deno on
[Rahul Swarnkar's blog post](https://rahulswarnkar.github.io/programming/deno/2020/11/22/developer-setup-for-programming-with-deno.html).

## Checking the default settings

Since I never worked with Deno before, let's have a look at the created files.
The Lume `_config.ts`:

```ts
import lume from 'lume/mod.ts'

const site = lume()

export default site
```

The `deno.json` file:

```json
{
  "importMap": "import_map.json",
  "tasks": {
    "lume": "deno eval \"import 'lume/task.ts'\" --",
    "build": "deno task lume",
    "serve": "deno task lume -s"
  }
}
```

And the `import_map.json`:

```json
{
  "imports": {
    "lume/": "https://deno.land/x/lume@v1.10.4/"
  }
}
```

## Configuring Deno settings

### Code formatter

Since Deno comes with its own
[code formatter](https://deno.land/manual/tools/formatter) called `fmt`, let's
adjust the
[default settings](https://deno.land/manual/getting_started/configuration_file)
within the `deno.json` file. Sadly, there is no
[Option to remove semicolons](https://github.com/denoland/deno/issues/13616).

```json:deno.json
{
  "fmt": {
    "files": {
      "exclude": ["./_site"]
    },
    "options": {
      "useTabs": false,
      "lineWidth": 80,
      "indentWidth": 2,
      "singleQuote": false,
      "proseWrap": "always"
    }
  }
}
```

### Linter

We do the same with Deno [Linter](https://deno.land/manual/tools/linter) and
edit the
[default settings](https://deno.land/manual/getting_started/configuration_file).
If you want to go more in depth, visit the
[deno_lint rule documentation](https://lint.deno.land/).

```json:deno.json
{
  "lint": {
    "files": {
      "exclude": ["./_site"]
    },
    "rules": {
      "tags": ["recommended"],
      "exclude": ["no-explicit-any", "no-unused-vars"]
    }
  }
}
```

### Commands / tasks

To complete the configuration, we add tree more tasks, for cleaning up
[Lumes `dest` folder](https://lume.land/docs/configuration/config-file/#dest)
(defaults to `_site`) and running `fmt`.

```json:deno.json {5} showLineNumbers
{
  "importMap": "import_map.json",
  "tasks": {
    "lume": "deno eval \"import 'lume/task.ts'\" --",
    "clean": "rm -rf _site/",
    "build": "deno task lume",
    "serve": "deno task lume -s"
  }
}
```

### Import maps

When moving from [NodeJS](https://nodejs.org/en/) to [Deno](https://deno.land/),
the main difference is in the
[handling and use of the packages](https://deno.land/manual@v1.15.2/npm_nodejs).
If you're like me, you haven't had much to do with import maps before, here are
some sources of information related to.

- [Deno: Import maps](https://deno.land/manual/linking_to_external_code/import_maps)
- [Deno: Using import maps](https://deno.land/manual@v1.15.2/npm_nodejs/import_maps)
- [Developpaper: import-maps & Deno](https://developpaper.com/import-maps-deno/)

Like used in NodeJS, we can setup aliases for import paths in Deno. This is
pretty useful, when working on a project with multiple directories, so we don't
need to reference a path using `../../../dir/file.ts`, instead we can just
import `#dir/file.ts`.

I couldn't find any information regarding how to setup import alias paths in
Deno. Here is how we setup the paths for now:

```json:import_map.json {4,5} showLineNumbers
{
  "imports": {
    "lume/": "https://deno.land/x/lume@v1.10.4/",
    "#plugins/": "./plugins/",
    "#types": "./src/_includes/types.ts"
  }
}
```

## Configuring Lume

### Config file

[Configuring Lume](https://lume.land/docs/configuration/config-file/) is a
straightforward task. The only option I want to change is the target `src`
directory (defaults to `cwd`), which I created before.

```ts:_config.ts {2} showLineNumbers
const site = lume({
  src: "./src",
});
```

### Plugins

In addition to the default plugins there is an
[experimental-plugins](https://github.com/lumeland/experimental-plugins)
repository. To use these plugins, either include the RAW files hosted on Github
via `import` or `import_map.json`, or create a local copy of the files, which
you then can import.

> **Note:** As I've already mentioned, I've been looking into different
> JavaScript frameworks. My favorite framework for developing JavaScript
> applications is definitely [Preact](https://preactjs.com/).
>
> When I looked at the plugins, I noticed there is a JSX plugin which is only
> compatible with [React](https://reactjs.org/), but found an issue related to
> [Add support for other JSX libraries #199](https://github.com/lumeland/lume/issues/199).
> <br><br> When I joined the [Lume Discord](https://discord.gg/YbTmpACHWB), I
> found out that there were no other JSX plugins in the making and decided to
> develop a plugin for `Preact`, which I did right after. Currently the plugin
> can be found in the
> [experimental-plugins](https://github.com/lumeland/experimental-plugins)
> repository.

> **Update:** The Preact plugin is included in Lume since version 1.11.2!

Let's look at all the [plugin](https://lume.land/plugins/?status=all)
descriptions and choose what we need to get started. Additionally we create a
local copy of the
[PreactJSX](https://github.com/lumeland/experimental-plugins/tree/main/preactjsx)
plugin, which we import with the local alias path.

```ts:_config.ts {3-4,6-7,13-16} showLineNumbers
// default plugins
import lume from "lume/mod.ts";
import date from "lume/plugins/date.ts";
import slugify_urls from "lume/plugins/slugify_urls.ts";

// custom plugins
import preactjsx from "#plugins/preactjsx/mod.ts";

const site = lume({
  src: "./src",
});

site
  .use(date())
  .use(slugify_urls())
  .use(preactjsx());

export default site;
```

## Configuring TypeScript

In order for TypeScript to work with the Preact plugin, we need to do two
things.

1. Add the `preact/jsx-runtime` alias to the `import_map.json`, which finally
   looks as follows:

```json:import_map.json {4-5} showLineNumbers
{
  "imports": {
    "lume/": "https://deno.land/x/lume@v1.10.4/",
    "preact/jsx-runtime": "https://esm.sh/preact@10.10.6/jsx-runtime",
    "preact/jsx-dev-runtime": "https://esm.sh/preact@10.10.6/jsx-dev-runtime",
    "#plugins/": "./plugins/",
    "#types": "./src/_includes/types.ts"
  }
}
```

2. Add TypeScript `compilerOptions` to the `deno.json` file. To learn more about
   how Deno handles TypeScript, check out the docs
   [TypeScript overview](https://deno.land/manual/TypeScript/overview).

```json:deno.json {3-6} showLineNumbers
{
  "importMap": "import_map.json",
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "preact"
  }
}
```

## Setting up types

Since there is no guide on how use `types` in Lume currently, I think the best
way to get started is to extend the current type definitions. Let's create the
file `./src/_includes/types.ts` and extend some default types. This may be
changed later.

> **Update:** I added a guide on how to use Lume with TypeScript to the
> [Lume docs](https://lume.land/docs/configuration/using-typescript/).

```ts:types.ts
import type { Page as BasePage, PageData as BasePageData } from "lume/core.ts";

// To handle all types in one place, use re-export
export type { PageHelpers } from "lume/core.ts";

export interface PageData extends BasePageData {
  // Define your own properties
  readingTime?: string;
}

// Create a new interface
export interface Page extends BasePage {
  data: PageData;
}
```

> **Note:** To auto-import types in a Deno project, or make them work in
> `global` scope, the
> [docs outline](https://deno.land/manual/typescript/types#using-ambient-or-global-types)
> to use `triple-slash directive` or make use the `compilerOptions.types` and
> assign a `.d.ts` file. However, no solution worked for me, because the VS Code
> Deno extension kept continuously throwing errors at me, regarding the
> definition file paths.

## Creating the first page with layout

### Layout

Following the [JSX plugin guide](https://lume.land/plugins/jsx/), we need to
create a `root` layout file, which is a wrapper for all our pages. It includes
the HTML document structure and receives a `data` object argument as `props` we
just destructure. Finally it renders the pages as `children`.

> Layout files are loaded from a special directory named _includes. This
> directory can contain not only layouts but other files, so a good practice is
> to save them in a subdirectory like _includes/layouts.

We create our root layout inside the folder `./src/_includes/layouts/`. The
missing `<!DOCTYPE html>` tag, Lume will add automatically.

```ts:root.tsx
import type { PageData } from "#types";

export default ({ title, children }: PageData) => {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title}</title>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
};
```

> To learn more on how Lume handles
> [layouts](https://lume.land/docs/creating-pages/layouts/) and
> [layout data](https://lume.land/docs/creating-pages/layouts/#layout-data),
> check out the docs [General concept](https://lume.land/docs/core/concepts/),
> if you havn't.

### Page

Lume uses any `index.*` file as main entry for the app. We create our first
`index.tsx` page inside the folder `./src`. In addition we define a page `title`
and `layout`, which references our `root.tsx` layout. Note that all layouts are
relative to `_includes` directory, which Lume automatically resolves.

Read more on pages in the
[Page files](https://lume.land/docs/creating-pages/page-files/) docs.

```ts:index.tsx
import type { PageData } from "#types";

export const title = "Home";
export const layout = "layouts/root.tsx";

export default ({ title }: PageData) => {
  return (
    <>
      <h1>{title}</h1>
      <p>This is my first page using lume. I hope you like it!</p>
    </>
  );
};
```

## Testing the setup

Now the fun begins. We format our code `deno task format`, run `deno task serve`
inside our shell and open [http://localhost:3000/](http://localhost:3000/).

```shell
❯ deno task serve

Loading config file D:\lume-app\_config.ts

🔥 / /index.tsx

🍾 Site built into ./_site

    Server started at:
    http://localhost:3000/ (local)
    http://192.168.56.1:3000/ (network)
```

## Deployment

Since I want to maintain my website within a git repository, but not use github
pages for deploying, instead use a custom workflow action, I setup a normal
[git repository](https://github.com/jrson83/jrson.me) and add
[LICENSE](https://github.com/jrson83/jrson.me/blob/main/LICENSE),
[README.md](https://github.com/jrson83/jrson.me/blob/main/README.md) and
[.gitignore](https://github.com/jrson83/jrson.me/blob/main/.gitignore) files to
my project root.

Lume is offering multiple ways to deploy your website. For a detailed list
checkout the [Lume docs](https://lume.land/docs/advanced/deployment/).

## Conclusion

In this step of the tutorial series we have installed and configured
[Deno](https://deno.land/), [Lume](https://lume.land/) and setup a basic Lume
app, with [Preact](https://preactjs.com/),
[TypeScript](https://www.typescriptlang.org/) and Markdown support. Our project
folder (`cwd`), should now look like this:

```shell
lume-app
├─ .editorconfig
├─ .gitignore
├─ .vscode
│  ├─ extensions.json
│  └─ settings.json
├─ deno.json
├─ import_map.json
├─ LICENSE
├─ plugins
│  └─ preactjsx
│     ├─ deps.ts
│     └─ mod.ts
├─ README.md
├─ src
│  ├─ index.tsx
│  └─ _includes
│     ├─ layouts
│     │  └─ root.tsx
│     └─ types.ts
└─ _config.ts
```

I hope you enjoyed my second blog post. The next part of the tutorial series
will be about setting um Pages, Components & Layouts in detail. I will continue
the tutorial series asap.

Thanks for reading, until next time!

**Helpful Resources:**

- [Lume docs](https://lume.land/docs/overview/about-lume/)
- [Deno docs](https://deno.land/manual)
- [Deno for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=denoland.vscode-deno)
- [Velociraptor docs](https://velociraptor.run/)
- [Velociraptor for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=umbo.vscode-velociraptor)
