const weightValueMap = {
  CompleteBodyWeight: 'complete-body-weight',
  OtherWeight: 'unknown-weight-type',
}

const mapWeightKey = key => {
  if (!key) {
    return key
  }
  return weightValueMap[key] || key
}

module.exports = function getFeatureTypesWeights({
  getItemByTypeId,
  migrator,
  reporter,
  src,
}) {
  const completeBodyWeight = migrator.getValue({
    obj: src,
    path: 'analysis.CompleteBodyWeight',
  })

  const otherWeight = migrator.getValue({
    obj: src,
    path: 'analysis.OtherWeight',
  })

  const customWeightType = migrator.getValue({
    obj: src,
    path: 'analysis.TypeOfWeight_related.Vikt_english',
  })

  const weightValue = otherWeight || completeBodyWeight

  let weightType
  if (customWeightType) {
    weightType = customWeightType
  } else if (otherWeight) {
    weightType = 'OtherWeight'
  } else if (completeBodyWeight) {
    weightType = 'CompleteBodyWeight'
  }

  const mappedWeigthType = mapWeightKey(weightType)
  if (!mappedWeigthType) {
    return Promise.resolve([])
  }

  return getItemByTypeId({
    id: mappedWeigthType,
    report: false,
    type: 'lookupFeatureType',
  }).then(featureType => {
    if (!featureType) {
      reporter.rebuildViewLookupMiss({
        id: mappedWeigthType,
        resource: 'lookupFeatureType-weights',
      })
      return []
    }

    reporter.rebuildViewLookupHit({
      id: mappedWeigthType,
      resource: 'lookupFeatureType-weights',
    })

    return [
      {
        id: featureType.attributes.srcId,
        text: `${weightValue}`,
      },
    ]
  })
}
