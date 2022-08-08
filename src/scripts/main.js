"use strict";

const themeToggle = document.getElementById("theme-toggle");

const storedTheme = localStorage.getItem("theme") ||
  (window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light");

if (storedTheme) {
  document.documentElement.setAttribute("data-theme", storedTheme);
  themeToggle.setAttribute("aria-label", storedTheme);
}

const navToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");

window.onload = () => {
  themeToggle.onclick = () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    let targetTheme = "light";

    if (currentTheme === "light") {
      targetTheme = "dark";
    }

    document.documentElement.setAttribute("data-theme", targetTheme);
    themeToggle.setAttribute("aria-label", targetTheme);
    localStorage.setItem("theme", targetTheme);
  };

  navToggle.onclick = () => {
    navMenu.classList.toggle("is-active");
  };
};
