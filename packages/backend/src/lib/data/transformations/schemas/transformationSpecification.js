module.exports = {
  additionalProperties: false,
  properties: {
    description: {
      type: 'string',
    },
    resolveRelations: {
      type: 'boolean',
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
