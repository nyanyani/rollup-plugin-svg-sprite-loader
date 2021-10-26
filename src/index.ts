import svgo, { OptimizeOptions, Plugin as SvgoPlugin } from "svgo"
import { promises as fsp } from "fs"
import path from "path"

import { Options, Plugin } from "../shared"
import { exportSymbol, isSVG, interpolateName } from "./utils"
import Sprite, { InlineSprite } from "./buildSprite"

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
    minify = true,
    pretty = false,
    extract = false,
    outputPath = "dist/",
    publicPath = "./public/",
    spriteFilename = "sprite.svg",
    pureSprite = false,
    symbolIdQuery,
    symbolAttrs,
    esModule = true,
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

  const spriteOptions = { pureSprite, attrs: symbolAttrs }
  const sprite = extract ? new Sprite(spriteOptions) : new InlineSprite(spriteOptions)
  const destination = path.resolve(outputPath, publicPath)
  const fallbackOutput = path.resolve(destination, "./default")

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
      const interpolatedId =
        typeof symbolIdQuery === "function" ? symbolIdQuery(id) : interpolateName(outputPath, id, code, symbolIdQuery)
      const symbol = sprite.add(interpolatedId, data)
      if (extract) {
        symbol.url = path.join(publicPath, `${spriteFilename}#${symbol.id}`).split(path.sep).join(path.posix.sep)
      }
      return exportSymbol(symbol, { extract, esModule })
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
      const interpolatedFileName =
        typeof spriteFilename === "function"
          ? spriteFilename(destination)
          : interpolateName(outputPath, destination, data, spriteFilename)
      try {
        if (extract) {
          await fsp.mkdir(destination, { recursive: true })
          await fsp.writeFile(path.resolve(destination, interpolatedFileName), data)
        }
      } catch (e) {
        // eslint-disable-next-line no-undef
        const { code } = e as NodeJS.ErrnoException
        if (code === "ENOENT") {
          await fsp.mkdir(fallbackOutput, { recursive: true })
          await fsp.writeFile(path.resolve(fallbackOutput, "sprite.svg"), data)
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
