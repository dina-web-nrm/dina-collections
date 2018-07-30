const skinRenameMap = {
  'In alcohol': 'skin in alcohol',
}

const mapSkinName = name => {
  return skinRenameMap[name] || name
}

module.exports = function getSkinPreparationType({
  src,
  getItemByTypeId,
  migrator,
}) {
  const srcSkinPreparationType = migrator.getValue({
    obj: src,
    path: 'collection.SkinStatus_related.Skin_Eng',
  })
  const lookupPreparationTypeId = mapSkinName(srcSkinPreparationType)
  return getItemByTypeId({
    id: lookupPreparationTypeId,
    type: 'lookupPreparationType',
  }).then(item => {
    const preparationTypeId = item && item.attributes && item.attributes.srcId
    return preparationTypeId
  })
}
