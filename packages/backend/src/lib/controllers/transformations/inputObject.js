const extractRelationships = ({
  input,
  relations = {},
  storeEmptyRelationsInDocument,
}) => {
  return Object.keys(relations).reduce((obj, key) => {
    const relation = relations[key]
    const relationData = input.relationships && input.relationships[key]
    if (relation.storeInDocument && relationData) {
      return {
        ...obj,
        [key]: relationData,
      }
    }

    if (relation.storeInDocument && storeEmptyRelationsInDocument) {
      return {
        ...obj,
        [key]:
          relation.format === 'array'
            ? {
                data: [],
              }
            : { data: null },
      }
    }

    return obj
  }, {})
}

module.exports = function transformInput({
  input,
  relations,
  storeEmptyRelationsInDocument,
}) {
  const relationshipData = extractRelationships({
    input,
    relations,
    storeEmptyRelationsInDocument,
  })
  if (!Object.keys(relationshipData).length) {
    return input.attributes
  }

  return {
    ...input.attributes,
    relationships: relationshipData,
  }
}
