/* eslint-disable no-param-reassign */
const {
  createStringRegexpSearchFilter,
} = require('../../../../../../../lib/data/filters/factories')

const {
  createStringSearchMapping,
} = require('../../../../../../../lib/data/mappings/factories')

const fieldPath = 'attributes.district'
const searchFilterName = 'searchDistrict'
const searchFieldPath = 'attributes.searchOnly.searchDistrict'

const transformation = ({ migrator, locals, target }) => {
  const district =
    locals.parents &&
    locals.parents.find(({ group }) => {
      return group === 'district'
    })

  if (district) {
    migrator.setValue({
      obj: target,
      path: fieldPath,
      value: district.name,
    })
    migrator.setValue({
      obj: target,
      path: searchFieldPath,
      value: ` ${district.name} `,
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
  key: 'district',
  mapping: createStringSearchMapping({
    fieldPath,
    searchFieldPath,
  }),
  selectable: true,
  sortable: true,
  transformation,
}
