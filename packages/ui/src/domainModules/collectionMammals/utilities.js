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
