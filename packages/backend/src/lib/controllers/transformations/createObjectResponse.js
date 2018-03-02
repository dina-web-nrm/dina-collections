module.exports = function createObjectResponse({ data, type, relationships }) {
  const { id, ...rest } = data
  return {
    data: {
      attributes: {
        ...rest,
      },
      id: `${id}`,
      relationships,
      type,
    },
  }
}
