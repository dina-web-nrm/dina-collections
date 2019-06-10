const ancestorIds = require('./fields/ancestorIds')
const id = require('./fields/id')
const acceptedTaxonNameLineage = require('./decorators/acceptedTaxonNameLineage')
const relatedResources = require('./searchOnlyFields/relatedResources')
const acceptedName = require('./fields/acceptedName')
const acceptedNameRank = require('./fields/acceptedNameRank')
const vernacularNames = require('./fields/vernacularNames')
const synonyms = require('./fields/synonyms')
const {
  order,
  family,
  genus,
  species,
  subspecies,
} = require('./fields/linageAcceptedNames')

module.exports = {
  decorators: [acceptedTaxonNameLineage],
  fields: [
    acceptedName,
    acceptedNameRank,
    ancestorIds,
    family,
    genus,
    id,
    order,
    relatedResources,
    species,
    subspecies,
    synonyms,
    vernacularNames,
  ],
}
