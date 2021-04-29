import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import sveltePreprocess from 'svelte-preprocess';
import commonjs from 'rollup-plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import pkg from './package.json';
import css from 'rollup-plugin-css-only';

const production = !process.env.ROLLUP_WATCH;

const name = pkg.name
  .replace(/^(@\S+\/)?(svelte-)?(\S+)/, '$3')
  .replace(/^\w/, (m) => m.toUpperCase())
  .replace(/-\w/g, (m) => m[1].toUpperCase());

export default {
  input: 'src/index.ts',
  output: [
    { file: pkg.module, format: 'es', name, sourcemap: !production },
    { file: pkg.main, format: 'umd', name, sourcemap: !production },
  ],
  plugins: [
    svelte({
      preprocess: sveltePreprocess({
        sourceMap: !production,
      }),
      compilerOptions: {
        // enable run-time checks when not in production
        dev: !production,
      },
    }),
    // we'll extract any component CSS out into
    // a separate file - better for performance
    css({ output: 'bundle.css' }),
    resolve({
      browser: true,
      dedupe: ['svelte'],
    }),
    commonjs(),
    typescript({ sourceMap: !production, inlineSources: !production }),
  ],
};
