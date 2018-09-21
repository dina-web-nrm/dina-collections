const createEqualFilter = require('../../../../../../../lib/data/filters/factories/createEqualFilter')

const fieldPath = 'year'

module.exports = {
  fieldPath,
  filters: {
    year: createEqualFilter(
      {
        fieldPath: 'year',
      },
      {}
    ),
  },
  key: 'year',
  selectable: true,
  sortable: true,
}
