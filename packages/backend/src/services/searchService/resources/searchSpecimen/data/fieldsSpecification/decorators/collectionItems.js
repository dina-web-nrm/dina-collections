const fetchParents = require('../../../../../../../lib/data/transformations/utilities/fetchParents')
/* eslint-disable no-param-reassign */

const transformation = ({ getItemByTypeId, migrator, src, locals }) => {
  const collectionItems = migrator.getValue({
    clone: true,
    obj: src,
    path: 'individual.collectionItems',
  })

  if (!collectionItems) {
    return null
  }

  const promises = collectionItems.map(collectionItem => {
    const storageLocation = migrator.getValue({
      obj: collectionItem,
      path: 'physicalObject.storageLocation',
    })

    if (!storageLocation) {
      return Promise.resolve(collectionItem)
    }

    return fetchParents({
      getItemByTypeId,
      item: storageLocation,
      order: 'desc',
      resource: 'storageLocation',
    }).then(parents => {
      migrator.setValue({
        obj: collectionItem,
        path: 'physicalObject.storageLocationParents',
        value: parents,
      })
    })
  })

  return Promise.resolve(promises).then(() => {
    migrator.setValue({
      obj: locals,
      path: 'collectionItems',
      value: collectionItems,
    })
  })
}

module.exports = {
  key: 'decorateStorageLocality',
  transformation,
}
