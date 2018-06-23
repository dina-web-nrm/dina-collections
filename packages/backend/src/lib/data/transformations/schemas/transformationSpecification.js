module.exports = {
  additionalProperties: false,
  properties: {
    description: {
      type: 'string',
    },
    resourceCacheMap: {
      type: 'object',
    },
    srcFileName: {
      type: 'string',
    },
    srcResource: {
      type: 'string',
    },

    transformationFunctions: {
      type: 'object',
    },
    warmViews: {
      type: 'array',
    },
  },
  required: [],
}
