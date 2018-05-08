const extractForeignKeyRelationships = ({ input, relations = {} }) => {
  return Object.keys(relations).reduce((obj, key) => {
    const relation = relations[key]
    const { storeInDocument, format } = relation
    const relationId =
      input.relationships &&
      input.relationships[key] &&
      input.relationships[key].data &&
      input.relationships[key].data.id
    if (!storeInDocument && relationId !== undefined && format === 'object') {
      const foreignKeyName = `${key}Id`
      return {
        ...obj,
        [foreignKeyName]: relationId,
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
  storeEmptyRelationsInDocument,
}) {
  const relationshipData = extractRelationships({
    input,
    relations,
    storeEmptyRelationsInDocument,
  })

  const foreignKeyObject = extractForeignKeyRelationships({
    input,
    relations,
  })

  let output = { doc: input.attributes }

  if (Object.keys(relationshipData).length) {
    output = {
      ...output,
      doc: {
        ...output.doc,
        relationships: relationshipData,
      },
    }
  }

  if (Object.keys(foreignKeyObject).length) {
    output = {
      ...output,
      foreignKeyObject,
    }
  }

  return output
}
