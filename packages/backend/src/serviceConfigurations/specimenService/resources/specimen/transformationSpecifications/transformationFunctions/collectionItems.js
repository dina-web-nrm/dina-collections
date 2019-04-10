const buildKey = require('../globalDecorators/decorateStorageLocationKeyIdMap/buildKey')
/*
example src data
  "physicalObjects": [
    {
      "preparationType_key": "skeleton in alcohol",
      "remarks": null,
      "room": "NRM Zoology",
      "mountingWall": "Alcohol Collection",
      "storageLevel3": null,
      "storageLevel5": "3815551 Eptesicus nilssonii"
    },
    {
      "preparationType_key": "skin in alcohol",
      "remarks": null,
      "room": "NRM Zoology",
      "mountingWall": "Alcohol Collection",
      "storageLevel3": null,
      "storageLevel5": "3815551 Eptesicus nilssonii"
    }
  ]
*/

module.exports = function migrateCollectionItems({
  globals,
  migrator,
  reporter,
  src,
  target,
}) {
  const srcPhysicalObjects = migrator.getValue({
    obj: src,
    path: 'migrationData.physicalObjects',
    strip: true,
  })

  if (!srcPhysicalObjects) {
    return
  }

  const collectionItems = srcPhysicalObjects
    .map(srcPhysicalObject => {
      const {
        preparationType_key: srcPreparationType,
        remarks: srcRemarks,
        room: srcStorageLevel1,
        mountingWall: srcStorageLevel2,
        storageLevel3: srcStorageLevel3,
        shelf: srcStorageLevel4,
        storageLevel5: srcStorageLevel5,
      } = srcPhysicalObject
      const collectionItem = {}

      const storageLocationKey = buildKey({
        mountingWall: srcStorageLevel2,
        room: srcStorageLevel1,
        shelf: srcStorageLevel4,
        storageLevel3: srcStorageLevel3,
        storageLevel5: srcStorageLevel5,
      })

      const storageLocationId = migrator.getFromGlobals({
        globals,
        key: storageLocationKey,
        mapKey: 'storageLocationKeyIdMap',
        reporter,
      })

      const preparationTypeId = migrator.getFromGlobals({
        globals,
        key: srcPreparationType,
        mapKey: 'preparationTypeKeyIdMap',
        reporter,
      })

      if (preparationTypeId) {
        collectionItem.preparationType = {
          id: preparationTypeId,
        }
      }

      if (storageLocationId !== undefined || srcRemarks) {
        collectionItem.physicalObject = {}
        if (storageLocationId !== undefined) {
          collectionItem.physicalObject.storageLocation = {
            id: storageLocationId,
          }
        }
        if (srcRemarks) {
          collectionItem.physicalObject.remarks = srcRemarks
        }
      }

      if (!Object.keys(collectionItem)) {
        return null
      }
      return collectionItem
    })
    .filter(collectionItem => {
      return !!collectionItem
    })

  migrator.setValue({
    obj: target,
    path: 'attributes.individual.collectionItems',
    value: collectionItems,
  })
}
