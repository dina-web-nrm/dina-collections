const backendError500 = require('common/src/error/errorFactories/backendError500')
const wrapperFactory = require('../wrapperFactory')
const inputItems = require('../sharedSchemas/inputItems')
const outputItems = require('../sharedSchemas/outputItems')

const validateInput = ({ requireId = true, items } = {}) => {
  if (!requireId) {
    return
  }
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
    requireId: {
      type: 'boolean',
    },
  },
  required: ['items'],
}

const outputSchema = {
  additionalProperties: false,
  properties: {
    items: outputItems,
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
