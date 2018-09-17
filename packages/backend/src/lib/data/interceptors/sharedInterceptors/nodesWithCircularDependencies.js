const getParentId = item => {
  return (
    item &&
    item.relationships &&
    item.relationships.parent &&
    item.relationships.parent.data &&
    item.relationships.parent.data.id
  )
}

const findCircularDependencies = ({ itemsObject, visitedIds = {}, id }) => {
  if (visitedIds[id]) {
    return id
  }

  const activeItem = itemsObject[id]
  const parentId = getParentId(activeItem)
  if (!parentId) {
    return null
  }
  return findCircularDependencies({
    id: parentId,
    itemsObject,
    visitedIds: {
      ...visitedIds,
      [id]: true,
    },
  })
}

module.exports = function nodesWithCircularDependencies({
  // model,
  // models,
  operation,
  request,
  serviceInteractor,
}) {
  const { resource } = operation
  const active =
    request &&
    request.queryParams &&
    request.queryParams.filter &&
    request.queryParams.filter.nodesWithCircularDependencies

  if (!active) {
    return Promise.resolve({
      request,
    })
  }

  return serviceInteractor
    .getMany({
      request: {
        queryParams: {
          limit: 10000,
          relationships: 'parent',
        },
      },
      resource,
    })
    .then(({ data: items }) => {
      const itemsObject = {}
      const parents = {}
      items.forEach(item => {
        itemsObject[item.id] = item
        const parentId = getParentId(item)
        if (parentId !== undefined) {
          parents[parentId] = true
        }
      })

      const leafIds = []
      items.forEach(item => {
        const parentId = getParentId(item)
        if (parentId !== undefined && !parents[item.id]) {
          leafIds.push(item.id)
        }
      })
      const nodesWithCircularDependency = []
      leafIds.forEach(id => {
        const nodeId = findCircularDependencies({
          id,
          itemsObject,
        })
        if (nodeId) {
          nodesWithCircularDependency.push(nodeId)
        }
      })

      const updatedRequest = {
        ...request,
        queryParams: {
          ...request.queryParams,
          filter: {
            ids: nodesWithCircularDependency,
          },
        },
      }
      return {
        request: updatedRequest,
      }
    })
}
