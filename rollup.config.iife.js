const uglify = require('rollup-plugin-uglify');
const { minify } = require('uglify-es');
const typescript = require('rollup-plugin-typescript');
const resolve = require('rollup-plugin-node-resolve');

export default {
  input: 'src/index.ts',
  output: {
    file: 'lib/index.iife.js',
    name: 'lib/index.iife.js',
    format: 'iife',
  },
  sourceMap: false,
  plugins: [
    resolve({
      extensions: ['.ts', '.js'],
      browser: true,
    }),
    uglify({}, minify),
    typescript({
      typescript: require('typescript'),
    }),
  ],
};