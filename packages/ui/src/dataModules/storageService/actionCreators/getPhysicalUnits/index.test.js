import setupMockStoreWithApiClient from 'utilities/test/setupMockStoreWithApiClient'

import getPhysicalUnits from './index'
import * as actionTypes from '../../actionTypes'

describe('dataModules/storageService/actionCreators/getPhysicalUnits', () => {
  let store
  let apiClient

  beforeEach(() => {
    const mock = setupMockStoreWithApiClient()
    /* eslint-disable prefer-destructuring */
    store = mock.store
    apiClient = mock.apiClientDependencies
    /* eslint-enable prefer-destructuring */
  })
  afterAll(() => {
    apiClient.reset()
  })

  it(`dispatches ${
    actionTypes.STORAGE_SERVICE_GET_PHYSICAL_UNITS_REQUEST
  }`, () => {
    const testAction = getPhysicalUnits()

    const expectedAction = {
      type: actionTypes.STORAGE_SERVICE_GET_PHYSICAL_UNITS_REQUEST,
    }

    store.dispatch(testAction)

    expect(store.getActions()).toEqual([expectedAction])
  })

  it(`calls getPhysicalUnits`, () => {
    const operationId = 'getPhysicalUnits'

    const callSpy = jest.fn()

    apiClient.mock({
      responses: {
        [operationId]: { data: [] },
      },
      spies: {
        [operationId]: callSpy,
      },
    })

    const testAction = getPhysicalUnits()

    expect.assertions(2)

    return store.dispatch(testAction).then(() => {
      expect(callSpy.mock.calls.length).toEqual(1)
      expect(callSpy.mock.calls[0][0]).toMatchObject({ operationId })
    })
  })

  it(`dispatches ${
    actionTypes.STORAGE_SERVICE_GET_PHYSICAL_UNITS_SUCCESS
  } and returns transformed response`, () => {
    const operationId = 'getPhysicalUnits'
    const mockResponse = {
      data: [
        {
          attributes: {
            name: 'Ada',
          },
          id: '123',
          type: 'type',
        },
        {
          attributes: {
            name: 'Alan',
          },
          id: '456',
          type: 'type',
        },
      ],
    }
    const transformedResponse = [
      {
        id: '123',
        name: 'Ada',
        type: 'type',
      },
      {
        id: '456',
        name: 'Alan',
        type: 'type',
      },
    ]

    apiClient.mock({
      responses: {
        [operationId]: mockResponse,
      },
    })

    const testAction = getPhysicalUnits()

    const expectedFirstAction = {
      type: actionTypes.STORAGE_SERVICE_GET_PHYSICAL_UNITS_REQUEST,
    }
    const expectedSecondAction = {
      payload: transformedResponse,
      type: actionTypes.STORAGE_SERVICE_GET_PHYSICAL_UNITS_SUCCESS,
    }

    expect.assertions(2)

    return store.dispatch(testAction).then(res => {
      expect(store.getActions()).toEqual([
        expectedFirstAction,
        expectedSecondAction,
      ])
      expect(res).toEqual(transformedResponse)
    })
  })

  it(`dispatches ${
    actionTypes.STORAGE_SERVICE_GET_PHYSICAL_UNITS_FAIL
  } without throwing error`, () => {
    const operationId = 'getPhysicalUnits'
    const mockResponse = { status: 404 }

    apiClient.mock({
      errors: {
        [operationId]: mockResponse,
      },
    })

    const testAction = getPhysicalUnits()

    const expectedFirstAction = {
      type: actionTypes.STORAGE_SERVICE_GET_PHYSICAL_UNITS_REQUEST,
    }
    const expectedSecondAction = {
      error: true,
      payload: mockResponse,
      type: actionTypes.STORAGE_SERVICE_GET_PHYSICAL_UNITS_FAIL,
    }

    expect.assertions(2)

    return store.dispatch(testAction).then(res => {
      expect(store.getActions()).toEqual([
        expectedFirstAction,
        expectedSecondAction,
      ])
      expect(res).toEqual(undefined)
    })
  })

  it(`dispatches ${
    actionTypes.STORAGE_SERVICE_GET_PHYSICAL_UNITS_FAIL
  } and throws error`, () => {
    const operationId = 'getPhysicalUnits'
    const mockResponse = { status: 404 }

    apiClient.mock({
      errors: {
        [operationId]: mockResponse,
      },
    })

    const testAction = getPhysicalUnits({ throwError: true })

    const expectedFirstAction = {
      type: actionTypes.STORAGE_SERVICE_GET_PHYSICAL_UNITS_REQUEST,
    }
    const expectedSecondAction = {
      error: true,
      payload: mockResponse,
      type: actionTypes.STORAGE_SERVICE_GET_PHYSICAL_UNITS_FAIL,
    }

    expect.assertions(2)

    return store.dispatch(testAction).catch(err => {
      expect(store.getActions()).toEqual([
        expectedFirstAction,
        expectedSecondAction,
      ])
      expect(err).toEqual(mockResponse)
    })
  })
})
