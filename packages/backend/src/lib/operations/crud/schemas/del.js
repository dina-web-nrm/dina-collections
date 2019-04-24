const base = require('./base')

module.exports = {
  additionalProperties: false,
  properties: {
    ...base.properties,
    postHooks: {
      type: 'array',
    },
    preHooks: {
      type: 'array',
    },
  },
  required: [...base.required],
}
