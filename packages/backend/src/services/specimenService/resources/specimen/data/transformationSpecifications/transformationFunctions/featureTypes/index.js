/* eslint-disable no-param-reassign */

const getFeatureTypesBones = require('./getFeatureTypesBones')
const getFeatureTypeAgeStage = require('./getFeatureTypeAgeStage')
const getFeatureTypeSex = require('./getFeatureTypeSex')
const getFeatureTypesLengths = require('./getFeatureTypesLengths')
const getFeatureTypesWeights = require('./getFeatureTypesWeights')
const getFeatureTypeAge = require('./getFeatureTypeAge')
const getFeatureTypeCondition = require('./getFeatureTypeCondition')

module.exports = function featureTypes({
  getItemByTypeId,
  migrator,
  reporter,
  src,
  target,
}) {
  const featureObservations = []
  /* Sex */
  return getFeatureTypeSex({
    getItemByTypeId,
    migrator,
    reporter,
    src,
    target,
  })
    .then(featureTypeSex => {
      if (featureTypeSex) {
        featureObservations.push({
          featureObservationText: featureTypeSex.text,
          featureType: {
            id: featureTypeSex.id,
          },
        })
      }
    })

    .then(() => {
      return getFeatureTypeAge({
        getItemByTypeId,
        migrator,
        reporter,
        src,
        target,
      }).then(featureTypeAge => {
        if (featureTypeAge) {
          featureObservations.push({
            featureObservationText: featureTypeAge.text,
            featureType: {
              id: featureTypeAge.id,
            },
            methodText: featureTypeAge.methodText,
          })
        }
      })
    })

    .then(() => {
      return getFeatureTypeAgeStage({
        getItemByTypeId,
        migrator,
        reporter,
        src,
        target,
      }).then(featureTypeAgeStage => {
        if (featureTypeAgeStage) {
          featureObservations.push({
            featureObservationText: featureTypeAgeStage.text,
            featureType: {
              id: featureTypeAgeStage.id,
            },
            methodText: featureTypeAgeStage.methodText,
          })
        }
      })
    })

    .then(() => {
      return getFeatureTypeCondition({
        getItemByTypeId,
        migrator,
        reporter,
        src,
        target,
      }).then(featureTypeCondition => {
        if (featureTypeCondition) {
          featureObservations.push({
            featureObservationText: featureTypeCondition.text,
            featureType: {
              id: featureTypeCondition.id,
            },
          })
        }
      })
    })

    .then(() => {
      return getFeatureTypesLengths({
        getItemByTypeId,
        migrator,
        reporter,
        src,
        target,
      }).then(featureTypeLengths => {
        if (featureTypeLengths && featureTypeLengths.length) {
          featureTypeLengths.forEach(featureTypeLength => {
            featureObservations.push({
              featureObservationText: featureTypeLength.text,
              featureType: {
                id: featureTypeLength.id,
              },
            })
          })
        }
      })
    })

    .then(() => {
      return getFeatureTypesWeights({
        getItemByTypeId,
        migrator,
        reporter,
        src,
        target,
      }).then(featureTypeWeights => {
        if (featureTypeWeights.length === 2) {
          throw new Error('featureTypeWeights')
        }
        if (featureTypeWeights && featureTypeWeights.length) {
          featureTypeWeights.forEach(featureTypeLength => {
            featureObservations.push({
              featureObservationText: featureTypeLength.text,
              featureType: {
                id: featureTypeLength.id,
              },
            })
          })
        }
      })
    })

    .then(() => {
      return getFeatureTypesBones({
        getItemByTypeId,
        migrator,
        reporter,
        src,
        target,
      }).then(featureTypeBones => {
        if (featureTypeBones && featureTypeBones.length) {
          featureTypeBones.forEach(featureTypeBone => {
            featureObservations.push({
              featureObservationText: featureTypeBone.text,
              featureType: {
                id: featureTypeBone.id,
              },
            })
          })
        }
      })
    })

    .then(() => {
      migrator.setValue({
        obj: target,
        path: 'attributes.individual.featureObservations',
        value: featureObservations,
      })
    })
}
