import { createSprite, createSymbol, mergeConfig } from "../helpers"
import { InlineSpriteSymbol, SpriteSymbol } from "../../types"
import defaultConfig from "./default.config"

export interface InlineSpriteOptions extends SpriteOptions {
  stringify(): string
  destroy(): void
}

export interface SpriteOptions {
  attrs: {
    id?: string
    "aria-hidden"?: "true" | "false"
  }
}

export default class Sprite<T extends SpriteSymbol = SpriteSymbol> {
  public options: SpriteOptions
  public symbols: Map<string, T>

  constructor(options: SpriteOptions) {
    this.options = mergeConfig<SpriteOptions>(defaultConfig, options)
    this.symbols = new Map()
  }

  add(symbol: T): boolean {
    const existence = this.has(symbol.id)
    this.symbols.set(symbol.id, symbol)

    return existence
  }

  find(id: string): T | null {
    return this.symbols.get(id) || null
  }

  has(id: string): boolean {
    return this.symbols.has(id)
  }

  stringify(): string {
    const result: string[] = []
    this.symbols.forEach(({ content, id }) => {
      const { content: symbolContent } = createSymbol(content, id)
      result.push(symbolContent)
    })
    return createSprite(result)
  }

  toString(): string {
    return this.stringify()
  }
}

export class InlineSprite extends Sprite<InlineSpriteSymbol> {
  public attrs: InlineSpriteOptions["attrs"]

  constructor(options: InlineSpriteOptions) {
    super(options)
    this.attrs = options.attrs
  }

  attach(target: HTMLElement): void {}
  mount(target: HTMLElement, prepend: boolean): void {}

  remove(id: string): boolean {
    const { symbols } = this
    const symbol = this.find(id)

    return symbols.delete(id)
  }

  destroy(): void {
    this.symbols.forEach((symbol) => symbol.destroy())
  }
}
