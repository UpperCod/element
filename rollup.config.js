import pkg from "./package.json";
import babel from "rollup-plugin-babel";
import { terser } from "rollup-plugin-terser";
import { sizeSnapshot } from "rollup-plugin-size-snapshot";

let plugins = [babel(), terser(), sizeSnapshot()];

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
                "@atomico/core": "@atomico/core"
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
