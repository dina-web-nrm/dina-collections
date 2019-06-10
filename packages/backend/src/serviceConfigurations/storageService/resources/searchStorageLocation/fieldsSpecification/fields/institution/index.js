/* eslint-disable no-param-reassign */
const {
  createStringRegexpSearchFilter,
} = require('../../../../../../../lib/data/filters/factories')

const {
  createStringSearchMapping,
} = require('../../../../../../../lib/data/mappings/factories')

const fieldPath = 'attributes.institution'
const searchFilterName = 'searchInstitution'
const searchFieldPath = 'attributes.searchOnly.searchInstitution'

const transformation = ({ migrator, locals, target }) => {
  const institution =
    locals.parentsIncludingCurrent &&
    locals.parentsIncludingCurrent.find(({ group }) => {
      return group === 'institution'
    })

  if (institution) {
    migrator.setValue({
      obj: target,
      path: fieldPath,
      value: institution.name,
    })
    migrator.setValue({
      obj: target,
      path: searchFieldPath,
      value: ` ${institution.name} `,
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
  key: 'institution',
  mapping: createStringSearchMapping({
    fieldPath,
    searchFieldPath,
  }),
  selectable: true,
  sortable: true,
  transformation,
}
