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
      const { attributes, id } = featureType

      const existingFeatureObservation = featureObservations.find(
        featureObservation => {
          return objectPath.get(featureObservation, 'featureType.id') === id
        }
      )

      if (existingFeatureObservation) {
        return {
          ...obj,
          [id]: existingFeatureObservation,
        }
      }

      const initialFeatureObservation = { featureType }

      if (attributes.group === 'length' || attributes.group === 'weight') {
        initialFeatureObservation.featureObservationUnit = 'unspecified'
      }

      return {
        ...obj,
        [id]: initialFeatureObservation,
      }
    },
    {}
  )

  return transformedFeatureObservations
}
