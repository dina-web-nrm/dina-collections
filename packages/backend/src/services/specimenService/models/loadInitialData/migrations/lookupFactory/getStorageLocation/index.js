const readInitialData = require('../../../../../../../utilities/readInitialData')

const storageLocations = readInitialData('storageLocations') || []

const storageLocationsNameMap = storageLocations.reduce(
  (map, storageLocation) => {
    return {
      ...map,
      [storageLocation.name]: storageLocation,
    }
  },
  {}
)

const getByLocationEng = ({ value, reporter }) => {
  const storageLocation = storageLocationsNameMap[value]
  if (storageLocation) {
    reporter.increment({
      path: `lookups.getStorageLocation.storageLocationsNameMap.hits.${value}`,
    })
    return storageLocation.id
  }
  reporter.increment({
    path: `lookups.getStorageLocation.storageLocationsNameMap.missingKey.${
      value
    }`,
  })

  return undefined
}

module.exports = function getStorageLocation({
  srcParameter,
  value,
  reporter,
}) {
  switch (srcParameter) {
    case 'Location_Eng': {
      return getByLocationEng({
        reporter,
        value,
      })
    }
    default: {
      reporter.increment({
        path: `lookups.getStorageLocation.missingSrcParamenter.${srcParameter}`,
      })
      return undefined
    }
  }
}
