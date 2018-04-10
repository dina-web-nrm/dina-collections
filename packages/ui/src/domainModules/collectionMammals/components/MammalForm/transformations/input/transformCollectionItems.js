const INITIAL_VALUES = {
  collectionItems: [],
}

export default function transformCollectionItems({
  collectionItems,
  preparationTypes,
  physicalObjects,
  storageLocations,
}) {
  if (!collectionItems) {
    return INITIAL_VALUES.collectionItems
  }

  return collectionItems.map(collectionItem => {
    const { preparationType, physicalObject } = collectionItem
    const { storageLocation } = physicalObject || {}

    const mappedCollectionItem = {
      ...collectionItem,
    }

    if (preparationType && preparationTypes[preparationType.id]) {
      mappedCollectionItem.preparationType =
        preparationTypes[preparationType.id]
    }

    if (physicalObject && physicalObjects[physicalObject.id]) {
      const mappedPhysicalObject = physicalObjects[physicalObject.id]

      if (storageLocation && storageLocations[storageLocation.id]) {
        mappedPhysicalObject.storageLocation =
          storageLocations[storageLocation.id]
      }

      mappedCollectionItem.physicalObject = mappedPhysicalObject
    }

    return mappedCollectionItem
  })
}
