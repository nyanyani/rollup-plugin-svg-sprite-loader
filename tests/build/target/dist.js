const __SVG_SYMBOL_LIST__ = {};
const example_1 = { id: "example-1", viewBox: "0 0 24 24" };
__SVG_SYMBOL_LIST__[example_1] = example_1;

export { __SVG_SYMBOL_LIST__ as default, example_1 };
function __SVG_SPRITE_RUNTIME__ (spriteNodeId, spriteGlobalVarName, spriteData) {
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
}
__SVG_SPRITE_RUNTIME__("__SVG_SPRITE_NODE__", "__SVG_SPRITE__", `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="position: absolute; width: 0; height: 0;" aria-hidden="true"><symbol viewBox="0 0 24 24" id="example-1" class="svg-sprite__symbol"><path d="m19 21-3.057 3L4 12 15.943 0 19 3l-9 9 9 9Z" fill="currentColor"/></symbol><symbol viewBox="0 0 30 30" fill="none" id="example-2" class="svg-sprite__symbol"><path d="M17.349 20.37a5.86 5.86 0 1 1 3.16-3.37" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M16 1h-2a2 2 0 0 0-2 2c0 1.756-2.123 2.635-3.364 1.393a2 2 0 0 0-2.828 0L4.393 5.808a2 2 0 0 0 0 2.828C5.635 9.877 4.756 12 3 12a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2c1.756 0 2.635 2.123 1.393 3.364a2 2 0 0 0 0 2.828l1.415 1.415a2 2 0 0 0 2.828 0C9.877 24.365 12 25.244 12 27a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2c0-1.756 2.123-2.635 3.364-1.393a2 2 0 0 0 2.828 0l1.415-1.415a2 2 0 0 0 0-2.828C24.365 20.123 25.244 18 27 18a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2c-1.756 0-2.635-2.123-1.393-3.364a2 2 0 0 0 0-2.828l-1.415-1.415a2 2 0 0 0-2.828 0C20.123 5.635 18 4.756 18 3a2 2 0 0 0-2-2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></symbol></svg>`);
const example_2 = { id: "example-2", viewBox: "0 0 30 30" };
__SVG_SYMBOL_LIST__[example_2] = example_2;

export { example_2 };

__SVG_SPRITE_RUNTIME__("__SVG_SPRITE_NODE__", "__SVG_SPRITE__", `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="position: absolute; width: 0; height: 0;" aria-hidden="true"><symbol viewBox="0 0 24 24" id="example-1" class="svg-sprite__symbol"><path d="m19 21-3.057 3L4 12 15.943 0 19 3l-9 9 9 9Z" fill="currentColor"/></symbol><symbol viewBox="0 0 30 30" fill="none" id="example-2" class="svg-sprite__symbol"><path d="M17.349 20.37a5.86 5.86 0 1 1 3.16-3.37" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M16 1h-2a2 2 0 0 0-2 2c0 1.756-2.123 2.635-3.364 1.393a2 2 0 0 0-2.828 0L4.393 5.808a2 2 0 0 0 0 2.828C5.635 9.877 4.756 12 3 12a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2c1.756 0 2.635 2.123 1.393 3.364a2 2 0 0 0 0 2.828l1.415 1.415a2 2 0 0 0 2.828 0C9.877 24.365 12 25.244 12 27a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2c0-1.756 2.123-2.635 3.364-1.393a2 2 0 0 0 2.828 0l1.415-1.415a2 2 0 0 0 0-2.828C24.365 20.123 25.244 18 27 18a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2c-1.756 0-2.635-2.123-1.393-3.364a2 2 0 0 0 0-2.828l-1.415-1.415a2 2 0 0 0-2.828 0C20.123 5.635 18 4.756 18 3a2 2 0 0 0-2-2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></symbol></svg>`);
