const readInitialData = require('../../../../utilities/readInitialData')
const deleteNullProperties = require('common/src/deleteNullProperties')

module.exports = function loadInitialData({ models }) {
  const taxa = readInitialData('taxa')
  const taxonNames = readInitialData('taxonNames')

  const taxonItems = !taxa
    ? null
    : taxa.map(taxon => {
        const { id, parentId, ...rest } = taxon

        const item = {
          attributes: deleteNullProperties(rest),
          id,
        }

        if (parentId) {
          item.internals = { parentId }
        }

        return item
      })

  const taxonNameItems = !taxonNames
    ? null
    : taxonNames.map(taxonName => {
        const {
          id,
          acceptedToTaxonId,
          synonymToTaxonId,
          vernacularToTaxonId,
          type: taxonNameType,
          ...rest
        } = taxonName

        const attributes = {
          ...rest,
          taxonNameType,
        }

        const item = {
          attributes: deleteNullProperties(attributes),
          id,
          internals: {},
        }

        if (acceptedToTaxonId) {
          item.internals.acceptedToTaxonId = acceptedToTaxonId
        }
        if (synonymToTaxonId) {
          item.internals.synonymToTaxonId = synonymToTaxonId
        }
        if (vernacularToTaxonId) {
          item.internals.vernacularToTaxonId = vernacularToTaxonId
        }

        return item
      })

  const taxonItemsPromise = taxonItems
    ? models.taxon.bulkCreate({ items: taxonItems })
    : Promise.resolve()

  const taxonNameItemsPromise = taxonNameItems
    ? models.taxonName.bulkCreate({ items: taxonNameItems })
    : Promise.resolve()

  return Promise.all([taxonItemsPromise, taxonNameItemsPromise])
}
