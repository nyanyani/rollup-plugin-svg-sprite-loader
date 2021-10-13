import { Node as SymbolNode } from "domhandler"

export interface SpriteSymbol {
  content: string
  id: string
  url: string
  viewBox: string
  dom: SymbolNode | null
}

export interface InlineSpriteSymbol extends SpriteSymbol {
  destroy(): boolean
  stringify(): string
}

export interface InlineSpriteOptions extends SpriteOptions {
  mode: "inline"
}

export interface SvgAttrs {
  [key: string]: any
  "aria-hidden"?: "true" | "false"
}

export interface SpriteOptions {
  [key: string]: SvgAttrs | any[] | string
  attrs: SvgAttrs
  mode: "extract" | "inline"
}
