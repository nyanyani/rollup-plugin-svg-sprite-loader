import { Parser, DomHandler, DomUtils } from "htmlparser2"
import render from "dom-serializer"

import { namespace } from "./namespace"
import { SpriteSymbol } from "../../types"

const { findOne, getAttributeValue } = DomUtils
export function createSymbol(code: string, id: string): SpriteSymbol {
  const symbol: SpriteSymbol = {
    content: "",
    id: "",
    url: "",
    viewBox: "",
  }
  const handler = new DomHandler(
    (error, dom) => {
      if (error) {
        throw new Error("Invalid code.")
      }
      const svgDom = findOne((node) => node.tagName === "svg", dom)
      if (svgDom) {
        svgDom.tagName = "symbol"
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

export function createSprite(symbolsContent: string[]) {
  const { svg, xlink } = namespace

  return `<svg ${svg.name}=${svg.uri} ${xlink.name}=${xlink.uri}><defs>${symbolsContent.join("")}</defs></svg>`
}
