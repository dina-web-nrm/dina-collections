const skeletonRenameMap = {
  'In alcohol': 'skeleton in alcohol',
}

const mapSkeletonName = name => {
  return skeletonRenameMap[name] || name
}

module.exports = function getSkeletonPreparationType({
  src,
  getItemByTypeId,
  migrator,
}) {
  const srcSkeletonPreparationType = migrator.getValue({
    obj: src,
    path: 'collection.SkeletonStatus_related.Skel_Eng',
  })
  const lookupPreparationTypeId = mapSkeletonName(srcSkeletonPreparationType)
  return getItemByTypeId({
    id: lookupPreparationTypeId,
    type: 'lookupPreparationType',
  }).then(item => {
    const preparationTypeId = item && item.attributes && item.attributes.srcId
    return preparationTypeId
  })
}
