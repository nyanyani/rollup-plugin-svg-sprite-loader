import { RollupOptions } from "rollup"
import typescript from "@rollup/plugin-typescript"
import babel from "@rollup/plugin-babel"
import nodeResolve from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import json from "@rollup/plugin-json"

const config: RollupOptions = {
  input: "src/index.ts",
  output: [
    {
      file: "dist/index.cjs.js",
      exports: "named",
      format: "cjs",
      sourcemap: true,
    },
    {
      file: "dist/index.esm.js",
      exports: "named",
      format: "esm",
      sourcemap: true,
    },
  ],
  plugins: [
    nodeResolve(),
    json(),
    commonjs(),
    typescript({
      tsconfig: "./tsconfig.json",
      declaration: true,
      declarationDir: "types/",
      rootDir: "src/",
      exclude: ["test/**/*"],
    }),
    babel({
      babelrc: true,
      babelHelpers: "runtime",
      plugins: [["@babel/plugin-transform-typescript", { allowDeclareFields: true }]],
      exclude: ["node_modules/**/*"],
    }),
  ],
  external: ["dom-serializer", "htmlparser2", "domhandler", "domutils", "svgo"],
  context: "globalThis",
}

export default config
