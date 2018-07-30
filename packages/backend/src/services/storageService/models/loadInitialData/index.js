const readInitialData = require('../../../../utilities/readInitialData')

module.exports = function loadInitialData({ models }) {
  const storageLocations = readInitialData('storageLocations')

  if (!storageLocations) {
    return Promise.resolve()
  }

  const items = storageLocations.map(storageLocation => {
    const { id, parentId, ...rest } = storageLocation

    const attributes = {
      ...rest,
    }
    return {
      attributes,
      id,
      internals: { parentId },
    }
  })

  return models.storageLocation.bulkCreate({ items })
}
