'use strict'
document.getElementById('theme-toggle').addEventListener('click', () => {
  const nextTheme = (getComputedStyle(e).getPropertyValue('color-scheme') ===
      'light')
    ? 'dark'
    : 'light'
  localStorage.setItem('theme', nextTheme)
  e.setAttribute('data-theme', nextTheme)
})

globalThis.matchMedia('(prefers-color-scheme: dark)').addEventListener(
  'change',
  (event) => {
    localStorage.removeItem('theme')
    e.setAttribute(
      'data-theme',
      event.matches ? 'dark' : 'light',
    )
  },
)
