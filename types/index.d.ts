import type { Plugin } from "rollup"

export interface SvgoOptions {
  /** Option minify overrides option pretty
   * @default false
   */
  minify?: boolean

  /** @default false */
  pretty?: boolean
}

export interface Options extends SvgoOptions {
  /**
   * Control how sprite svg file is bundled.
   * `true`: Create external sprite file in outputPath/publicPath, and export SpriteSymbol
   * `false`: Inline sprite code and mount it when DOMContentLoaded , and export symbol instance SpriteSymbol
   * @default false
   */
  extract?: boolean

  /**
   * Set bundle file path, should be equal to rollup config output.dir.
   * Note: Directory path must ends with "/"
   * @default "./dist/"
   */
  outputPath?: string

  /**
   * Set output path for sprite file which is relative to outputPath.
   * @default "/public/"
   */
  publicPath?: string

  /**
   * Set output sprite filename in extract mode.
   * `Patterns`: [dirname], [hash]
   * @default "sprite.svg"
   */
  spriteFilename?: string | ((filePath: string) => string)

  /**
   * Set <symbol>attribute id , and set <use> attribute id to [symbolId]-usage in extract mode by default.
   * `Patterns`: [extname], [dirname], [hash], [name]
   * @default undefined
   */
  symbolIdQuery?: string | ((filePath: string) => string)

  /**
   * Set `<symbol>` element attribute, must be valid DOM attributes.
   * @default undefined
   */
  symbolAttrs?: object

  /**
   * Set export statement style between `ES modules` and `CommonJS`.
   * @default true
   */
  esModule?: boolean

  /**
   * `true`: Build sprite file in extract mode without <styles> and <use>.
   * `false`: Build sprite file in extract mode with <styles> and <use>.
   * @default false
   */
  pureSprite?: boolean
  [key: string]: void | string | boolean | object
}

export default function svgSpriteLoader(options?: Options): Plugin
