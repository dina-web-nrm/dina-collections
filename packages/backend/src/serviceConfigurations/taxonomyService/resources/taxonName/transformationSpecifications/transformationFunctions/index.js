const createDeleteProperties = require('common/src/createDeleteProperties')

const deleteNullProperties = createDeleteProperties(null)

/* eslint-disable no-param-reassign */
exports.transformTaxonName = function transformTaxonName({ src, target }) {
  const {
    migrationData: {
      id,
      acceptedToTaxonId,
      synonymToTaxonId,
      vernacularToTaxonId,
      type: taxonNameType,
      group,
      rank,
      ...rest
    },

    sourceData,
  } = src

  const attributes = {
    ...rest,
    rank: rank || group,
    taxonNameType,
  }

  target.attributes = deleteNullProperties(attributes)
  target.id = id
  target.internals = {}

  if (acceptedToTaxonId) {
    target.internals.acceptedToTaxonId = acceptedToTaxonId
  }
  if (synonymToTaxonId) {
    target.internals.synonymToTaxonId = synonymToTaxonId
  }
  if (vernacularToTaxonId) {
    target.internals.vernacularToTaxonId = vernacularToTaxonId
  }

  target.meta = { sourceData }
}
