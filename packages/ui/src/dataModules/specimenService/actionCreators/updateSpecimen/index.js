import {
  createPhysicalObject,
  updatePhysicalObject,
} from 'dataModules/storageService/actionCreators'

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
    featureTypes = [],
    id,
    physicalObjects = [],
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
    physicalObjects,
    preparationTypes,
    storageLocations,
    taxa,
  }

  return (dispatch, getState, { apiClient }) => {
    return Promise.all(
      physicalObjects.map(physicalObject => {
        if (physicalObject.id) {
          return dispatch(
            updatePhysicalObject({ physicalObject, throwError: true })
          )
        }

        return dispatch(
          createPhysicalObject({ physicalObject, throwError: true })
        )
      })
    ).then(savedPhysicalObjects => {
      const body = buildSpecimenBody({
        curatedLocalities,
        featureTypes,
        preparationTypes,
        savedPhysicalObjects,
        specimen,
        storageLocations,
        taxa,
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
