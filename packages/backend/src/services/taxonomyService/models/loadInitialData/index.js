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
          versionId: id,
        }

        if (parentId) {
          resource.parentVersionId = parentId
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
          versionId: id,
        }

        if (acceptedToTaxonId) {
          resource.acceptedToTaxonVersionId = acceptedToTaxonId
        }
        if (synonymToTaxonId) {
          resource.synonymToTaxonVersionId = synonymToTaxonId
        }
        if (vernacularToTaxonId) {
          resource.vernacularToTaxonVersionId = vernacularToTaxonId
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
