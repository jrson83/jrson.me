---
title: Update on the current Inertia.js state
excerpt: Updated information on the current state of Inertia.js packages.
date: 2022-12-08 20:45:00
draft: false
tags:
  - inertiajs
  - laravel
  - nodejs
  - preact
---

As mentioned in my
[recent blog post](/blog/inertia.js-preact-adapter-v0.2.0-released/), I released
a new version of the Inertia.js
[Preact Adapter](https://www.npmjs.com/package/@jrson83/inertia-preact). Before
I started updating the adapter, I already noticed that there were some changes
in the [Inertia.js repository](https://github.com/inertiajs/inertia), including
a restructuring of the workspace and package versioning.

However, the renaming of the workspace packages means that for the Inertia.js
core package, as well as for the adapter packages, completely new NPM packages
have been created. I noticed this only after I published the
[new version](https://www.npmjs.com/package/@jrson83/inertia-preact/v/0.2.0) of
the Pract Adapter.

## NPM Packages

### Deprecated packages

- [@inertiajs/inertia@0.11.1](https://www.npmjs.com/package/@inertiajs/inertia/v/0.11.1)
- [@inertiajs/inertia-react@0.8.1](https://www.npmjs.com/package/@inertiajs/inertia-react/v/0.8.1)

<iframe
  id="myIframe"
  title="@inertiajs/inertia@0.11.1"
  width="100%"
  height="360px"
  src="https://arve0.github.io/npm-download-size/#@inertiajs%2finertia">
</iframe>

<iframe
  title="@inertiajs/inertia-react@0.8.1"
  width="100%"
  height="300px"
  src="https://arve0.github.io/npm-download-size/#@inertiajs%2finertia-react">
</iframe>

<hr />

### Latest packages

The versions for `beta` and `latest` package were apparently tagged incorrectly.

- [@inertiajs/core@@1.0.0-beta.2](https://www.npmjs.com/package/@inertiajs/core/v/1.0.0-beta.2)
- [@inertiajs/react@@1.0.0-beta.2](https://www.npmjs.com/package/@inertiajs/react/v/1.0.0-beta.2)

<iframe
  title="@inertiajs/inertia-react@0.8.1"
  width="100%"
  height="380px"
  src="https://arve0.github.io/npm-download-size/#@inertiajs%2fcore@1.0.0-beta.2">
</iframe>

<iframe
  title="@inertiajs/inertia-react@0.8.1"
  width="100%"
  height="330px"
  src="https://arve0.github.io/npm-download-size/#@inertiajs%2freact@1.0.0-beta.2">
</iframe>

<hr />

## Conclusion

The bottom line is that the new Preact Adapter version I created is not based on
the latest package and because I can't help it, I have already created a new
version, which I will release later today.

I am happy that the development seems to continue, but this is a breaking change
that is not mentioned anywhere by the developers (at least I have not found any
information about). In addition, the changelog is outdated and complete versions
are missing.

Anyway, since the restructuring is still very new and possibly not yet
completed, I can imagine that an update with information on this will take place
in the near future.

> **Update:** [@robertboes](https://robertbo.es/) gave me the hint, that there
> is a `next` subdomain which provides an upgrade guide:
> [https://next.inertiajs.com/upgrade-guide](https://next.inertiajs.com/upgrade-guide)

**Helpful Resources:**

- [@inertiajs/core@@1.0.0-beta.2](https://www.npmjs.com/package/@inertiajs/core/v/1.0.0-beta.2)
- [@inertiajs/react@@1.0.0-beta.2](https://www.npmjs.com/package/@inertiajs/react/v/1.0.0-beta.2)
