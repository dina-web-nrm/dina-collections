const base = require('./base')
const selectableFields = require('../../../data/fields/schemas/selectableFields')

module.exports = {
  additionalProperties: false,
  properties: {
    ...base.properties,
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
    selectableFields,
  },
  required: [...base.required],
}
