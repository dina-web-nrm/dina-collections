export default function transformPhysicalUnits(
  physicalUnits = [],
  newCatalogNumber
) {
  return physicalUnits.map(physicalUnit => {
    const { catalogedUnit } = physicalUnit

    if (catalogedUnit && !catalogedUnit.catalogNumber) {
      return {
        ...physicalUnit,
        catalogedUnit: {
          ...catalogedUnit,
          catalogNumber: newCatalogNumber,
        },
      }
    }

    return physicalUnit
  })
}
