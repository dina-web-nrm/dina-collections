module.exports = function group({ attributesPath, item, input }) {
  const { value } = input
  return !!(item[attributesPath] && item[attributesPath].group === value)
}
