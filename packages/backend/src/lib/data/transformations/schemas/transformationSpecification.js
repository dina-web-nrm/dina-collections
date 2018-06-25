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
      type: 'array',
    },
    warmViews: {
      type: 'array',
    },
  },
  required: [],
}
