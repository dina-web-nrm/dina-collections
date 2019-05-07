export default function transformFeatureObservations(featureObservations = {}) {
  return Object.keys(featureObservations)
    .map(featureTypeId => {
      const featureObservation = featureObservations[featureTypeId]

      if (!featureObservation) {
        return null
      }

      const { featureType, ...rest } = featureObservation

      if (!Object.keys(rest).length) {
        return null
      }

      if (!featureObservation.featureObservationText) {
        return null
      }

      const transformedFeatureType = {
        id: featureType.id,
      }

      return {
        ...rest,
        featureType: transformedFeatureType,
      }
    })
    .filter(item => !!item)
}
