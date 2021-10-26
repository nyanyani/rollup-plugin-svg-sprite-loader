import { SpriteSymbol } from "../shared"

const validateReg = /^[^a-zA-Z_$]|(?<=\w)-(?=\w)/g

interface ExportOptions {
  extract: boolean
  esModule: boolean
}

function exportSymbol(symbol: SpriteSymbol | null, options: ExportOptions) {
  if (!symbol) {
    return { code: "" }
  }
  const { id, viewBox, url } = symbol
  const { extract, esModule } = options
  const spriteVarName = id.replace(validateReg, "_")
  const content = `const ${spriteVarName} = {id: "${id}", viewBox: "${viewBox}"${
    extract ? `, url: "${url}", toString() {return this.url}` : ""
  }};`
  const exportModule = esModule
    ? `export { ${spriteVarName} }; export default ${spriteVarName};`
    : `module.exports = {...${spriteVarName}}};`
  return {
    code: `${content} ${exportModule}`,
  }
}

export default exportSymbol
export { exportSymbol }
