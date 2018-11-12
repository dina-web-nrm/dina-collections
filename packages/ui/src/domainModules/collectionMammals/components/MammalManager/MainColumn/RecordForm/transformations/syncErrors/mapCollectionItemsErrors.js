import objectPath from 'object-path'

export const mapCollectionItemError = collectionItem => {
  const physicalObjectErrorPath = objectPath.get(
    collectionItem,
    'physicalObject.fullPath'
  )

  if (physicalObjectErrorPath) {
    return {
      physicalObject: {
        storageLocation: {
          id: {
            errorCode: 'REQUIRED',
            fullPath: `${physicalObjectErrorPath}.storageLocation.id`,
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
