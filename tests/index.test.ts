import path from "path"

import fs, { promises as fsp } from "fs"
import { InputOptions, OutputChunk, rollup } from "rollup"
import typescript from "@rollup/plugin-typescript"
import nodeResolve from "@rollup/plugin-node-resolve"

import svgSpriteLoader from "../src"
import type { Options as PluginOptions } from "../src/shared"

const outputPath = path.resolve(__dirname, "./dist")
const emptyInputPath = path.resolve(__dirname, "./build/source/emptyInput.js")

async function buildSprite(pluginOptions?: PluginOptions, inputOptions?: InputOptions) {
  try {
    const { write } = await rollup({
      input: emptyInputPath,
      plugins: [
        nodeResolve(),
        svgSpriteLoader(pluginOptions),
        typescript({
          sourceMap: false,
        }),
      ],
      ...inputOptions,
    })
    const { output } = await write({ format: "esm", dir: outputPath, name: "dist.js" })
    const data = output
      .filter((it) => it.type === "chunk")
      .map((it) => (it as OutputChunk).code)
      .join("")
    await fsp.writeFile(path.resolve(outputPath, "./dist.js"), data, { encoding: "utf-8" })
    return data
  } catch (e) {
    console.error(e)
  }
}

beforeEach(() => {
  try {
    const dist = path.resolve(__dirname, "./dist")
    fs.rmSync(dist, { recursive: true })
    fs.mkdirSync(dist, { recursive: true })
  } catch (e) {
    console.log(e)
  }
})

const inputPathGen = (fileName: string | string[]) => {
  if (Array.isArray(fileName)) {
    return fileName.map((name) => path.resolve(__dirname, "./build/source/", name))
  }
  return path.resolve(__dirname, "./build/source/", fileName)
}

/*
describe("Edge cases", () => {
  test("Set outputPath to file path in extract mode", async () => {
    await expect(buildSprite({ outputPath: "./file.js", extract: true })).rejects.toThrow(
      "OutputPath must be a valid directory path."
    )
  })
  test("Non existent output path in extract mode", async () => {
    await expect(buildSprite({ outputPath: "./path-not-exists", extract: true })).rejects.toThrow(
      `No such directory "./path-not-exists".`
    )
  })
  test("No svg file imported", async () => {
    const output = await buildSprite({})
    await expect(output).toBe("\n")
  })
})

describe("Compare the minified code", () => {
  test("Export extract sprite file", async () => {
    const assert = await buildSprite(
      { outputPath, extract: true, minify: true },
      {
        input: inputPath,
      }
    )
    await expect(isMate("./target/extract.svg", assert)).resolves.toBe(true)
  })
  test("Insert inline sprite code", async () => {
    const chunk = await buildSprite({ minify: true })
  })
})

describe("Compare the prettified code", () => {
  test("Export extract sprite file", async () => {})
})
*/

describe("extract", () => {
  test("extract", async () => {
    await buildSprite({ outputPath, extract: true }, { input: inputPathGen(["example-1.svg", "example-2.svg"]) })
    const output = await fsp.readFile(path.resolve(outputPath, "./public/sprite.svg"), { encoding: "utf-8" })
    const target = await fsp.readFile(path.resolve(__dirname, "./build/target/sprite.svg"), { encoding: "utf-8" })
    expect(output === target).toBe(true)
  })
  test("inline", async () => {
    await buildSprite({ outputPath, extract: false }, { input: inputPathGen(["example-1.svg", "example-2.svg"]) })
    const output = await fsp.readFile(path.resolve(outputPath, "./dist.js"), { encoding: "utf-8" })
    const target = await fsp.readFile(path.resolve(__dirname, "./build/target/dist.js"), { encoding: "utf-8" })
    expect(output === target).toBe(true)
  })
})
