module.exports = function createObjectResponse({
  data,
  type,
  relationships,
  status = 200,
}) {
  const { id, attributes } = data
  const response = {
    data: {
      attributes,
      id: `${id}`,
      type,
    },
    meta: {
      internals: {
        status,
      },
    },
  }

  // const relationshipsResponse = relationships || storedRelationships

  if (relationships) {
    response.data.relationships = relationships
  }

  return response
}
