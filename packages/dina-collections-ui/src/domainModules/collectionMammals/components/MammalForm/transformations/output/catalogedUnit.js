export default function transformCatalogedUnit(
  catalogedUnit = {},
  newCatalogNumber
) {
  if (!catalogedUnit.catalogNumber) {
    return {
      ...catalogedUnit,
      catalogNumber: newCatalogNumber,
    }
  }

  return catalogedUnit
}
