module.exports = function createArrayResponse({ items, status = 200, type }) {
  if (!items || items.length === 0) {
    return {
      data: [],
    }
  }

  return {
    data: items.map(item => {
      const { id, type: itemType } = item
      const itemResponse = {
        id: `${id}`,
        type: type || itemType,
      }

      return itemResponse
    }),
    meta: {
      internals: {
        status,
      },
    },
  }
}
