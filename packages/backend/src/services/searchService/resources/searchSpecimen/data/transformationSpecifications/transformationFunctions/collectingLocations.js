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

  const collectingLocations = []

  collectingInformation.forEach(singleCollectingInformation => {
    const places = objectPath.get(
      singleCollectingInformation,
      'event.locationInformation.places'
    )
    if (places) {
      places.forEach(place => {
        if (place.name) {
          collectingLocations.push(`${place.name} (place)`)
        }
      })
    }

    const locationInformation = objectPath.get(
      singleCollectingInformation,
      'event.locationInformation'
    )

    if (locationInformation && locationInformation.localityN) {
      collectingLocations.push(`${locationInformation.localityN} (localityN)`)
    }

    if (locationInformation && locationInformation.localityT) {
      collectingLocations.push(`${locationInformation.localityT} (localityT)`)
    }
    return null
  })

  target.collectingLocations = collectingLocations

  return null
}
