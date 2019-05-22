/* eslint-disable no-param-reassign */
const {
  createStringRegexpSearchFilter,
} = require('../../../../../../../lib/data/filters/factories')

const {
  createStringSearchMapping,
} = require('../../../../../../../lib/data/mappings/factories')

const fieldPath = 'attributes.cabinet'
const searchFilterName = 'searchCabinet'
const searchFieldPath = 'attributes.searchOnly.searchCabinet'

const transformation = ({ migrator, locals, target }) => {
  const cabinet =
    locals.parentsIncludingCurrent &&
    locals.parentsIncludingCurrent.find(({ group }) => {
      return group === 'cabinet'
    })

  if (cabinet) {
    migrator.setValue({
      obj: target,
      path: fieldPath,
      value: cabinet.name,
    })
    migrator.setValue({
      obj: target,
      path: searchFieldPath,
      value: ` ${cabinet.name} `,
    })
  }
}

module.exports = {
  fieldPath,
  filters: {
    [searchFilterName]: createStringRegexpSearchFilter({
      fieldPath: searchFieldPath,
    }),
  },
  key: 'cabinet',
  mapping: createStringSearchMapping({
    fieldPath,
    searchFieldPath,
  }),
  selectable: true,
  sortable: true,
  transformation,
}
