export function createFillCatalogNumber(newCatalogNumber) {
  return function fillCatalogNumber(identifier = {}) {
    if (
      identifier &&
      identifier.identifierType &&
      identifier.identifierType.id === '1' &&
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

export default function transformIdentifiers(
  identifiers = [],
  newCatalogNumber
) {
  const fillCatalogNumber = createFillCatalogNumber(newCatalogNumber)

  if (
    !identifiers.length ||
    !identifiers.find(identifier => {
      return identifier.identifierType.id === '1'
    })
  ) {
    return [
      {
        identifierType: '1',
        value: newCatalogNumber,
      },
    ]
  }

  return identifiers.map(fillCatalogNumber)
}
