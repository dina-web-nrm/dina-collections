module.exports = ({ item, input }) => {
  const { value } = input
  return item.id === value
}
