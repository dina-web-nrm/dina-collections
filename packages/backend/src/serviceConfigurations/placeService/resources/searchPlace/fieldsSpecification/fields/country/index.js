/* eslint-disable no-param-reassign */
const {
  createStringRegexpSearchFilter,
} = require('../../../../../../../lib/data/filters/factories')

const {
  createStringSearchMapping,
} = require('../../../../../../../lib/data/mappings/factories')

const fieldPath = 'attributes.country'
const searchFilterName = 'searchCountry'
const searchFieldPath = 'attributes.searchOnly.searchCountry'

const transformation = ({ migrator, locals, target }) => {
  const country =
    locals.parents &&
    locals.parents.find(({ group }) => {
      return group === 'country'
    })

  if (country) {
    migrator.setValue({
      obj: target,
      path: fieldPath,
      value: country.name,
    })
    migrator.setValue({
      obj: target,
      path: searchFieldPath,
      value: ` ${country.name} `,
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
  key: 'country',
  mapping: createStringSearchMapping({
    fieldPath,
    searchFieldPath,
  }),
  selectable: true,
  sortable: true,
  transformation,
}
