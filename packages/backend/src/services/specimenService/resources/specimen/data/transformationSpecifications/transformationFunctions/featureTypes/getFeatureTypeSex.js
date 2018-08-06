const sexValueMap = {}

const mapSexValue = sex => {
  if (!sex) {
    return sex
  }
  const lowerCaseValue = sex.toLowerCase()
  return sexValueMap[lowerCaseValue] || lowerCaseValue
}

module.exports = function getFeatureTypeSex({
  getItemByTypeId,
  migrator,
  reporter,
  src,
}) {
  const sex = migrator.getValue({
    obj: src,
    path: 'analysis.Sex',
    strip: true,
  })

  if (!sex) {
    return Promise.resolve(null)
  }

  const mappedSexValue = mapSexValue(sex)

  return getItemByTypeId({
    id: 'sex',
    report: false,
    type: 'lookupFeatureType',
  }).then(item => {
    const matchingValues = item.attributes.selectableValues.filter(
      selectableValue => {
        return selectableValue.key === mappedSexValue
      }
    )

    if (matchingValues.length === 1) {
      reporter.rebuildViewLookupHit({
        id: mappedSexValue,
        resource: 'lookupFeatureType-sex',
      })

      return {
        id: item.attributes.srcId,
        text: matchingValues[0].key,
      }
    }

    reporter.rebuildViewLookupMiss({
      id: mappedSexValue,
      resource: 'lookupFeatureType-sex',
    })

    return null
  })
}
