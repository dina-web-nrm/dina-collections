/* eslint-disable no-param-reassign */
const {
  createStringRegexpSearchFilter,
} = require('../../../../../../../lib/data/filters/factories')

const {
  createStringSearchMapping,
} = require('../../../../../../../lib/data/mappings/factories')

const fieldPath = 'attributes.continent'
const searchFilterName = 'searchContinent'
const searchFieldPath = 'attributes.searchOnly.searchContinent'

const transformation = ({ migrator, locals, target }) => {
  const continent =
    locals.parents &&
    locals.parents.find(({ group }) => {
      return group === 'continent-ocean'
    })

  if (continent) {
    migrator.setValue({
      obj: target,
      path: fieldPath,
      value: continent.name,
    })
    migrator.setValue({
      obj: target,
      path: searchFieldPath,
      value: ` ${continent.name} `,
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
  key: 'continent',
  mapping: createStringSearchMapping({
    fieldPath,
    searchFieldPath,
  }),
  selectable: true,
  sortable: true,
  transformation,
}
