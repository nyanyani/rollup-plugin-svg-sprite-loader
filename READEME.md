# rollup-plugin-svg-sprite-loader

A rollup plugin to create and bundle external svg sprite file.

## Table of contents

- [rollup-plugin-svg-sprite-loader](#rollup-plugin-svg-sprite-loader)
  - [Table of contents](#table-of-contents)
  - [Installation](#installation)
  - [Configuration](#configuration)
    - [symbolId (string | function(path, query), default [name])](#symbolid-string--functionpath-query-default-name)
    - [symbolRegExp (default '')](#symbolregexp-default-)
    - [esModule (default true, auto-configured)](#esmodule-default-true-auto-configured)
    - [extract mode](#extract-mode)
  - [Usage](#usage)
  - [Licence](#licence)

## Installation

```bash
# via npm
  npm install rollup-plugin-svg-sprite-loader -D

# via yarn
  yarn add rollup-plugin-svg-sprite-loader
```

## Configuration

### symbolId (string | function(path, query), default [name])

How `<symbol>` `id` attribute should be named. All patterns from [loader-utils#interpolateName](https://github.com/webpack/loader-utils#interpolatename)
are supported. Also can be a function which accepts 2 args - file path and query string and return symbol id:

```js
{
  symbolId: (filePath) => path.basename(filePath)
}
```

### symbolRegExp (default '')

### esModule (default true, auto-configured)

### extract mode

Extract mode: SpriteSymbol<id: string, viewBox: string, url: string, toString: Function>

## Usage

```jsx
// rollup.config.js
import svgSpriteLoader from "rollup-plugin-svg-sprite-loader"
export default {
  input: "src/index.js",
  output: {
    file: "dist/app.js",
    format: "iife",
  },
  plugins: [
    svgSprite({
      outputFolder: "dist/public",
      external: true,
    }),
  ],
}

// somewhere in your project
// extract mode
import IconSVG from "./assets/icon/icon.svg"

const Icon = () => {
  const { url } = IconSVG
  return (
    <svg>
      <use xlinkHref={url} />
    </svg>
  )
}

// inline mode
import IconSVG from "./assets/icon/icon.svg"

const Icon = () => {
  return (
    <svg>
      <use xlinkHref="#icon">
    </svg>
  )
}
```

## Licence

MIT
