import { createSelector } from 'reselect'

import { capitalizeFirstLetter } from 'common/es5/stringFormatters'

import getSecondArgument from 'utilities/getSecondArgument'

import { MODULE_NAME } from './constants'

export const getLocalState = state => {
  return state[MODULE_NAME]
}

export const getResources = state => {
  return state.resources
}

export const getCuratedLocalities = createSelector(getResources, resources => {
  return resources.curatedLocalities
})

export const getCuratedLocality = createSelector(
  [getCuratedLocalities, getSecondArgument],
  (curatedLocalities, id) => {
    return curatedLocalities[id]
  }
)

export const getHasCuratedLocalities = createSelector(
  getCuratedLocalities,
  curatedLocalities => {
    return Object.keys(curatedLocalities).length > 0
  }
)

export const getDropdownOptions = createSelector(
  [getCuratedLocalities, getSecondArgument],
  (curatedLocalities, groupFilter) => {
    return Object.values(curatedLocalities)
      .filter(({ group }) => group === groupFilter)
      .map(({ id, name }) => {
        return {
          key: id,
          text: capitalizeFirstLetter(name),
          value: id,
        }
      })
  }
)
