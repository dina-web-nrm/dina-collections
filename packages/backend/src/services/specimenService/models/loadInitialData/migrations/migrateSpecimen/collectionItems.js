module.exports = function createCollectionItems({ migrator, lookup }) {
  /* Skeleton */
  // setPreparationType
  migrator.setValue({
    path: 'target.individual.collectionItems.0.preparationType.id',
    value: lookup.getPreparationType({
      srcParameter: 'Skel_Eng',
      value: migrator.getValue({
        path: 'src.collection.SkeletonStatus_related.Skel_Eng',
      }),
    }),
  })

  // setStorageLocation
  migrator.setValue({
    path:
      'target.individual.collectionItems.0.physicalObject.storageLocation.id',
    value: lookup.getStorageLocation({
      srcParameter: 'Location_Eng',
      value: migrator.getValue({
        path: 'src.collection.SkeletonCollection_related.Location_Eng',
      }),
    }),
  })

  /* Skin */
  // setPreparationType
  migrator.setValue({
    path: 'target.individual.collectionItems.1.preparationType.id',
    value: lookup.getPreparationType({
      srcParameter: 'Skin_Eng',
      value: migrator.getValue({
        path: 'src.collection.SkinStatus_related.Skin_Eng',
      }),
    }),
  })

  // setStorageLocation
  migrator.setValue({
    path:
      'target.individual.collectionItems.1.physicalObject.storageLocation.id',
    value: lookup.getStorageLocation({
      srcParameter: 'Location_Eng',
      value: migrator.getValue({
        path: 'src.collection.SkinCollection_related.Location_Eng',
      }),
    }),
  })

  /* filter collectionItems */
  migrator.filterArray({
    path: 'target.individual.collectionItems',
  })
}
