module.exports = function extractFeatureText({
  migrator,
  src,
  featureTypeKey,
  includeUnit = false,
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
