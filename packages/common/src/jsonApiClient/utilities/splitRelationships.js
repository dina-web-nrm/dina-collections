const {
  getResourceRelationshipKeysToIncludeInBodyMap,
} = require('../../schemaInterface')

const resourceRelationshipKeysToIncludeInBodyMap = getResourceRelationshipKeysToIncludeInBodyMap()

function splitRelationships({ itemResourceType, relationships } = {}) {
  const res = {
    relationshipsToAssociateSeparately: {},
    relationshipsToIncludeInRequest: {},
  }

  const relationshipKeysToIncludeInBody =
    resourceRelationshipKeysToIncludeInBodyMap[itemResourceType] || []

  Object.keys(relationships).forEach(key => {
    if (relationshipKeysToIncludeInBody.includes(key)) {
      res.relationshipsToIncludeInRequest[key] = relationships[key]
    } else {
      res.relationshipsToAssociateSeparately[key] = relationships[key]
    }
  })
  return res
}

module.exports = {
  splitRelationships,
}
