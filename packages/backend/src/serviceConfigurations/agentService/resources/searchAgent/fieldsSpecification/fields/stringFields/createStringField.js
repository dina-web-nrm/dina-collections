/* eslint-disable no-param-reassign */
const {
  createStringRegexpSearchFilter,
} = require('../../../../../../../lib/data/filters/factories')

const {
  createStringSearchMapping,
} = require('../../../../../../../lib/data/mappings/factories')

module.exports = function createStringField(fieldName) {
  const fieldPath = `attributes.${fieldName}`
  const searchFilterName = fieldName
  const searchFieldPath = `attributes.searchOnly.${fieldName}`

  const transformation = ({ migrator, src, target }) => {
    const type = migrator.getValue({
      obj: src,
      path: `attributes.${fieldName}`,
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

  return {
    fieldPath,
    filters: {
      [searchFilterName]: createStringRegexpSearchFilter({
        fieldPath: searchFieldPath,
      }),
    },
    key: fieldName,
    mapping: createStringSearchMapping({
      fieldPath,
      searchFieldPath,
    }),
    selectable: true,
    sortable: true,
    transformation,
  }
}
