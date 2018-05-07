export default function transformOutput({ specimen = {} }) {
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
    transformedSpecimen.individual.featureObservations = transformedSpecimen.individual.featureObservations.filter(
      item => {
        return !!item
      }
    )
  }

  return transformedSpecimen
}
