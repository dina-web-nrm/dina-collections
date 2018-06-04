module.exports = ({ item, input }) => {
  const { key, value } = input

  return !!(
    item.attributes &&
    item.attributes.identifiers &&
    item.attributes.identifiers.find(identifier => {
      return identifier.value === value && identifier.key === key
    })
  )
}
