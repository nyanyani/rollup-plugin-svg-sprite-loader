# rollup-plugin-svg-sprite-loader

A rollup plugin to create and bundle external svg sprite file.

## Table of contents

- [rollup-plugin-svg-sprite-loader](#rollup-plugin-svg-sprite-loader)
  - [Table of contents](#table-of-contents)
  - [Installation](#installation)
  - [Configuration](#configuration)
  - [Module Config](#module-config)
    - [`symbolId`](#symbolId)
    - [`extract`](#extract)
    - [`pureSprite`](#pureSprite)
    - [`outputPath`](#outputPath)
    - [`publicPath`](#publicPath)
    - [`spriteFilename`](#spriteFilename)
  - [Svgo Config](#svgo-config)
    - [`pretty`](#pretty)
    - [`minify`](#minify)
  - [Usage](#usage)
  - [Licence](#licence)

## Installation

```bash
# via npm
  npm install rollup-plugin-svg-sprite-loader -D

# via yarn
  yarn add rollup-plugin-svg-sprite-loader -D
```

## Configuration

## Module Config

<a id="symbolId"></a>

### `symbolIdQuery` (string | (filePath: string) => string, default `[name]`)

Set `<symbol>`attribute `id` , and set `<use>` attribute `id` to `[symbolId]-usage` in extract mode by default.
Patterns: `[extname]`, `[dirname]`, `[hash]`, `[name]`

e.g.:

```js
import svg from "rollup-plugin-svg-sprite-loader"

rollup({
  //...
  plugins: [
    svg({
      // custom function
      symbolIdQuery(filePath) {
        return `${baseName(filePath, extname(filePath))}-${hash()}`
      },
      // pattern
      symbolIdQuery: "[name][hash]",
    }),
  ],
})
```

<a id="extract"></a>

### `extract` (boolean, default `false`)

`true`: Create external sprite file in [`outputPath`](#outputPath)/[`publicPath`](#publicPath), and export `SpriteSymbol<id: string, viewBox: string, url: string, toString(): string>`

`false`: Inline sprite code and mount it when `DOMContentLoaded` , and export symbol instance `SpriteSymbol<id: string, viewBox: string>`

<a id="pureSprite"></a>

### `pureSprite` (boolean, default: `false`)

`true`: Build sprite file in extract mode without `<styles>` and `<use>`.

`false`: Build sprite file in extract mode with `<styles>` and `<use>`.

<a id="outputPath"></a>

### `outputPath` (string, default: `"./dist/"`)

Set bundle file path, should be equal to rollup config `output.dir`.

<a id="publicPath"></a>

### `publicPath` (string, default: `"/public/"`)

Set output path for sprite file which is relative to `outputPath`.

<a id="spriteFilename"></a>

### `spriteFilename` (string | (spriteDist: string) => string, default: `"sprite.svg"`)

Set output sprite filename in extract mode.
Patterns: `[dirname]`, `[hash]`

e.g.:

```js
import svg from "rollup-plugin-svg-sprite-loader"

rollup({
  //...
  plugins: [
    svg({
      // custom function
      spriteFilename(spriteDist) {
        return `sprite${baseName(filePath).slice(0, 6)}`
      },
      // pattern
      spriteFilename: "sprite[hash].svg",
    }),
  ],
})
```

### `esModule` (boolean, default: `true`)

Set export statement style between `ES modules` and `CommonJS`.

`false`: use `export default svg`.

`true`: use `module.exports = svg`.

## Svgo Config

Options are passed directly to svgo to toggle various svgo plugins. You can find all plugins here: https://github.com/svg/svgo#what-it-can-do

<a id="pretty"></a>

### `pretty` (boolean, default: `false`)

<a id="minify"></a>

### `minify` (boolean, default: `true`)

Option `minify` will override option `pretty`.

## Usage

```jsx
// rollup.config.js
import crypto from "crypto"
import { baseName, extname } from "path"

import svgSpriteLoader from "rollup-plugin-svg-sprite-loader"

const hash = () => crypto.createHash('sha1').update(buffer).digest('hex').substr(0, 16)

export default {
  input: "src/index.js",
  output: {
    file: "dist/app.js",
    format: "iife",
  },
  plugins: [
    svgSprite({
      outputPath: "dist/",
      publicPath: "./public/",
      spriteFilename: "sprite[hash]",
      symbolIdQuery(filePath) {return `${baseName(filePath, extname(filePath))}-${hash()}`},
      extract: true,
    }),
  ],
}

// somewhere in your project
// extract mode
import IconSVG from "./assets/icon/icon.svg"

const Icon = () => {
  const { viewBox, url } = IconSVG
  return (
    <svg viewBox={viewBox}>
      <use xlinkHref={url} />
    </svg>
  )
}

// inline mode
import IconSVG from "./assets/icon/icon.svg"

const Icon = () => {
  const { id, viewBox } = IconSVG
  return (
    <svg viewBox={viewBox}>
      <use xlinkHref={`#${id}`>
    </svg>
  )
}
```

## Licence

MIT
