export const flattenRelationships = relationships => {
  if (!relationships) {
    return relationships
  }

  const relationshipKeys = Object.keys(relationships)

  if (!relationshipKeys.length) {
    return {}
  }

  return relationshipKeys.reduce((flatRelations, relationKey) => {
    return {
      ...flatRelations,
      [relationKey]: relationships[relationKey].data,
    }
  }, {})
}

export default function flattenObjectResponse(responseData = {}) {
  const { id, attributes, relationships, type } = responseData || {}

  const flattenedRelationships = flattenRelationships(relationships)

  return {
    ...attributes,
    ...flattenedRelationships,
    id,
    type,
  }
}
