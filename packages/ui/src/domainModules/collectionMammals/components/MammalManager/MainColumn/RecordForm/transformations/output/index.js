import objectPath from 'object-path'

import transformFeatureObservations from './transformFeatureObservations'

export default function transformOutput({ specimen = {} }) {
  const transformedSpecimen = JSON.parse(JSON.stringify(specimen))

  if (!transformedSpecimen.individual) {
    transformedSpecimen.individual = {}
  }

  // remove empty catalog number; it will be set in backend instead
  if (
    transformedSpecimen.individual.identifiers &&
    // length is always 1 when creating new record
    transformedSpecimen.individual.identifiers.length === 1 &&
    objectPath.get(
      transformedSpecimen,
      'individual.identifiers.0.identifierType.id'
    ) === '1' &&
    !objectPath.get(transformedSpecimen, 'individual.identifiers.0.value')
  ) {
    transformedSpecimen.individual.identifiers = []
  }

  if (transformedSpecimen.individual.featureObservations) {
    transformedSpecimen.individual.featureObservations = transformFeatureObservations(
      transformedSpecimen.individual.featureObservations
    )
  }

  return transformedSpecimen
}
