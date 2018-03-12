import {
  createPhysicalUnit,
  updatePhysicalUnit,
} from 'domainModules/storageService/actionCreators'

import { getSpecimen } from '../actionCreators'
import {
  COLLECTION_MAMMALS_UPDATE_SPECIMEN_FAIL,
  COLLECTION_MAMMALS_UPDATE_SPECIMEN_REQUEST,
  COLLECTION_MAMMALS_UPDATE_SPECIMEN_SUCCESS,
} from '../actionTypes'
import { UPDATE_SPECIMEN } from '../endpoints'
import { getCatalogNumberFromIdentifiers } from '../utilities'
import buildSpecimenBody from './utilities/buildSpecimenBody'

export default function updateSpecimen(
  {
    curatedLocalities = [],
    featureObservationTypes = [],
    id,
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
        if (physicalUnit.id) {
          return dispatch(
            updatePhysicalUnit({ physicalUnit, throwError: true })
          )
        }

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
        type: COLLECTION_MAMMALS_UPDATE_SPECIMEN_REQUEST,
      })

      return apiClient
        .call(UPDATE_SPECIMEN, {
          body,
          pathParams: { id },
        })
        .then(
          response => {
            dispatch({
              payload: response,
              type: COLLECTION_MAMMALS_UPDATE_SPECIMEN_SUCCESS,
            })
            dispatch(getSpecimen({ id }))
            return response
          },
          error => {
            dispatch({
              error: true,
              meta,
              payload: error,
              type: COLLECTION_MAMMALS_UPDATE_SPECIMEN_FAIL,
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
