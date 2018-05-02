import { flattenJsonApiData } from 'utilities/transformations'
import denormalizeSpecimen from 'common/es5/normalize/denormalizeSpecimen'
import transformTaxonInformation from './transformTaxonInformation'
import transformDeterminations from './transformDeterminations'
import transformFeatureObservations from './transformFeatureObservations'
import transformCollectionItems from './transformCollectionItems'
import transformIdentifiers from './transformIdentifiers'
import transformCollectingInformation from './transformCollectingInformation'
import transformRecordHistoryEvents from './transformRecordHistoryEvents'

export default function transformInput({
  denormalize = true,
  featureTypes = {},
  physicalObjects = {},
  preparationTypes = {},
  specimen = {},
  storageLocations = {},
}) {
  const { id, type, ...rawSpeciment } = flattenJsonApiData(specimen)
  const attributes = denormalize
    ? denormalizeSpecimen(rawSpeciment).individual
    : rawSpeciment.individual || {}

  const taxonInformation = transformTaxonInformation(
    attributes.taxonInformation
  )

  const determinations = transformDeterminations(attributes.determinations)

  const featureObservations = transformFeatureObservations({
    featureObservations: attributes.featureObservations,
    featureTypes,
  })
  const collectionItems = transformCollectionItems({
    collectionItems: attributes.collectionItems,
    physicalObjects,
    preparationTypes,
    storageLocations,
  })
  const identifiers = transformIdentifiers(attributes.identifiers)
  const collectingInformation = transformCollectingInformation(
    attributes.collectingInformation
  )

  const recordHistoryEvents = transformRecordHistoryEvents(
    attributes.recordHistoryEvents
  )

  return {
    ...attributes,
    collectingInformation,
    collectionItems,
    determinations,
    featureObservations,
    identifiers,
    recordHistoryEvents,
    taxonInformation,
  }
}
