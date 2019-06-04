/* eslint-disable no-param-reassign */
const {
  createStringRegexpSearchFilter,
} = require('../../../../../../../lib/data/filters/factories')

const {
  createStringSearchMapping,
} = require('../../../../../../../lib/data/mappings/factories')

const fieldPath = 'attributes.room'
const searchFilterName = 'searchRoom'
const searchFieldPath = 'attributes.searchOnly.searchRoom'

const transformation = ({ migrator, locals, target }) => {
  const room =
    locals.parentsIncludingCurrent &&
    locals.parentsIncludingCurrent.find(({ group }) => {
      return group === 'room'
    })

  if (room) {
    migrator.setValue({
      obj: target,
      path: fieldPath,
      value: room.name,
    })
    migrator.setValue({
      obj: target,
      path: searchFieldPath,
      value: ` ${room.name} `,
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
  key: 'room',
  mapping: createStringSearchMapping({
    fieldPath,
    searchFieldPath,
  }),
  selectable: true,
  sortable: true,
  transformation,
}
