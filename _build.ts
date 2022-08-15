type BuildMode = string | undefined

const createConfig = (mode: BuildMode) => {
  if (typeof mode === 'undefined') {
    throw new Error('BUILD_MODE is not defined');
  }
  if (mode === "prod") {
    return {
      mode,
      location: new URL("https://jrson.me"),
    };
  }
  return {
    mode,
    location: new URL("http://localhost"),
  };
};

const BUILD_MODE: BuildMode = Deno.env.get("BUILD_MODE");

export const config = createConfig(BUILD_MODE);
