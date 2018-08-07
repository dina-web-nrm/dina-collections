const fetchParents = require('../../../../../../../lib/data/transformations/utilities/fetchParents')
/* eslint-disable no-param-reassign */

module.exports = ({ getItemByTypeId, migrator, src, target }) => {
  const collectingInformation = migrator.getValue({
    obj: src,
    path: 'individual.collectingInformation',
  })

  if (!collectingInformation) {
    return null
  }

  const collectingPlaceIds = []

  collectingInformation.forEach(singleCollectingInformation => {
    const places = migrator.getValue({
      obj: singleCollectingInformation,
      path: 'event.locationInformation.places',
    })

    if (places) {
      places.forEach(place => {
        if (place.id) {
          collectingPlaceIds.push(place.id)
        }
      })
    }

    return null
  })

  const promises = collectingPlaceIds.map(id => {
    return getItemByTypeId({
      id,
      queryParams: {
        relationships: ['parent'],
      },
      type: 'place',
    }).then(place => {
      return fetchParents({
        getItemByTypeId,
        item: place,
        resource: 'place',
      }).then(parents => {
        return [...parents, place]
      })
    })
  })

  return Promise.all(promises).then(parentArrays => {
    const placeIds = []
    parentArrays.forEach(places => {
      places.forEach(place => {
        placeIds.push(place.id)
        const { group } = place.attributes
        if (group === 'country') {
          migrator.setValue({
            obj: target,
            path: 'attributes.result.collectingCountry',
            value: place.attributes.name,
          })
        }

        if (group === 'district') {
          migrator.setValue({
            obj: target,
            path: 'attributes.result.collectingDistrict',
            value: place.attributes.name,
          })
        }

        if (group === 'province') {
          migrator.setValue({
            obj: target,
            path: 'attributes.result.collectingProvince',
            value: place.attributes.name,
          })
        }

        if (group === 'continent') {
          migrator.setValue({
            obj: target,
            path: 'attributes.result.collectingContinent',
            value: place.attributes.name,
          })
        }
      })
    })

    migrator.setValue({
      obj: target,
      path: 'attributes.collectingPlaces',
      value: placeIds,
    })

    return null
  })
}
