const readInitialData = require('../../../../../../../utilities/readInitialData')

const rawPlaces = readInitialData('localities') || []

// const placesIdMap = places.reduce((map, place) => {
//   return {
//     ...map,
//     [place.id]: place,
//   }
// }, {})

const placesNameMap = rawPlaces.reduce((map, place) => {
  return {
    ...map,
    [place.name]: map[place.name] ? [...map[place.name], place] : [place],
  }
}, {})

const getByFieldNoRelated = ({ value = {}, reporter }) => {
  const {
    Continent_Ocean: continent,
    Nation: country,
    Province: province, // add to place
  } = value
  if (province) {
    const places = placesNameMap[province]
    if (places && places.length) {
      reporter.increment({
        path: `lookups.getByFieldNoRelated.placesNameMap.hits.${province}`,
      })
      return places[0].id
    }
    reporter.increment({
      path: `lookups.getByFieldNoRelated.placesNameMap.missingKey.${province}`,
    })
  }

  if (country) {
    const places = placesNameMap[country]
    if (places && places.length) {
      reporter.increment({
        path: `lookups.getByFieldNoRelated.placesNameMap.hits.${country}`,
      })
      return places[0].id
    }
    reporter.increment({
      path: `lookups.getByFieldNoRelated.placesNameMap.missingKey.${country}`,
    })
  }

  if (continent) {
    const places = placesNameMap[continent]
    if (places && places.length) {
      reporter.increment({
        path: `lookups.getByFieldNoRelated.placesNameMap.hits.${continent}`,
      })
      return places[0].id
    }
    reporter.increment({
      path: `lookups.getByFieldNoRelated.placesNameMap.missingKey.${continent}`,
    })
  }

  return undefined
}

module.exports = function getPlace({ srcParameter, value, reporter }) {
  switch (srcParameter) {
    case 'FieldNo_related': {
      return getByFieldNoRelated({
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
