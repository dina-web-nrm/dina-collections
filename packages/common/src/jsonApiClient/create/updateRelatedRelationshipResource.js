let create
let update
const setDependencies = dependencies => {
  /* eslint-disable prefer-destructuring */
  create = dependencies.create
  update = dependencies.update
  /* eslint-enable prefer-destructuring */
}

function updateRelatedRelationshipResource({ openApiClient, relationship }) {
  const isArray = Array.isArray(relationship.data)
  if (isArray) {
    const relationshipItems = relationship.data
    return relationshipItems
      .map(item => {
        if (item.id) {
          return update({ item, openApiClient }).then(({ id, type }) => {
            return {
              id,
              type,
            }
          })
        }
        return create({ item, openApiClient }).then(({ id, type }) => {
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

  if (relationship.data.id) {
    return update({
      openApiClient,
      resource: relationship.data,
    }).then(({ id, type }) => {
      return {
        data: {
          id,
          type,
        },
      }
    })
  }

  return create({
    openApiClient,
    resource: relationship.data,
  }).then(({ id, type }) => {
    return {
      data: {
        id,
        type,
      },
    }
  })
}
module.exports = {
  updateRelatedRelationshipResource,
  setDependencies,
}
