const INITIAL_VALUES = {
  featureObservations: {},
}

export default function transformFeatureObservations({
  featureObservations,
  featureObservationTypes,
}) {
  if (!featureObservations) {
    return INITIAL_VALUES.featureObservations
  }

  const transformedFeatureObservations = Object.keys(
    featureObservationTypes
  ).reduce((obj, id) => {
    const existingFeatureObservation = featureObservations.find(
      ({ featureObservationType }) => featureObservationType.id === id
    )

    return {
      ...obj,
      [id]: existingFeatureObservation
        ? {
            ...existingFeatureObservation,
          }
        : {
            featureObservationType: featureObservationTypes[id],
          },
    }
  }, {})

  return transformedFeatureObservations
}
