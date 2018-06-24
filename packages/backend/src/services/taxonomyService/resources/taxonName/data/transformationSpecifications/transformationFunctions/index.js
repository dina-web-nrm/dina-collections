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

  const doc = {
    ...rest,
    taxonNameType,
  }

  target.doc = deleteNullProperties(doc)
  target.id = id

  if (acceptedToTaxonId) {
    target.acceptedToTaxonId = acceptedToTaxonId
  }
  if (synonymToTaxonId) {
    target.synonymToTaxonId = synonymToTaxonId
  }
  if (vernacularToTaxonId) {
    target.vernacularToTaxonId = vernacularToTaxonId
  }
}
