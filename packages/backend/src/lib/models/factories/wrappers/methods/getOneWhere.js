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
    fieldsSpecification: {
      type: 'object',
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
