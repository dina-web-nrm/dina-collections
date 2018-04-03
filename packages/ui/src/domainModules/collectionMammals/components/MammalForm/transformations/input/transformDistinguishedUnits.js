const INITIAL_VALUES = {
  distinguishedUnits: [],
}

export default function transformDistinguishedUnits({
  distinguishedUnits,
  distinguishedUnitTypes,
  physicalUnits,
  storageLocations,
}) {
  if (!distinguishedUnits) {
    return INITIAL_VALUES.distinguishedUnits
  }

  return distinguishedUnits.map(distinguishedUnit => {
    const { distinguishedUnitType, physicalUnit } = distinguishedUnit
    const { storageLocation } = physicalUnit || {}

    const mappedDistinguishedUnit = {
      ...distinguishedUnit,
    }

    if (
      distinguishedUnitType &&
      distinguishedUnitTypes[distinguishedUnitType.id]
    ) {
      mappedDistinguishedUnit.distinguishedUnitType =
        distinguishedUnitTypes[distinguishedUnitType.id]
    }

    if (physicalUnit && physicalUnits[physicalUnit.id]) {
      const mappedPhysicalUnit = physicalUnits[physicalUnit.id]

      if (storageLocation && storageLocations[storageLocation.id]) {
        mappedPhysicalUnit.storageLocation =
          storageLocations[storageLocation.id]
      }

      mappedDistinguishedUnit.physicalUnit = mappedPhysicalUnit
    }

    return mappedDistinguishedUnit
  })
}
