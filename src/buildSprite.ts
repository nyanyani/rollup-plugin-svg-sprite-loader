import { Parser, DomHandler, DomUtils } from "htmlparser2"
import render from "dom-serializer"

import { SpriteOptions, SpriteSymbol, SvgAttrs } from "../types"

const { findOne, getAttributeValue } = DomUtils
export function createSymbol(code: string, id: string): SpriteSymbol {
  const symbol: SpriteSymbol = {
    content: "",
    id: "",
    url: "",
    viewBox: "",
    dom: null,
  }
  let svgDom = null

  const handler = new DomHandler(
    (error, dom) => {
      if (error) {
        throw new Error("Invalid code.")
      }
      svgDom = findOne((node) => node.tagName === "svg", dom)
      if (svgDom) {
        svgDom.tagName = "symbol"
        symbol.dom = dom
        symbol.content = render(dom)
        symbol.id = getAttributeValue(svgDom, "id") || getAttributeValue(svgDom, "title") || id
        symbol.viewBox = getAttributeValue(svgDom, "viewBox") || ""
      }
    },
    {
      xmlMode: true,
    }
  )
  const parser = new Parser(handler)
  parser.write(code)
  parser.end()

  return symbol
}

export function createSprite(symbols: SpriteSymbol[], options: SpriteOptions) {
  const { attrs } = options
  const attributes = generateAttrs(attrs)
  const svgContent = symbols.map((symbol) => symbol.content).join("")

  return `<svg ${attributes}}><defs>${svgContent}</defs></svg>`
}

export function generateAttrs(attrs: SvgAttrs): string {
  const result: string[] = []
  for (const key in attrs) {
    if (Object.prototype.hasOwnProperty.call(attrs, key)) {
      const value = attrs[key]
      const kv = Object.entries(attrs)
    }
  }

  return result.join("")
}
