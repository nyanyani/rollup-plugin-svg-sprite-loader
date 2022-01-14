import { promises as fsp } from "fs"
import path from "path"
import svgo from "svgo"
import type { OptimizeOptions, Plugin as SvgoPlugin } from "svgo"

import { InlineSprite, Sprite } from "./utils/buildSprite"
import { inline } from "./inline"
import { Options, Plugin } from "./shared"
import { exportSymbol, interpolateName, isSVG } from "./utils"

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

  const exportOptions = { extract, esModule }
  const spriteOptions = { pureSprite, attrs: symbolAttrs }
  const sprite = extract ? new Sprite(spriteOptions) : new InlineSprite(spriteOptions)
  const destination = path.resolve(outputPath, publicPath)
  const fallbackOutput = path.resolve(destination, "./default")

  let noImport = true
  let spriteSvgName = typeof spriteFilename === "function" ? spriteFilename(destination) : spriteFilename
  const shouldInterpolate = extract && /\[hash|dirname|extname|name\]/g.test(spriteSvgName)

  return {
    name: "rollup-plugin-svg-sprite-loader",
    async load(id) {
      if (noImport && isSVG(id)) {
        noImport = false
      }
      return null
    },
    async transform(code, id) {
      if (noImport || !isSVG(id)) {
        return null
      }
      const result = svgo.optimize(code, svgoOptions)
      if (result.modernError) {
        throw new Error(`svgo optimized error: ${result.error}`)
      }
      const { data } = result
      const interpolatedId =
        typeof symbolIdQuery === "function" ? symbolIdQuery(id) : interpolateName(outputPath, id, code, symbolIdQuery)
      const symbol = sprite.add(interpolatedId, data)
      if (extract) {
        // If filename should be replaced by pattern, then set it to an unused unicode char.
        symbol.url = path
          .join(publicPath, `${shouldInterpolate ? "\u{2764}__SVG_PATTERN__" : spriteFilename}#${symbol.id}`)
          .split(path.sep)
          .join(path.posix.sep)
      }
      const exportCode = exportSymbol(symbol, exportOptions)
      // Notice: transform phase must return valid javascript code, cannot return undefined.
      return { code: exportCode }
    },
    async renderChunk(code) {
      if (noImport) {
        return { code }
      }
      if (extract) {
        if (shouldInterpolate) {
          const data = sprite.stringify()
          spriteSvgName = interpolateName(outputPath, destination, data, spriteSvgName)
          return {
            code: replaceCode(code, /\u2764__SVG_PATTERN__/g, spriteSvgName),
          }
        }
        return { code }
      }
      const inlineCode = inline(sprite as InlineSprite)

      return { code: [code, inlineCode].join("\n") }
    },
    async writeBundle() {
      if (noImport) {
        return
      }
      const data = sprite.stringify()
      try {
        if (extract) {
          await fsp.mkdir(destination, { recursive: true })
          await fsp.writeFile(path.resolve(destination, spriteSvgName), data)
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

function replaceCode(code: string, source: string | RegExp, target: string): string {
  if (!source || !target) {
    return code
  }
  return code.replace(source, target)
}

export default svgSpriteLoader
