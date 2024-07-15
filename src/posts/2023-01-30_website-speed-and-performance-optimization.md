---
title: 'Website Speed and Performance Optimization: Metrics & Tools'
excerpt: An insight into the optimization techniques I have applied to my blog.
date: 2023-01-30
update: 2023-08-02
draft: false
tags:
  - html
  - css
  - javascript
---

I like to give a little insight into the optimization techniques I have applied
to my blog. The blog-post will consist of several parts, since it is hard to
cover all in one post.

Lets start with a short introduction of the most important metrics that are used
to measure the optimization of a website.

## Website Performance Metrics

There is no basic recipe that can be applied to optimize a website. There are
overall optimization goals that every website should achieve. The importance of
these varies from website to website and sometimes solving one problem can have
a negative impact on other aspects of the website. However, since the metrics
used to measure, for example, the speed of a website are known and mostly the
same, we can define criteria based on these metrics and evaluate their
importance.

### Why are these metrics important?

Since
[most of the metrics](https://developer.chrome.com/docs/lighthouse/performance/)
and tools come from Google itself, it's basically not about reinventing the
wheel here, but about doing justice to those very metrics. The main goal of
optimizations could be, for example, to achieve a 100% rating in
[Lighthouse](https://developer.chrome.com/docs/lighthouse/overview/).

---

![Lighthouse rating jrson.me](/images/blog/2023-01-30/pagespeed-insights.svg)

---

### Page Speed & load time

The
[Speed Index](https://developer.chrome.com/docs/lighthouse/performance/speed-index/)
shows how fast the contents of a page are visibly displayed.

### First Contentful Paint

The
[First Contentful Paint](https://developer.chrome.com/docs/lighthouse/performance/first-contentful-paint/)
(FCP) metric measures the time from when the page starts loading to when any
part of the page's content is rendered on the screen.

### Time to interactive

[Time to Interactive](https://developer.chrome.com/docs/lighthouse/performance/interactive/)
(TTI) measures the time until the application is rendered and can respond to
user input.

### Total Blocking Time

[Total Blocking Time](https://developer.chrome.com/docs/lighthouse/performance/lighthouse-total-blocking-time/)
(TBT) is one of the metrics tracked in the Performance section of the Lighthouse
report. Each metric captures some aspect of page load speed.

### Frame rendering stats

Real time estimate of frames per second (FPS) as the page runs. My personal
favourite and one of the biggest possible pitfalls.

### Content Security

A
[Content Security Policy](https://developer.chrome.com/docs/apps/contentSecurityPolicy/)
(CSP) is a security feature used to help protect websites and web apps from
malicious attacks. At first you might wonder if there is a connection between
optimization and security headers. Yes there is.

---

## Tools to measure a Website performance

The number of tools to test websites performance, seobility etc. has increased
immeasurably in the recent years. Most of them are not free and overloaded with
copies of other tools. Here is an overview of the most important tools I use
frequently.

### Chrome Canary

The nightly build of
[Chrome Canary](https://www.google.com/intl/en/chrome/canary/) has awesome
features with its [Chrome DevTools](https://developer.chrome.com/docs/devtools/)
for developers. Here are some important features:

- [View and change CSS](https://developer.chrome.com/docs/devtools/css/)
- [Inspect network activity](https://developer.chrome.com/docs/devtools/network/)
- [Analyze runtime performance](https://developer.chrome.com/docs/devtools/performance/)
- [Memory terminology](https://developer.chrome.com/docs/devtools/memory-problems/memory-101/)
- [Coverage: Find unused JavaScript and CSS](https://developer.chrome.com/docs/devtools/coverage/)
- [CSS Overview: Identify potential CSS improvements](https://developer.chrome.com/docs/devtools/css-overview/)
- [Discover issues with rendering performance](https://developer.chrome.com/docs/devtools/rendering/performance/)

It also includes one of the most important tools,
[Lighthouse](https://developer.chrome.com/docs/lighthouse/overview/). As an
alternative [Google PageSpeeds Insights](https://pagespeed.web.dev/) can be
used.

![Chrome Canary](/images/blog/2023-01-30/chrome-canary.png)

### Screaming Frog SEO Spider

One of the best free tools is the
[SEO Spider](https://www.screamingfrog.co.uk/seo-spider/). It is a powerful and
flexible site crawler, able to crawl both small and very large websites
efficiently, while allowing you to analyse the results in real-time. It is great
to check a websites health and find problems, not only related to SEO.

![SEO Spider](/images/blog/2023-01-30/screamingfrog_tool.png)

### Image optimization tools

Image optimization is one important aspect. The most efficient free tools are
`TinyPNG` and `vecta.io/nano`. TinyPNG comes with a
[Developer API](https://tinypng.com/developers) and
[Third-Party Solutions](https://tinypng.com/third-party) for various programming
languages, including [Node.js](https://tinypng.com/developers/reference/nodejs).
It can be used to easily convert, resize or compress images.

- [TinyPNG](https://tinypng.com/) - Smart WebP, PNG and JPEG compression
- [vecta.io/nano](https://vecta.io/nano) - World's Best SVG Compressor

---

## Bonus: Quiz

Which method is the fastest? See [Result](https://jsben.ch/AshUS).

```ts
document.getElementById('someId')
```

```ts
document.querySelector('#someId')
```

```ts
document.querySelector('.someClass')
```

## Conclusion

We learned about important metrics and tools when measuring a websites
performance.

If you want to read more about different optimization techniques, the website
[web.dev](https://web.dev/blog/) is a great place to start.

Thanks for reading!

---

**Helpful Resources:**

- [web.dev](https://web.dev/blog/) - Guidance to build modern web experiences
  that work on any browser
- [Chrome Canary](https://www.google.com/intl/en/chrome/canary/) - Nightly build
  for developers
- [SEO Spider](https://www.screamingfrog.co.uk/seo-spider/) - The industry
  leading website crawler for Windows, macOS and Linux
