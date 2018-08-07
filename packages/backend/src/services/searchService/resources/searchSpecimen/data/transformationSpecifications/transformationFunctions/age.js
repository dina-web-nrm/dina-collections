/* eslint-disable no-param-reassign */

const featureTypeParameterMap = {
  age: 'age',
  'age-stage': 'ageStage',
}

module.exports = ({ migrator, src, target }) => {
  const featureObservations = migrator.getValue({
    obj: src,
    path: 'individual.featureObservations',
  })

  if (!(featureObservations && featureObservations.length)) {
    return null
  }

  const features = {}

  featureObservations.forEach(featureObservation => {
    const { featureType } = featureObservation
    const parameterName = featureTypeParameterMap[featureType.key]

    if (parameterName) {
      features[parameterName] = featureObservation.featureObservationText
    }
  })

  Object.keys(features).forEach(key => {
    migrator.setValue({
      obj: target,
      path: `attributes.${key}`,
      value: features[key],
    })
    migrator.setValue({
      obj: target,
      path: `attributes.result.${key}`,
      value: features[key],
    })
  })
  return null
}
