module.exports = function createObjectResponse({ data, type, status = 200 }) {
  const response = {
    data: data
      ? {
          id: `${data.id}`,
          type,
        }
      : null,
    meta: {
      internals: {
        status,
      },
    },
  }

  return response
}
