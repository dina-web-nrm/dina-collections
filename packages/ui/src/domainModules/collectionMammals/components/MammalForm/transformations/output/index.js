import transformIdentifiers from './transformIdentifiers'
import transformFeatureObservations from './transformFeatureObservations'

export default function transformOutput({ specimen = {} }) {
  const transformedSpecimen = JSON.parse(JSON.stringify(specimen))

  // TODO: set in backend instead
  // if no catalogNumber provided, use this
  const newCatalogNumber = String(
    Math.floor(Math.random() * (999999 - 100001) + 100000)
  )
  if (!transformedSpecimen.individual) {
    transformedSpecimen.individual = {}
  }

  transformedSpecimen.individual.identifiers = transformIdentifiers(
    transformedSpecimen.individual.identifiers,
    newCatalogNumber
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
