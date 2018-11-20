/* eslint-disable no-param-reassign */

/*
example src data
  "migrationData": {
      "publishRecord": "True",
      "remarks": "5 ex. OBS Det finns 2 Odensjö i Småland så det är minst lika troligt att dessa kommer från det utanför Växjö istället.",
    },
*/

module.exports = function migrateSpecimen({
  globalIndex,
  migrator,
  src,
  target,
}) {
  const { id: idInput } = src
  const id = idInput || `${globalIndex + 1}`

  migrator.setValue({
    obj: target,
    path: 'id',
    value: id,
  })

  const publishRecord = migrator.getValue({
    obj: src,
    path: 'migrationData.publishRecord',
    strip: true,
  })

  migrator.setValue({
    obj: target,
    path: 'attributes.publishRecord',
    value: publishRecord === 'True',
  })

  const remarks = migrator.getValue({
    obj: src,
    path: 'migrationData.remarks',
    strip: true,
  })

  const srcCollectionItemsRemarks = migrator.getValue({
    obj: src,
    path: 'migrationData.collectionItemsRemarks',
    strip: true,
  })

  if (srcCollectionItemsRemarks) {
    migrator.setValue({
      obj: target,
      path: 'attributes.collectionItemsRemarks',
      value: srcCollectionItemsRemarks,
    })
  }

  if (remarks) {
    migrator.setValue({
      obj: target,
      path: 'attributes.remarks',
      value: remarks,
    })
  }
}
