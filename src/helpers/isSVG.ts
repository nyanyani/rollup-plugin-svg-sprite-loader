const svgReg = /[^/\\*:?"<>|]\.svg$/i
export function isSVG(filePath) {
  if (!filePath) {
    return false
  }
  return svgReg.test(filePath)
}
