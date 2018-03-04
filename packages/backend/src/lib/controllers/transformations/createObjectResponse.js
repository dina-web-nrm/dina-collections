module.exports = function createObjectResponse({
  data,
  type,
  relationships,
  status = 200,
}) {
  const { id, ...rest } = data
  return {
    data: {
      attributes: {
        ...rest,
      },
      id: `${id}`,
      relationships: relationships || undefined,
      type,
    },
    meta: {
      internals: {
        status,
      },
    },
  }
}
