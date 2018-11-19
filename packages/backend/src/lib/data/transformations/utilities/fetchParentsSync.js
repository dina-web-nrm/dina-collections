module.exports = function fetchParentsSync({
  getItemByTypeId,
  ignoreParentIds = [],
  item,
  order = 'asc', // or desc
  parents = [],
  resource,
  throwOnMissing = false,
}) {
  const parentId =
    (item &&
      item.relationships &&
      item.relationships.parent &&
      item.relationships.parent.data &&
      item.relationships.parent.data.id) ||
    undefined

  if (parentId === undefined) {
    return parents
  }
  if (
    ignoreParentIds &&
    ignoreParentIds.length &&
    ignoreParentIds.includes(parentId)
  ) {
    return parents
  }

  const parent = getItemByTypeId({
    id: parentId,
    type: resource,
  })

  if (!parent) {
    if (throwOnMissing) {
      throw new Error(
        `Non existing parent with type: ${resource} and id: ${parentId}`
      )
    }
    return []
  }
  if (order === 'asc') {
    parents.unshift(parent)
  } else {
    parents.push(parent)
  }

  return fetchParentsSync({
    getItemByTypeId,
    ignoreParentIds,
    item: parent,
    order,
    parents,
    resource,
  })
}
