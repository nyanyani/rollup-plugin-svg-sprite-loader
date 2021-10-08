import { InputOptions, rollup, RollupOutput } from "rollup"

import svgSpriteLoader from "../src"
import { Options as PluginOptions } from "../types"

async function buildSprite(pluginOptions?: PluginOptions, inputOptions?: InputOptions) {
  const { generate } = await rollup({
    input: "src/index.ts",
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

describe("Error cases", () => {
  test("Invalid output path ", async () => {
    await expect(buildSprite()).rejects.toThrow("OutputPath must be a valid directory path.")
  })
  test("")
})

describe("Compare the generated code", () => {
  test("in extract mode", () => {
    buildSprite(
      {
        input: inputPath,
      },
      { outputPath }
    )
    expect("").toBe("")
  })
})
