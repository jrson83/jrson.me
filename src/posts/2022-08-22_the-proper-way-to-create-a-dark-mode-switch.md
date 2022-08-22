---
title: The proper way to create a Dark Mode Switch
excerpt: How to create a Dark Mode Switch wich is actually working.
date: 2022-08-22 13:00:00
draft: false
tags:
  - css
  - javascript
---

Let's create a proper Dark Mode Switch.

## Example

See the code inside my
[gitrepo](https://github.com/jrson83/jrson.me/tree/main/src/assets/examples/dark-mode-switch.html),
or test the [live Demo](https://jrson.me/examples/dark-mode-switch.html). Keep
an eye on the browser-scrollbar, which indicates the `mode-change`.

<video controls="controls">
  <source type="video/mp4" src="/mp4/dark-mode-switch.mp4"></source>
  <p>Your browser does not support the audio element.</p>
</video>

## Code we need

### meta[name='supported-color-schemes']

[https://lilles.github.io/specs/supported-color-schemes-meta.html](https://lilles.github.io/specs/supported-color-schemes-meta.html)

> The value defines the default supported color schemes for the document and
> allow the UA to know what backdrop color to draw early on to avoid white flash
> before rendering a dark themed document.

```html
// We use `supported-color-schemes`.
// The browser will now know our page supported color-schemes.
<meta name="supported-color-schemes" content="light dark" />

// equals

<style>
:root {
  color-schemes: light dark;
}
</style>
```

### meta[name='color-schemes']

[https://developer.mozilla.org/en-US/docs/Web/CSS/color-scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/color-scheme)

> Common choices for operating system color schemes are "light" and "dark", or
> "day mode" and "night mode". When a user selects one of these color schemes,
> the operating system makes adjustments to the user interface. This includes
> form controls, scrollbars, and the used values of CSS system colors.

```html
// To opt in a users `color-scheme` preferences we can
// use a `meta` tag or declare color-scheme on the `:root` element.
<meta name="color-scheme" content="light" />

// equals

<style>
  :root {
    color-scheme: light;
  }
  :root {
    color-scheme: dark;
  }
</style>
```

### meta[name='theme-color']

```html
// We use the meta tag to define conditional theme colors for PWAs.
<meta name="theme-color" content="#fff" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#121212" media="(prefers-color-scheme: dark)">
```

One alternative way is to conditionally include two different `manifest.json`
files and disable one `onLoad`. See
[maifest issue #975](https://github.com/w3c/manifest/issues/975).

### JavaScript

```js:inline-js
const root = document.documentElement;
const mediaQuery = "(prefers-color-scheme: dark)";
const mediaMatch = window.matchMedia;
const currentMode = mediaMatch(mediaQuery).matches;

// Store the current user `theme` in `root` & localStorage
const storeTheme = (targetTheme) => {
  if ("boolean" === typeof targetTheme) {
    targetTheme = targetTheme ? "dark" : "light";
  }
  root.setAttribute("data-theme", targetTheme);
  localStorage.setItem("theme", targetTheme);
};

// We check & use localStorage OR `currentMode`
const storedTheme = ("theme" in localStorage)
  ? localStorage.getItem("theme")
  : currentMode;

// Yes we store the theme
storedTheme && storeTheme(storedTheme);

// We add an `addEventListener` on the toggle button
document.getElementById("theme-toggle").addEventListener("click", () => {
  const currentTheme =
    (getComputedStyle(root).getPropertyValue("color-scheme") == "light");
  storeTheme(!!currentTheme);
});

// We listen to user theme changes
mediaMatch(mediaQuery).addEventListener("change", (event) => {
  storeTheme(event.matches);
});
```

### CSS

```css:inline-css
/** We define one `light` & one `dark` root */
:root[data-theme='light'] {
  color-scheme: light;
  --background-color: #fff;
  --text-color: #121416d8;
  --link-color: #d77c3f;
}
/** We use `data-theme`, since it's easy to handle */
:root[data-theme='dark'] {
  color-scheme: dark;
  --background-color: Canvas;
  --text-color: #F7F8F8;
  --link-color: #d77c3f;
}

body {
  background: var(--background-color);
  color: var(--text-color);
}
```

### The complete code

```html:index.html {3-34,38-60,64} showLineNumbers
<!DOCTYPE html>
<html lang="en">
<script type="module">
  const root = document.documentElement;
  const mediaQuery = "(prefers-color-scheme: dark)";
  const mediaMatch = window.matchMedia;
  const currentMode = mediaMatch(mediaQuery).matches;

  const storeTheme = (targetTheme) => {
    if ("boolean" === typeof targetTheme) {
      targetTheme = targetTheme ? "dark" : "light";
    }
    root.setAttribute("data-theme", targetTheme);
    localStorage.setItem("theme", targetTheme);
  };

  const storedTheme = ("theme" in localStorage)
    ? localStorage.getItem("theme")
    : currentMode;

  storedTheme && storeTheme(storedTheme);

  document.getElementById("theme-toggle").addEventListener("click", () => {
    const currentTheme =
      (getComputedStyle(root).getPropertyValue("color-scheme") == "light");
    storeTheme(!!currentTheme);
  });

  mediaMatch(mediaQuery).addEventListener("change", (event) => {
    storeTheme(event.matches);
  });
</script>
<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Light | Dark mode switch</title>
<meta name="supported-color-schemes" content="light dark" />
<meta name="theme-color" content="#fff" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#121212" media="(prefers-color-scheme: dark)">
<style>
  :root[data-theme='light'] {
    color-scheme: light;
    --background-color: #fff;
    --text-color: #121416d8;
    --link-color: #d77c3f;
  }

  :root[data-theme='dark'] {
    color-scheme: dark;
    --background-color: Canvas;
    --text-color: #F7F8F8;
    --link-color: #d77c3f;
  }

  body {
    background: var(--background-color);
    color: var(--text-color);
  }
</style>
</head>
<body>
<h1>Light | Dark mode switch</h1>
<button id="theme-toggle">Change mode</button>
<div style="height:2000px"></div>
</body>
</html>
```
