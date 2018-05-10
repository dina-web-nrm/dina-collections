const createLog = require('../../log')

const defaultLog = createLog('common:jsonApiClient:splitRelationships')

function splitRelationships(
  { log = defaultLog, relationshipKeysToIncludeInBody = [], relationships } = {}
) {
  const res = {
    relationshipsToAssociateSeparatly: {},
    relationshipsToIncludeInRequest: {},
  }

  Object.keys(relationships).forEach(key => {
    if (relationshipKeysToIncludeInBody.includes(key)) {
      res.relationshipsToIncludeInRequest[key] = relationships[key]
    } else {
      res.relationshipsToAssociateSeparatly[key] = relationships[key]
    }
  })
  return res
}

module.exports = {
  splitRelationships,
}
