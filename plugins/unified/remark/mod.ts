import { readingTime, unified } from '#plugins/unified/deps.ts'

export default <unified.PluggableList> [
  [readingTime, { name: 'readingTime' }],
]
