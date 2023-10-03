---
title: "How to @use/@forward %placeholders and @extend selectors with SASS/SCSS @mixins effectively"
excerpt: "In this blog post we learn how to @use %placeholders in complex SASS/SCSS modules"
date: 2023-10-03 23:00:00
draft: false
tags:
  - css
  - sass
  - scss
---

## Introduction

Following the
[SASS documentation](https://sass-lang.com/documentation/at-rules/extend/) there
are some hints related when and at which point in a file an `@extended` selector
is inserted:

> Extends are resolved after the rest of your stylesheet is compiled. In
> particular, it happens after parent selectors are resolved.

> Because @extend updates style rules that contain the extended selector, their
> styles have precedence in the cascade based on where the extended selector’s
> style rules appear, not based on where the @extend appears.

Taking the following SASS/SCSS example code:

```sass:input.scss
.first {
  color: green;
}

.second {
  @extend %example-placeholder;
  background-color: blue;
}

.third {
  @extend %example-placeholder;
  background-color: yellow;    
}

%example-placeholder {
  color: red;
}
```

Compiles to CSS output:

```css:output.css
.first {
  color: green;
}

.second {
  background-color: blue;
}

.third {
  background-color: yellow;
}

/* @extend rule is inserted at %placeholder position */
.third, .second {
  color: red;
}
```

In this example we can influence where in `output.css` the @extend rules are
inserted. We could move the placeholder above the `.second` class so that the
rules appear in that place:

```sass:input.scss
.first {
  color: green;
}

%example-placeholder {
  color: red;
}

.second {
  @extend %example-placeholder;
  background-color: blue;
}

.third {
  @extend %example-placeholder;
  background-color: yellow;    
}
```

Compiles to CSS output:

```css:output.css
.first {
  color: green;
}

/* @extend rule is inserted at %placeholder position */
.third, .second {
  color: red;
}

.second {
  background-color: blue;
}

.third {
  background-color: yellow;
}
```

In this case it is not very usefull, but there may be situations where the order
is important.

## How to not `@use` `%placeholders` in modules

When I first tried to integrate a `%placeholder` in my SASS/SCSS library I
encountered a problem. Since my library uses the new `@use/@forward` syntax
instead of `@import`, all contents are divided into files/modules and many
`@mixins` are used.

I first created a separate file for the `%placeholder`, which I then loaded into
the component modules like `element/_badge.scss` or `element/_button.scss`.

> Sorry that this example may be a bit complex. I have tried to keep it as short
> as possible.

```sass:placeholder/_index.scss
%generic-placeholder {
  color: red;
}
```

```sass:element/_badge.scss
@use '../placeholder' as *;

@mixin generate-badge {
  .bdg {
    @extend %generic-placeholder;
    background-color: blue;
  }
}
```

```sass:element/_button.scss
@use '../placeholder' as *;

@mixin generate-button {
  .btn {
    @extend %generic-placeholder;
    background-color: yellow;
  }
}
```

This mixin generates all modules.

```sass:mixin/_module.scss
@use '../element' as *;

@mixin generate-modules {
  @font-face {
    /* must come first */
  }

  :root {
    /* must come first */
  }

  @include generate-badge;

  @include generate-button;
}
```

```sass:shrtcss.scss
/* forward more stuff first */
@forward 'mixin';
@forward 'mixin/module'; 
@forward 'element';
```

The use of my library:

```sass:shrtcss-styles.scss
@use 'shrtcss' as *;
@include generate-modules;
```

Compiled to CSS output:

```css:output.css
/* @extend rule is inserted at top of file */
.bdg, .button {
  color: red;
}

@font-face {
  /* but I want to load fonts first */
}

:root {
  /* but I want to load root first */
}

.bdg {
  background-color: blue;
}

.button {
  background-color: yellow;
}
```

I had no control over where in the stylesheet the `@extend` rules are inserted.
This was confusing. Reading the SASS/SCSS docs stating:

> Heads up! ... This can be confusing. ...

Okay. So this was confusing and I had to figure out why.

## How to `@use` `%placeholders` in modules

To regain control we move the `%placeholder` inside the
`@mixin generate-modules`.

```sass:mixin/_module.scss
`@use '../element' as *;

@mixin generate-modules {
  @font-face {
    /* Must come first */
  }

  :root {
    /* Must come first */
  }

  %generic-placeholder {
    color: red;
  }

  @include generate-badge;

  @include generate-button;
}
```

We remove the `@use` rule from both element files:

```sass:element/_badge.scss
@mixin generate-badge {
  .bdg {
    @extend %generic-placeholder;
    background-color: blue;
  }
}
```

```sass:element/_button.scss
@mixin generate-button {
  .btn {
    @extend %generic-placeholder;
    background-color: yellow;
  }
}
```

And here comes the magic part, compiles to CSS output:

```css:output.css
@font-face {
  /* load fonts first */
}

:root {
  /* load root first */
}

/* @extend rule is inserted at %placeholder position! */
.bdg, .button {
  color: red;
}

.bdg {
  background-color: blue;
}

.button {
  background-color: yellow;
}
```

## This is still confusing 🤯

**Why is no compile error thrown? Is `%generic-placeholder` known to `elements`
for instance?**

Let's look at the explanation of the documentation again:

> Extends are resolved after the rest of your stylesheet is compiled. In
> particular, it happens after parent selectors are resolved.

> Because @extend updates style rules that contain the extended selector, their
> styles have precedence in the cascade based on where the extended selector’s
> style rules appear, not based on where the @extend appears.

The important part here I did not get first:

> Extends are resolved after the rest of your stylesheet is compiled.

It looks like `%generic-placeholder` are known to `elements` without loading
them explicit. This is possibly because the process takes place after the
stylesheet is created, even if `%placeholders` are declared in `@mixins`.

I find it even more perplexing that there are tons of tutorials regarding the
use of `@extend` vs `@mixin` and `%placeholder`, yet none that I have found even
begin to address this **magic** process, nor is it mentioned in the SASS/SCSS
documentation.

> ...styles have precedence in the cascade based on where the extended
> selector’s style rules appear...

Yes, this now applies.

## ~~Confusion~~ Conclusion

Thanks to [oscarotero](https://github.com/oscarotero) for checking into my code,
I hope the confusion is now complete, because in this blog post we learned how
to ~~not~~ `@use` `%placeholders` in complex SASS/SCSS modules.
