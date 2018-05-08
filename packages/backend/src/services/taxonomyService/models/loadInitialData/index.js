const readInitialData = require('../../../../utilities/readInitialData')
const deleteNullProperties = require('common/src/deleteNullProperties')

module.exports = function loadInitialData({ models }) {
  const taxa = readInitialData('taxa')
  const taxonNames = readInitialData('taxonNames')

  const taxonItems = !taxa
    ? null
    : taxa.map(taxon => {
        const { id, parentId, ...rest } = taxon

        const resource = {
          doc: deleteNullProperties(rest),
          id,
        }

        if (parentId) {
          resource.parentId = parentId
        }

        return resource
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

        const doc = {
          ...rest,
          taxonNameType,
        }

        const resource = {
          doc: deleteNullProperties(doc),
          id,
        }

        if (acceptedToTaxonId) {
          resource.acceptedToTaxonId = acceptedToTaxonId
        }
        if (synonymToTaxonId) {
          resource.synonymToTaxonId = synonymToTaxonId
        }
        if (vernacularToTaxonId) {
          resource.vernacularToTaxonId = vernacularToTaxonId
        }

        return resource
      })

  const taxonItemsPromise = taxonItems
    ? models.taxon.bulkCreate(taxonItems)
    : Promise.resolve()

  const taxonNameItemsPromise = taxonNameItems
    ? models.taxonName.bulkCreate(taxonNameItems)
    : Promise.resolve()

  return Promise.all([taxonItemsPromise, taxonNameItemsPromise])
}
