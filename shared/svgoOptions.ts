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
  spriteFilename?: string | ((filePath: string) => string)
  symbolIdQuery?: string | ((filePath: string) => string)
  symbolAttrs?: object
  esModule?: boolean
  pureSprite?: boolean
  [key: string]: void | string | boolean | object
}
