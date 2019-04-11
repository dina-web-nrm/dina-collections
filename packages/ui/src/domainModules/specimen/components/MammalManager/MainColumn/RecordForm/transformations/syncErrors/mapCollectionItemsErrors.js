import objectPath from 'object-path'

export const mapCollectionItemError = collectionItem => {
  const physicalObjectErrorPath = objectPath.get(
    collectionItem,
    'physicalObject.fullPath'
  )

  const storageLocationErrorPath = objectPath.get(
    collectionItem,
    'physicalObject.storageLocation.fullPath'
  )

  if (physicalObjectErrorPath || storageLocationErrorPath) {
    return {
      physicalObject: {
        storageLocation: {
          id: {
            errorCode: 'REQUIRED',
            fullPath: physicalObjectErrorPath
              ? `${physicalObjectErrorPath}.storageLocation.id`
              : `${storageLocationErrorPath}.id`,
          },
        },
      },
    }
  }

  return collectionItem
}

const mapCollectionItemsErrors = syncErrors => {
  const collectionItems = objectPath.get(
    syncErrors,
    'individual.collectionItems'
  )

  if (collectionItems) {
    objectPath.set(
      syncErrors,
      'individual.collectionItems',
      collectionItems.map(mapCollectionItemError)
    )
  }

  return syncErrors
}

export default mapCollectionItemsErrors
