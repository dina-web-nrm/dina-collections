const ageDeterminationValueMap = {
  'known age': 'known-age',
  'sectioned teeth': 'sectioned-teeth',
}

const mapAgeDetermination = ageDetermination => {
  if (!ageDetermination) {
    return ageDetermination
  }
  const lowerCaseValue = ageDetermination.toLowerCase()
  return ageDeterminationValueMap[lowerCaseValue] || lowerCaseValue
}

module.exports = function getFeatureTypeAge({
  getItemByTypeId,
  migrator,
  reporter,
  src,
}) {
  const age = migrator.getValue({
    obj: src,
    path: 'analysis.Age',
    strip: true,
  })

  const ageDetermination = migrator.getValue({
    obj: src,
    path: 'analysis.AgeDetermination',
    strip: true,
  })

  if (!age) {
    return Promise.resolve(null)
  }

  const mappedAgeDetermination = mapAgeDetermination(ageDetermination)
  return getItemByTypeId({
    id: 'age',
    report: false,
    type: 'lookupFeatureType',
  }).then(item => {
    let matchingAgeDetermination
    if (mappedAgeDetermination) {
      matchingAgeDetermination = item.attributes.selectableMethods.find(
        selectableMethod => {
          return selectableMethod.key === mappedAgeDetermination
        }
      )
      if (matchingAgeDetermination) {
        reporter.rebuildViewLookupHit({
          id: mappedAgeDetermination,
          resource: 'lookupFeatureType-ageDeterminationMethod',
        })
      } else {
        reporter.rebuildViewLookupMiss({
          id: mappedAgeDetermination,
          resource: 'lookupFeatureType-ageDeterminationMethod',
        })
      }
    }

    if (age) {
      reporter.rebuildViewLookupHit({
        resource: 'lookupFeatureType-age',
      })
      return {
        id: item.attributes.srcId,
        methodText:
          (matchingAgeDetermination && matchingAgeDetermination.key) ||
          undefined,
        text: `${age}`,
      }
    }

    return null
  })
}
