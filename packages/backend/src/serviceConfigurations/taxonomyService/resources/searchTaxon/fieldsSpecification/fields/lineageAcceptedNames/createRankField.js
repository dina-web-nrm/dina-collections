/* eslint-disable no-param-reassign */
const {
  createStringRegexpSearchFilter,
} = require('../../../../../../../lib/data/filters/factories')

const {
  createStringSearchMapping,
} = require('../../../../../../../lib/data/mappings/factories')

module.exports = function createRankField({ fieldName, rank, searchName }) {
  const fieldPath = `attributes.${fieldName}`
  const searchFilterName = searchName
  const searchFieldPath = `attributes.searchOnly.${searchName}`

  const transformation = ({ migrator, locals, target }) => {
    const orderTaxonName = locals.acceptedTaxonNameLineage.find(taxonName => {
      return taxonName.attributes.rank === rank
    })

    if (orderTaxonName) {
      migrator.setValue({
        obj: target,
        path: fieldPath,
        value: orderTaxonName.attributes.name,
      })
      migrator.setValue({
        obj: target,
        path: searchFieldPath,
        value: ` ${orderTaxonName.attributes.name} `,
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
    key: searchFilterName,
    mapping: createStringSearchMapping({
      fieldPath,
      searchFieldPath,
    }),
    selectable: true,
    sortable: true,
    transformation,
  }
}
