const base = require('./base')
const fieldsSpecification = require('../../../data/fields/schemas/fieldsSpecification')

module.exports = {
  additionalProperties: false,
  properties: {
    ...base.properties,
    fieldsSpecification,
    filter: {
      not: {
        type: 'string',
      },
    },
    includeRelations: {
      type: 'boolean',
    },
    queryParams: {
      type: 'object',
    },
  },
  required: [...base.required],
}
