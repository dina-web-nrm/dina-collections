const formatAsTimestamp = require('common/src/date/formatAsTimestamp')

module.exports = function createObjectResponse({
  data,
  type,
  relationships,
  status = 200,
}) {
  const { id, attributes, internals = {} } = data

  const { deactivatedAt } = internals
  const patchedAttributes = deactivatedAt
    ? {
        ...attributes,
        deactivatedAt: formatAsTimestamp(deactivatedAt),
      }
    : attributes

  const response = {
    data: {
      attributes: patchedAttributes,
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
