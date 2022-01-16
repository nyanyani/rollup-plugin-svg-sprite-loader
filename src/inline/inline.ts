import { InlineSprite } from "../utils/buildSprite"

const inlineRuntimeExp = `;(function (spriteNodeId, spriteGlobalVarName, spriteData) {
  let sprite;
  const isSpriteExists = Object.prototype.hasOwnProperty.call(window, spriteGlobalVarName);
  if (isSpriteExists) {
    sprite = window[spriteGlobalVarName];
  } else {
    sprite = spriteData;
    window[spriteGlobalVarName] = sprite;
  }

  const loadSprite = () => {
    let svgSprite = document.getElementById(spriteNodeId);
    if (!svgSprite) {
      svgSprite = document.createElement("svg");
      document.body.prepend(svgSprite);
    }
    svgSprite.outerHTML = sprite;
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", (e) => {
      loadSprite();
    })
  } else {
    loadSprite();
  }
})`

const inline = (sprite: InlineSprite, spriteNodeId?: string, spriteGlobalVarName?: string): string => {
  // Notice: need to add extra quotes
  const data = "`" + sprite.stringify() + "`"
  // eslint-disable-next-line @typescript-eslint/quotes
  const args = [spriteNodeId || '"__SVG_SPRITE_NODE__"', spriteGlobalVarName || '"__SVG_SPRITE__"', data].join(", ")

  return `${inlineRuntimeExp}(${args})`
}
export default inline
export { inline }
