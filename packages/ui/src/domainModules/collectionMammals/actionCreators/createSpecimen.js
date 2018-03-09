import { createPhysicalUnit } from 'domainModules/storageService/actionCreators'
import { PHYSICAL_UNIT } from 'domainModules/storageService/constants'

import {
  COLLECTION_MAMMALS_REGISTER_NEW_MAMMAL_FAIL,
  COLLECTION_MAMMALS_REGISTER_NEW_MAMMAL_REQUEST,
  COLLECTION_MAMMALS_REGISTER_NEW_MAMMAL_SUCCESS,
} from '../actionTypes'
import { REGISTER_MAMMAL } from '../endpoints'
import { getCatalogNumberFromIdentifiers } from '../utilities'

export default function createSpecimen(
  { specimen, physicalUnits, throwError = true } = {}
) {
  const { individualGroup } = specimen

  const meta = {
    catalogNumber: getCatalogNumberFromIdentifiers(individualGroup.identifiers),
    individualGroup,
    physicalUnits,
  }

  return (dispatch, getState, { apiClient }) => {
    return Promise.all(
      physicalUnits.map(physicalUnit => {
        return dispatch(createPhysicalUnit({ physicalUnit, throwError: true }))
      })
    ).then(savedPhysicalUnits => {
      const individualGroupWithRelationships = {
        ...individualGroup,
        distinguishedUnits: individualGroup.distinguishedUnits.map(
          (distinguishedUnit, index) => {
            return {
              ...distinguishedUnit,
              physicalUnit: {
                id: savedPhysicalUnits[index].id,
                type: PHYSICAL_UNIT,
              },
            }
          }
        ),
      }

      const body = {
        data: {
          attributes: {
            individualGroup: individualGroupWithRelationships,
          },
          relationships: {
            physicalUnits: {
              data: savedPhysicalUnits.map(({ id }) => {
                return {
                  id,
                  type: PHYSICAL_UNIT,
                }
              }),
            },
          },
        },
      }

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
