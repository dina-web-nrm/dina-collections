module.exports = function transformCollectionItems(collectionItems = []) {
  const preparationTypes = []
  const physicalObjects = []
  const storageLocations = []

  const mappedCollectionItems = collectionItems.map(collectionItem => {
    const { preparationType, physicalObject } = collectionItem
    const { storageLocation } = physicalObject || {}

    const mappedCollectionItem = { ...collectionItem }

    if (preparationType) {
      if (preparationType.id) {
        const mappedPreparationType = {
          id: preparationType.id,
          type: 'preparationType',
        }
        preparationTypes.push(mappedPreparationType)
        mappedCollectionItem.preparationType = mappedPreparationType
      } else {
        delete mappedCollectionItem.preparationType
      }
    }

    if (physicalObject) {
      let mappedStorageLocation

      if (storageLocation && storageLocation.id) {
        mappedStorageLocation = {
          id: storageLocation.id,
          type: 'storageLocation',
        }
        storageLocations.push(mappedStorageLocation)
        mappedCollectionItem.physicalObject.storageLocation = mappedStorageLocation
      }

      const mappedPhysicalObject = physicalObject.id
        ? {
            id: physicalObject.id,
            type: 'physicalUnit',
          }
        : {
            ...physicalObject,
          }

      if (!mappedPhysicalObject.storageLocation) {
        delete mappedPhysicalObject.storageLocation
      }

      physicalObjects.push(mappedPhysicalObject)
      mappedCollectionItem.physicalObject = mappedPhysicalObject
    }

    return mappedCollectionItem
  })

  return {
    collectionItems: mappedCollectionItems,
    physicalObjects,
    preparationTypes,
    storageLocations,
  }
}
