module.exports = function buildIncluded(include) {
  if (!include || include.length === 0) {
    return undefined
  }
  const included = {
    example: include.map(({ resource }) => {
      return {
        attributes: {},
        id: '1234',
        type: resource,
      }
    }),
    items: {
      oneOf: include.map(({ resource }) => {
        return {
          properties: {
            attributes: {
              $ref: `__ROOT__${resource}`,
            },
            id: { type: 'string' },
            type: {
              default: resource,
              example: resource,
              type: 'string',
            },
          },
          type: 'object',
        }
      }),
    },
    type: 'array',
  }
  return included
}
