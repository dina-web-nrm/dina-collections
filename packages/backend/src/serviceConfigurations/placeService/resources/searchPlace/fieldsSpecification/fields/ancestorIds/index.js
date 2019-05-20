/* eslint-disable no-param-reassign */

const {
  createStringMatchFilter,
} = require('../../../../../../../lib/data/filters/factories')

const {
  createKeywordMapping,
} = require('../../../../../../../lib/data/mappings/factories')

const fieldPath = 'attributes.searchOnly.ancestorIds'
const matchFilterName = 'ancestorIds'

const transformation = ({ migrator, target, locals }) => {
  migrator.setValue({
    obj: target,
    path: fieldPath,
    value: locals.parents.map(parent => {
      return parent.id
    }),
  })
}

module.exports = {
  fieldPath,
  filters: {
    [matchFilterName]: createStringMatchFilter({
      fieldPath,
      raw: false,
    }),
  },
  key: 'ancestorIds',
  mapping: createKeywordMapping({
    fieldPath,
  }),
  selectable: false,
  sortable: false,
  transformation,
}
