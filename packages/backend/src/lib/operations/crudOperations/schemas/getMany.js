const base = require('./base')
const filterSpecification = require('../../../data/filters/schemas/filterSpecification')
const selectableFields = require('../../../data/fields/schemas/selectableFields')
const sortSpecification = require('../../../data/sort/schemas/sortSpecification')

module.exports = {
  additionalProperties: false,
  properties: {
    ...base.properties,
    filterSpecification,
    includeRelations: {
      type: 'boolean',
    },
    queryParams: {
      type: 'object',
    },
    selectableFields,
    sortSpecification,
  },
  required: [...base.required],
}
