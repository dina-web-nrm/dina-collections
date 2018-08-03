const ageStageValueMap = {
  featus: 'fetus',
}

const ageDeterminationValueMap = {
  'known age': 'known-age',
  'sectioned teeth': 'sectioned-teeth',
}

const mapAgeStageValue = ageStage => {
  if (!ageStage) {
    return ageStage
  }
  const lowerCaseValue = ageStage.toLowerCase()
  return ageStageValueMap[lowerCaseValue] || lowerCaseValue
}

const mapAgeDetermination = ageDetermination => {
  if (!ageDetermination) {
    return ageDetermination
  }
  const lowerCaseValue = ageDetermination.toLowerCase()
  return ageDeterminationValueMap[lowerCaseValue] || lowerCaseValue
}

module.exports = function getFeatureTypeAgeStage({
  getItemByTypeId,
  migrator,
  reporter,
  src,
}) {
  const ageStage = migrator.getValue({
    obj: src,
    path: 'analysis.AgeStage',
    strip: true,
  })

  const ageDetermination = migrator.getValue({
    obj: src,
    path: 'analysis.AgeDetermination',
    strip: true,
  })

  if (!ageStage) {
    return Promise.resolve(null)
  }

  const mappedAgeStageValue = mapAgeStageValue(ageStage)
  const mappedAgeDetermination = mapAgeDetermination(ageDetermination)
  return getItemByTypeId({
    id: 'age-stage',
    report: false,
    type: 'lookupFeatureType',
  }).then(item => {
    const matchingAgeStage = item.attributes.selectableValues.find(
      selectableValue => {
        return selectableValue.key === mappedAgeStageValue
      }
    )

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

    if (matchingAgeStage) {
      reporter.rebuildViewLookupHit({
        id: mappedAgeStageValue,
        resource: 'lookupFeatureType-ageStage',
      })
      return {
        id: item.attributes.srcId,
        methodText:
          (matchingAgeDetermination && matchingAgeDetermination.key) ||
          undefined,
        text: matchingAgeStage.key,
      }
    }

    reporter.rebuildViewLookupMiss({
      id: mappedAgeStageValue,
      resource: 'lookupFeatureType-ageStage',
    })

    return null
  })
}
