import typescriptPlugin from "rollup-plugin-typescript2";
import uglify from "rollup-plugin-uglify";
import packageJSON from "./package.json";
import {Config} from "@wessberg/environment";

export default {
	input: "src/index.ts",
	output: {
		file: packageJSON.module,
		format: "iife",
		sourcemap: true
	},
	treeshake: true,
	plugins: [
		typescriptPlugin({
			tsconfig: Config.PRODUCTION ? "tsconfig.dist.json" : "tsconfig.json",
			include: ["*.ts+(|x)", "**/*.ts+(|x)"],
			exclude: ["*.d.ts", "**/*.d.ts"],
			cacheRoot: "./.cache",
			clean: true
		}),
		...Config.PRODUCTION ? [uglify()] : []
	],
	external: [
		...Object.keys(packageJSON.dependencies),
		...Object.keys(packageJSON.devDependencies)
	]
};