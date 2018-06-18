const base = require('./base')

module.exports = {
  additionalProperties: false,
  properties: {
    ...base.properties,
    exampleRequests: {
      type: 'object',
    },
    filterSpecifications: {
      not: {
        type: 'string',
      },
    },
  },
  required: [...base.required],
}
