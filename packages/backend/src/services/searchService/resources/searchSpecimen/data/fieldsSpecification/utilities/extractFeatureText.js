module.exports = function extractFeatureText({
  extractKey = false,
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
      if (includeUnit && featureObservation.featureObservationUnit) {
        featureValues.push(
          `${featureObservation.featureObservationText} ${
            featureObservation.featureObservationUnit
          }`
        )
      } else {
        featureValues.push(featureObservation.featureObservationText)
      }
    }
  })
  return featureValues
}
