const lengthValueMap = {
  BodyLength: 'body-length',
  CompleteLength: 'total-length',
  EarLength: 'ear-length',
  HindFootLength: 'hind-foot-length',
  TailAnusLength: 'tail-anus-length',
  TailPelvisLength: 'tail-pelvis-length',
}

const mapLengthKey = key => {
  if (!key) {
    return key
  }
  return lengthValueMap[key] || key
}

module.exports = function getFeatureTypesLengths({
  getItemByTypeId,
  migrator,
  reporter,
  src,
}) {
  const promises = Object.keys(lengthValueMap)
    .map(parameterKey => {
      const mappedParameterKey = mapLengthKey(parameterKey)
      const parameterValue = migrator.getValue({
        obj: src,
        path: `analysis.${parameterKey}`,
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
            resource: 'lookupFeatureType-lengths',
          })

          return null
        }

        reporter.rebuildViewLookupHit({
          id: mappedParameterKey,
          resource: 'lookupFeatureType-lengths',
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
