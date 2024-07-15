const createConfig = (mode = 'dev') => ({
  mode,
  location: new URL(mode === 'dev' ? 'http://localhost' : 'https://jrson.me'),
})

export const config = createConfig(Deno.env.get('BUILD_MODE'))
