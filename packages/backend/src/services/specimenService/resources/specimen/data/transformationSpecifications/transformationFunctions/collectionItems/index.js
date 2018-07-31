/* eslint-disable no-param-reassign */
const getSkeletonPreparationType = require('./getSkeletonPreparationType')
const getSkeletonStorageLocation = require('./getSkeletonStorageLocation')
const getSkinPreparationType = require('./getSkinPreparationType')
const getSkinStorageLocation = require('./getSkinStorageLocation')

module.exports = function migrateCollectionItems({
  getItemByTypeId,
  migrator,
  src,
  target,
}) {
  const collectionItems = []

  // let skinCollectionItemId = 0
  return getSkeletonPreparationType({
    getItemByTypeId,
    migrator,
    src,
    target,
  })
    .then(skeletonPreparationTypeId => {
      return getSkeletonStorageLocation({
        getItemByTypeId,
        migrator,
        src,
        target,
      }).then(skeletonStorageLocation => {
        if (skeletonPreparationTypeId || skeletonStorageLocation) {
          collectionItems.push({
            physicalObject: !skeletonStorageLocation
              ? undefined
              : {
                  storageLocation: {
                    id: skeletonStorageLocation,
                  },
                },
            preparationType: !skeletonPreparationTypeId
              ? undefined
              : {
                  id: skeletonPreparationTypeId,
                },
          })
        }
      })
    })

    .then(() => {
      return getSkinPreparationType({
        getItemByTypeId,
        migrator,
        src,
        target,
      }).then(skinPreparationTypeId => {
        return getSkinStorageLocation({
          getItemByTypeId,
          migrator,
          src,
          target,
        }).then(skinStorageLocation => {
          if (skinPreparationTypeId || skinStorageLocation) {
            collectionItems.push({
              physicalObject: !skinStorageLocation
                ? undefined
                : {
                    storageLocation: {
                      id: skinStorageLocation,
                    },
                  },
              preparationType: !skinPreparationTypeId
                ? undefined
                : {
                    id: skinPreparationTypeId,
                  },
            })
          }
        })
      })
    })
    .then(() => {
      migrator.setValue({
        obj: target,
        path: 'attributes.individual.collectionItems',
        value: collectionItems,
      })
    })
}
