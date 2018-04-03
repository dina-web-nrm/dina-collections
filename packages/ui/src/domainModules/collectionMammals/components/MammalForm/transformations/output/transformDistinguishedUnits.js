import { DISTINGUISHED_UNIT_TYPE } from 'domainModules/curatedListService/constants'
import {
  PHYSICAL_UNIT,
  STORAGE_LOCATION,
} from 'domainModules/storageService/constants'

export default function transformDistinguishedUnits(distinguishedUnits = []) {
  const distinguishedUnitTypes = []
  const physicalUnits = []
  const storageLocations = []

  const mappedDistinguishedUnits = distinguishedUnits.map(distinguishedUnit => {
    const { distinguishedUnitType, physicalUnit } = distinguishedUnit
    const { storageLocation } = physicalUnit || {}

    const mappedDistinguishedUnit = { ...distinguishedUnit }

    if (distinguishedUnitType) {
      if (distinguishedUnitType.id) {
        const mappedDistinguishedUnitType = {
          id: distinguishedUnitType.id,
          type: DISTINGUISHED_UNIT_TYPE,
        }
        distinguishedUnitTypes.push(mappedDistinguishedUnitType)
        mappedDistinguishedUnit.distinguishedUnitType = mappedDistinguishedUnitType
      } else {
        delete mappedDistinguishedUnit.distinguishedUnitType
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
        mappedDistinguishedUnit.physicalUnit.storageLocation = mappedStorageLocation
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
      mappedDistinguishedUnit.physicalUnit = mappedPhysicalUnit
    }

    return mappedDistinguishedUnit
  })

  return {
    distinguishedUnits: mappedDistinguishedUnits,
    distinguishedUnitTypes,
    physicalUnits,
    storageLocations,
  }
}
