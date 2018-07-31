const skinRenameMap = {
  'In alcohol': 'skin in alcohol',
  'Skin complete, mounted': 'complete, mounted skin',
  'Skin complete, prepared': 'complete study skin',
  'Skin from head': 'skin from skull',
  'Skin, partial (>30%)': 'partial skin < 30%',
  'Skin, partial (30-90%)': 'partial skin, 30-90%',
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
