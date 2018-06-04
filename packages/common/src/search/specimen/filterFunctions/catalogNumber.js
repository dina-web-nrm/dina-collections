module.exports = ({ item, input }) => {
  const { value } = input

  return !!(item.attributes && item.attributes.catalogNumber === value)
}
