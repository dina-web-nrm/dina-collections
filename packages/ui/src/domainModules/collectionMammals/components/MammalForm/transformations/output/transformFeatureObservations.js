import { FEATURE_OBSERVATION_TYPE } from 'domainModules/curatedListService/constants'

export default function transformFeatureObservations(featureObservations = []) {
  let featureObservationTypes = []

  const transformedFeatureObservations = featureObservations.map(
    ({ featureObservationType, ...rest }) => {
      const transformedFeatureObservationType = {
        ...featureObservationType,
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
    }
  )

  return {
    featureObservations: transformedFeatureObservations,
    featureObservationTypes,
  }
}
