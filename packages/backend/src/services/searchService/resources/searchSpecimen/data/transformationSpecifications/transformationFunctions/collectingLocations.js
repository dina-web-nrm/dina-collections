/* eslint-disable no-param-reassign */

module.exports = ({ migrator, src, target }) => {
  const collectingInformation = migrator.getValue({
    obj: src,
    path: 'individual.collectingInformation',
  })

  if (!collectingInformation) {
    return null
  }

  const collectingLocations = []

  collectingInformation.forEach(singleCollectingInformation => {
    const places = migrator.getValue({
      obj: singleCollectingInformation,
      path: 'event.locationInformation.places',
    })

    if (places) {
      places.forEach(place => {
        if (place.name) {
          collectingLocations.push(`${place.name} (place)`)
        }
      })
    }

    const locationInformation = migrator.getValue({
      obj: singleCollectingInformation,
      path: 'event.locationInformation',
    })

    if (locationInformation && locationInformation.localityN) {
      collectingLocations.push(`${locationInformation.localityN} (localityN)`)
    }

    if (locationInformation && locationInformation.localityT) {
      collectingLocations.push(`${locationInformation.localityT} (localityT)`)
    }
    return null
  })

  migrator.setValue({
    obj: target,
    path: 'attributes.collectingLocations',
    value: collectingLocations,
  })

  return null
}
