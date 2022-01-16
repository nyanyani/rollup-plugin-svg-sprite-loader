import babel from "@rollup/plugin-babel"
import commonjs from "@rollup/plugin-commonjs"
import json from "@rollup/plugin-json"
import nodeResolve from "@rollup/plugin-node-resolve"
import { RollupOptions } from "rollup"
import pkg from "./package.json"

const extensions = [".js", ".jsx", ".ts", ".tsx"]

const config: RollupOptions = {
  input: "src/index.ts",
  output: [
    {
      file: pkg.main,
      exports: "named",
      format: "cjs",
    },
    {
      file: pkg.module,
      exports: "named",
      format: "esm",
    },
  ],
  plugins: [
    // Allows node_modules resolution
    nodeResolve({ extensions }),
    // Allow bundling json files
    json(),
    // Allow bundling cjs modules
    commonjs(),
    // Compile TypeScript/JavaScript files
    babel({
      babelrc: true,
      babelHelpers: "bundled",
      include: ["src/**/*"],
      exclude: ["node_modules/**/*"],
      extensions,
    }),
  ],
  external: ["dom-serializer", "htmlparser2", "domhandler", "domutils", "svgo"],
  context: "globalThis",
}

export default config
