import { serializeExtractSprite, serializeInlineSprite, serializeSymbol, mergeOptions } from "."
import type { InlineSpriteOptions, InlineSpriteSymbol, SpriteOptions, SpriteSymbol } from "../shared"

import { default as defaultExtractOptions } from "../extract/defaultOptions"
import { default as defaultInlineOptions } from "../inline/defaultOptions"

export class Sprite<T extends SpriteSymbol = SpriteSymbol, U extends SpriteOptions = SpriteOptions> {
  protected options: U
  protected symbols: Map<string, T>
  protected _list: T[]
  protected _content: string
  protected _contentUpdated: boolean
  protected _listUpdated: boolean

  constructor(options: Partial<U>) {
    this.options = mergeOptions<U>(options, defaultExtractOptions as U)
    this.symbols = new Map()
    this._content = ""
    this._contentUpdated = true
    this._list = []
    this._listUpdated = false
  }

  add(id: string, symbolData: string): T {
    const symbol = serializeSymbol(symbolData, id) as T
    if (this.has(id)) {
      this._listUpdated = false
    }
    this.set(id, symbol)
    this._contentUpdated = false
    return symbol
  }

  set(id: string, symbol: T): Map<string, T> {
    this._contentUpdated = false
    return this.symbols.set(id, symbol)
  }

  find(id: string): T | null {
    return this.symbols.get(id) || null
  }

  has(id: string): boolean {
    return this.symbols.has(id) && !!this.symbols.get(id)
  }

  get size(): number {
    return this.symbols.size
  }
  get list() {
    if (!this._listUpdated && this.size) {
      this._list = [...this.symbols.values()].sort((a, b) => (a.id > b.id ? 1 : -1))
      this._listUpdated = true
    }
    return this._list
  }

  stringify(): string {
    if (!this._contentUpdated) {
      this._content = serializeExtractSprite(this.list, this.options)
      this._contentUpdated = true
    }
    return this._content
  }

  destroy(): void {
    this.symbols.clear()
    this._contentUpdated = false
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
    if (!this._contentUpdated) {
      this._contentUpdated = true
      this._content = serializeInlineSprite(this.list, this.options)
    }
    return this._content
  }
}
