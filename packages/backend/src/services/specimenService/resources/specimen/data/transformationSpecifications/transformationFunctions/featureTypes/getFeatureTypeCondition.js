const conditionValueMap = {
  'slightly cadaverous': 'slightly-cadaverous',
}

const mapAgeStageValue = condition => {
  if (!condition) {
    return condition
  }
  const lowerCaseValue = condition.toLowerCase()
  return conditionValueMap[lowerCaseValue] || lowerCaseValue
}

module.exports = function getFeatureTypeAgeStage({
  getItemByTypeId,
  migrator,
  reporter,
  src,
}) {
  const condition = migrator.getValue({
    obj: src,
    path: 'analysis.Condition_related.Kondition_english',
  })

  if (!condition) {
    return Promise.resolve(null)
  }

  const mappedConditionValue = mapAgeStageValue(condition)

  return getItemByTypeId({
    id: 'condition',
    report: false,
    type: 'lookupFeatureType',
  }).then(item => {
    const matchingSelectableValue = item.attributes.selectableValues.find(
      selectableValue => {
        return selectableValue.key === mappedConditionValue
      }
    )

    if (matchingSelectableValue) {
      reporter.rebuildViewLookupHit({
        id: mappedConditionValue,
        resource: 'lookupFeatureType-condition',
      })
      return {
        id: item.attributes.srcId,
        text: matchingSelectableValue.key,
      }
    }

    reporter.rebuildViewLookupMiss({
      id: mappedConditionValue,
      resource: 'lookupFeatureType-condition',
    })

    return null
  })
}
