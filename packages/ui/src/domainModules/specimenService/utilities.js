import { PHYSICAL_UNIT } from 'domainModules/storageService/constants'
import { SPECIMEN } from './constants'

export const buildSpecimenBody = ({
  curatedLocalities,
  featureObservationTypes,
  individualGroup,
  savedPhysicalUnits,
}) => {
  const cleanedPhysicalUnits = savedPhysicalUnits.map(({ id }) => {
    return {
      id,
      type: PHYSICAL_UNIT,
    }
  })

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
        featureObservationTypes: {
          data: featureObservationTypes,
        },
        physicalUnits: {
          data: cleanedPhysicalUnits,
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
