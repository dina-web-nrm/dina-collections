export function createFillCatalogNumber(newCatalogNumber) {
  return function fillCatalogNumber(identifier) {
    if (
      identifier.identifier &&
      identifier.identifier.identifierType === 'catalogNumber' &&
      !identifier.identifier.value
    ) {
      return {
        ...identifier,
        identifier: {
          ...identifier.identifier,
          value: newCatalogNumber,
        },
      }
    }

    return identifier
  }
}

export default function transformIdentifiers(
  identifiers = [],
  newCatalogNumber
) {
  const fillCatalogNumber = createFillCatalogNumber(newCatalogNumber)

  return identifiers.map(fillCatalogNumber)
}
