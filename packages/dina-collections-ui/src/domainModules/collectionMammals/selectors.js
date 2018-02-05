export const getLocalState = state => {
  return state.collectionMammals
}

export const getAccordionActiveIndex = (state, accordion) => {
  return state.accordion[accordion]
}

export const getFeatureTypeNameSearchQueries = state => {
  return state.featureTypeNameSearchQueries
}

export const getFeatureTypeNameSearchQuery = (state, inputName) => {
  const queries = getFeatureTypeNameSearchQueries(state)
  return queries[inputName]
}

export const getLocalityInformationSearchQueries = state => {
  return state.localityInformationSearchQueries
}

export const getLocalityInformationSearchQuery = (state, inputName) => {
  const queries = getLocalityInformationSearchQueries(state)
  return queries[inputName]
}

export const getLookupResult = state => {
  return state.lookup.result
}

export const getLookupSearch = state => {
  return state.lookup.search
}

export const getIndividualGroups = state => {
  return state.individualGroups
}

export const getIndividualGroupByCatalogNumber = (state, catalogNumber) => {
  const individualGroups = getIndividualGroups(state)
  return individualGroups[catalogNumber]
}
