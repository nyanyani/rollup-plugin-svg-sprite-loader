const svgReg = /[^/\\*:?"<>|]\.svg$/i
export function isSVG(filePath: string) {
  if (!filePath) {
    return false
  }
  return svgReg.test(filePath)
}
