import crypto from "crypto"
import { basename, dirname, extname, sep, relative } from "path"

function interpolateName(sourceDir: string, filePath: string, buffer: Buffer | string, query?: string): string {
  const ext = extname(filePath)
  const name = basename(filePath, ext)

  if (!query) {
    return name
  }

  const relativeDir = relative(sourceDir, dirname(filePath))
  const outputFilename = query
    .replace(/\[dirname\]/g, relativeDir === "" ? "" : `${relativeDir}${sep}`)
    .replace(/\[extname\]/g, ext.slice(1))
    .replace(/\[name\]/g, name)
  if (/\[hash\]/g.test(outputFilename)) {
    const hash = crypto.createHash("sha1").update(buffer).digest("hex").substr(0, 16)
    return outputFilename.replace(/\[hash\]/g, hash)
  }
  return outputFilename
}

export default interpolateName
export { interpolateName }
