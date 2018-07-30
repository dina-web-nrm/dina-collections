const backendError500 = require('common/src/error/errorFactories/backendError500')
const wrapperFactory = require('../wrapperFactory')
const inputItem = require('../sharedSchemas/inputItem')
const outputItem = require('../sharedSchemas/outputItem')

const validateInput = ({ item, allowId } = {}) => {
  if (!allowId && item.id !== undefined) {
    backendError500({
      code: 'MODEL_WRAPPER_INPUT_ERROR',
      detail: 'Id not allowed when allowId is false',
    })
  }
}

const inputSchema = {
  additionalProperties: false,
  properties: {
    allowId: {
      type: 'boolean',
    },
    item: inputItem,
  },
  required: ['item'],
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
  methodName: 'create',
  outputSchema,
  validateInput,
})
