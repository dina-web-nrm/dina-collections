import * as actionTypes from './actionTypes'

const expectedActionTypeValues = [
  'PLACE_SERVICE_CREATE_PLACE_FAIL',
  'PLACE_SERVICE_CREATE_PLACE_REQUEST',
  'PLACE_SERVICE_CREATE_PLACE_SUCCESS',
  'PLACE_SERVICE_GET_PLACE_FAIL',
  'PLACE_SERVICE_GET_PLACE_REQUEST',
  'PLACE_SERVICE_GET_PLACE_SUCCESS',
  'PLACE_SERVICE_GET_PLACES_FAIL',
  'PLACE_SERVICE_GET_PLACES_REQUEST',
  'PLACE_SERVICE_GET_PLACES_SUCCESS',
  'PLACE_SERVICE_UPDATE_PLACE_FAIL',
  'PLACE_SERVICE_UPDATE_PLACE_REQUEST',
  'PLACE_SERVICE_UPDATE_PLACE_SUCCESS',
]

describe('dataModules/placeService/actionTypes', () => {
  it('exports expected types', () => {
    expect(Object.values(actionTypes).sort()).toEqual(
      expectedActionTypeValues.sort()
    )
  })
})
