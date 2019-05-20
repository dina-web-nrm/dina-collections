/* eslint-disable no-param-reassign */
const {
  createStringRegexpSearchFilter,
} = require('../../../../../../../lib/data/filters/factories')

const {
  createStringSearchMapping,
} = require('../../../../../../../lib/data/mappings/factories')

const fieldPath = 'attributes.mountingWall'
const searchFilterName = 'searchMountingWall'
const searchFieldPath = 'attributes.searchOnly.searchMountingWall'

const transformation = ({ migrator, locals, target }) => {
  const mountingWall =
    locals.parents &&
    locals.parents.find(({ group }) => {
      return group === 'mountingWall'
    })

  if (mountingWall) {
    migrator.setValue({
      obj: target,
      path: fieldPath,
      value: mountingWall.name,
    })
    migrator.setValue({
      obj: target,
      path: searchFieldPath,
      value: ` ${mountingWall.name} `,
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
  key: 'mountingWall',
  mapping: createStringSearchMapping({
    fieldPath,
    searchFieldPath,
  }),
  selectable: true,
  sortable: true,
  transformation,
}
