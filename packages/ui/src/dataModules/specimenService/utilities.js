import {
  PHYSICAL_UNIT,
  STORAGE_LOCATION,
} from 'dataModules/storageService/constants'
import { SPECIMEN } from './constants'

export const buildSpecimenBody = ({
  places,
  featureTypes,
  preparationTypes,
  savedPhysicalObjects,
  specimen,
  storageLocations,
  taxa,
}) => {
  const cleanedPhysicalObjects = savedPhysicalObjects.map(
    ({ id, storageLocation }) => {
      if (storageLocation) {
        const cleanedStorageLocation = {
          id: storageLocation.id,
          type: STORAGE_LOCATION,
        }

        return {
          id,
          storageLocation: cleanedStorageLocation,
          type: PHYSICAL_UNIT,
        }
      }

      return {
        id,
        type: PHYSICAL_UNIT,
      }
    }
  )

  const specimenWithRelationships = {
    ...specimen,
    collectionItems: (specimen.collectionItems || []).map(
      (collectionItem, index) => {
        return {
          ...collectionItem,
          physicalObject: cleanedPhysicalObjects[index],
        }
      }
    ),
  }

  const body = {
    data: {
      attributes: specimenWithRelationships,
      relationships: {
        featureTypes: {
          data: featureTypes,
        },
        physicalObjects: {
          data: cleanedPhysicalObjects,
        },
        places: {
          data: places,
        },
        preparationTypes: {
          data: preparationTypes,
        },
        storageLocations: {
          data: storageLocations,
        },
        taxa: {
          data: taxa,
        },
      },
      type: SPECIMEN,
    },
  }

  return body
}

export const getCatalogNumberFromIdentifiers = (identifiers = []) => {
  const catalogNumberIdentifier = identifiers.find(({ identifierType }) => {
    return identifierType === 'catalogNumber'
  })

  return catalogNumberIdentifier && catalogNumberIdentifier.value
}
