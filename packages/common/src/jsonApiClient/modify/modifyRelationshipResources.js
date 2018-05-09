const { Dependor } = require('../../Dependor')

const { modifyRelatedResourceArray } = require('./modifyRelatedResourceArray')
const { modifyRelatedResourceObject } = require('./modifyRelatedResourceObject')

const dep = new Dependor({
  modifyRelatedResourceArray,
  modifyRelatedResourceObject,
})

function modifyRelationshipResources({ openApiClient, relationships }) {
  if (!relationships) {
    return Promise.resolve(relationships)
  }
  const updatedRelationships = { ...relationships }
  const promises = []

  Object.keys(relationships).forEach(relationKey => {
    const relationship = relationships[relationKey]
    const isArray = Array.isArray(relationship.data)
    const method = isArray
      ? dep.modifyRelatedResourceArray
      : dep.modifyRelatedResourceObject

    promises.push(
      method({
        openApiClient,
        relationship,
      }).then(updatedRelationship => {
        updatedRelationships[relationKey] = updatedRelationship
      })
    )
  })

  return Promise.all(promises).then(() => {
    return updatedRelationships
  })
}

module.exports = {
  dep,
  modifyRelationshipResources,
}
