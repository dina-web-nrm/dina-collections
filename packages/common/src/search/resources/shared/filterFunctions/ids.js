module.exports = function ids({ item, input }) {
  const { value = [] } = input
  const id = item
  return value.indexOf(id) > -1
}
