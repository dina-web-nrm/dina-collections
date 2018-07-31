module.exports = function getSkinStorageLocation({
  src,
  getItemByTypeId,
  migrator,
}) {
  const lookupSrcStorageLocationId = migrator.getValue({
    obj: src,
    path: 'collection.SkinCollection_related.Location_Eng',
  })

  if (!lookupSrcStorageLocationId) {
    return Promise.resolve(undefined)
  }

  return getItemByTypeId({
    id: lookupSrcStorageLocationId,
    type: 'lookupStorageLocation',
  }).then(item => {
    const storageLocation = item && item.attributes && item.attributes.srcId
    return storageLocation
  })
}
