import { createSprite, createSymbol, mergeOptions } from "./utils"
import { InlineSpriteOptions, InlineSpriteSymbol, SpriteOptions, SpriteSymbol } from "../types"
import defaultOptions from "./inline/defaultOptions"

export default class Sprite<T extends SpriteSymbol = SpriteSymbol> {
  protected options: SpriteOptions
  protected symbols: Map<string, T>

  constructor(options: SpriteOptions) {
    this.options = mergeOptions(options, defaultOptions)
    this.symbols = new Map()
  }

  add(symbolData: string, id: string): boolean {
    const initial = !this.has(id)
    if (initial) {
      const symbol = createSymbol(symbolData, id) as T
      this.symbols.set(symbol.id, symbol)
    }

    return initial
  }

  find(id: string): T | null {
    return this.symbols.get(id) || null
  }

  has(id: string): boolean {
    return this.symbols.has(id)
  }

  stringify(): string {
    return createSprite([...this.symbols.values()], this.options)
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

  attach(target: HTMLElement): void {
    target.append(this.stringify())
  }

  mount(target: HTMLElement, prepend: boolean): void {
    if (prepend) {
      target.prepend(this.stringify())
    } else {
      target.append(this.stringify())
    }
  }

  remove(id: string): boolean {
    const { symbols } = this
    const symbol = this.find(id)
    if (symbol) {
      symbol.destroy()
    }
    return symbols.delete(id)
  }

  destroy(): void {
    this.symbols.forEach((symbol) => symbol.destroy())
  }
}
