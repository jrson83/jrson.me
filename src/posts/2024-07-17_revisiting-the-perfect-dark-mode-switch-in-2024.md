---
title: Revisiting the perfect Dark Mode Switch in 2024
excerpt: A guide on how to create the perfect Dark Mode Switch.
date: 2024-07-17
draft: false
tags:
  - css
  - html
  - javascript
---

## Introduction

Just want the code? You can find it in my
[gitrepo](https://github.com/jrson83/jrson.me/tree/main/src/assets/examples/perfect-dark-mode-switch.html),
or test the [live Demo](https://jrson.me/examples/perfect-dark-mode-switch.html)
online.

When I was programming my blog two years ago, I was thinking intensively about
how to create the perfect dark mode switch. However, I had the feeling that I
was missing a certain piece of the puzzle to fully understand the concept behind
the
[color-scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/color-scheme)
CSS property, namely a hint in the documentation that confirms my assumption
about the behaviour of the property.

After I accidentally came across an
[updated version](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/light-dark)
of the MDN Web Docs these days, which actually confirms my assumptions at the
time, I took another look at the topic
[The proper way to create a Dark Mode Switch](https://github.com/jrson83/jrson.me/blob/main/src/posts/2022-08-22_the-proper-way-to-create-a-dark-mode-switch.md),
I never published but now I would like to share in this blog post.

> When I reference `prefers-color-scheme` property, I actually mean the user
> indicated preference for color themes through an operating system or user
> agent setting (e.g. light or dark mode).

### Challenges

For the perfect dark mode switch, the following challenges need to be
considered:

- Avoid any [reflows](https://developer.mozilla.org/en-US/docs/Glossary/Reflow)
- Avoid
  [Flash of unstyled content](https://en.wikipedia.org/wiki/Flash_of_unstyled_content)
  (FOUC)
- Avoid duplicate CSS/SCSS code
- Avoid conflicts between `prefers-color-scheme` and selected `value` from
  switch

#### Requirements

The following requirements should be met regarding user `events`:

- on: initial page visit:
  - If a user `prefers-color-scheme`, this should be displayed.
  - If a user does not prefer a `color-scheme`, the default, i.e. 'light',
    should be displayed.
- on: dark mode switch change:
  - If a user interacts with the switch, it should display the `color-scheme`
    accordingly to the selected `color-scheme` from the switch (i.e. should
    override the `prefers-color-scheme` property).
- on: subsequent page visits:
  - If a user has interacted with the dark mode switch, the selected
    `color-scheme` should be displayed (i.e. should override the
    `prefers-color-scheme` property).
  - If a user has not interacted with the dark mode switch, it should fall back
    to the behaviour of the initial page visit.
- on: `prefers-color-scheme` change (while visiting the page):
  - If a user has interacted with the dark mode switch and changes
    `prefers-color-scheme` property (through system or user agent setting), the
    previously saved selection from switch must be discarded because it is no
    longer valid. The page should display the `prefers-color-scheme`
    accordingly.
  - If a user has not interacted with the dark mode switch and changes his
    system/browser-wide preference, the page should display the
    `prefers-color-scheme` accordingly.

### The `color-scheme` CSS property

> The
> [color-scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/color-scheme)
> CSS property allows an element to indicate which color schemes it can
> comfortably be rendered in.

Here is a
[basic example](https://developer.mozilla.org/en-US/docs/Web/CSS/color-scheme#styling_based_on_color_schemes)
of styling based on color schemes:

```css
/*
 * The page supports both light and dark color schemes.
 */
:root {
  color-scheme: light dark;
}

/*
 * The page only supports light color scheme.
 */
:root {
  color-scheme: only light;
}

/*
 * The page only supports dark color scheme.
 */
:root {
  color-scheme: only dark;
}
```

### The `color-scheme` meta tag

To aid user agents in rendering the page background with the desired color
scheme _immediately_, a `color-scheme` value can also be provided in a
`<meta name="color-scheme">` element.

Taken from
[Standard metadata names](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta/name#standard_metadata_names_defined_in_the_html_specification):

> This works at the document level in the same way that the CSS `color-scheme`
> property lets individual elements specify their preferred and accepted color
> schemes.

```html
<!-- The page supports both light and dark color schemes. -->
<meta name="color-scheme" content="light dark" />

<!-- The page only supports light color scheme. -->
<meta name="color-scheme" content="only light" />

<!-- The page only supports dark color scheme. -->
<meta name="color-scheme" content="only dark" />
```

### The `prefers-color-scheme` CSS property

> The
> [prefers-color-scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme)
> CSS media feature is used to detect if a user has requested light or dark
> color themes (preference through an operating system or user agent).

This is just an example using both values. Sure this could be written shorter.

```css
@media (prefers-color-scheme: light) {
  :root {
    background-color: white;
    color: black;
  }
}

@media (prefers-color-scheme: dark) {
  :root {
    background-color: black;
    color: white;
  }
}
```

## The Complete Code

```html showLineNumbers
<!DOCTYPE html>
<html lang="en" data-theme="light">

<script>
  const root = document.documentElement
  const initialTheme = ('theme' in localStorage)
    ? localStorage.getItem('theme')
    : window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'

  if (initialTheme !== 'light') {
    root.setAttribute('data-theme', 'dark')
  }
</script>

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Light/dark mode switch</title>
  <meta name='color-scheme' content='light dark' />
  <style>
    :root[data-theme='light'] {
      color-scheme: light;
      --color-bg: #fff;
      --color-text: #000;
    }

    :root[data-theme='dark'] {
      color-scheme: dark;
      --color-bg: #000;
      --color-text: #fff;
    }

    html {
      background-color: var(--color-bg);
      color: var(--color-text);
    }
  </style>
</head>

<body>
  <h1>Light/dark mode switch</h1>
  <button type="button" id="theme-toggle">Toggle color-scheme</button>

  <script>
    document.addEventListener("DOMContentLoaded", (event) => {
      document.getElementById('theme-toggle').addEventListener('click', () => {
        const nextTheme =
          (getComputedStyle(root).getPropertyValue('color-scheme') ===
            'light')
            ? 'dark'
            : 'light'
        localStorage.setItem('theme', nextTheme)
        root.setAttribute('data-theme', nextTheme)
      })

      window.matchMedia('(prefers-color-scheme: dark)').addEventListener(
        'change',
        (event) => {
          localStorage.removeItem('theme')
          root.setAttribute(
            'data-theme',
            event.matches ? 'dark' : 'light',
          )
        },
      )
    })
  </script>
</body>

</html>
```

## Code Breakdown

### The `color-scheme` meta tag

The page supports both light and dark color schemes:

```html showLineNumbers=21
<meta name="color-scheme" content="light dark" />
```

### Combining `color-scheme` and `prefers-color-scheme`

Since it is unfortunately not possible to overwrite `prefers-color-scheme`, we
use a
[dataset property](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset)
to work around. This approach eliminates the need for duplicate CSS/SCSS code
completely.

And here is my missing piece of the puzzle from the
[MDN Web docs](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/light-dark#setting_colors_based_on_color_scheme):

> ... the `color-scheme` property enables overriding a user's color scheme...
> Forcing ... to only use a light or dark color scheme can be done by setting
> the `color-scheme` property to light or dark.

```css showLineNumbers=22
<style>
  :root[data-theme='light'] {
    color-scheme: light;
    --color-bg: #fff;
    --color-text: #000;
  }

  :root[data-theme='dark'] {
    color-scheme: dark;
    --color-bg: #000;
    --color-text: #fff;
  }

  html {
    background-color: var(--color-bg);
    color: var(--color-text);
  }
</style>
```

This is hard to understand. Basically it means that `color-scheme` exclusively
determines the default appearance, whereas `prefers-color-scheme` determines the
stylable appearance.

### Exploiting JavaScript's bad properties for profit

The `<html>` tag represents the root of an HTML document. To handle all the
challenges, we define a dataset or data-attribute `data-theme` on the document
root. Since we know that the default value of the theme will always be `light`,
we can set this initially.

As the JavaScript and CSS code is critical, it must be inlined. There is no
other option!

- User `prefers-color-scheme=light` or switched `color-scheme=light`, we do
  nothing.
- User `prefers-color-scheme=dark` or switched `color-scheme=dark`, we change
  the value.

Since we use `data-theme` on the `documentElement` and the inline JavaScript
code is executed even before the painting of the `<head>` element starts, it is
not possible for _side effects_ such as reflow or FOUC to occur.

```html showLineNumbers=2
<html lang="en" data-theme="light">

<script>
  const root = document.documentElement
  const initialTheme = ('theme' in localStorage)
    ? localStorage.getItem('theme')
    : window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'

  if (initialTheme !== 'light') {
    root.setAttribute('data-theme', 'dark')
  }
</script>

<head>
<!--
It's ok. Please believe me.
https://html.spec.whatwg.org/multipage/semantics.html#the-html-element
-->
</head>
```

### Adding Event Listeners

The final code adds the required event listeners on the `DOMContentLoaded`
[event](https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event).

The `onClick` event from the `theme-toggle` button will fire a callback when the
user toggles the theme. We check the current `color-scheme` value, equivalent
human readable: `document.documentElement.style.colorScheme` and set it to the
opposite `color-scheme` accordingly. To persist the selection we store the
selected value in the `localStorage`.

The `change` event from the `window.matchMedia` event will fire when the user
toggles their system/user agent preference. The callback removes the persistent
value from `localStorage` and changes the `prefers-color-scheme` accordingly.

```html showLineNumbers=46
<script>
  document.addEventListener("DOMContentLoaded", (event) => {
    document.getElementById('theme-toggle').addEventListener('click', () => {
      const nextTheme =
        (getComputedStyle(root).getPropertyValue('color-scheme') ===
          'light')
          ? 'dark'
          : 'light'
      localStorage.setItem('theme', nextTheme)
      root.setAttribute('data-theme', nextTheme)
    })

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener(
      'change',
      (event) => {
        localStorage.removeItem('theme')
        root.setAttribute(
          'data-theme',
          event.matches ? 'dark' : 'light',
        )
      },
    )
  })
</script>
```
