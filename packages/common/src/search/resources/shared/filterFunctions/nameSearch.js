module.exports = function nameSearch({ attributesPath, item, input }) {
  const { value } = input
  if (!value) {
    return false
  }
  const lowerCaseValue = value.toLowerCase()
  const name = item[attributesPath] && item[attributesPath].group
  if (!name) {
    return false
  }

  return name.indexOf(lowerCaseValue) > -1
}
