import normalizeSpecimen from 'common/es5/normalize/normalizeSpecimen'
import transformCollectingInformation from './transformCollectingInformation'
import transformCollectionItems from './transformCollectionItems'
import transformDeterminations from './transformDeterminations'
import transformFeatureObservations from './transformFeatureObservations'
import transformIdentifiers from './transformIdentifiers'
import transformTaxonInformation from './transformTaxonInformation'

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

  const { places, collectingInformation } = transformCollectingInformation(
    formData.collectingInformation
  )

  const individual = {
    ...formData,
    collectingInformation,
    collectionItems,
    determinations,
    featureObservations,
    identifiers,
    taxonInformation,
  }

  const specimen = normalize
    ? normalizeSpecimen({
        individual,
      })
    : {
        individual,
      }

  return {
    featureTypes,
    physicalObjects,
    places,
    preparationTypes,
    specimen,
    storageLocations,
    taxa,
  }
}
