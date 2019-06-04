/* eslint-disable no-param-reassign */
const {
  createStringRegexpSearchFilter,
} = require('../../../../../../../lib/data/filters/factories')

const {
  createStringSearchMapping,
} = require('../../../../../../../lib/data/mappings/factories')

const fieldPath = 'attributes.name'
const searchFilterName = 'searchName'
const searchFieldPath = 'attributes.searchOnly.searchName'

const transformation = ({ migrator, src, target }) => {
  const name = migrator.getValue({
    obj: src,
    path: 'name',
  })

  if (name) {
    migrator.setValue({
      obj: target,
      path: fieldPath,
      value: name,
    })
    migrator.setValue({
      obj: target,
      path: searchFieldPath,
      value: ` ${name} `,
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
  key: 'name',
  mapping: createStringSearchMapping({
    fieldPath,
    searchFieldPath,
  }),
  selectable: true,
  sortable: true,
  transformation,
}
