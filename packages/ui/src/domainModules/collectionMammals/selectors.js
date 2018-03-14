import { createSelector } from 'reselect'
import getSecondArgument from 'utilities/getSecondArgument'

export const getLocalState = state => {
  return state.collectionMammals
}

export const getAccordions = state => {
  return state.accordions
}

export const getAccordion = createSelector(
  [getAccordions, getSecondArgument],
  (accordions, accordionName) => {
    return accordions[accordionName]
  }
)

export const getAccordionActiveIndex = createSelector(
  [getAccordion],
  accordion => {
    return accordion && accordion.activeIndex
  }
)

export const getFeatureObservationSearchQueries = state => {
  return state.featureObservationSearchQueries
}

export const getFeatureObservationSearchQuery = (state, inputName) => {
  const queries = getFeatureObservationSearchQueries(state)
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

export const getIndividualGroupBySpecimenId = (state, specimenId) => {
  const individualGroups = getIndividualGroups(state)
  return individualGroups[specimenId]
}

export const getIndividualGroupByCatalogNumber = (state, catalogNumber) => {
  const individualGroups = getIndividualGroups(state)
  return individualGroups[catalogNumber]
}
