import { createPhysicalObject } from 'dataModules/storageService/actionCreators'
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
    featureTypes = [],
    physicalObjects = [],
    places = [],
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
    featureTypes,
    individual,
    physicalObjects,
    places,
    preparationTypes,
    storageLocations,
    taxa,
  }

  return (dispatch, getState, { apiClient }) => {
    return Promise.all(
      physicalObjects.map(physicalObject => {
        return dispatch(
          createPhysicalObject({ physicalObject, throwError: true })
        )
      })
    ).then(savedPhysicalObjects => {
      const body = buildSpecimenBody({
        featureTypes,
        places,
        preparationTypes,
        savedPhysicalObjects,
        specimen,
        storageLocations,
        taxa,
      })
      console.log('body', body)
      dispatch({
        meta,
        type: SPECIMEN_SERVICE_CREATE_SPECIMEN_REQUEST,
      })

      return apiClient.call(CREATE_SPECIMEN, { body }).then(
        response => {
          dispatch({
            payload: response.data,
            type: SPECIMEN_SERVICE_CREATE_SPECIMEN_SUCCESS,
          })
          return response.data
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
