import { buildSync } from "esbuild";

export const getRandomBase32Identifier = (length = 9) =>
  `i${Math.random().toString(36).substring(2, length)}`;

export const getEsmCjsCompatOptions = () => {
  const createRequireAlias = getRandomBase32Identifier();
  const esmCjsCompatScript = `
    import { createRequire as ${createRequireAlias} } from 'module';
    const require = ${createRequireAlias}(import.meta.url);
  `;

  return {
    target: "node16",
    platform: "node",
    format: "esm",
    banner: {
      js: esmCjsCompatScript,
    },
  };
};

buildSync({
  ...getEsmCjsCompatOptions(),
  ...{
    entryPoints: ["build/index.js"],
    bundle: true,
    minify: true,
    logLevel: "info",
    outfile: "build/server.mjs",
  },
});
