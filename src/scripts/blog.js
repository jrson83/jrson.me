"use strict";

const scrollProgress = document.getElementById("scroll-progress");
const header = document.getElementById("main-nav");
const main = document.getElementById("page-content");

let passiveIfSupported = false;

function roundToTwo(num) {
  return +(Math.round(num + "e+2") + "e-2");
}

try {
  self.addEventListener(
    "test",
    null,
    Object.defineProperty({}, "passive", {
      // deno-lint-ignore getter-return
      get: () => {
        passiveIfSupported = { passive: true };
      },
    }),
  );
} catch (err) {
  if (err instanceof Error) {
    console.log(err.message);
  } else {
    console.log("Unexpected error", err);
  }
}

const debounce = (fn) => {
  let frame;

  return (...params) => {
    if (frame) {
      cancelAnimationFrame(frame);
    }

    frame = requestAnimationFrame(() => {
      fn(...params);
    });
  };
};

const storeScroll = () => {
  const contentBox = main.getBoundingClientRect();
  const screenHeight = window.innerHeight;

  const headerHeight = header.offsetHeight;
  const mainHeight = contentBox.height;

  const scrollHeight = Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
    document.body.clientHeight,
    document.documentElement.clientHeight,
  );
  const scrollPosition = document.body.scrollTop ||
    document.documentElement.scrollTop;

  const headerPercent = roundToTwo(
    (headerHeight / (scrollHeight - headerHeight)) * 100,
  );
  const scrollPercent = (scrollPosition / (mainHeight - screenHeight)) * 100 -
    headerPercent;

  if (contentBox.top > 0) {
    scrollProgress.style.transform = `scaleX(0)`;
  } else if (scrollPercent >= 100) {
    scrollProgress.style.transform = `scaleX(200)`;
  } else {
    scrollProgress.style.transform = `scaleX(${scrollPercent.toFixed(2)})`;
  }
};

document.addEventListener("scroll", debounce(storeScroll), passiveIfSupported);

// This script is not 100% optimized yet

const addCopyButtons = (clipboard) => {
  document.querySelectorAll(".rehype-code-title > .btn-copy").forEach(
    (button) => {
      if (
        button.parentNode.nextElementSibling.getAttribute("class").startsWith(
          "language-",
        )
      ) {
        const codeBlock = button.parentNode.nextElementSibling;

        button.addEventListener("click", () => {
          clipboard.writeText(codeBlock.textContent).then(
            () => {
              button.blur();
              button.firstChild.style.display = "none";
              button.lastChild.style.display = "inline";
              button.style.pointerEvents = "none";
              setTimeout(
                () => (
                  button.lastChild.style.display = "none",
                    button.firstChild.style.display = "inline",
                    button.style.pointerEvents = "auto"
                ),
                2000,
              );
            },
            (err) => {
              if (err instanceof Error) {
                button.innerHTML = err.message;
                console.log(err.message);
              } else {
                button.innerHTML = "Unexpected error", err;
                console.log("Unexpected error", err);
              }
            },
          );
        });
      }
    },
  );
};

if (navigator && navigator.clipboard) {
  addCopyButtons(navigator.clipboard);
} else {
  console.log("No copy to clipboard supported!");
}
