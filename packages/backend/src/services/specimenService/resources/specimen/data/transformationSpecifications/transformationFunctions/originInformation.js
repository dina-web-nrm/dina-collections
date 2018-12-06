/* eslint-disable no-param-reassign */

/*
example src data
      "originInformation": {
        "originLocality": null,
        "establishmentMeans_key": "captive",
        "isResultOfSelectiveBreeding": "True"
      },

*/
module.exports = function migrateOriginInformation({
  reporter,
  globals,
  src,
  target,
  migrator,
}) {
  const srcOriginInformation = migrator.getValue({
    obj: src,
    path: 'migrationData.originInformation',
    strip: true,
  })

  if (!srcOriginInformation) {
    return
  }

  const {
    originLocality: srcOriginLocality,
    establishmentMeans_key: srcEstablishmentMeans,
    isResultOfSelectiveBreeding: srcIsResultOfSelectiveBreeding,
  } = srcOriginInformation

  const originInformation = {}

  if (srcEstablishmentMeans) {
    const id = migrator.getFromGlobals({
      globals,
      key: srcEstablishmentMeans,
      mapKey: 'establishmentMeansTypeKeyIdMap',
      reporter,
    })

    if (id !== undefined && id !== null) {
      originInformation.establishmentMeansType = {
        id,
      }
    }
  }

  if (srcOriginLocality) {
    originInformation.originLocality = srcOriginLocality
  }

  originInformation.isResultOfSelectiveBreeding =
    srcIsResultOfSelectiveBreeding === 'True'

  if (Object.keys(originInformation).length) {
    migrator.setValue({
      obj: target,
      path: 'attributes.individual.originInformation.0',
      value: originInformation,
    })
  }
}
