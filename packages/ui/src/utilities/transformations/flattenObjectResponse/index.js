export const flattenRelationships = relationships => {
  if (!relationships) {
    return {}
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

export default function flattenObjectResponse(response) {
  if (!response || !response.data) {
    return response
  }

  const { id, attributes, relationships, type } = response.data

  const flattenedRelationships = flattenRelationships(relationships)

  return {
    ...attributes,
    ...flattenedRelationships,
    id,
    type,
  }
}
