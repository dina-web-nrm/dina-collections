const wrapperFactory = require('../wrapperFactory')
const outputItem = require('../sharedSchemas/outputItem')

const inputSchema = {
  additionalProperties: false,
  properties: {
    allowDeactivated: {
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
    include: {
      type: 'array',
    },
    includeDeactivated: {
      type: 'boolean',
    },
    includeFieldsInput: {
      type: 'array',
    },
    raw: {
      type: 'boolean',
    },
    selectableFields: {
      type: 'array',
    },
    serviceInteractor: {
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
    item: outputItem,
  },
  required: ['item'],
}

module.exports = wrapperFactory({
  inputSchema,
  methodName: 'getOneWhere',
  outputSchema,
})
