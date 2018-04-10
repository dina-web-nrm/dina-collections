import { createSelector } from 'reselect'
import getSecondArgument from 'utilities/getSecondArgument'

import { MODULE_NAME } from './constants'

export const getLocalState = state => {
  return state[MODULE_NAME]
}

export const getResources = state => {
  return state.resources
}

export const getPlaces = createSelector(getResources, resources => {
  return resources.places
})

export const getPlacesArray = createSelector(getPlaces, placesObject => {
  return Object.keys(placesObject).map(key => {
    return placesObject[key]
  })
})

export const getPlace = createSelector(
  [getPlaces, getSecondArgument],
  (places, id) => {
    return places[id]
  }
)

export const getHasPlaces = createSelector(getPlaces, places => {
  return Object.keys(places).length > 0
})
