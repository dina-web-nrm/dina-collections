import { createPhysicalUnit } from 'domainModules/storageService/actionCreators'

import {
  COLLECTION_MAMMALS_REGISTER_NEW_MAMMAL_FAIL,
  COLLECTION_MAMMALS_REGISTER_NEW_MAMMAL_REQUEST,
  COLLECTION_MAMMALS_REGISTER_NEW_MAMMAL_SUCCESS,
} from '../actionTypes'
import { REGISTER_MAMMAL } from '../endpoints'
import { getCatalogNumberFromIdentifiers } from '../utilities'
import buildSpecimenBody from './utilities/buildSpecimenBody'

export default function createSpecimen(
  {
    curatedLocalities = [],
    featureObservationTypes = [],
    physicalUnits = [],
    specimen,
    throwError = true,
  } = {}
) {
  const { individualGroup } = specimen

  const meta = {
    catalogNumber: getCatalogNumberFromIdentifiers(individualGroup.identifiers),
    curatedLocalities,
    featureObservationTypes,
    individualGroup,
    physicalUnits,
  }

  return (dispatch, getState, { apiClient }) => {
    return Promise.all(
      physicalUnits.map(physicalUnit => {
        return dispatch(createPhysicalUnit({ physicalUnit, throwError: true }))
      })
    ).then(savedPhysicalUnits => {
      const body = buildSpecimenBody({
        curatedLocalities,
        featureObservationTypes,
        individualGroup,
        savedPhysicalUnits,
      })

      dispatch({
        meta,
        type: COLLECTION_MAMMALS_REGISTER_NEW_MAMMAL_REQUEST,
      })

      return apiClient
        .call(REGISTER_MAMMAL, {
          body,
        })
        .then(
          response => {
            dispatch({
              payload: response,
              type: COLLECTION_MAMMALS_REGISTER_NEW_MAMMAL_SUCCESS,
            })
            return response
          },
          error => {
            dispatch({
              error: true,
              meta,
              payload: error,
              type: COLLECTION_MAMMALS_REGISTER_NEW_MAMMAL_FAIL,
            })
            // for redux form
            if (throwError) {
              throw error
            }
          }
        )
    })
  }
}
