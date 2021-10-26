import { SpriteOptions } from "../shared"
import { namespace } from "../utils"

const { svg, xlink } = namespace

const defaultOptions: SpriteOptions = {
  attrs: {
    [svg.name]: svg.uri,
    [xlink.name]: xlink.uri,
  },
  pureSprite: false,
  mode: "extract",
}

export default defaultOptions
