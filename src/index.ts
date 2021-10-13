import svgo, { OptimizeOptions, Plugin as SvgoPlugin } from "svgo"
import { promises as fsp } from "fs"
import path from "path"

import { Options, Plugin } from "../shared"
import { exportSymbol, isSVG } from "./utils"
import Sprite, { InlineSprite } from "./buildSprite"
import defaultInlineOpts from "./inline/defaultOptions"
import defaultExtractOpts from "./extract/defaultOptions"
import { inline } from "./inline"

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
    "removeXMLNS",
  ],
}

export function svgSpriteLoader(options: Options = {}): Plugin {
  const {
    minify = false,
    pretty = false,
    extract = false,
    outputPath = "dist/",
    publicPath = "./public/",
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
  const destination = path.resolve(outputPath, publicPath)
  const fallbackOutput = path.resolve(destination, "./default/defaultOutput.svg")

  let noImport = true

  return {
    name: "rollup-plugin-svg-sprite-loader",
    async load(id) {
      if (isSVG(id)) {
        noImport = false
      }
      return null
    },
    async transform(code, id) {
      if (noImport || !isSVG(id)) {
        return null
      }
      const { data } = svgo.optimize(code, svgoOptions)
      const symbol = sprite.add(id, data)
      if (extract) {
        symbol.url = path.join(publicPath, `${spriteFilename}#${symbol.id}`).replace("\\", "\\\\")
      }
      return exportSymbol(symbol)
    },
    async renderChunk(code) {
      if (extract) {
        return { code }
      }
      const inlineCode = inline(code, sprite as InlineSprite)
      return { code: inlineCode }
    },
    async writeBundle() {
      if (noImport) {
        return
      }
      const data = sprite.stringify()
      try {
        await fsp.mkdir(destination, { recursive: true })
        if (extract) {
          await fsp.writeFile(path.resolve(destination, spriteFilename), data)
        }
      } catch (e) {
        // eslint-disable-next-line no-undef
        const { code } = e as NodeJS.ErrnoException
        if (code === "ENOENT") {
          await fsp.mkdir(fallbackOutput, { recursive: true })
          await fsp.writeFile(fallbackOutput, data)
          throw new Error("OutputPath must be a valid directory path.")
        }
        throw e
      } finally {
        sprite.destroy()
      }
    },
  }
}
export default svgSpriteLoader
