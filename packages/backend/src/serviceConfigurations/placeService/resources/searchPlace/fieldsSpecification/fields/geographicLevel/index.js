/* eslint-disable no-param-reassign */
const {
  createStringRegexpSearchFilter,
} = require('../../../../../../../lib/data/filters/factories')

const {
  createStringSearchMapping,
} = require('../../../../../../../lib/data/mappings/factories')

const fieldPath = 'attributes.level'
const searchFilterName = 'searchLevel'
const searchFieldPath = 'attributes.searchOnly.searchLevel'

const transformation = ({ migrator, src, target }) => {
  const level = migrator.getValue({
    obj: src,
    path: 'group',
  })

  if (level) {
    migrator.setValue({
      obj: target,
      path: fieldPath,
      value: level,
    })
    migrator.setValue({
      obj: target,
      path: searchFieldPath,
      value: ` ${level} `,
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
  key: 'level',
  mapping: createStringSearchMapping({
    fieldPath,
    searchFieldPath,
  }),
  selectable: true,
  sortable: true,
  transformation,
}
