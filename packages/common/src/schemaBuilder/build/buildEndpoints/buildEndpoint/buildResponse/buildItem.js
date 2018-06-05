module.exports = function buildItem({
  modelReference,
  relationships,
  resource,
}) {
  return {
    additionalProperties: false,
    properties: {
      attributes: modelReference
        ? undefined
        : {
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
