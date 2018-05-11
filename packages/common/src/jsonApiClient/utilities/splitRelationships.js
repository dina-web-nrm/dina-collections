function splitRelationships(
  { relationshipKeysToIncludeInBody = [], relationships } = {}
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
