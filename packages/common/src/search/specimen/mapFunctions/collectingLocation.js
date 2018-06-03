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

    if (locationInformation && locationInformation.localityN) {
      collectingLocationN = locationInformation.localityN
    }

    if (locationInformation && locationInformation.localityT) {
      collectingLocationT = locationInformation.localityT
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
