import type { ScriptsConfiguration } from 'https://deno.land/x/velociraptor@1.5.0/mod.ts'

export default <ScriptsConfiguration> {
  scripts: {
    clean: {
      desc: 'Clean dist',
      cmd: '"rm -rf ./_site',
    },
    check: {
      desc: 'Type-checks the code',
      cmd: 'deno cache -c deno.json ./src/index.tsx',
    },
    fmt: {
      desc: 'Formats code',
      cmd: 'deno fmt -c deno.json',
    },
    lint: {
      desc: 'Lints code',
      cmd: 'deno lint -c deno.json',
    },
    'pre-commit': {
      cmd: ['vr fmt', 'vr lint', 'vr check'],
      gitHook: 'pre-commit',
    },
  },
}
