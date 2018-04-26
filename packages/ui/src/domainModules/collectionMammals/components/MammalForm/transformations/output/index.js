import normalizeSpecimen from 'common/es5/normalize/normalizeSpecimen'
import transformCollectingInformation from './transformCollectingInformation'
import transformCollectionItems from './transformCollectionItems'
import transformDeathInformation from './transformDeathInformation'
import transformDeterminations from './transformDeterminations'
import transformFeatureObservations from './transformFeatureObservations'
import transformIdentifiers from './transformIdentifiers'
import transformRecordHistoryEvents from './transformRecordHistoryEvents'
import transformTaxonInformation from './transformTaxonInformation'
import transformTypeStatus from './transformTypeStatus'

export default function transformOutput(formData, normalize = true) {
  // TODO: set in backend instead
  // if no catalogNumber provided, use this
  const newCatalogNumber = String(
    Math.floor(Math.random() * (999999 - 100001) + 100000)
  )

  const taxonInformation = transformTaxonInformation(formData.taxonInformation)

  const { determinations, taxa } = transformDeterminations(
    formData.determinations
  )

  const identifiers = transformIdentifiers(
    formData.identifiers,
    newCatalogNumber
  )

  const { featureObservations, featureTypes } = transformFeatureObservations(
    formData.featureObservations
  )

  const {
    collectionItems,
    preparationTypes,
    physicalObjects,
    storageLocations,
  } = transformCollectionItems(formData.collectionItems)

  const {
    collectingInformation,
    establishmentMeansTypes,
    places,
  } = transformCollectingInformation(formData.collectingInformation)

  const { causeOfDeathTypes, deathInformation } = transformDeathInformation(
    formData.deathInformation
  )

  const recordHistoryEvents = transformRecordHistoryEvents(
    formData.recordHistoryEvents
  )

  const typeStatus = transformTypeStatus(formData.typeStatus)

  const individual = {
    ...formData,
    collectingInformation,
    collectionItems,
    deathInformation,
    determinations,
    featureObservations,
    identifiers,
    recordHistoryEvents,
    taxonInformation,
    typeStatus,
  }

  const specimen = normalize
    ? normalizeSpecimen({
        individual,
      })
    : {
        individual,
      }

  return {
    causeOfDeathTypes,
    establishmentMeansTypes,
    featureTypes,
    physicalObjects,
    places,
    preparationTypes,
    specimen,
    storageLocations,
    taxa,
  }
}
