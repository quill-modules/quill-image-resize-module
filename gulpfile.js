import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import gulp from 'gulp';
import { rollup } from 'rollup';
import { getBabelOutputPlugin } from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';
import nodeResolve from '@rollup/plugin-node-resolve';

const { watch, series, parallel } = gulp;

const __dirname = dirname(fileURLToPath(import.meta.url));
const docsBundle = resolve(__dirname, './docs');
const distBundle = resolve(__dirname, './dist');
const moduleRoot = resolve(__dirname, './src');
const moduleInput = resolve(moduleRoot, 'ImageResize.js');

const buildModule = async () => {
  const bundle = await rollup({
    input: moduleInput,
    external: [/^quill/],
    preserveEntrySignatures: 'allow-extension',
    plugins: [
      nodeResolve(),
      getBabelOutputPlugin({
        presets: ['@babel/preset-env'],
      }),
      terser(),
    ],
  });
  return bundle.write({
    file: resolve(distBundle, 'index.js'),
    format: 'es',
    sourcemap: true,
  });
};

const buildUmd = async () => {
  const bundle = await rollup({
    input: moduleInput,
    external: [/^quill/],
    preserveEntrySignatures: 'allow-extension',
    plugins: [nodeResolve()],
    output: {
      globals: {
        quill: 'Quill',
      },
      exports: 'named',
    },
  });
  return bundle.write({
    file: resolve(docsBundle, 'dev.js'),
    format: 'umd',
    sourcemap: true,
    name: 'ImageResize',
  });
};
export const dev = () => {
  watch('./src/**/*.js', series(buildUmd));
};

const build = parallel(buildModule, buildUmd);
export default build;
