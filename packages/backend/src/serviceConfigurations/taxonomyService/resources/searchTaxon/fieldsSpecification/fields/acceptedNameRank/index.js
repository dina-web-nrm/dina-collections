/* eslint-disable no-param-reassign */
const {
  createStringRegexpSearchFilter,
} = require('../../../../../../../lib/data/filters/factories')

const {
  createStringSearchMapping,
} = require('../../../../../../../lib/data/mappings/factories')

const fieldPath = 'attributes.acceptedNameRank'
const searchFilterName = 'searchAcceptedNameRank'
const searchFieldPath = 'attributes.searchOnly.searchAcceptedNameRank'

const transformation = ({ migrator, src, target }) => {
  const acceptedTaxonNameRank = migrator.getValue({
    obj: src,
    path: 'acceptedTaxonName.rank',
  })

  if (acceptedTaxonNameRank) {
    migrator.setValue({
      obj: target,
      path: fieldPath,
      value: acceptedTaxonNameRank,
    })
    migrator.setValue({
      obj: target,
      path: searchFieldPath,
      value: ` ${acceptedTaxonNameRank} `,
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
  key: 'acceptedTaxonNameRank',
  mapping: createStringSearchMapping({
    fieldPath,
    searchFieldPath,
  }),
  selectable: true,
  sortable: true,
  transformation,
}
