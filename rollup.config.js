import ts from "@wessberg/rollup-plugin-ts";
import resolve from "rollup-plugin-node-resolve";
import packageJson from "./package.json";

// noinspection NpmUsedModulesInstalled
import {builtinModules} from "module";

export default {
	input: "src/index.ts",
	output: [
		{
			file: packageJson.main,
			format: "iife",
			sourcemap: true
		}
	],
	context: "window",
	treeshake: true,
	plugins: [
		ts({
			tsconfig: process.env.NODE_ENV === "production" ? "tsconfig.dist.json" : "tsconfig.json"
		}),
		resolve()
	]
};