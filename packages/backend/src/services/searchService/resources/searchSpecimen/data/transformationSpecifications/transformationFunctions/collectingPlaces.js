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
        return [
          ...parents.map(parent => {
            return parent.id
          }),
          id,
        ]
      })
    })
  })

  return Promise.all(promises).then(parentIdArrays => {
    const placeIds = []
    parentIdArrays.forEach(ids => {
      ids.forEach(id => {
        placeIds.push(id)
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
