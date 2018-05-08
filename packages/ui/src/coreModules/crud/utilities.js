export const getRelationshipItem = ({ item, relationKey }) => {
  return (
    (item &&
      item.relationships &&
      item.relationships[relationKey] &&
      item.relationships[relationKey].data) ||
    null
  )
}

export const getRelationshipItems = ({ item, relationKey }) => {
  return (
    getRelationshipItem({
      item,
      relationKey,
    }) || []
  )
}

export const getRelationshipItemId = ({ item, relationKey }) => {
  const relationshipItem = getRelationshipItem({
    item,
    relationKey,
  })

  return relationshipItem && relationshipItem.id
}

export const getRelationshipItemIds = ({ item, relationKey }) => {
  const relationshipItems = getRelationshipItems({
    item,
    relationKey,
  })

  return relationshipItems.map(relationshipItem => {
    return relationshipItem.id
  })
}

export const getParent = item => {
  return getRelationshipItem({
    item,
    relationKey: 'parent',
  })
}

export const getParentId = item => {
  return getRelationshipItemId({
    item,
    relationKey: 'parent',
  })
}

export const getChildren = item => {
  return getRelationshipItems({
    item,
    relationKey: 'children',
  })
}

export const getChildrenIds = item => {
  return getRelationshipItemIds({
    item,
    relationKey: 'children',
  })
}
