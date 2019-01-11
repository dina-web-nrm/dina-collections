const { Dependor } = require('../../Dependor')
const {
  getResourceRelationshipKeysToIncludeInBodyMap,
} = require('../../schemaInterface')

const shouldModifyRelationship = require('./shouldModifyRelationship')

const resourceRelationshipKeysToIncludeInBodyMap = getResourceRelationshipKeysToIncludeInBodyMap()

const dep = new Dependor({
  resourceRelationshipKeysToIncludeInBodyMap,
  shouldModifyRelationship,
})

function splitRelationships(
  { itemResourceType, relationships, relationshipsToModify, resourcePath } = {}
) {
  const res = {
    relationshipsToAssociateSeparately: {},
    relationshipsToIncludeInRequest: {},
    relationshipsToNotModify: [],
  }

  const relationshipKeysToIncludeInBody =
    dep.resourceRelationshipKeysToIncludeInBodyMap[itemResourceType] || []

  Object.keys(relationships).forEach(relationKey => {
    if (
      !shouldModifyRelationship({
        relationKey,
        relationshipsToModify,
        resourcePath,
      })
    ) {
      res.relationshipsToNotModify.push(relationKey)
    } else if (relationshipKeysToIncludeInBody.includes(relationKey)) {
      res.relationshipsToIncludeInRequest[relationKey] =
        relationships[relationKey]
    } else {
      res.relationshipsToAssociateSeparately[relationKey] =
        relationships[relationKey]
    }
  })
  return res
}

module.exports = {
  dep,
  splitRelationships,
}
