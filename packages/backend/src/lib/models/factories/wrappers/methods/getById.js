const wrapperFactory = require('../wrapperFactory')
const outputItem = require('../sharedSchemas/outputItem')

const inputSchema = {
  additionalProperties: false,
  properties: {
    allowDeactivated: {
      type: 'boolean',
    },
    id: {
      type: 'string',
    },
    include: {
      type: 'array',
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
  },
  required: ['id'],
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
  methodName: 'getById',
  outputSchema,
})
