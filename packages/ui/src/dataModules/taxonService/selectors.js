import { createSelector } from 'reselect'

import { MODULE_NAME } from './constants'

export const getLocalState = state => {
  return state[MODULE_NAME]
}

export const getResources = state => {
  return state.resources
}

export const getTaxa = createSelector(getResources, resources => {
  return resources.taxa
})

export const getTaxon = (state, id) => {
  return getTaxa(state)[id]
}
