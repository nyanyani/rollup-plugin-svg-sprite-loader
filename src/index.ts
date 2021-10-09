import svgo, { OptimizeOptions, Plugin as SvgoPlugin } from "svgo"
import { promises as fsp } from "fs"
import path from "path"

import { Options, Plugin, SpriteSymbol } from "../types"
import { exportSymbol, isSVG } from "./utils"
import Sprite, { InlineSprite } from "./createSprite"
import defaultInlineOpts from "./inline/defaultOptions"
import defaultExtractOpts from "./extract/defaultOptions"
import { inline } from "./inline"

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

export function svgSpriteLoader(options: Options = {}): Plugin {
  const {
    minify = false,
    pretty = false,
    extract = false,
    outputPath = "./dist/",
    publicPath = "/public/",
    spriteFilename = "sprite.svg",
    ...otherOptions
  } = options

  svgoOptions.js2svg!.pretty = pretty && !minify
  for (const key in otherOptions) {
    if (Object.prototype.hasOwnProperty.call(otherOptions, key)) {
      const params = otherOptions[key]
      if (params) {
        svgoOptions.plugins!.push({ name: key, params } as SvgoPlugin)
      }
    }
  }

  const sprite = extract ? new Sprite(defaultExtractOpts) : new InlineSprite(defaultInlineOpts)

  return {
    name: "rollup-plugin-svg-sprite-loader",
    async load(id) {
      if (isSVG(id)) {
        const filename = path.basename(id).slice(0, -4)
        const svgContent = await fsp.readFile(id, { encoding: "utf-8" })
        sprite.add(svgContent, filename)
        const symbol = sprite.find(filename)!
        if (!extract) {
          symbol.url = `${publicPath}${spriteFilename}#${id}`
        }
      }
      return null
    },
    async transform(code, id) {
      console.log("transform code", code)
      if (isSVG(id)) {
        if (extract) {
          return exportSymbol(sprite.find(id)!)
        }
        return inline()
      }
      return null
    },
    async writeBundle() {
      if (!convertedSvg.size || !extract) {
        return
      }
      const { data } = svgo.optimize(sprite.stringify(), svgoOptions)
      let outputStat = null
      try {
        outputStat = await fsp.stat(outputPath)
      } catch (e) {
        const { code, path, message } = e as NodeJS.ErrnoException
        if (code === "ENOENT") {
          throw new Error(`No such directory "${path}".`)
        }
        throw new Error(message)
      }
      if (outputStat && outputStat.isDirectory()) {
        await fsp.writeFile(path.resolve(__dirname, outputPath, publicPath, spriteFilename), data)
        convertedSvg.clear()
      } else {
        throw new Error("OutputPath must be a valid directory path.")
      }
    },
  }
}
export default svgSpriteLoader
