const fetchParents = require('../../../../../../../lib/data/transformations/utilities/fetchParents')
/* eslint-disable no-param-reassign */

const transformation = ({ getItemByTypeId, migrator, src, locals }) => {
  const collectingInformation =
    migrator.getValue({
      obj: src,
      path: 'individual.collectingInformation',
    }) || []

  const originInformation =
    migrator.getValue({
      obj: src,
      path: 'individual.originInformation',
    }) || []

  const collectingPlaceIds = []
  const normalizedLocalities = []
  const transcribedLocalities = []
  const originLocalities = []

  originInformation.forEach(({ originLocality }) => {
    originLocalities.push(originLocality)
  })

  collectingInformation.forEach(singleCollectingInformation => {
    const locationInformation = migrator.getValue({
      obj: singleCollectingInformation,
      path: 'event.locationInformation',
    })

    if (locationInformation) {
      const normalizedLocality = migrator.getValue({
        obj: locationInformation,
        path: 'localityI',
      })

      if (normalizedLocality) {
        normalizedLocalities.push(normalizedLocality)
      }

      const transcribedLocality = migrator.getValue({
        obj: locationInformation,
        path: 'localityV',
      })

      if (transcribedLocality) {
        transcribedLocalities.push(transcribedLocality)
      }

      const places = migrator.getValue({
        obj: locationInformation,
        path: 'places',
      })

      if (places) {
        places.forEach(place => {
          if (place.id) {
            collectingPlaceIds.push(place.id)
          }
        })
      }
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
      if (!place) {
        return []
      }
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
    const collectingPlaces = []
    parentArrays.forEach(places => {
      places.forEach(place => {
        collectingPlaces.push(place)
      })
    })

    const collectingPlacesMap = collectingPlaces.reduce((map, place) => {
      map[place.id] = place
      return map
    }, {})

    migrator.setValue({
      obj: locals,
      path: 'collectingPlaces',
      value: collectingPlaces,
    })

    migrator.setValue({
      obj: locals,
      path: 'collectingPlacesMap',
      value: collectingPlacesMap,
    })

    migrator.setValue({
      obj: locals,
      path: 'normalizedLocalities',
      value: normalizedLocalities,
    })

    migrator.setValue({
      obj: locals,
      path: 'transcribedLocalities',
      value: transcribedLocalities,
    })

    migrator.setValue({
      obj: locals,
      path: 'originLocalities',
      value: originLocalities,
    })

    return null
  })
}

module.exports = {
  key: 'decorateLocality',
  transformation,
}
