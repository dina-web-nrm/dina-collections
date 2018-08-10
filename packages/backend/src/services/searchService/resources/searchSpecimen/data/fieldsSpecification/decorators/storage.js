const extractFetchParents = require('../../../../../../../lib/data/transformations/utilities/extractFetchParents')
/* eslint-disable no-param-reassign */

const transformation = ({ migrator, src, locals }) => {
  const collectionItems = migrator.getValue({
    clone: true,
    obj: src,
    path: 'individual.collectionItems',
  })

  if (!collectionItems) {
    return null
  }

  const storageLocations = []
  const storageLocationTexts = []
  collectionItems.forEach(collectionItem => {
    const storageLocation = migrator.getValue({
      obj: collectionItem,
      path: 'physicalObject.storageLocation',
    })

    const storageLocationText = migrator.getValue({
      obj: collectionItem,
      path: 'physicalObject.storageLocationText',
    })

    if (storageLocationText) {
      storageLocationTexts.push(storageLocationText)
    }

    if (!storageLocation) {
      return
    }

    storageLocations.push(storageLocation)

    const parents = extractFetchParents({
      item: storageLocation,
      order: 'desc',
    })

    parents.forEach(parent => {
      storageLocations.push(parent)
    })
  })

  migrator.setValue({
    obj: locals,
    path: 'storageLocations',
    value: storageLocations,
  })
  migrator.setValue({
    obj: locals,
    path: 'storageLocationTexts',
    value: storageLocationTexts,
  })
  return null
}

module.exports = {
  key: 'decorateStorageLocality',
  transformation,
}
