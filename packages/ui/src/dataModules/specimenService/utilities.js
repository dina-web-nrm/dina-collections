import {
  PHYSICAL_UNIT,
  STORAGE_LOCATION,
} from 'dataModules/storageService/constants'
import { SPECIMEN } from './constants'

export const buildSpecimenBody = ({
  curatedLocalities,
  featureTypes,
  preparationTypes,
  savedPhysicalUnits,
  specimen,
  storageLocations,
  taxa,
}) => {
  const cleanedPhysicalUnits = savedPhysicalUnits.map(
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
          physicalUnit: cleanedPhysicalUnits[index],
        }
      }
    ),
  }

  const body = {
    data: {
      attributes: specimenWithRelationships,
      relationships: {
        curatedLocalities: {
          data: curatedLocalities,
        },
        featureTypes: {
          data: featureTypes,
        },
        physicalUnits: {
          data: cleanedPhysicalUnits,
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
  const catalogNumberIdentifier = identifiers.find(({ identifier }) => {
    return identifier && identifier.identifierType === 'catalogNumber'
  })

  return (
    catalogNumberIdentifier &&
    catalogNumberIdentifier.identifier &&
    catalogNumberIdentifier.identifier.value
  )
}
