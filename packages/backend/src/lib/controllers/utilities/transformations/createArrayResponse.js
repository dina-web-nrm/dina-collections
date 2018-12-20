const formatAsTimestamp = require('common/src/date/formatAsTimestamp')

module.exports = function createArrayResponse({
  items,
  meta: metaInput = {},
  status = 200,
  type,
}) {
  const meta = {
    ...metaInput,
    internals: {
      status,
    },
  }
  if (!items || items.length === 0) {
    return {
      data: [],
      meta,
    }
  }

  return {
    data: items.map(item => {
      const {
        id,
        relationships,
        type: itemType,
        attributes,
        internals = {},
      } = item

      const { deactivatedAt } = internals
      const patchedAttributes = deactivatedAt
        ? {
            ...attributes,
            deactivatedAt: formatAsTimestamp(deactivatedAt),
          }
        : attributes

      const itemResponse = {
        attributes: patchedAttributes,
        id: `${id}`,
        type: itemType || type,
      }

      if (relationships) {
        itemResponse.relationships = relationships
      }

      return itemResponse
    }),
    meta,
  }
}
