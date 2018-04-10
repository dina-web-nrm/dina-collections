import normalizeSpecimen from 'common/es5/normalize/normalizeSpecimen'
import transformTaxonInformation from './transformTaxonInformation'
import transformFeatureObservations from './transformFeatureObservations'
import transformCollectionItems from './transformCollectionItems'
import transformIdentifiers from './transformIdentifiers'
import transformIndividualCircumstances from './transformIndividualCircumstances'

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

  const {
    curatedLocalities,
    individualCircumstances,
  } = transformIndividualCircumstances(formData.individualCircumstances)

  const individual = {
    ...formData,
    collectionItems,
    featureObservations,
    identifiers,
    individualCircumstances,
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
    curatedLocalities,
    featureTypes,
    physicalObjects,
    preparationTypes,
    specimen,
    storageLocations,
    taxa,
  }
}
