/* eslint-disable no-param-reassign */
const {
  createStringRegexpSearchFilter,
} = require('../../../../../../../lib/data/filters/factories')

const {
  createStringSearchMapping,
} = require('../../../../../../../lib/data/mappings/factories')

const fieldPath = 'attributes.acceptedName'
const searchFilterName = 'searchAcceptedName'
const searchFieldPath = 'attributes.searchOnly.searchAcceptedName'

const transformation = ({ migrator, src, target }) => {
  const acceptedTaxonName = migrator.getValue({
    obj: src,
    path: 'acceptedTaxonName.name',
  })

  if (acceptedTaxonName) {
    migrator.setValue({
      obj: target,
      path: fieldPath,
      value: acceptedTaxonName,
    })
    migrator.setValue({
      obj: target,
      path: searchFieldPath,
      value: ` ${acceptedTaxonName} `,
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
  key: 'acceptedTaxonName',
  mapping: createStringSearchMapping({
    fieldPath,
    searchFieldPath,
  }),
  selectable: true,
  sortable: true,
  transformation,
}
