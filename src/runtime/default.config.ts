import { namespace } from "../helpers"

const { svg, xlink } = namespace

const defaultConfig = {
  attrs: {
    [svg.name]: svg.uri,
    [xlink.name]: xlink.uri,
    style: `position: absolute;width: 0;height: 0;`,
    "aria-hidden": "true" as const,
  },
}

export default defaultConfig
