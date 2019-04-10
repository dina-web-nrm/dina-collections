const base = require('./base')

module.exports = {
  additionalProperties: false,
  properties: {
    ...base.properties,
    inverseOperationId: {
      type: 'string',
    },
    postHooks: {
      type: 'array',
    },
    preHooks: {
      type: 'array',
    },
    relationKey: {
      type: 'string',
    },
  },
  required: [...base.required],
}
