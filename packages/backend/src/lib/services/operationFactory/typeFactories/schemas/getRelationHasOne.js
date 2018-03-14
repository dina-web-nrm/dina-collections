const base = require('./base')

module.exports = {
  additionalProperties: false,
  properties: {
    ...base.properties,
    relationKey: {
      type: 'string',
    },
  },
  required: [...base.required],
}
