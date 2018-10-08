import transformFeatureObservations from './transformFeatureObservations'

export default function transformInput({ featureTypes = [], specimen = {} }) {
  const transformedSpecimen = JSON.parse(JSON.stringify(specimen))
  if (!transformedSpecimen.individual) {
    transformedSpecimen.individual = {}
  }

  if (!transformedSpecimen.individual.determinations) {
    transformedSpecimen.individual.determinations = []
  }

  if (!transformedSpecimen.individual.identifiers) {
    transformedSpecimen.individual.identifiers = [
      {
        identifierType: {
          id: '1',
        },
        namespace: '',
        remarks: '',
        value: '',
      },
    ]
  }

  if (!transformedSpecimen.individual.recordHistoryEvents) {
    transformedSpecimen.individual.recordHistoryEvents = []
  }

  transformedSpecimen.individual.featureObservations = transformFeatureObservations(
    {
      featureObservations: transformedSpecimen.individual.featureObservations,
      featureTypes,
    }
  )

  return transformedSpecimen
}
