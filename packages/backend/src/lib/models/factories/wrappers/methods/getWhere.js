const wrapperFactory = require('../wrapperFactory')
const outputItems = require('../sharedSchemas/outputItems')

const inputSchema = {
  additionalProperties: false,
  properties: {
    aggregations: {
      type: 'object',
    },
    aggregationSpecification: {
      type: 'object',
    },
    filterInput: {
      type: 'object',
    },
    filterSpecification: {
      type: 'object',
    },
    idsOnly: {
      type: 'boolean',
    },
    include: {
      type: 'array',
    },
    limit: {
      type: 'number',
    },
    offset: {
      type: 'number',
    },

    scroll: {
      type: 'boolean',
    },
    scrollId: {
      type: 'string',
    },
    where: {
      type: 'object',
    },
  },
  required: [],
}

const outputSchema = {
  additionalProperties: false,
  properties: {
    items: outputItems,
    meta: {
      type: 'object',
    },
  },
  required: ['items'],
}

module.exports = wrapperFactory({
  inputSchema,
  methodName: 'getWhere',
  outputSchema,
})
