export function createFillCatalogNumber(newCatalogNumber) {
  return function fillCatalogNumber(identifier = {}) {
    let updatedIdentifier = {
      ...identifier,
    }
    if (
      updatedIdentifier.identifierType &&
      updatedIdentifier.identifierType.id
    ) {
      updatedIdentifier = {
        ...updatedIdentifier,
        identifierType: {
          ...updatedIdentifier.identifierType,
          type: 'identifierType',
        },
      }
    }

    if (
      updatedIdentifier &&
      updatedIdentifier.identifierType.id === '1' &&
      !updatedIdentifier.value
    ) {
      return {
        ...updatedIdentifier,
        value: newCatalogNumber,
      }
    }

    return updatedIdentifier
  }
}

export default function transformIdentifiers(
  identifiers = [],
  newCatalogNumber
) {
  const fillCatalogNumber = createFillCatalogNumber(newCatalogNumber)

  return identifiers.map(fillCatalogNumber)
}
