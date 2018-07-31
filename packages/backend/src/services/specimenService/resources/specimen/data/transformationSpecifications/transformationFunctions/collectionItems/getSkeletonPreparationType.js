const skeletonRenameMap = {
  'Complete, mounted skeleton': 'complete, mounted skeleton',
  'Complete, unmounted skeleton': 'complete, disarticulated skeleton',
  'Cranium (mandible may be missing)': 'skull',
  Horn: 'antler/horn',
  'Horn with skin from head': 'antler/horn',
  'In alcohol': 'skeleton in alcohol',
  'Partial skeleton - more than a few bones but no cranium':
    'partial skeleton without skull',
  'Partial skeleton with cranium': 'partial skeleton with skull',
  'Skeleton parts from more than one specimen mixed':
    'bones from several specimens',
  'Some bones (>30%)': 'some bones',
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

  if (!lookupPreparationTypeId) {
    return Promise.resolve(undefined)
  }

  return getItemByTypeId({
    id: lookupPreparationTypeId,
    type: 'lookupPreparationType',
  }).then(item => {
    const preparationTypeId = item && item.attributes && item.attributes.srcId
    return preparationTypeId
  })
}
