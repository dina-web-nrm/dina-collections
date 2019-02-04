module.exports = function extractFeatureText({
  excludeUnitValue,
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
    if (featureGroupKey && extractKey) {
      if (featureGroupKey === featureType.group) {
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
