import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { rollup } from 'rollup';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import { Adapter } from '@sveltejs/kit';
import { generateLocations } from './src/lib/generateNginxLocations';

const files = fileURLToPath(new URL('./files', import.meta.url).href);
const staticFiles = fileURLToPath(new URL('./docker', import.meta.url).href);

type Package = {
  dependencies: Record<string, string>;
};

type AdapterOptions = {
  out?: string;
  precompress?: boolean;
  hostName: string;
  hostPort: number;
  nginxPort: number;
  languages: string[];
  immutables: { immutableFolders: string[] };
};

type Plugin = (options?: AdapterOptions) => Adapter;

const plugin: Plugin = (opts) => {
  const { out = 'build', precompress, hostName, hostPort, nginxPort, languages, immutables } = opts;

  return {
    name: '@module/sveltekit-adapter-docker',

    async adapt(builder) {
      const tmp = builder.getBuildDirectory('sveltekit-adapter-docker');

      builder.rimraf(out);
      builder.rimraf(tmp);
      builder.mkdirp(tmp);

      builder.log.minor('Copying assets');
      builder.writeClient(`${out}/client${builder.config.kit.paths.base}`);
      builder.writePrerendered(`${out}/prerendered${builder.config.kit.paths.base}`);

      if (precompress) {
        builder.log.minor('Compressing assets');
        await Promise.all([builder.compress(`${out}/client`), builder.compress(`${out}/prerendered`)]);
      }

      builder.log.minor('Building server');

      builder.writeServer(tmp);

      writeFileSync(
        `${tmp}/manifest.js`,
        `export const manifest = ${builder.generateManifest({ relativePath: './' })};\n\n` +
          `export const prerendered = new Set(${JSON.stringify(builder.prerendered.paths)});\n`
      );

      const pkg: Package = JSON.parse(readFileSync('package.json', 'utf8'));

      const bundle = await rollup({
        input: {
          index: `${tmp}/index.js`,
          manifest: `${tmp}/manifest.js`,
        },
        external: [...Object.keys(pkg.dependencies || {}).map((d) => new RegExp(`^${d}(\\/.*)?$`))],
        plugins: [nodeResolve({ preferBuiltins: true }), commonjs({ strictRequires: true }), json()],
      });

      await bundle.write({
        dir: `${out}/server`,
        format: 'esm',
        sourcemap: true,
        chunkFileNames: `chunks/[name]-[hash].js`,
      });

      builder.copy(files, out, {
        replace: {
          ENV: './env.js',
          HANDLER: './handler.js',
          MANIFEST: './server/manifest.js',
          SERVER: './server/index.js',
          SHIMS: './shims.js',
        },
      });

      builder.copy(staticFiles, `${out}/docker`);

      builder.mkdirp(`${out}/docker/nginx/config/conf/`);
      writeFileSync(
        `${out}/docker/nginx/config/conf/no-ssl.default.conf`,
        generateLocations(out, { hostName, hostPort, nginxPort, languages, immutables })
      );
    },
  };
};

export default plugin;
