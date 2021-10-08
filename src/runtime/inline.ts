import { InlineSprite } from "./insertSprite"

const spriteNodeId = "__SVG_SPRITE_NODE__"
const spriteGlobalVarName = "__SVG_SPRITE__"
const isSpriteExists = Object.prototype.hasOwnProperty.call(window, spriteGlobalVarName)

function domready(fn: () => void) {}

let sprite: InlineSprite

if (isSpriteExists) {
  sprite = (window as any)[spriteGlobalVarName]
} else {
  sprite = new InlineSprite({
    attrs: {
      id: spriteNodeId,
      "aria-hidden": "true",
    },
    // @ts-ignore
  })
  ;(window as any)[spriteGlobalVarName] = sprite
}

const loadSprite = () => {
  /**
   * Check for page already contains sprite node
   * If found - attach to and reuse it's content
   * If not - render and mount the new sprite
   */
  const svgSprite = document.getElementById(spriteNodeId)

  if (svgSprite) {
    sprite.attach(svgSprite)
  } else {
    sprite.mount(document.body, true)
  }
}

if (document.body) {
  loadSprite()
} else {
  domready(loadSprite)
}

export default sprite
