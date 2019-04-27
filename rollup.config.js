import pkg from "./package.json";
import resolve from "rollup-plugin-node-resolve";
import { terser } from "rollup-plugin-terser";
import size from "rollup-plugin-bundle-size";

export default [
	{
		input: pkg.source,
		output: {
			file: pkg.module,
			format: "es"
		},
		external: ["@atomico/core", "@atomico/base-element"],
		plugins: [size()]
	},
	{
		input: "src/browser.js",
		output: {
			file: pkg.unpkg,
			sourcemap: true,
			format: "es"
		},
		//plugins: [resolve(), terser(), size()]
		plugins: [size()]
	}
];
