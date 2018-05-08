const { Dependor } = require('../../Dependor')

let recursiveCreate
let recursiveUpdate
const setDependencies = dependencies => {
  /* eslint-disable prefer-destructuring */
  recursiveCreate = dependencies.recursiveCreate
  recursiveUpdate = dependencies.recursiveUpdate
  /* eslint-enable prefer-destructuring */
}

const dep = new Dependor({
  setDependencies,
})

function modifyRelatedResourceArray({ openApiClient, relationship }) {
  const relationshipItems = relationship.data
  const promises = relationshipItems.map(item => {
    const method = item.id ? recursiveUpdate : recursiveCreate
    return method({ item, openApiClient, resourceType: item.type }).then(
      ({ data }) => {
        const { id, type } = data
        return {
          id,
          type,
        }
      }
    )
  })

  return Promise.all(promises).then(updatedRelationships => {
    return {
      data: updatedRelationships,
    }
  })
}

module.exports = {
  modifyRelatedResourceArray,
  setDependencies: dep.setDependencies,
}
