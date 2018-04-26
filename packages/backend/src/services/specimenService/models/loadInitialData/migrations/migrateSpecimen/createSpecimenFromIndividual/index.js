/* eslint-disable no-unused-vars */

const normalizeSpecimen = require('common/src/normalize/normalizeSpecimen')
const transformCollectingInformation = require('./transformCollectingInformation')
const transformCollectionItems = require('./transformCollectionItems')
const transformDeathInformation = require('./transformDeathInformation')
const transformDeterminations = require('./transformDeterminations')
const transformFeatureObservations = require('./transformFeatureObservations')
const transformRecordHistoryEvents = require('./transformRecordHistoryEvents')
const transformTaxonInformation = require('./transformTaxonInformation')

module.exports = function createSpecimenFromIndividual(
  input,
  normalize = true
) {
  // TODO: set in backend instead
  // if no catalogNumber provided, use this

  const taxonInformation = transformTaxonInformation(input.taxonInformation)

  const { determinations, taxa } = transformDeterminations(input.determinations)

  const { identifiers } = input

  const { featureObservations, featureTypes } = transformFeatureObservations(
    input.featureObservations
  )

  const {
    collectionItems,
    preparationTypes,
    physicalObjects,
    storageLocations,
  } = transformCollectionItems(input.collectionItems)

  const { causeOfDeathTypes, deathInformation } = transformDeathInformation(
    input.deathInformation
  )

  const {
    collectingInformation,
    establishmentMeansTypes,
    places,
  } = transformCollectingInformation(input.collectingInformation)

  const recordHistoryEvents = transformRecordHistoryEvents(
    input.recordHistoryEvents
  )

  const individual = {
    ...input,
    collectingInformation,
    collectionItems,
    deathInformation,
    determinations,
    featureObservations,
    identifiers,
    recordHistoryEvents,
    taxonInformation,
  }

  const specimen = normalize
    ? normalizeSpecimen({
        individual,
      })
    : {
        individual,
      }

  return specimen
}
