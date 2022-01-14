import type { SpriteSymbol } from "../shared"

const validateReg = /^[^a-zA-Z_$]|(?<=\w)-(?=\w)/g

interface ExportOptions {
  extract: boolean
  esModule: boolean
}

export default function exportSymbol(symbol: SpriteSymbol, options: ExportOptions) {
  const { esModule, extract } = options
  const { id, viewBox, url } = symbol

  const symbolVarName = id.replace(validateReg, "_")
  const symbolDefineExp = `const ${symbolVarName} = { id: "${id}", viewBox: "${viewBox}"${
    extract ? `, url: "${url}", toString() { return this.url }` : ""
  } };`
  const symbolDefaultExp = `${esModule ? "export default" : "module.exports ="} ${symbolVarName}; `

  // Notice: don't mess up with declaration order
  return [symbolDefineExp, symbolDefaultExp].join("\n")
}

export { exportSymbol }
