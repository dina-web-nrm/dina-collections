const wrapperFactory = require('../wrapperFactory')
const outputItems = require('../sharedSchemas/outputItems')

const inputSchema = {
  additionalProperties: false,
  properties: {
    aggregations: {
      type: 'array',
    },
    aggregationSpecification: {
      type: 'object',
    },
    fieldsInput: {
      type: 'array',
    },
    filterInput: {
      type: 'object',
    },
    filterSpecification: {
      type: 'object',
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
    query: {
      type: 'object',
    },
    scroll: {
      type: 'boolean',
    },
    scrollId: {
      type: 'string',
    },
    selectableFields: {
      type: 'array',
    },
    sortInput: {
      type: 'array',
    },
    sortSpecification: {
      type: 'object',
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
