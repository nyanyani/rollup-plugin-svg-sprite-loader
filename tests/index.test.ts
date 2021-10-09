import { InputOptions, rollup, RollupOutput } from "rollup"

import svgSpriteLoader from "../src"
import { Options as PluginOptions } from "../types"

async function buildSprite(pluginOptions?: PluginOptions, inputOptions?: InputOptions) {
  const { generate } = await rollup({
    input: "./emptyInput.ts",
    plugins: [svgSpriteLoader(pluginOptions)],
    ...inputOptions,
  })
  const { output } = await generate({ format: "esm" })
  return output
}
async function isMate(source: string, outputChunk: RollupOutput["output"]) {
  for (const chunkOrAsset of outputChunk) {
    const { type } = chunkOrAsset
    if (type === "asset") {
      return chunkOrAsset.source.toString() === source
    } else {
      return chunkOrAsset.code === source
    }
  }
}

const inputPath = "./index.jest.ts"
const outputPath = "./sprite.svg"

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
    await expect(output).toBe
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
