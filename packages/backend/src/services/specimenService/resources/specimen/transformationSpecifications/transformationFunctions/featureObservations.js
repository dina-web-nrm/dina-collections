/* eslint-disable no-param-reassign */

/*
example src data
  "featureObservations": [
    {
      "featureType_key": "sex",
      "featureObservationText": "male",
      "methodText": null
    },
    {
      "featureType_key": "cranium-count",
      "featureObservationText": "1",
      "methodText": null
    },
    {
      "featureType_key": "mandibula-count",
      "featureObservationText": "2",
      "methodText": null
    },
    {
      "featureType_key": "vertebrae-count",
      "featureObservationText": "2",
      "methodText": null
    }
  ],

*/
module.exports = function migrateFeatureObservations({
  src,
  target,
  migrator,
  globals,
  reporter,
}) {
  const srcFeatureObservations = migrator.getValue({
    obj: src,
    path: 'migrationData.featureObservations',
    strip: true,
  })

  if (!srcFeatureObservations) {
    return
  }

  const featureObservations = srcFeatureObservations.map(
    srcFeatureObservation => {
      const {
        featureType_key: srcFeatureTypeKey,
        featureObservationText: srcFeatureObservationText,
        methodText_key: srcMethodText,
        unit: srcUnit,
      } = srcFeatureObservation

      const featureObservation = {}

      const id = migrator.getFromGlobals({
        globals,
        key: srcFeatureTypeKey,
        mapKey: 'featureTypeKeyIdMap',
        reporter,
      })

      if (id) {
        featureObservation.featureType = {
          id,
        }
      }

      if (srcFeatureObservationText) {
        featureObservation.featureObservationText = srcFeatureObservationText
      }

      if (srcMethodText) {
        featureObservation.methodText = srcMethodText
      }

      if (srcUnit) {
        featureObservation.featureObservationUnit = srcUnit
      }

      return featureObservation
    }
  )

  migrator.setValue({
    obj: target,
    path: 'attributes.individual.featureObservations',
    value: featureObservations,
  })
}
