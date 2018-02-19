module.exports = function buildItem({ resource, relationships }) {
  return {
    additionalProperties: false,
    properties: {
      attributes: {
        $ref: `__ROOT__${resource}`,
      },
      id: {
        example: '1234',
        type: 'string',
      },

      relationships,
      type: {
        default: resource,
        type: 'string',
      },
    },
    type: 'object',
  }
}
