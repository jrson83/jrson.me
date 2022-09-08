---
title: "Creating a Blog with Lume Part 2: Pages & layouts"
excerpt: This is Part 2 of a walkthrough using Lume to set up a prerendered static blog with Preact, TypeScript, Markdown and SASS/SCSS.
date: 2022-08-23 12:00:00
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

In the first part of the series we learned how to install and configure
[Deno](https://deno.land/), [Lume](https://lume.land/) with
[Preact](https://preactjs.com/) and
[TypeScript](https://www.TypeScriptlang.org/). In the following second part we
will look at how to use global data, Markdown files and various plugins with
Lume.

## Defining site data

Lume offers several ways to define data accessible by some or all pages and
layouts. We need such data to e.g. output metadata or Open Graph tags in the
root layout HTML. We have already defined a page `title` in our `index.tsx` page
([Tutorial Part 1](/blog/creating-a-blog-with-lume-part-1-install-and-config/#page)),
which is stored inside the pages object `data` and can be accessed using
`page.data.title`.

As mentioned before, the `data` object is passed to the layout as `props` and
can be easily used by destructuring it.

Lume offers the plugin [metas](https://lume.land/plugins/metas/), which can be
used to add `<meta>` tags for SEO and social networks automatically.

Since I don't have a Twitter account and want to modify some of the meta tags
myself, I will not use the plugin, instead use the
[shared data](https://lume.land/docs/creating-pages/shared-data/) principle, to
define global available data. Instead using `.yml` files, we use `.ts`
TypeScript files.

As Lume suggest in
[merged keys docs](https://lume.land/docs/core/merged-keys/#object-mode), we
create a folder `_data` inside `./src/`. Then we create the file `site.ts`,
which holds our `site` object. Here we define all vars we want to use inside the
root Layout, but maybe also in pages.

```ts:site.ts
export default {
  title: "jrson.me",
  description: "My website description for meta, open graph and twitter card",
  url: "https://jrson.me",
  shortUrl: "jrson.me",
  lang: "en",
  author: {
    name: "jrson83",
    url: "https://jrson.me",
  },
  github: {
    user: "jrson83",
    url: "https://github.com/jrson83",
  },
  ogImage: "/images/site/og-placeholder-1200x630.png",
};
```

To check how Lume handles the `data.site`, we output the layouts `data` with
`console.log(data)` within the layouts default function. When running
`deno task serve` we should see the `data` object logged to the shell:

```ts
{
  ...
  site: {
    title: "jrson.me",
    ...
  },
  tags: [],
  content: [Function: default],
  layout: "layouts/root.tsx",
  title: "Home",
  date: 2022-09-08T21:55:01.154Z,
  url: "/",
  ...
}
```

We make the following changes to our `root.tsx` layout and should see the
resolved metadata when inspecting the page source.

```typescript:root.tsx code-diff showLineNumbers
import type { Helpers, PageData } from "#types";

export default ({ children, description, site, title }: PageData, { url }: Helpers) => {
  return (
-   <html>
+   <html lang={site.lang}>
      <head>
        <meta charSet="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
-       <title>{title}</title>
+       <title>{`${title} - ${site.title}`}</title>

+       <meta name="title" content={`${title} - ${site.title}`} />
+       <meta name="description" content={description || site.description} />
+       <meta name="author" content={site.author} />
+       <meta name="copyright" content={site.author} />

+       <meta name="robots" content="index,follow" />

+       <meta property="og:type" content="website" />
+       <meta property="og:site_name" content={site.title} />
+       <meta property="og:locale" content={site.lang} />
+       <meta property="og:title" content={`${title} - ${site.title}`} />
+       <meta property="og:description" content={description || site.description} />
+       <meta property="og:url" content={url!("/", true)} />
+       <meta property="og:image" content={`${url!(site.ogImage, true)}`} />

+       <meta name="twitter:title" content={`${title} - ${site.title}`} />
+       <meta name="twitter:description" content={description || site.description} />
+       <meta name="twitter:card" content="summary_large_image" />
+       <meta name="twitter:image" content={`${url!(site.ogImage, true)}`} />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
};
```

## Creating the first blog post

To process Markdown files, Lume uses it's
[Markdown plugin](https://lume.land/plugins/markdown/) which is installed by
default and uses [markdown-it](https://github.com/markdown-it/markdown-it)
parser under the hood.

> **Note:** In the
> [experimental-plugins](https://github.com/lumeland/experimental-plugins) repo
> there is also a [unifiedjs](https://unifiedjs.com/) or
> [remark](https://github.com/remarkjs/remark)/[rehype](https://github.com/rehypejs/rehype)
> plugin, which we will use later for various stuff.

We create a directory `./src/posts/`, the first markdown post file
`2022-09-08_hello-world.md` with
[frontmatter](https://lume.land/docs/creating-pages/page-data/) and some
content. We do not need to create a markdown heading for the page title e.g.
`# Welcome to my website`, since we extract it with the frontmatter.

```markdown:2022-09-08_hello-world.md
---
title: Welcome to my website
date: 2022-09-08
draft: false
---

This if my first post using **Lume,**
a static site generator for Deno.

## Hello from sub heading

I hope you enjoy it.
```

Since each blog post uses the same layout, we do not define the layout in each
blog post, but create a `_data.ts` file in the folder `./src/posts/` where we
define the layout once. Additionally we create a `data.type` var to the posts
[page data](https://lume.land/docs/creating-pages/page-data/), to have a
possibility to make a query with the `type=post` later.

```ts:_data.ts
export const type = "post";
export const layout = "layouts/post.tsx";
```

Furthermore we do not want to render the blog post in the root layout, but in
another layout `post.tsx`, which _uses_ the root layout. Therefore we create the
file `post.tsx` inside `./src/_includes/layouts/`.

```ts:post.tsx
import type { PageData } from "#types";

export const title = "Fallback title";
export const layout = "layouts/root.tsx";

export default ({ date, title, children }: PageData) => {
  return (
    <article>
      <header>
        <h1>{title}</h1>
        <time dateTime="">{date}</time>
      </header>
      {children}
    </article>
  );
};
```

When running `deno task serve` we should see our post page url logged to
console. Yet we can't navigate to the post page, but we can copy the url and
paste it in the browser for testing e.g.
`http://localhost:3000/posts/welcome-to-my-website/`.

## Using helper functions

### Date plugin

When viewing the posts page, we notice that the `date` is not rendered at all.
Since we already installed the Lume
[date plugin](https://lume.land/plugins/date/) (which adds a date
[helper function](https://lume.land/docs/configuration/filters/) to Lume), we
need to use it. The plugins `date()` function is accessible through the second
`props` argument `filters`, which can be used in layouts and pages.

```ts:posts.tsx
import type { Helpers, PageData } from "#types";

export const title = "Fallback title";
export const layout = "layouts/root.tsx";

export default ({ date, title, children }: PageData, filters: Helpers) => {
  const prettyDate: string = filters.date(date, "HUMAN_DATE");

  return (
    <article>
      <header>
        <h1>{title}</h1>
        <time dateTime={date as unknown as string}>{prettyDate}</time>
      </header>
      {children}
    </article>
  );
};
```

> Checkout the [date plugin docs](https://lume.land/plugins/date/) to see the
> available date formats.

### URL plugin

We have already installed the
[Slugify URLs plugin](https://lume.land/plugins/slugify_urls/), which slugifys
all page urls to remove conflictive characters. I want a blog post to be
accessible via the url `blog/title-of-the-post/` and the blog post overview via
the url `blog/`. Therefore we use the
[URL plugin](https://lume.land/plugins/url/) which provides a url filter to fix
and resolve urls. In addition I don't want to use the markdown file name as URL,
since it includes a date to order the post files. Instead the blog post `title`
should be used for the slug-url.

In our `./src/posts/_data.ts` file we create a function to set the custom URL's:

```ts:_data.ts
import type { Page } from "#types";

export const type = "post";
export const layout = "layouts/post.tsx";

export function url(page: Page): string {
  return `/blog/${page.data.title}/`;
}
```

### Search plugin

Among other things, we want to display only the last three blog posts on the
home page. For this we use the
[Search plugin](https://lume.land/plugins/search/) which provides a helper
function to search pages from other pages. To our `index.tsx` page we make the
following changes. Notice that we create a query with the `type=post` we created
before in the posts `_data.ts` file.

```ts:index.tsx
import type { Helpers, PageData } from "#types";

export const title = "Home";
export const layout = "layouts/root.tsx";

export default ({ search, title }: PageData, { date, url }: Helpers) => {
  const posts = search.pages("type=post", "date=desc", 3);

  return (
    <>
      <h1>{title}</h1>
      <h2>Recent blog posts</h2>
      <section>
        {posts.map(({ data }) => {
          const prettyDate: string = date(data.date, "HUMAN_DATE");

          return (
            <article>
              <header>
                <h3>
                  <a href={url(data.url)}>{data.title as string}</a>
                </h3>
                <time dateTime={data.date as unknown as string}>
                  {prettyDate}
                </time>
              </header>
            </article>
          );
        })}
      </section>
      {posts.length === 0 && <p>Sorry, no posts matched your criteria.</p>}
    </>
  );
};
```

Now we should see the blog post we created earlier when visiting the home page
at `http://localhost:3000/`, from which we should be able to visit the first
blog post page. Create some more markdown posts and try it out.

## Pagination plugin

As I mentioned before the blog post overview should be accessible with the URL
`blog/`. Here we want to show a limited number of blog posts, while the rest of
all posts can be accessed using a pagination. To archive this we use the
[Pagination plugin](https://lume.land/plugins/paginate/). I recommend to read
the documentation of the plugin before continuing reading the tutorial, to
understand the concept of the plugin.

We will not create a page for the post overview, instead we create a new
`posts.tsx` layout in `./src/_includes/layouts/`, which uses again the
`root.tsx` as layout.

```ts:posts.tsx code-diff
import type { Helpers, PageData } from "#types";

export const title = "Blog posts";
export const layout = "layouts/root.tsx";

- export default ({ search, title }: PageData, { date, url }: Helpers) => {
+ export default ({ title, results, pagination }: PageData, { date, url }: Helpers,) => { 
  return (
    <>
      <h1>{title}</h1>
      ...
      {results.length === 0 && <p>Sorry, no posts matched your criteria.</p>}

+     <nav>
+       <ul aria-label="Pagination">
+         {pagination.previous && (
+           <li>
+             <a
+               href={pagination.previous}
+               title="Previous page"
+               aria-label="Previous page"
+             >
+               Prev
+             </a>
+           </li>
+         )}
+         <li>Page {pagination.page}</li>
+         {pagination.next && (
+           <li>
+             <a
+               href={pagination.next}
+               title="Next page"
+               aria-label="Next page"
+             >
+               Next
+             </a>
+           </li>
+         )}
+       </ul>
+     </nav>
    </>
  );
};
```

Next we create the file `blog.tmpl.ts` inside `./src/` and use the
[Search plugin](https://lume.land/plugins/search/) in combination with the
[Pagination plugin](https://lume.land/plugins/paginate/) to query `type=post`
ordered by `date=desc`, with a limit of `size: 4` posts per page.

```ts:blog.tmpl.ts
import type { Page, PageData } from "#types";

export const layout = "layouts/posts.tsx";

export default function* ({ paginate, search }: PageData) {
  const posts = search?.pages("type=post", "date=desc") as Page[];
  const options = {
    url: (n: number) => n == 1 ? `/blog/` : `/blog/${n}/`,
    size: 4,
  };

  for (const page of paginate(posts, options)) {
    page.type = "posts";
    yield page;
  }
}
```

When visiting our `blog/` overview page, it should now display a maximum number
of 4 posts per page. Create some more markdown posts and try out the pagination.

## Creating a functionless page

Before building the navigation, let's add one more functionless page in order to
have some links to navigate. In our `./src/` folder we create the file
`about.tsx`, which will display some information about us and our blog.

```ts:about.tsx
import type { PageData } from "#types";

export const title = "About";
export const layout = "layouts/root.tsx";

export default ({ title }: PageData) => {
  return (
    <>
      <h1>{title}</h1>
      <p>This is my second page using lume!</p>
    </>
  );
};
```

The page can be accessed visiting http://localhost:3000/about/. Now let's build
the navigation!

### Identifying pages

Currently besides our blog post pages, we have three pages we can build a
navigation from:

- `home/`: The home page
- `blog/`: The blog post overview
- `about/`: The about page

Building a navigation in Lume is an easy task, though I couldn't find any docs
mentioning it. We have to export an additional object we call `menu` from the
files we want to build a navigation from, which we then can access with
`page.data.menu`.

For the home page `index.tsx` we add the `menu` object:

```ts:index.tsx code-diff
+ export const menu = {
+   title,
+   visible: true,
+   order: 0,
+ };
```

For the blog post overview page _template_ `blog.tmpl.ts` we add the `menu`
object:

```ts:blog.tmpl.ts code-diff
for (const page of paginate(posts, options)) {
+ if (page.pagination.page === 1) {
+   page.menu = {
+     title: "Blog",
+     visible: true,
+     order: 1,
+   };
+ }
  page.type = "posts";
  yield page;
}
```

For the about page `about.tsx` we add the `menu` object:

```ts:about.tsx
+ export const menu = {
+   title,
+   visible: true,
+   order: 2,
+ };
```

## Conclusion

In this step of the tutorial series we added our first site `data` to Lume,
created our first blog post and made use of various Lume plugins. In the next
series we will focus on using Components with Lumne.

Our project folder (`cwd`), should now look like this:

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
│  ├─ about.tsx
│  ├─ blog.tmpl.ts
│  ├─ index.tsx
│  ├─ _data
│  │  └─ site_.ts
│  ├─ _includes
│  │  ├─ layouts
│  │  │  ├─ post.tsx
│  │  │  ├─ posts.tsx
│  │  │  └─ root.tsx
│  │  └─ types.ts
│  └─ posts
│     ├─ _data.ts
│     └─ 2022_09-08_hello-world.md
└─ _config.ts
```

Thanks for reading, until next time!

**Helpful Resources:**

- [Lume docs](https://lume.land/docs/overview/about-lume/)
- [Lume plugins](https://lume.land/plugins/?status=all)
