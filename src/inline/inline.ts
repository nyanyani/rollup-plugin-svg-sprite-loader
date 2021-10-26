import { InlineSprite } from "../buildSprite"

const inline = (code: string, sprite: InlineSprite, spriteNodeId?: string, spriteGlobalVarName?: string): string => {
  const data = sprite.stringify()
  return `${code}
;((spriteNodeId, spriteGlobalVarName) => {
  let sprite
  const isSpriteExists = Object.prototype.hasOwnProperty.call(window, spriteGlobalVarName)
  if (isSpriteExists) {
    sprite = window[spriteGlobalVarName]
  } else {
    sprite = \`${data}\`
    window[spriteGlobalVarName] = sprite
  }

  const loadSprite = () => {
    let svgSprite = document.getElementById(spriteNodeId)
    if (!svgSprite) {
      svgSprite = document.createElement("svg")
      document.body.prepend(svgSprite)
    }
    svgSprite.outerHTML = sprite
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", (e) => {
      loadSprite()
    })
  } else {
    loadSprite()
  }
})(${spriteNodeId ?? `"__SVG_SPRITE_NODE__"`}, ${spriteGlobalVarName ?? `"__SVG_SPRITE__"`});`
}
export default inline
export { inline }
