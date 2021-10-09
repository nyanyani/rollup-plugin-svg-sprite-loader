const inline = (spriteNodeId?: string, spriteGlobalVarName?: string): { code: string } => ({
  code: `import { InlineSprite } from "../createSprite"
import { mergeOptions } from "../utils"
import defaultOptions from "./defaultOptions"

const spriteNodeId = ${spriteNodeId ?? "__SVG_SPRITE_NODE__"}
const spriteGlobalVarName = ${spriteGlobalVarName ?? "__SVG_SPRITE__"}
const isSpriteExists = Object.prototype.hasOwnProperty.call(window, spriteGlobalVarName)

let sprite: InlineSprite

if (isSpriteExists) {
  sprite = window[spriteGlobalVarName]
} else {
  sprite = new InlineSprite(mergeOptions(defaultOptions, { attrs: { id: spriteNodeId } }))
  window[spriteGlobalVarName] = sprite
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

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", (e) => {
    loadSprite()
  })
} else {
  loadSprite()
}`,
})
export default inline
export { inline }
