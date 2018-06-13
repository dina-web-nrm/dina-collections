const base = require('./base')

module.exports = {
  additionalProperties: false,
  properties: {
    ...base.properties,
    postDeleteHook: {
      not: {
        type: 'string',
      },
    },
  },
  required: [...base.required],
}
