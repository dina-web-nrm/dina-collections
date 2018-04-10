import { DISTINGUISHED_UNIT_TYPE } from 'dataModules/curatedListService/constants'
import {
  PHYSICAL_UNIT,
  STORAGE_LOCATION,
} from 'dataModules/storageService/constants'

export default function transformCollectionItems(collectionItems = []) {
  const preparationTypes = []
  const physicalUnits = []
  const storageLocations = []

  const mappedCollectionItems = collectionItems.map(collectionItem => {
    const { preparationType, physicalUnit } = collectionItem
    const { storageLocation } = physicalUnit || {}

    const mappedCollectionItem = { ...collectionItem }

    if (preparationType) {
      if (preparationType.id) {
        const mappedPreparationType = {
          id: preparationType.id,
          type: DISTINGUISHED_UNIT_TYPE,
        }
        preparationTypes.push(mappedPreparationType)
        mappedCollectionItem.preparationType = mappedPreparationType
      } else {
        delete mappedCollectionItem.preparationType
      }
    }

    if (physicalUnit) {
      let mappedStorageLocation

      if (storageLocation && storageLocation.id) {
        mappedStorageLocation = {
          id: storageLocation.id,
          type: STORAGE_LOCATION,
        }
        storageLocations.push(mappedStorageLocation)
        mappedCollectionItem.physicalUnit.storageLocation = mappedStorageLocation
      }

      const mappedPhysicalUnit = physicalUnit.id
        ? {
            id: physicalUnit.id,
            type: PHYSICAL_UNIT,
          }
        : {
            ...physicalUnit,
          }

      if (!mappedPhysicalUnit.storageLocation) {
        delete mappedPhysicalUnit.storageLocation
      }

      physicalUnits.push(mappedPhysicalUnit)
      mappedCollectionItem.physicalUnit = mappedPhysicalUnit
    }

    return mappedCollectionItem
  })

  return {
    collectionItems: mappedCollectionItems,
    physicalUnits,
    preparationTypes,
    storageLocations,
  }
}
