export function isString(test: unknown): test is string {
  return typeof test === 'string'
}
