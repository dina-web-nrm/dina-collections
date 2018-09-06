/* eslint-disable no-param-reassign */
const objectPath = require('object-path')

module.exports = ({ src, target }) => {
  const collectingInformation = objectPath.get(
    src,
    'individual.collectingInformation'
  )
  if (!collectingInformation) {
    return null
  }

  let collectingLocationN
  let collectingLocationT
  let collectingPlace

  collectingInformation.forEach(singleCollectingInformation => {
    const places = objectPath.get(
      singleCollectingInformation,
      'event.locationInformation.places'
    )
    if (places) {
      places.forEach(place => {
        if (!collectingPlace) {
          collectingPlace = place.name
        }
      })
    }

    const locationInformation = objectPath.get(
      singleCollectingInformation,
      'event.locationInformation'
    )

    if (locationInformation && locationInformation.localityI) {
      collectingLocationN = locationInformation.localityI
    }

    if (locationInformation && locationInformation.localityV) {
      collectingLocationT = locationInformation.localityV
    }
    return null
  })

  target.collectingLocation = {
    locationN: collectingLocationN,
    locationT: collectingLocationT,
    place: collectingPlace,
  }

  return null
}
