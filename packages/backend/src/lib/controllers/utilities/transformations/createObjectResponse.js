module.exports = function createObjectResponse({
  data,
  type,
  relationships,
  status = 200,
}) {
  const modifiedData = {
    ...data,
  }
  delete modifiedData.relationships

  const { id, ...rest } = modifiedData

  const response = {
    data: {
      attributes: {
        ...rest,
      },
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
