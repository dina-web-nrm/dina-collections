const deleteNullProperties = require('common/src/deleteNullProperties')
/* eslint-disable no-param-reassign */

exports.transformTaxonName = function transformTaxonName({ src, target }) {
  const {
    id,
    acceptedToTaxonId,
    synonymToTaxonId,
    vernacularToTaxonId,
    type: taxonNameType,
    ...rest
  } = src

  const attributes = {
    ...rest,
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
}
