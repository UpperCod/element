import pkg from "./package.json";
import size from "rollup-plugin-bundle-size";
import { terser } from "rollup-plugin-terser";

let plugins = [terser(), size()];

export default {
	input: pkg.source,
	output: [
		{
			file: pkg.main,
			sourcemap: true,
			format: "cjs"
		},
		{
			file: pkg["umd:main"],
			sourcemap: true,
			format: "umd",
			name: pkg.name,
			globals: {
				"@atomico/core": "@atomico/core",
				"@atomico/base-element": "@atomico/base-element"
			}
		},
		{
			file: pkg["module"],
			sourcemap: true,
			format: "es"
		}
	],
	plugins
};
