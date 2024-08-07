// https://gist.github.com/robbdimitrov/a9d13aabb2fa4a2ada7d24a6f33f19d9
export function getPaginationPages(
  maxPages: number,
  currentPage: number,
): number[] {
  const pages: number[] = []

  for (let i = 1; i <= maxPages; i++) {
    if (
      i === 1 || i === maxPages ||
      (currentPage < 4 && i <= 4) ||
      (i >= currentPage - 1 && i <= currentPage + 1) ||
      (maxPages - currentPage < 3 && maxPages - i <= 3)
    ) {
      pages.push(i)
    } else if (!isNaN(pages[pages.length - 1])) {
      pages.push(NaN)
    }
  }

  return pages
}
