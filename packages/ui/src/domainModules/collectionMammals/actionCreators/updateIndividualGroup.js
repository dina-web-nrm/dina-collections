import {
  COLLECTION_MAMMALS_UPDATE_INDIVIDUAL_GROUP_FAIL,
  COLLECTION_MAMMALS_UPDATE_INDIVIDUAL_GROUP_REQUEST,
  COLLECTION_MAMMALS_UPDATE_INDIVIDUAL_GROUP_SUCCESS,
} from '../actionTypes'
import { UPDATE_INDIVIDUAL_GROUP } from '../endpoints'
import getIndividualGroupByCatalogNumber from './getIndividualGroupByCatalogNumber'

export default function updateIndividualGroup(
  { catalogedUnit, individualGroup },
  throwError = true
) {
  const meta = {
    catalogNumber: catalogedUnit.catalogNumber,
    individualGroup: {
      ...individualGroup,
    },
  }

  return (dispatch, getState, { apiClient }) => {
    dispatch({
      meta,
      type: COLLECTION_MAMMALS_UPDATE_INDIVIDUAL_GROUP_REQUEST,
    })
    const body = {
      data: {
        attributes: {
          ...individualGroup,
        },
      },
    }

    delete body.data.attributes.id

    return apiClient
      .call(UPDATE_INDIVIDUAL_GROUP, {
        body,
        pathParams: { id: individualGroup.id },
      })
      .then(
        response => {
          dispatch({
            meta,
            payload: response,
            type: COLLECTION_MAMMALS_UPDATE_INDIVIDUAL_GROUP_SUCCESS,
          })
          dispatch(
            getIndividualGroupByCatalogNumber(meta.catalogNumber, {
              include: [
                'identifications',
                'featureObservations.featureObservationType',
                'occurrences.localityInformation',
                'physicalUnits.catalogedUnit',
              ].join(),
            })
          )
          return response
        },
        error => {
          dispatch({
            error: true,
            meta,
            payload: error,
            type: COLLECTION_MAMMALS_UPDATE_INDIVIDUAL_GROUP_FAIL,
          })
          // for redux form
          if (throwError) {
            throw error
          }
        }
      )
  }
}
