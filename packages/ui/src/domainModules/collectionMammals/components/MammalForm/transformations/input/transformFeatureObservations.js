const INITIAL_VALUES = {
  featureObservations: [],
}

export default function transformFeatureObservations(featureObservations) {
  if (!featureObservations) {
    return INITIAL_VALUES.featureObservations
  }

  return featureObservations
}
