const boneValueMap = {
  Bacculum: 'bacculum',
  Costae: 'costae',
  Cranium: 'cranium',
  Femur: 'femur',
  Humerus: 'humerus',
  Mandibula: 'mandibula',
  Manus: 'manus',
  Pedis: 'pedis',
  Pelvis: 'pelvis',
  Radius: 'radius',
  Scapula: 'scapula',
  Tibia: 'tibia',
  Ulna: 'ulna',
  Vertebrae: 'vertebrae',
}

const mapBoneKey = key => {
  if (!key) {
    return key
  }
  return boneValueMap[key] || key
}

module.exports = function getFeatureTypeSex({
  getItemByTypeId,
  migrator,
  reporter,
  src,
}) {
  const promises = Object.keys(boneValueMap)
    .map(parameterKey => {
      const mappedParameterKey = mapBoneKey(parameterKey)
      const parameterValue = migrator.getValue({
        obj: src,
        path: `collection.${parameterKey}`,
        strip: true,
      })

      if (parameterValue) {
        return {
          mappedParameterKey,
          parameterKey,
          value: parameterValue,
        }
      }
      return null
    })
    .filter(item => {
      return !!item
    })
    .map(({ mappedParameterKey, value }) => {
      return getItemByTypeId({
        id: mappedParameterKey,
        report: false,
        type: 'lookupFeatureType',
      }).then(featureType => {
        if (!featureType) {
          reporter.rebuildViewLookupMiss({
            id: mappedParameterKey,
            resource: 'lookupFeatureType-bones',
          })

          return null
        }

        reporter.rebuildViewLookupHit({
          id: mappedParameterKey,
          resource: 'lookupFeatureType-bones',
        })

        return {
          id: featureType.attributes.srcId,
          text: `${value}`,
        }
      })
    })

  return Promise.all(promises).then(items => {
    return items.filter(item => {
      return !!item
    })
  })
}
