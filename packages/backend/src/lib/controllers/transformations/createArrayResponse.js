module.exports = function createArrayResponse({ items, type }) {
  if (!items || items.length === 0) {
    return {
      data: [],
    }
  }

  return {
    data: items.map(item => {
      const { id, relationships, ...rest } = item
      return {
        attributes: {
          ...rest,
        },
        id: `${id}`,
        relationships,
        type,
      }
    }),
  }
}
