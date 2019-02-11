const objectPath = require('object-path')

module.exports = function extractFeatureText({
  excludeUnitValue,
  extractFeatureTypeName = false,
  extractKey = false,
  fallbackUnit,
  featureGroupKey,
  featureTypeKey,
  includeUnit = false,
  migrator,
  src,
}) {
  const featureObservations = migrator.getValue({
    obj: src,
    path: 'individual.featureObservations',
  })

  if (!featureObservations) {
    return null
  }
  const featureValues = []
  featureObservations.forEach(featureObservation => {
    const { featureType } = featureObservation
    if (!featureType) {
      return
    }

    if (featureType.group === featureGroupKey) {
      const featureTypeName = objectPath.get(featureType, 'name.en')

      if (extractFeatureTypeName && featureTypeName) {
        featureValues.push(featureTypeName)
      }

      if (extractKey) {
        featureValues.push(featureType.key)
      }
    }

    if (
      featureObservation.featureObservationText &&
      featureType.key === featureTypeKey
    ) {
      const unit = featureObservation.featureObservationUnit || fallbackUnit

      if (includeUnit && unit && unit !== excludeUnitValue) {
        featureValues.push(
          `${
            featureObservation.featureObservationText
          } ${featureObservation.featureObservationUnit || fallbackUnit}`
        )
      } else {
        featureValues.push(featureObservation.featureObservationText)
      }
    }
  })
  return featureValues
}
