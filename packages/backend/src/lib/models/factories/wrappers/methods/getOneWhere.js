const wrapperFactory = require('../wrapperFactory')
const outputItem = require('../sharedSchemas/outputItem')

const inputSchema = {
  additionalProperties: false,
  properties: {
    allowDeactivated: {
      type: 'boolean',
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
    selectableFields: {
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
    item: outputItem,
  },
  required: ['item'],
}

module.exports = wrapperFactory({
  inputSchema,
  methodName: 'getOneWhere',
  outputSchema,
})
