export default function transformFeatureObservations(featureObservations = {}) {
  let featureTypes = []

  const transformedFeatureObservations = Object.keys(featureObservations)
    .map(featureTypeId => {
      const featureObservation = featureObservations[featureTypeId]

      if (!featureObservation) {
        return null
      }

      const { featureType, ...rest } = featureObservation

      if (!Object.keys(rest).length) {
        return null
      }

      const transformedFeatureType = {
        id: featureType.id,
        type: 'featureObservation',
      }

      featureTypes = [...featureTypes, transformedFeatureType]

      return {
        ...rest,
        featureType: transformedFeatureType,
      }
    })
    .filter(item => !!item)

  return {
    featureObservations: transformedFeatureObservations,
    featureTypes,
  }
}
