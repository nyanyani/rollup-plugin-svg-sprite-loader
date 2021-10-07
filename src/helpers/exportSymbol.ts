export default function exportSymbol(symbolDetail) {
  const { id, viewBox, url } = symbolDetail
  return { code: `export default {id: ${id}, viewBox: ${viewBox}, url: ${url}, toString() { return this.url}` }
}
