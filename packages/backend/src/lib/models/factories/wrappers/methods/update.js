const wrapperFactory = require('../wrapperFactory')
const inputItem = require('../sharedSchemas/inputItem')
const outputItem = require('../sharedSchemas/outputItem')

const inputSchema = {
  additionalProperties: false,
  properties: {
    allowId: {
      type: 'boolean',
    },
    id: {
      type: 'string',
    },

    item: inputItem,
  },
  required: ['id', 'item'],
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
  methodName: 'update',
  outputSchema,
})
