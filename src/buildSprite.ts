import path from "path"

import { serializeExtractSprite, serializeInlineSprite, serializeSymbol, mergeOptions } from "./utils"
import { InlineSpriteOptions, InlineSpriteSymbol, SpriteOptions, SpriteSymbol } from "../shared"

import { default as defaultExtractOptions } from "./extract/defaultOptions"
import { default as defaultInlineOptions } from "./inline/defaultOptions"

export default class Sprite<T extends SpriteSymbol = SpriteSymbol, U extends SpriteOptions = SpriteOptions> {
  protected options: U
  protected symbols: Map<string, T>
  protected _content: string
  protected _updated: boolean

  constructor(options: Partial<U>) {
    this.options = mergeOptions<U>(options, defaultExtractOptions as U)
    this.symbols = new Map()
    this._content = ""
    this._updated = true
  }

  add(id: string, symbolData: string): T {
    const symbol = serializeSymbol(symbolData, id) as T
    this.set(id, symbol)
    return symbol
  }

  set(id: string, symbol: T): Map<string, T> {
    this._updated = false
    return this.symbols.set(id, symbol)
  }

  find(id: string): T | null {
    return this.symbols.get(id) || null
  }

  has(id: string): boolean {
    return this.symbols.has(id) && !!this.symbols.get(id)
  }

  size(): number {
    return this.symbols.size
  }

  stringify(): string {
    if (!this._updated) {
      this._content = serializeExtractSprite(
        [...this.symbols.values()].sort((a, b) => (a.id > b.id ? 1 : -1)),
        this.options
      )
      this._updated = true
    }
    return this._content
  }

  destroy(): void {
    this.symbols.clear()
    this._updated = false
  }

  toString(): string {
    return this.stringify()
  }
}

export class InlineSprite extends Sprite<InlineSpriteSymbol, InlineSpriteOptions> {
  constructor(options: Partial<InlineSpriteOptions>) {
    super(mergeOptions(options, defaultInlineOptions))
  }

  stringify(): string {
    return serializeInlineSprite(
      [...this.symbols.values()].sort((a, b) => (a.id > b.id ? 1 : -1)),
      this.options
    )
  }
  // remove(id: string): boolean {
  //   const { symbols } = this
  //   const symbol = this.find(id)
  //   if (symbol) {
  //     symbol.destroy()
  //   }
  //   return symbols.delete(id)
  // }

  // destroy(): void {
  //   this.symbols.forEach((symbol) => symbol.destroy())
  // }
}
