import {
  PHYSICAL_UNIT,
  STORAGE_LOCATION,
} from 'dataModules/storageService/constants'
import { SPECIMEN } from './constants'

export const buildSpecimenBody = ({
  curatedLocalities,
  distinguishedUnitTypes,
  featureTypes,
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
    distinguishedUnits: (specimen.distinguishedUnits || []).map(
      (distinguishedUnit, index) => {
        return {
          ...distinguishedUnit,
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
        distinguishedUnitTypes: {
          data: distinguishedUnitTypes,
        },
        featureTypes: {
          data: featureTypes,
        },
        physicalUnits: {
          data: cleanedPhysicalUnits,
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
