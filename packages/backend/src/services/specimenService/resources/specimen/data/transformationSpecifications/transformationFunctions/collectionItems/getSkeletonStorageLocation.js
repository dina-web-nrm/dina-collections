module.exports = function getSkeletonStorageLocation({
  src,
  getItemByTypeId,
  migrator,
}) {
  const lookupSrcStorageLocationId = migrator.getValue({
    obj: src,
    path: 'collection.SkeletonCollection_related.Location_Eng',
  })

  if (!lookupSrcStorageLocationId) {
    return Promise.resolve(true)
  }

  return getItemByTypeId({
    id: lookupSrcStorageLocationId,
    type: 'lookupStorageLocation',
  }).then(item => {
    const storageLocation = item && item.attributes && item.attributes.srcId
    return storageLocation
  })
}
