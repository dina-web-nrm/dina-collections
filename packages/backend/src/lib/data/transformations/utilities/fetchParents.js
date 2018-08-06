module.exports = function fetchParents({
  getItemByTypeId,
  ignoreParentIds = [],
  item,
  parents = [],
  resource,
}) {
  const parentId =
    (item &&
      item.relationships &&
      item.relationships.parent &&
      item.relationships.parent.data &&
      item.relationships.parent.data.id) ||
    undefined

  if (parentId === undefined) {
    return Promise.resolve(parents)
  }
  if (
    ignoreParentIds &&
    ignoreParentIds.length &&
    ignoreParentIds.includes(parentId)
  ) {
    return Promise.resolve(parents)
  }

  return getItemByTypeId({
    id: parentId,
    queryParams: { relationships: ['parent'] },
    type: resource,
  }).then(parent => {
    if (!parent) {
      throw new Error(
        `Non existing parent with type: ${resource} and id: ${parentId}`
      )
    }

    parents.unshift(parent)
    return fetchParents({
      getItemByTypeId,
      ignoreParentIds,
      item: parent,
      parents,
      resource,
    })
  })
}
