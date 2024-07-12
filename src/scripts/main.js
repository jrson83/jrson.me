"use strict";

const root = document.documentElement;
const mediaQuery = "(prefers-color-scheme: dark)";
const mediaMatch = globalThis.matchMedia;
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
  {/* deno-fmt-ignore */}
  {/* deno-lint-ignore ban-ts-comment */}
  {/* @ts-ignore */}
  const currentTheme =
    getComputedStyle(root).getPropertyValue("color-scheme") == "light";
  storeTheme(!!currentTheme);
});

mediaMatch(mediaQuery).addEventListener("change", (event) => {
  storeTheme(event.matches);
});
