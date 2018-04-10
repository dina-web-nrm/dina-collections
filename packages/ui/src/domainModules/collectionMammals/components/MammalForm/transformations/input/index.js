import denormalizeSpecimen from 'common/es5/normalize/denormalizeSpecimen'
import transformTaxonInformation from './transformTaxonInformation'
import transformFeatureObservations from './transformFeatureObservations'
import transformCollectionItems from './transformCollectionItems'
import transformIdentifiers from './transformIdentifiers'
import transformIndividualCircumstances from './transformIndividualCircumstances'

export default function transformInput({
  denormalize = true,
  preparationTypes = {},
  featureTypes = {},
  physicalUnits = {},
  specimen = {},
  storageLocations = {},
}) {
  const { id, type, ...rawSpeciment } = specimen
  const attributes = denormalize
    ? denormalizeSpecimen(rawSpeciment).individual
    : rawSpeciment.individual || {}

  const taxonInformation = transformTaxonInformation(
    attributes.taxonInformation
  )
  const featureObservations = transformFeatureObservations({
    featureObservations: attributes.featureObservations,
    featureTypes,
  })
  const collectionItems = transformCollectionItems({
    collectionItems: attributes.collectionItems,
    physicalUnits,
    preparationTypes,
    storageLocations,
  })
  const identifiers = transformIdentifiers(attributes.identifiers)
  const individualCircumstances = transformIndividualCircumstances(
    attributes.individualCircumstances
  )

  return {
    ...attributes,
    collectionItems,
    featureObservations,
    identifiers,
    individualCircumstances,
    taxonInformation,
  }
}
