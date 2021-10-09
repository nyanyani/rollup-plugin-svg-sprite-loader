import { SpriteOptions } from "../../types"
import { namespace } from "../utils"

const { svg, xlink } = namespace

const defaultOptions: SpriteOptions = {
  attrs: {
    [svg.name]: svg.uri,
    [xlink.name]: xlink.uri,
  },
  mode: "extract",
}

export default defaultOptions
