# rollup-plugin-svg-sprite-loader

A rollup plugin to create and bundle external svg sprite file.

## Table of contents

- [rollup-plugin-svg-sprite-loader](#rollup-plugin-svg-sprite-loader)
  - [Table of contents](#table-of-contents)
  - [Installation](#installation)
  - [Configuration](#configuration)
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
