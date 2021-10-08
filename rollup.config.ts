import { RollupOptions } from "rollup"
import typescript from "@rollup/plugin-typescript"
import nodeResolve from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import json from "@rollup/plugin-json"

const config: RollupOptions = {
  input: "src/index.ts",
  output: [
    {
      file: "dist/index-cjs.js",
      exports: "named",
      format: "cjs",
      sourcemap: true,
    },
    {
      file: "dist/index-esm.js",
      exports: "named",
      format: "esm",
      sourcemap: true,
    },
  ],
  plugins: [typescript(), nodeResolve(), commonjs(), json()],
  external: ["dom-serializer", "htmlparser2", "svgo"],
  context: "globalThis",
}

export default config
