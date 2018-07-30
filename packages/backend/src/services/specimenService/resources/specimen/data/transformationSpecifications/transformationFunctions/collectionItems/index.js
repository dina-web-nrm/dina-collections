/* eslint-disable no-param-reassign */
const getSkeletonPreparationType = require('./getSkeletonPreparationType')
const getSkeletonStorageLocation = require('./getSkeletonStorageLocation')
const getSkinPreparationType = require('./getSkinPreparationType')
const getSkinStorageLocation = require('./getSkinStorageLocation')

module.exports = function collectionItems({
  getItemByTypeId,
  migrator,
  src,
  target,
}) {
  let skinCollectionItemId = 0
  return getSkeletonPreparationType({
    getItemByTypeId,
    migrator,
    src,
    target,
  })
    .then(skeletonPreparationTypeId => {
      if (skeletonPreparationTypeId) {
        skinCollectionItemId = 1
        migrator.setValue({
          obj: target,
          path: 'attributes.individual.collectionItems.0.preparationType.id',
          value: skeletonPreparationTypeId,
        })
      }

      return getSkeletonStorageLocation({
        getItemByTypeId,
        migrator,
        src,
        target,
      }).then(skeletonStorageLocation => {
        if (skeletonStorageLocation) {
          skinCollectionItemId = 1
          migrator.setValue({
            obj: target,
            path:
              'attributes.individual.collectionItems.0.physicalObject.storageLocation.id',
            value: skeletonStorageLocation,
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
      }).then(skintPreparationTypeId => {
        if (skintPreparationTypeId) {
          skinCollectionItemId = 1
          migrator.setValue({
            obj: target,
            path: `attributes.individual.collectionItems.${
              skinCollectionItemId
            }.preparationType.id`,
            value: skintPreparationTypeId,
          })
        }

        return getSkinStorageLocation({
          getItemByTypeId,
          migrator,
          src,
          target,
        }).then(skintStorageLocation => {
          if (skintStorageLocation) {
            skinCollectionItemId = 1
            migrator.setValue({
              obj: target,
              path: `attributes.individual.collectionItems.${
                skinCollectionItemId
              }.physicalObject.storageLocation.i`,
              value: skintStorageLocation,
            })
          }
        })
      })
    })
}

// module.exports = function createCollectionItems({ migrator, lookup }) {
//   /* Skeleton */
//   // setPreparationType
//   migrator.setValue({
//     path: 'target.individual.collectionItems.0.preparationType.id',
//     value: lookup.getPreparationType({
//       srcParameter: 'Skel_Eng',
//       value: migrator.getValue({
//         path: 'src.collection.SkeletonStatus_related.Skel_Eng',
//       }),
//     }),
//   })

//   // setStorageLocation
//   migrator.setValue({
//     path:
//       'target.individual.collectionItems.0.physicalObject.storageLocation.id',
//     value: lookup.getSkeletonStorageLocation({
//       srcParameter: 'Location_Eng',
//       value: migrator.getValue({
//         path: 'src.collection.SkeletonCollection_related.Location_Eng',
//       }),
//     }),
//   })

//   /* Skin */
//   // setPreparationType
//   migrator.setValue({
//     path: 'target.individual.collectionItems.1.preparationType.id',
//     value: lookup.getPreparationType({
//       srcParameter: 'Skin_Eng',
//       value: migrator.getValue({
//         path: 'src.collection.SkinStatus_related.Skin_Eng',
//       }),
//     }),
//   })

//   // setStorageLocation
//   migrator.setValue({
//     path:
//       'target.individual.collectionItems.1.physicalObject.storageLocation.id',
//     value: lookup.getStorageLocation({
//       srcParameter: 'Location_Eng',
//       value: migrator.getValue({
//         path: 'src.collection.SkinCollection_related.Location_Eng',
//       }),
//     }),
//   })

//   /* filter collectionItems */
//   migrator.filterArray({
//     path: 'target.individual.collectionItems',
//   })
// }
