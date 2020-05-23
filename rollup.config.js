import pkg from './package.json';
import { terser } from "rollup-plugin-terser";

export default [
	// browser-friendly UMD build
	{
		input: 'index.js',
		output: {
			name: 'cityjs',
			file: pkg.main,
			format: 'umd',
			sourcemap: true,
		},
		plugins: [
			terser() // minify it
		]
	},
];
