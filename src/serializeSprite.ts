import { Parser, ElementType } from "htmlparser2"
import { DomHandler, Element, Text } from "domhandler"
import { findOne, appendChild } from "domutils"

import render from "dom-serializer"

import { InlineSpriteOptions, InlineSpriteSymbol, SpriteOptions, SpriteSymbol } from "../shared"
const spriteStyleNode = new Element(
  "style",
  {},
  [new Text(".svg-sprite__symbol{display: none;}.svg-sprite__symbol:target{display: inline;}")],
  ElementType.Style
)

export function serializeSymbol(code: string, id: string): SpriteSymbol {
  const symbol: SpriteSymbol = {
    content: "",
    id: "",
    url: "",
    viewBox: "",
    dom: null,
  }
  let symbolDom = null

  const handler = new DomHandler(
    (error, dom) => {
      if (error) {
        throw new Error("Invalid code.")
      }
      symbolDom = findOne((node) => node.tagName === "svg", dom)
      if (symbolDom) {
        const { id: attrsId, className, viewbox } = symbolDom.attribs
        symbolDom.tagName = "symbol"
        symbolDom.attribs.id = id
        symbolDom.attribs.class = `${className ? `${className} ` : ""}svg-sprite__symbol`

        symbol.content = render(dom)
        symbol.dom = symbolDom
        symbol.id = attrsId || id
        symbol.viewBox = viewbox || ""
      }
    },
    {
      xmlMode: true,
    }
  )
  const parser = new Parser(handler)
  if (code) {
    parser.write(code)
  }
  parser.end()

  return symbol
}

export function serializeExtractSprite(symbols: SpriteSymbol[], options: SpriteOptions) {
  const { attrs, pureSprite } = options
  const spriteDefsNode = new Element("defs", {}, [spriteStyleNode])
  const spriteNode = new Element("svg", attrs, [spriteDefsNode], ElementType.Tag)

  symbols.forEach((symbol) => {
    appendChild(spriteDefsNode, symbol.dom!)
    if (!pureSprite) {
      appendChild(
        spriteNode,
        new Element(
          "use",
          {
            id: `${symbol.id}-usage`,
            "xlink:href": `#${symbol.id}`,
            class: "svg-sprite-symbol",
          },
          [],
          ElementType.Tag
        )
      )
    }
  })

  return render(spriteNode, { xmlMode: "foreign" })
}

export function serializeInlineSprite(symbols: InlineSpriteSymbol[], options: InlineSpriteOptions): string {
  const spriteNode = new Element("svg", options.attrs, [], ElementType.Tag)

  symbols.forEach((symbol) => {
    appendChild(spriteNode, symbol.dom!)
  })

  return render(spriteNode, { xmlMode: "foreign" })
}
