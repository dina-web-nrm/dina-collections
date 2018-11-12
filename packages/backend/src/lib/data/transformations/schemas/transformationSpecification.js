module.exports = {
  additionalProperties: false,
  properties: {
    cacheRequestsToResources: {
      type: 'array',
    },
    collidingIdPrefix: {
      type: 'string',
    },
    defaultLimit: {
      type: 'number',
    },
    description: {
      type: 'string',
    },
    executeFunction: {
      not: {
        type: 'string',
      },
    },
    globalDecorators: {
      type: 'array',
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
    storeResourceActivity: {
      type: 'boolean',
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
