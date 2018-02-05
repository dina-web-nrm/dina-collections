module.exports = function createArraytResponse({ items, type }) {
  if (!items || items.length === 0) {
    return {
      data: {
        data: [],
      },
    }
  }

  return {
    data: {
      data: items.map(item => {
        const { id, ...rest } = item
        return {
          attributes: {
            ...rest,
          },
          id: `${id}`,
          type,
        }
      }),
    },
  }
}
