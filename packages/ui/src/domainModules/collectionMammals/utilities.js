export const getCatalogNumberFromIdentifiers = (identifiers = []) => {
  const catalogNumberIdentifier = identifiers.find(({ identifierType }) => {
    return identifierType === 'catalogNumber'
  })
  return catalogNumberIdentifier && catalogNumberIdentifier.value
}
