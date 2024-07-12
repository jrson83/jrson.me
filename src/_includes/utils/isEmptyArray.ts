export function isEmptyArray(obj: unknown): boolean {
  return Array.isArray(obj) && !obj.length
}
