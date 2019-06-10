/* eslint-disable no-param-reassign */
const {
  createStringRegexpSearchFilter,
} = require('../../../../../../../lib/data/filters/factories')

const {
  createStringSearchMapping,
} = require('../../../../../../../lib/data/mappings/factories')

const fieldPath = 'attributes.scientificName'
const searchFilterName = 'searchScientificName'
const searchFieldPath = 'attributes.searchOnly.searchScientificName'

const transformation = ({ migrator, src, target }) => {
  const type = migrator.getValue({
    obj: src,
    path: 'attributes.name',
  })

  if (type) {
    migrator.setValue({
      obj: target,
      path: fieldPath,
      value: type,
    })
    migrator.setValue({
      obj: target,
      path: searchFieldPath,
      value: ` ${type} `,
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
  key: 'type',
  mapping: createStringSearchMapping({
    fieldPath,
    searchFieldPath,
  }),
  selectable: true,
  sortable: true,
  transformation,
}
