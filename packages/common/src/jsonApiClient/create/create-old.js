/* eslint-disable sort-keys */

const request = {
  type: 'specimen',
  attributes: {},
  relationships: {
    physicalUnits: {
      data: [
        {
          type: 'physicalUnits',
          relationships: {
            collectingEvent: {
              data: {
                type: 'collectingEvent',
                attributes: {},
              },
            },
            storageLocation: {
              data: {
                type: 'storageLocation',
                id: '1234',
              },
            },
          },
        },
      ],
    },
  },
}

const updateRelationship = relationship => {
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

const updateRelationships = relationships => {
  if (!relationships) {
    return Promise.resolve(relationships)
  }
  const updatedRelationships = { ...relationships }
  const promises = []
  if (relationships) {
    Object.keys(relationships).forEach(relationshipKey => {
      const relationship = relationships[relationshipKey]
      promises.push(
        updateRelationship(relationship).then(updatedRelationship => {
          updatedRelationships[relationshipKey] = updatedRelationship
        })
      )
    })
  }
  return Promise.all(promises).then(() => {
    return updatedRelationships
  })
}

const createWithRelationships = resource => {
  const { relationships } = resource
  return updateRelationships(relationships).then(updatedRelationships => {
    if (resource.id) {
      return updateResource({
        ...resource,
        relationships: updatedRelationships,
      })
    }
    return createResource({
      ...resource,
      relationships: updatedRelationships,
    })
  })
}
