const {
  removeRelatedTaxonFromTaxonNames,
} = require('../../../../serviceInteractions')

exports.acceptedToTaxon = [removeRelatedTaxonFromTaxonNames]

exports.synonymToTaxon = [removeRelatedTaxonFromTaxonNames]
