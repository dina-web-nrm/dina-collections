function createFillCatalogNumber(newCatalogNumber) {
  return function fillCatalogNumber(identifier) {
    if (
      identifier &&
      identifier.identifierType === 'catalogNumber' &&
      !identifier.value
    ) {
      return {
        ...identifier,
        value: newCatalogNumber,
      }
    }

    return identifier
  }
}

module.exports = function transformIdentifiers(
  identifiers = [],
  newCatalogNumber
) {
  const fillCatalogNumber = createFillCatalogNumber(newCatalogNumber)

  return identifiers.map(fillCatalogNumber)
}
