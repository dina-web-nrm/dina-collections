/* eslint-disable no-param-reassign */
const {
  createStringRegexpSearchFilter,
} = require('../../../../../../../lib/data/filters/factories')

const {
  createStringSearchMapping,
} = require('../../../../../../../lib/data/mappings/factories')

const fieldPath = 'attributes.province'
const searchFilterName = 'searchProvince'
const searchFieldPath = 'attributes.searchOnly.searchProvince'

const transformation = ({ migrator, locals, target }) => {
  const province =
    locals.parents &&
    locals.parents.find(({ group }) => {
      return group === 'province'
    })

  if (province) {
    migrator.setValue({
      obj: target,
      path: fieldPath,
      value: province.name,
    })
    migrator.setValue({
      obj: target,
      path: searchFieldPath,
      value: ` ${province.name} `,
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
  key: 'province',
  mapping: createStringSearchMapping({
    fieldPath,
    searchFieldPath,
  }),
  selectable: true,
  sortable: true,
  transformation,
}
