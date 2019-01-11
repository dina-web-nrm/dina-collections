function stripRelationshipNotToModify({ relationship = {} } = {}) {
  const isArray = Array.isArray(relationship.data)
  if (isArray) {
    return {
      data: relationship.data.map(item => {
        return {
          id: item.id,
          type: item.type,
        }
      }),
    }
  }

  if (!relationship.data) {
    return null
  }

  return {
    data: {
      id: relationship.data.id,
      type: relationship.data.type,
    },
  }
}

module.exports = {
  stripRelationshipNotToModify,
}
