import normalizeSpecimen from 'common/es5/normalize/normalizeSpecimen'
import transformTaxonInformation from './transformTaxonInformation'
import transformFeatureObservations from './transformFeatureObservations'
import transformCollectionItems from './transformCollectionItems'
import transformIdentifiers from './transformIdentifiers'
import transformCollectingInformation from './transformCollectingInformation'

export default function transformOutput(formData, normalize = true) {
  // TODO: set in backend instead
  // if no catalogNumber provided, use this
  const newCatalogNumber = String(
    Math.floor(Math.random() * (999999 - 100001) + 100000)
  )

  const { taxa, taxonInformation } = transformTaxonInformation(
    formData.taxonInformation
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
