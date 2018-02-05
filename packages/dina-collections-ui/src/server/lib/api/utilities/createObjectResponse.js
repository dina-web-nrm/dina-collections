module.exports = function createObjectResponse({ data, type }) {
  const { id, ...rest } = data
  return {
    data: {
      data: {
        attributes: {
          ...rest,
        },
        id: `${id}`,
        type,
      },
    },
  }
}
