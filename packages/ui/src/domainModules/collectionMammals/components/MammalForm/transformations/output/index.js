import transformFeatureObservations from './transformFeatureObservations'

export default function transformOutput({ specimen = {} }) {
  console.log('IN OUTPUT', specimen)
  const transformedSpecimen = { ...specimen }
  if (!transformedSpecimen.individual) {
    transformedSpecimen.individual = {}
  }

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
