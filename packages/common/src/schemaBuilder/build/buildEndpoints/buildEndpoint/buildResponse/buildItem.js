module.exports = function buildItem({
  modelReferens,
  relationships,
  resource,
}) {
  return {
    additionalProperties: false,
    properties: {
      attributes: modelReferens
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
