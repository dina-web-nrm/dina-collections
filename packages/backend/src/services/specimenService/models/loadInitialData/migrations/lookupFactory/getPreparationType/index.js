const readInitialData = require('../../../../../../../utilities/readInitialData')
const skelEngNameMap = require('./skelEngNameMap')
const skinEngNameMap = require('./skinEngNameMap')

const preparationTypes = readInitialData('preparationTypes') || []
const preparationTypesNameMap = preparationTypes.reduce(
  (map, preparationType) => {
    return {
      ...map,
      [preparationType.name]: preparationType,
    }
  },
  {}
)

const getBySkinEng = ({ value, reporter }) => {
  const preparationTypeName = skinEngNameMap[value]
  if (preparationTypeName) {
    reporter.increment({
      path: `lookups.getPreparationType.skinEngNameMap.hits.${value}`,
    })
  } else {
    reporter.increment({
      path: `lookups.getPreparationType.skinEngNameMap.missingKey.${value}`,
    })

    return undefined
  }

  const preparationType = preparationTypesNameMap[preparationTypeName]
  if (preparationType) {
    reporter.increment({
      path: `lookups.getPreparationType.preparationTypesNameMap.hits.${
        preparationTypeName
      }`,
    })

    return preparationType.id
  }
  reporter.increment({
    path: `lookups.getPreparationType.preparationTypesNameMap.missingKey.${
      preparationTypeName
    }`,
  })
  return undefined
}

const getBySkelEng = ({ value, reporter }) => {
  const preparationTypeName = skelEngNameMap[value]
  if (preparationTypeName) {
    reporter.increment({
      path: `lookups.getPreparationType.skelEngNameMap.hits.${value}`,
    })
  } else {
    reporter.increment({
      path: `lookups.getPreparationType.skelEngNameMap.missingKey.${value}`,
    })

    return undefined
  }

  const preparationType = preparationTypesNameMap[preparationTypeName]
  if (preparationType) {
    reporter.increment({
      path: `lookups.getPreparationType.preparationTypesNameMap.hits.${
        preparationTypeName
      }`,
    })

    return preparationType.id
  }
  reporter.increment({
    path: `lookups.getPreparationType.preparationTypesNameMap.missingKey.${
      preparationTypeName
    }`,
  })
  return undefined
}

module.exports = function getPreparationType({
  srcParameter,
  value,
  reporter,
}) {
  switch (srcParameter) {
    case 'Skel_Eng': {
      return getBySkelEng({
        reporter,
        value,
      })
    }
    case 'Skin_Eng': {
      return getBySkinEng({
        reporter,
        value,
      })
    }
    default: {
      reporter.increment({
        path: `lookups.getPreparationType.missingSrcParamenter.${srcParameter}`,
      })
      return undefined
    }
  }
}
