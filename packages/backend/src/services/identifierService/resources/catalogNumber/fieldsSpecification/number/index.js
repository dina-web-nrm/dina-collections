const createEqualFilter = require('../../../../../../lib/data/filters/factories/createEqualFilter')

const fieldPath = 'number'

module.exports = {
  fieldPath,
  filters: {
    number: createEqualFilter({
      fieldPath: 'number',
    }),
  },
  key: 'number',
  selectable: true,
  sortable: true,
}
