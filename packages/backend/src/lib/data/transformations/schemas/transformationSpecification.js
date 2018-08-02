module.exports = {
  additionalProperties: false,
  properties: {
    cacheRequestsToResources: {
      type: 'array',
    },
    collidingIdPrefix: {
      type: 'string',
    },
    description: {
      type: 'string',
    },
    executeFunction: {
      not: {
        type: 'string',
      },
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
