const { Dependor } = require('../../Dependor')
const {
  getResourceRelationshipKeysToIncludeInBodyMap,
} = require('../../schemaInterface')

const resourceRelationshipKeysToIncludeInBodyMap = getResourceRelationshipKeysToIncludeInBodyMap()

const dep = new Dependor({
  resourceRelationshipKeysToIncludeInBodyMap,
})

function splitRelationships({ itemResourceType, relationships } = {}) {
  const res = {
    relationshipsToAssociateSeparately: {},
    relationshipsToIncludeInRequest: {},
  }

  const relationshipKeysToIncludeInBody =
    dep.resourceRelationshipKeysToIncludeInBodyMap[itemResourceType] || []

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
  dep,
  splitRelationships,
}
