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
    count: {
      type: 'boolean',
    },
    excludeFieldsInput: {
      type: 'array',
    },
    filterInput: {
      type: 'object',
    },
    filterSpecification: {
      type: 'object',
    },
    idsInMeta: {
      type: 'boolean',
    },
    include: {
      type: 'array',
    },
    includeDeactivated: {
      type: 'boolean',
    },
    includeFieldsInput: {
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
    raw: {
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
    serviceInteractor: {
      type: 'object',
    },
    sortableFields: {
      type: 'array',
    },
    sortInput: {
      type: 'array',
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
