import {
  createPhysicalUnit,
  updatePhysicalUnit,
} from 'domainModules/storageService/actionCreators'

import { flattenObjectResponse } from 'utilities/transformations'

import { getSpecimen } from '../../actionCreators'
import {
  SPECIMEN_SERVICE_UPDATE_SPECIMEN_FAIL,
  SPECIMEN_SERVICE_UPDATE_SPECIMEN_REQUEST,
  SPECIMEN_SERVICE_UPDATE_SPECIMEN_SUCCESS,
} from '../../actionTypes'
import { UPDATE_SPECIMEN } from '../../endpoints'
import {
  buildSpecimenBody,
  getCatalogNumberFromIdentifiers,
} from '../../utilities'

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
        type: SPECIMEN_SERVICE_UPDATE_SPECIMEN_REQUEST,
      })

      return apiClient
        .call(UPDATE_SPECIMEN, {
          body,
          pathParams: { id },
        })
        .then(
          response => {
            const transformedResponse = flattenObjectResponse(response.data)
            dispatch({
              payload: transformedResponse,
              type: SPECIMEN_SERVICE_UPDATE_SPECIMEN_SUCCESS,
            })
            dispatch(getSpecimen({ id }))
            return transformedResponse
          },
          error => {
            dispatch({
              error: true,
              meta,
              payload: error,
              type: SPECIMEN_SERVICE_UPDATE_SPECIMEN_FAIL,
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
