/* eslint-disable no-param-reassign */
const {
  createStringRegexpSearchFilter,
} = require('../../../../../../../lib/data/filters/factories')

const {
  createStringSearchMapping,
} = require('../../../../../../../lib/data/mappings/factories')

const fieldPath = 'attributes.vernacularNames'
const searchFilterName = 'searchVernacularNames'
const searchFieldPath = 'attributes.searchOnly.searchVernacularNames'

const transformation = ({ migrator, src, target }) => {
  const vernacularNames = migrator.getValue({
    obj: src,
    path: 'vernacularNames',
  })

  if (vernacularNames) {
    const names = vernacularNames.map(({ name }) => {
      return name
    })
    migrator.setValue({
      obj: target,
      path: fieldPath,
      value: names,
    })
    migrator.setValue({
      obj: target,
      path: searchFieldPath,
      value: names.map(name => {
        return ` ${name} `
      }),
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
  key: 'vernacularNames',
  mapping: createStringSearchMapping({
    fieldPath,
    searchFieldPath,
  }),
  selectable: true,
  sortable: true,
  transformation,
}
