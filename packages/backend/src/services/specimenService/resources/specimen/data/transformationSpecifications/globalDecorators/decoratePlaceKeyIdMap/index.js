const fetchParentsSync = require('../../../../../../../../lib/data/transformations/utilities/fetchParentsSync')
const buildKey = require('./buildKey')

/* eslint-disable no-param-reassign */
module.exports = function decoratePlaceKeyIdMap({
  serviceInteractor,
  globals,
}) {
  return serviceInteractor
    .getMany({
      request: {
        queryParams: {
          limit: 10000,
          relationships: ['parent'],
        },
      },
      resource: 'place',
    })
    .then(({ data: places }) => {
      const placeMap = {}
      places.forEach(place => {
        placeMap[place.id] = place
      })

      const getItemByTypeId = ({ id }) => {
        return placeMap[id]
      }
      const placeKeyIdMap = {}
      places.forEach(place => {
        const parents = fetchParentsSync({
          getItemByTypeId,
          ignoreParentIds: ['1'],
          item: place,
          resource: 'place',
        })
        const key = buildKey({
          parents,
          place,
        })

        if (placeKeyIdMap[key]) {
          throw new Error(`Duplicate key: ${key}`)
        }
        placeKeyIdMap[key] = place.id
      })
      globals.placeKeyIdMap = placeKeyIdMap
    })
}
