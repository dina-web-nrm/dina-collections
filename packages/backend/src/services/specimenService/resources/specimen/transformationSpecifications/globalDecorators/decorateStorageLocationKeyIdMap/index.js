const fetchParentsSync = require('../../../../../../../lib/data/transformations/utilities/fetchParentsSync')
const buildKey = require('./buildKey')

/* eslint-disable no-param-reassign */
module.exports = function decorateStorageLocationKeyIdMap({
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
      resource: 'storageLocation',
    })
    .then(({ data: storageLocations }) => {
      const storageLocationMap = {}
      storageLocations.forEach(storageLocation => {
        storageLocationMap[storageLocation.id] = storageLocation
      })

      const getItemByTypeId = ({ id }) => {
        return storageLocationMap[id]
      }
      const storageLocationKeyIdMap = {}
      storageLocations.forEach(storageLocation => {
        const parents = fetchParentsSync({
          getItemByTypeId,
          ignoreParentIds: ['1'],
          item: storageLocation,
          resource: 'storageLocation',
        })
        const key = buildKey({
          parents,
          storageLocation,
        })

        if (storageLocationKeyIdMap[key]) {
          throw new Error(`Duplicate key: ${key}`)
        }
        storageLocationKeyIdMap[key] = storageLocation.id
      })
      globals.storageLocationKeyIdMap = storageLocationKeyIdMap
    })
}
