export { default as buildQuery } from './buildQuery'

export const getCatalogNumberFromIdentifiers = (identifiers = []) => {
  const catalogNumberIdentifier = identifiers.find(({ identifierType }) => {
    return identifierType === 'catalog-no'
  })
  return catalogNumberIdentifier && catalogNumberIdentifier.value
}

// TODO change to specimen instead of individual
export const createMammalFormInitialValues = individual => {
  if (!(individual && Object.keys(individual).length)) {
    return {
      determinations: [{}],
      identifiers: [
        {
          identifierType: {
            id: '1',
          },
          namespace: '',
          publishRecord: false,
          remarks: '',
          value: '',
        },
      ],
      recordHistoryEvents: [],
    }
  }
  // TODO set default params for existing individual
  return individual
}
