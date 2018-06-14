module.exports = ({ attributesPath, item, input }) => {
  const { value } = input

  return !!(
    item[attributesPath] && item[attributesPath].catalogNumber === value
  )
}
