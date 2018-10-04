import objectPath from 'object-path'

const INITIAL_VALUES = {
  featureObservations: {},
}

export default function transformFeatureObservations({
  featureObservations,
  featureTypes,
}) {
  if (!featureObservations) {
    return INITIAL_VALUES.featureObservations
  }

  const transformedFeatureObservations = Object.values(featureTypes).reduce(
    (obj, featureType) => {
      const { id } = featureType

      const existingFeatureObservation = featureObservations.find(
        featureObservation => {
          return objectPath.get(featureObservation, 'featureType.id') === id
        }
      )

      return {
        ...obj,
        [id]: existingFeatureObservation
          ? {
              ...existingFeatureObservation,
            }
          : {
              featureType,
            },
      }
    },
    {}
  )

  return transformedFeatureObservations
}
