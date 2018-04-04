import { createSelector } from 'reselect'
import getSecondArgument from 'utilities/getSecondArgument'

import { MODULE_NAME } from './constants'

export const getLocalState = state => {
  return state[MODULE_NAME]
}

export const getResources = state => {
  return state.resources
}

export const getCatalogNumbers = createSelector(getResources, resources => {
  return resources.catalogNumbers
})

export const getCatalogNumber = createSelector(
  [getCatalogNumbers, getSecondArgument],
  (catalogNumbers, id) => {
    return catalogNumbers[id]
  }
)
