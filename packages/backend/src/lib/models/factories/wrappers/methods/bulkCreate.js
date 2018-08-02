const backendError500 = require('common/src/error/errorFactories/backendError500')
const wrapperFactory = require('../wrapperFactory')
const inputItems = require('../sharedSchemas/inputItems')

const validateInput = ({ items } = {}) => {
  items.forEach(item => {
    if (item.id === undefined) {
      backendError500({
        code: 'MODEL_WRAPPER_INPUT_ERROR',
        detail: 'Id required when using bulk create',
      })
    }
  })
}

const inputSchema = {
  additionalProperties: false,
  properties: {
    collidingIdPrefix: {
      type: 'string',
    },
    items: inputItems,
  },
  required: ['items'],
}

const outputSchema = {
  additionalProperties: false,
  properties: {
    meta: {
      type: 'object',
    },
  },
  required: ['meta'],
}

module.exports = wrapperFactory({
  inputSchema,
  methodName: 'bulkCreate',
  outputSchema,
  validateInput,
})
