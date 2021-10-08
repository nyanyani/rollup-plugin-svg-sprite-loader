export interface SvgoOptions {
  /** Option minify overrides option pretty */
  minify?: boolean
  pretty?: boolean
}
export interface Options extends SvgoOptions {
  extract?: boolean
  /** Directory path must ends with "/" */
  outputPath?: string
  publicPath?: string
  spriteFilename?: string
  [key: string]: void | string | boolean | object
}
export { Plugin } from "rollup"
export interface SpriteSymbol {
  content: string
  id: string
  url: string
  viewBox: string
}
