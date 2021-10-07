import svgo, { OptimizeOptions, Plugin as SvgoPlugin } from "svgo"
import { promises as fsp } from "fs"
import path from "path"

import { Options, Plugin, SpriteSymbol } from "../types"
import { createSprite, createSymbol, isSVG } from "./helpers"
import exportSymbol from "./helpers/exportSymbol"

const convertedSvg = new Map<string, SpriteSymbol>()
const svgoOptions: OptimizeOptions = {
  js2svg: {
    indent: 2,
  },
  plugins: [
    {
      name: "preset-default",
      params: {
        overrides: {
          cleanupIDs: false,
          removeViewBox: false,
        },
      },
    },
    "removeDimensions",
  ],
}

export default function svgSpriteLoader(options: Options = {}): Plugin {
  const {
    minify = false,
    pretty = false,
    extract = false,
    outputPath = "./dist/",
    publicPath = "/public/",
    spriteFilename = "sprite.svg",
    ...otherOptions
  } = options

  svgoOptions.js2svg.pretty = pretty && !minify
  for (const key in otherOptions) {
    if (Object.prototype.hasOwnProperty.call(otherOptions, key)) {
      const params = otherOptions[key]
      if (params) {
        svgoOptions.plugins.push({ name: key, params } as SvgoPlugin)
      }
    }
  }

  return {
    name: "rollup-plugin-svg-sprite-loader",
    async load(id) {
      if (!isSVG(id)) {
        return null
      }

      if (convertedSvg.has(id)) {
        return exportSymbol(convertedSvg.get(id))
      }
      const filename = path.basename(id).slice(0, -4)
      const svgContent = await fsp.readFile(id, { encoding: "utf-8" })
      const symbol = createSymbol(svgContent, filename)
      const url = `${publicPath}${spriteFilename}#${symbol.id}`
      const symbolDetail = {
        ...symbol,
        url,
      }
      convertedSvg.set(id, symbolDetail)
      return exportSymbol(symbolDetail)
    },
    async transform(code, id) {
      if (!isSVG) {
        return null
      }
      const { data } = svgo.optimize(code, svgoOptions)
      return { code: data }
    },
    async writeBundle() {
      if (!convertedSvg.size) {
        return
      }
      const symbolsContent = [...convertedSvg.values()].map((symbol) => symbol.content)
      const spriteData = createSprite(symbolsContent)
      const outputStat = await fsp.stat(outputPath)
      if (outputStat.isDirectory()) {
        await fsp.writeFile(path.resolve(__dirname, outputPath, publicPath, spriteFilename), spriteData)
        convertedSvg.clear()
      } else {
        throw new Error("OutputPath must be a valid directory path.")
      }
    },
  }
}
