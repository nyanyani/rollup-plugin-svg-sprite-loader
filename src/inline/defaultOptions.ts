import { namespace } from "../utils"
import type { InlineSpriteOptions } from "../shared"

const { svg, xlink } = namespace

const defaultOptions: InlineSpriteOptions = {
  attrs: {
    [svg.name]: svg.uri,
    [xlink.name]: xlink.uri,
    style: ["position: absolute", "width: 0", "height: 0"].join("; ") + ";",
    "aria-hidden": "true" as const,
  },
  mode: "inline",
  pureSprite: false,
}

export default defaultOptions
