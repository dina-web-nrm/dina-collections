module.exports = function name({ attributesPath, item, input }) {
  const { value } = input
  return !!(item[attributesPath] && item[attributesPath].name === value)
}
