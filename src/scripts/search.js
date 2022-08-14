"use strict";

// This script is not 100% optimized yet

document.addEventListener("DOMContentLoaded", () => {
  let posts = undefined;

  const searchWrapper = document.getElementById("search-wrapper");
  const searchInput = document.getElementById("search-input");
  const searchResult = document.getElementById("search-result");
  const fragment = document.createDocumentFragment();

  searchInput.addEventListener("input", handleSearch);

  function handleDocumentClick(e) {
    if (e.target.id !== "search-input") {
      hideResults();
      document.removeEventListener("click", handleDocumentClick);
    }
  }

  function hideResults() {
    searchWrapper.classList.remove("is-active");
    if (searchResult.childElementCount > 0) {
      searchResult.removeChild(searchResult.firstChild);
    }
  }

  async function handleSearch(e) {
    const query = e.target.value;

    let results = [];

    hideResults();
    document.removeEventListener("click", handleDocumentClick);

    if (query.length > 0) {
      if (posts === undefined || posts === null) {
        const response = await fetch("/search.json").catch((error) => {
          console.error("Error:", error);
        });
        posts = await response.json();
      }

      results = getResults(posts, query.toLocaleLowerCase());

      if (Array.isArray(results) && results.length) {
        searchWrapper.classList.add("is-active");

        const node = document.createRange().createContextualFragment(
          `<ul>${
            results.map((post) => {
              return `<li><a href=${post.url}>${post.title}</a></li>`;
            }).join("")
          }</ul>`,
        );

        fragment.appendChild(node);

        searchResult.appendChild(fragment);

        document.addEventListener("click", handleDocumentClick);
      }
    }
  }
});

function getResults(posts, query) {
  const matches = [];
  for (let i = 0; i < posts.length; i++) {
    if (posts[i].title.toLocaleLowerCase().includes(query)) {
      matches.push(posts[i]);
    } else if (posts[i].tags) {
      for (let j = 0; j < posts[i].tags.length; j++) {
        if (query == posts[i].tags[j].toLocaleLowerCase()) {
          matches.push(posts[i]);
          break;
        }
      }
    }
  }
  return matches;
}
