/* eslint-disable no-param-reassign */
const {
  createStringRegexpSearchFilter,
} = require('../../../../../../../lib/data/filters/factories')

const {
  createStringSearchMapping,
} = require('../../../../../../../lib/data/mappings/factories')

const fieldPath = 'attributes.rubinNumber'
const searchFilterName = 'searchRubinNumber'
const searchFieldPath = 'attributes.searchOnly.searchRubinNumber'

const transformation = ({ migrator, src, target }) => {
  const type = migrator.getValue({
    obj: src,
    path: 'attributes.rubinNumber',
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
