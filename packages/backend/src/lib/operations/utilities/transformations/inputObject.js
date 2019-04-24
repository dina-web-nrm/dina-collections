const extractForeignKeyRelationships = ({
  input,
  relations = {},
  sourceResource,
}) => {
  return Object.keys(relations).reduce((obj, key) => {
    const relation = relations[key]
    const { keyName, keyType, keyStoredInModel, targetResource } = relation

    if (keyStoredInModel === sourceResource && keyType === 'sql') {
      const relationId =
        input.relationships &&
        input.relationships[key] &&
        input.relationships[key].data &&
        input.relationships[key].data.id

      if (relationId !== undefined) {
        const foreignKeyName = keyName || `${targetResource}Id`

        return {
          ...obj,
          [foreignKeyName]: relationId,
        }
      }
    }

    return obj
  }, {})
}

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
  sourceResource,
  storeEmptyRelationsInDocument,
}) {
  const relationshipData = extractRelationships({
    input,
    relations,
    storeEmptyRelationsInDocument,
  })

  const internals = extractForeignKeyRelationships({
    input,
    relations,
    sourceResource,
  })

  let output = { attributes: input.attributes }

  if (output.attributes && output.attributes.deactivatedAt) {
    delete output.attributes.deactivatedAt
  }

  if (Object.keys(relationshipData).length) {
    output = {
      ...output,
      relationships: relationshipData,
    }
  }

  if (Object.keys(internals).length) {
    output = {
      ...output,
      internals,
    }
  }
  return { item: output }
}
