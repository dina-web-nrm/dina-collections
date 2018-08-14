module.exports = function getSkeletonStorageLocation({
  src,
  getItemByTypeId,
  migrator,
}) {
  const lookupSrcStorageLocationId = migrator.getValue({
    obj: src,
    path: 'collection.SkeletonCollection_related.Location_Eng',
    strip: true,
  })

  if (!lookupSrcStorageLocationId) {
    return Promise.resolve(undefined)
  }

  return getItemByTypeId({
    id: lookupSrcStorageLocationId,
    reportHitId: true,
    type: 'lookupStorageLocation',
  }).then(item => {
    const storageLocation = item && item.attributes && item.attributes.srcId
    return storageLocation
  })
}
