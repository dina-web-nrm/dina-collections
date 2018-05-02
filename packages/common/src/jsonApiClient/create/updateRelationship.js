module.exports = function updateRelationship({
  createWithRelationships,
  relationship,
}) {
  const isArray = Array.isArray(relationship.data)
  if (isArray) {
    const relationshipItems = relationship.data
    return relationshipItems
      .map(item => {
        return createWithRelationships(item).then(({ id, type }) => {
          return {
            id,
            type,
          }
        })
      })
      .then(updatedRelationships => {
        return {
          data: updatedRelationships,
        }
      })
  }
  return createWithRelationships(relationship.data).then(({ id, type }) => {
    return {
      data: {
        id,
        type,
      },
    }
  })
}
