/* eslint-disable no-param-reassign */
const {
  createStringRegexpSearchFilter,
} = require('../../../../../../../lib/data/filters/factories')

const {
  createStringSearchMapping,
} = require('../../../../../../../lib/data/mappings/factories')

const fieldPath = 'attributes.fullName'
const searchFilterName = 'searchName'
const searchFieldPath = 'attributes.searchOnly.searchName'

const transformation = ({ migrator, src, target }) => {
  const fullName = migrator.getValue({
    obj: src,
    path: 'attributes.fullName',
  })

  if (fullName) {
    migrator.setValue({
      obj: target,
      path: fieldPath,
      value: fullName,
    })
    migrator.setValue({
      obj: target,
      path: searchFieldPath,
      value: ` ${fullName} `,
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
  key: 'fullName',
  mapping: createStringSearchMapping({
    fieldPath,
    searchFieldPath,
  }),
  selectable: true,
  sortable: true,
  transformation,
}
