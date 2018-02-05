const INITIAL_VALUES = {
  featureObservations: [
    {
      featureObservationType: {
        featureObservationTypeName: 'conditionAtCollecting',
      },
    },
  ],
}

export default function transformFeatureObservations(featureObservations) {
  if (!featureObservations) {
    return INITIAL_VALUES.featureObservations
  }

  const firstConditionAtCollectingIndex = featureObservations.findIndex(
    ({ featureObservationType }) => {
      return (
        featureObservationType &&
        featureObservationType.featureObservationTypeName ===
          'conditionAtCollecting'
      )
    }
  )

  if (firstConditionAtCollectingIndex === -1) {
    return [INITIAL_VALUES.featureObservations[0], ...featureObservations]
  }

  if (firstConditionAtCollectingIndex > 0) {
    const conditionAtCollectingFeatureObservation =
      featureObservations[firstConditionAtCollectingIndex]

    // remove conditionAtCollectingFeatureObservation from array
    featureObservations.splice(firstConditionAtCollectingIndex, 1)
    // add conditionAtCollectingFeatureObservation first in array
    return [conditionAtCollectingFeatureObservation, ...featureObservations]
  }

  return featureObservations
}
