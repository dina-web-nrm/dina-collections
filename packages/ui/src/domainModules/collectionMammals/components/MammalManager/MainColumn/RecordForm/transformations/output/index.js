import transformCollectionItems from './transformCollectionItems'
import transformFeatureObservations from './transformFeatureObservations'

export default function transformOutput({ specimen = {} }) {
  const transformedSpecimen = JSON.parse(JSON.stringify(specimen))

  // TODO: set in backend instead
  // if no catalogNumber provided, use this
  if (!transformedSpecimen.individual) {
    transformedSpecimen.individual = {}
  }

  transformedSpecimen.individual.collectionItems = transformCollectionItems(
    transformedSpecimen.individual.collectionItems
  )

  if (transformedSpecimen.individual.recordHistoryEvents) {
    transformedSpecimen.individual.recordHistoryEvents = transformedSpecimen.individual.recordHistoryEvents.filter(
      item => {
        return !!item
      }
    )
  }

  if (transformedSpecimen.individual.featureObservations) {
    transformedSpecimen.individual.featureObservations = transformFeatureObservations(
      transformedSpecimen.individual.featureObservations
    )
  }

  return transformedSpecimen
}
