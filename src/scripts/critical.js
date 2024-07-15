'use strict'
const e = document.documentElement
const currentMode =
  globalThis.matchMedia('(prefers-color-scheme: dark)').matches
const storedTheme = ('theme' in localStorage)
  ? localStorage.getItem('theme')
  : currentMode
  ? 'dark'
  : 'light'
if (storedTheme !== 'light') e.setAttribute('data-theme', 'dark')
