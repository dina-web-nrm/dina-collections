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
    numberOfEntriesEachBatch: {
      type: 'number',
    },
    resolveRelations: {
      oneOf: [
        {
          type: 'boolean',
        },
        {
          type: 'object',
        },
      ],
    },
    resourceCacheMap: {
      type: 'object',
    },
    srcFileName: {
      type: 'string',
    },
    srcRelationships: {
      type: 'array',
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
