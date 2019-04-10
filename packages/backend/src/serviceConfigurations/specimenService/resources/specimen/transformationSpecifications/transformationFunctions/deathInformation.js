/* eslint-disable no-param-reassign */

/*
example src data
      "deathInformation": {
        "causeOfDeath_key": "collected",
        "remarks": null
      },

*/
module.exports = function migrateDeathInformation({
  reporter,
  globals,
  src,
  target,
  migrator,
}) {
  const srcDeathInformation = migrator.getValue({
    obj: src,
    path: 'migrationData.deathInformation',
    strip: true,
  })

  if (!srcDeathInformation) {
    return
  }

  const {
    causeOfDeath_key: srcCauseOfDeath,
    remarks: srcRemarks,
  } = srcDeathInformation

  const deathInformation = {}

  if (srcCauseOfDeath) {
    const id = migrator.getFromGlobals({
      globals,
      key: srcCauseOfDeath,
      mapKey: 'causeOfDeathTypeKeyIdMap',
      reporter,
    })

    if (id) {
      deathInformation.causeOfDeathType = {
        id,
      }
    }
  }

  if (srcRemarks) {
    deathInformation.remarks = srcRemarks
  }

  if (Object.keys(deathInformation).length) {
    migrator.setValue({
      obj: target,
      path: 'attributes.individual.deathInformation.0',
      value: deathInformation,
    })
  }
}
