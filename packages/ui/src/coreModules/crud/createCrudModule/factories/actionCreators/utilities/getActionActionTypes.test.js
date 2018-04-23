import getActionActionTypes, { dep } from './getActionActionTypes'
import {
  API_ACTION_TYPE_FAIL,
  API_ACTION_TYPE_REQUEST,
  API_ACTION_TYPE_SUCCESS,
} from '../../../../constants'

describe('coreModules/crud/createCrudModule/factories/actionCreators/utilities/getActionActionTypes', () => {
  it('is a function', () => {
    expect.assertions(1)
    expect(typeof getActionActionTypes).toBe('function')
  })
  describe('with dependor', () => {
    let getActionActionTypeMock
    beforeEach(() => {
      getActionActionTypeMock = jest.fn()
      dep.freeze()
      dep.mock({
        getActionActionType: input => {
          getActionActionTypeMock(input)
          return input
        },
      })
    })
    afterAll(() => {
      dep.reset()
    })
    it('call getActionActionTypeMock for request, fail, success', () => {
      expect.assertions(4)

      const input = {}
      getActionActionTypes(input)
      expect(getActionActionTypeMock.mock.calls.length).toEqual(3)
      expect(getActionActionTypeMock.mock.calls[0][0].actionType).toEqual(
        API_ACTION_TYPE_FAIL
      )
      expect(getActionActionTypeMock.mock.calls[1][0].actionType).toEqual(
        API_ACTION_TYPE_REQUEST
      )
      expect(getActionActionTypeMock.mock.calls[2][0].actionType).toEqual(
        API_ACTION_TYPE_SUCCESS
      )
    })
    it('call getActionActionTypeMock with operationType, resource, resourceActionTypes and actionType for request, fail, success', () => {
      expect.assertions(4)
      const input = {
        operationType: 'create',
        resource: 'physicalObject',
        resourceActionTypes: {
          create: {
            request: 'CREATE_PHYSICAL_OBJECT_REQUEST',
          },
        },
      }
      getActionActionTypes(input)
      expect(getActionActionTypeMock.mock.calls.length).toEqual(3)
      expect(getActionActionTypeMock.mock.calls[0][0]).toEqual({
        ...input,
        actionType: API_ACTION_TYPE_FAIL,
      })
      expect(getActionActionTypeMock.mock.calls[1][0]).toEqual({
        ...input,
        actionType: API_ACTION_TYPE_REQUEST,
      })
      expect(getActionActionTypeMock.mock.calls[2][0]).toEqual({
        ...input,
        actionType: API_ACTION_TYPE_SUCCESS,
      })
    })
  })
  describe('e2e', () => {
    it('return expected actionTypes', () => {
      expect.assertions(1)

      const input = {
        operationType: 'create',
        resource: 'physicalObject',
        resourceActionTypes: {
          create: {
            fail: 'CREATE_PHYSICAL_OBJECT_FAIL',
            request: 'CREATE_PHYSICAL_OBJECT_REQUEST',
            success: 'CREATE_PHYSICAL_OBJECT_SUCCESS',
          },
        },
      }
      expect(getActionActionTypes(input)).toEqual({
        fail: 'CREATE_PHYSICAL_OBJECT_FAIL',
        request: 'CREATE_PHYSICAL_OBJECT_REQUEST',
        success: 'CREATE_PHYSICAL_OBJECT_SUCCESS',
      })
    })
  })
})
