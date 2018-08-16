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

  const transformedFeatureObservations = Object.keys(featureTypes).reduce(
    (obj, id) => {
      const existingFeatureObservation = featureObservations.find(
        ({ featureType }) => featureType.id === id
      )

      return {
        ...obj,
        [id]: existingFeatureObservation
          ? {
              ...existingFeatureObservation,
            }
          : {
              featureType: featureTypes[id],
            },
      }
    },
    {}
  )

  return transformedFeatureObservations
}
