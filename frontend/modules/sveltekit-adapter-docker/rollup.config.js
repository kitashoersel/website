import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import esbuild from 'rollup-plugin-esbuild';
import { builtinModules } from 'node:module';
import dts from 'rollup-plugin-dts';
import copy from 'rollup-plugin-copy';

export default [
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/files/index.js',
      format: 'esm',
    },
    plugins: [nodeResolve({ preferBuiltins: true }), commonjs(), json(), esbuild({ minify: true })],
    external: ['ENV', 'HANDLER', ...builtinModules],
  },
  {
    input: 'src/env.ts',
    output: {
      file: 'dist/files/env.js',
      format: 'esm',
    },
    plugins: [nodeResolve(), commonjs(), json(), esbuild({ minify: true })],
    external: ['HANDLER', ...builtinModules],
  },
  {
    input: 'src/handler.ts',
    output: {
      file: 'dist/files/handler.js',
      format: 'esm',
      inlineDynamicImports: true,
    },
    plugins: [nodeResolve(), commonjs(), json(), esbuild({ minify: true })],
    external: ['ENV', 'MANIFEST', 'SERVER', 'SHIMS', ...builtinModules],
  },
  {
    input: 'src/shims.ts',
    output: {
      file: 'dist/files/shims.js',
      format: 'esm',
    },
    plugins: [nodeResolve(), commonjs(), esbuild({ minify: true })],
    external: builtinModules,
  },
  {
    input: 'dist/types/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'es' }],
    plugins: [dts()],
  },
  {
    input: 'index.ts',
    output: {
      file: 'dist/index.js',
      format: 'esm',
    },
    plugins: [
      nodeResolve(),
      commonjs(),
      json(),
      esbuild({ minify: true }),
      copy({
        targets: [{ src: ['src/templates/nginx', 'src/templates/sveltekit'], dest: 'dist/docker' }],
      }),
    ],
    external: [
      'rollup',
      '@rollup/plugin-node-resolve',
      '@rollup/plugin-commonjs',
      '@rollup/plugin-json',
      '@sveltejs/kit',
      ...builtinModules,
    ],
  },
];
