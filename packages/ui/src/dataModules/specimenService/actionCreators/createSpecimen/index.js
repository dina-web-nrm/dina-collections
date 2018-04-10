import { createPhysicalUnit } from 'dataModules/storageService/actionCreators'

import { flattenObjectResponse } from 'utilities/transformations'

import {
  SPECIMEN_SERVICE_CREATE_SPECIMEN_FAIL,
  SPECIMEN_SERVICE_CREATE_SPECIMEN_REQUEST,
  SPECIMEN_SERVICE_CREATE_SPECIMEN_SUCCESS,
} from '../../actionTypes'
import { CREATE_SPECIMEN } from '../../endpoints'
import {
  buildSpecimenBody,
  getCatalogNumberFromIdentifiers,
} from '../../utilities'

export default function createSpecimen(
  {
    curatedLocalities = [],
    featureTypes = [],
    physicalUnits = [],
    preparationTypes = [],
    specimen,
    storageLocations = [],
    taxa = [],
    throwError = true,
  } = {}
) {
  const { individual } = specimen

  const meta = {
    catalogNumber: getCatalogNumberFromIdentifiers(individual.identifiers),
    curatedLocalities,
    featureTypes,
    individual,
    physicalUnits,
    preparationTypes,
    storageLocations,
    taxa,
  }

  return (dispatch, getState, { apiClient }) => {
    return Promise.all(
      physicalUnits.map(physicalUnit => {
        return dispatch(createPhysicalUnit({ physicalUnit, throwError: true }))
      })
    ).then(savedPhysicalUnits => {
      const body = buildSpecimenBody({
        curatedLocalities,
        featureTypes,
        preparationTypes,
        savedPhysicalUnits,
        specimen,
        storageLocations,
        taxa,
      })

      dispatch({
        meta,
        type: SPECIMEN_SERVICE_CREATE_SPECIMEN_REQUEST,
      })

      return apiClient.call(CREATE_SPECIMEN, { body }).then(
        response => {
          const transformedResponse = flattenObjectResponse(response.data)
          dispatch({
            payload: transformedResponse,
            type: SPECIMEN_SERVICE_CREATE_SPECIMEN_SUCCESS,
          })
          return transformedResponse
        },
        error => {
          dispatch({
            error: true,
            meta: { specimen },
            payload: error,
            type: SPECIMEN_SERVICE_CREATE_SPECIMEN_FAIL,
          })

          if (throwError) {
            throw error
          }
        }
      )
    })
  }
}
