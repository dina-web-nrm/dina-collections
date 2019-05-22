/* eslint-disable no-param-reassign */
const {
  createStringRegexpSearchFilter,
} = require('../../../../../../../lib/data/filters/factories')

const {
  createStringSearchMapping,
} = require('../../../../../../../lib/data/mappings/factories')

const fieldPath = 'attributes.shelf'
const searchFilterName = 'searchShelf'
const searchFieldPath = 'attributes.searchOnly.searchShelf'

const transformation = ({ migrator, locals, target }) => {
  const shelf =
    locals.parentsIncludingCurrent &&
    locals.parentsIncludingCurrent.find(({ group }) => {
      return group === 'shelf'
    })

  if (shelf) {
    migrator.setValue({
      obj: target,
      path: fieldPath,
      value: shelf.name,
    })
    migrator.setValue({
      obj: target,
      path: searchFieldPath,
      value: ` ${shelf.name} `,
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
  key: 'shelf',
  mapping: createStringSearchMapping({
    fieldPath,
    searchFieldPath,
  }),
  selectable: true,
  sortable: true,
  transformation,
}
