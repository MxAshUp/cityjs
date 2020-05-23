import pkg from './package.json';
import { terser } from "rollup-plugin-terser";

export default [
	// browser-friendly UMD build
	{
		input: 'index.js',
		output: {
			name: 'cityjs',
			file: pkg.browser,
			format: 'umd',
			sourcemap: true,
		},
		plugins: [
			terser() // minify it
		]
	},

	// CommonJS (for Node) and ES module (for bundlers) build.
	{
		input: 'index.js',
		plugins: [
			terser() // minify it
		],
		output: [
			{
				file: pkg.main,
				format: 'cjs',
				sourcemap: true,
			},
			{
				file: pkg.module,
				format: 'es',
				sourcemap: true,
			}
		]
	}
];
