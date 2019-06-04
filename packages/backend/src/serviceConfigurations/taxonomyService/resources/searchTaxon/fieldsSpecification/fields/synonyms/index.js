/* eslint-disable no-param-reassign */
const {
  createStringRegexpSearchFilter,
} = require('../../../../../../../lib/data/filters/factories')

const {
  createStringSearchMapping,
} = require('../../../../../../../lib/data/mappings/factories')

const fieldPath = 'attributes.synonyms'
const searchFilterName = 'searchSynonyms'
const searchFieldPath = 'attributes.searchOnly.searchSynonyms'

const transformation = ({ migrator, src, target }) => {
  const synonyms = migrator.getValue({
    obj: src,
    path: 'synonyms',
  })

  if (synonyms) {
    const names = synonyms.map(({ name }) => {
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
  key: 'synonyms',
  mapping: createStringSearchMapping({
    fieldPath,
    searchFieldPath,
  }),
  selectable: true,
  sortable: true,
  transformation,
}
