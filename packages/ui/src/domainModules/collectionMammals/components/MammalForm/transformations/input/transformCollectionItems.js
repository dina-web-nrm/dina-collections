const INITIAL_VALUES = {
  collectionItems: [],
}

export default function transformCollectionItems({
  collectionItems,
  preparationTypes,
  physicalUnits,
  storageLocations,
}) {
  if (!collectionItems) {
    return INITIAL_VALUES.collectionItems
  }

  return collectionItems.map(collectionItem => {
    const { preparationType, physicalUnit } = collectionItem
    const { storageLocation } = physicalUnit || {}

    const mappedCollectionItem = {
      ...collectionItem,
    }

    if (preparationType && preparationTypes[preparationType.id]) {
      mappedCollectionItem.preparationType =
        preparationTypes[preparationType.id]
    }

    if (physicalUnit && physicalUnits[physicalUnit.id]) {
      const mappedPhysicalUnit = physicalUnits[physicalUnit.id]

      if (storageLocation && storageLocations[storageLocation.id]) {
        mappedPhysicalUnit.storageLocation =
          storageLocations[storageLocation.id]
      }

      mappedCollectionItem.physicalUnit = mappedPhysicalUnit
    }

    return mappedCollectionItem
  })
}
