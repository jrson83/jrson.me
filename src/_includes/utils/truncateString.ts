export function truncateString(
  str: string,
  maxLength: number,
  ellipsis: string,
  wordBoundaries: boolean,
): string {
  if (str.length > maxLength) {
    if (wordBoundaries) {
      return `${
        str.replaceAll(',', '').slice(0, str.lastIndexOf(' ', maxLength - 1))
      }${ellipsis}`
    }
    return `${str.replaceAll(',', '').slice(0, maxLength)}${ellipsis}`
  }
  return str
}
