import { SpriteSymbol } from "../../shared"

const validateReg = /^[^a-zA-Z_$]|(?<=\w)-(?=\w)/g

function exportSymbol(symbol: SpriteSymbol | null) {
  if (!symbol) {
    return { code: "" }
  }
  const { id, viewBox, url } = symbol
  const spriteVarName = id.replace(validateReg, "_")

  return {
    // eslint-disable-next-line max-len
    code: `export const ${spriteVarName} = {id: "${id}", viewBox: "${viewBox}", url: "${url}", toString() {return this.url}}; export default ${spriteVarName};`,
  }
}

export default exportSymbol
export { exportSymbol }
