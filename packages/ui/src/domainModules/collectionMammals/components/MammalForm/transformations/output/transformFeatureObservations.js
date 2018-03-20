import { FEATURE_OBSERVATION_TYPE } from 'domainModules/curatedListService/constants'

export default function transformFeatureObservations(featureObservations = {}) {
  let featureObservationTypes = []

  const transformedFeatureObservations = Object.keys(featureObservations)
    .map(featureObservationTypeId => {
      const featureObservation = featureObservations[featureObservationTypeId]

      if (!featureObservation) {
        return null
      }

      const { featureObservationType, ...rest } = featureObservation

      if (!Object.keys(rest).length) {
        return null
      }

      const transformedFeatureObservationType = {
        id: featureObservationType.id,
        type: FEATURE_OBSERVATION_TYPE,
      }

      featureObservationTypes = [
        ...featureObservationTypes,
        transformedFeatureObservationType,
      ]

      return {
        ...rest,
        featureObservationType: transformedFeatureObservationType,
      }
    })
    .filter(item => !!item)

  return {
    featureObservations: transformedFeatureObservations,
    featureObservationTypes,
  }
}
