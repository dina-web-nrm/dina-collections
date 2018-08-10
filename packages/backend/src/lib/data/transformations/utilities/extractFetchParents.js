module.exports = function extractFetchParents({
  item,
  order = 'asc', // or desc
  parents = [],
}) {
  if (!item) {
    return parents
  }

  const { parent } = item
  if (!parent) {
    return parents
  }

  if (order === 'asc') {
    parents.unshift(parent)
  } else {
    parents.push(parent)
  }

  return extractFetchParents({
    item: parent,
    order,
    parents,
  })
}
