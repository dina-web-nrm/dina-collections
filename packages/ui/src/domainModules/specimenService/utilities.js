import {
  PHYSICAL_UNIT,
  STORAGE_LOCATION,
} from 'domainModules/storageService/constants'
import { SPECIMEN } from './constants'

export const buildSpecimenBody = ({
  curatedLocalities,
  distinguishedUnitTypes,
  featureObservationTypes,
  individualGroup,
  savedPhysicalUnits,
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

  const individualGroupWithRelationships = {
    ...individualGroup,
    distinguishedUnits: individualGroup.distinguishedUnits.map(
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
      attributes: {
        individualGroup: individualGroupWithRelationships,
      },
      relationships: {
        curatedLocalities: {
          data: curatedLocalities,
        },
        distinguishedUnitTypes: {
          data: distinguishedUnitTypes,
        },
        featureObservationTypes: {
          data: featureObservationTypes,
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
