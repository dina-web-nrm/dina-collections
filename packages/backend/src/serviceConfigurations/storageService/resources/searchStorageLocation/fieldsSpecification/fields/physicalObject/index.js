/* eslint-disable no-param-reassign */
const {
  createStringRegexpSearchFilter,
} = require('../../../../../../../lib/data/filters/factories')

const {
  createStringSearchMapping,
} = require('../../../../../../../lib/data/mappings/factories')

const fieldPath = 'attributes.physicalObjects'
const searchFilterName = 'searchPhysicalObjects'
const searchFieldPath = 'attributes.searchOnly.searchPhysicalObjects'

const transformation = ({ migrator, src, target }) => {
  const physicalObjects = migrator.getValue({
    obj: src,
    path: 'physicalObjects',
  })

  if (physicalObjects) {
    migrator.setValue({
      obj: target,
      path: fieldPath,
      value: physicalObjects,
    })
    migrator.setValue({
      obj: target,
      path: searchFieldPath,
      value: ` ${physicalObjects.lid} `,
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
  key: 'name',
  mapping: createStringSearchMapping({
    fieldPath,
    searchFieldPath,
  }),
  selectable: true,
  sortable: true,
  transformation,
}
