import setupMockStoreWithApiClient from 'utilities/test/setupMockStoreWithApiClient'

import getStorageLocations from './index'
import * as actionTypes from '../../actionTypes'

describe('domainModules/storageService/actionCreators/getStorageLocations', () => {
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
    actionTypes.STORAGE_SERVICE_GET_STORAGE_LOCATIONS_REQUEST
  }`, () => {
    const testAction = getStorageLocations()

    const expectedAction = {
      type: actionTypes.STORAGE_SERVICE_GET_STORAGE_LOCATIONS_REQUEST,
    }

    store.dispatch(testAction)

    expect(store.getActions()).toEqual([expectedAction])
  })

  it(`calls getStorageLocations`, () => {
    const operationId = 'getStorageLocations'

    const callSpy = jest.fn()

    apiClient.mock({
      spies: {
        [operationId]: callSpy,
      },
    })

    const testAction = getStorageLocations()

    expect.assertions(2)

    return store.dispatch(testAction).then(() => {
      expect(callSpy.mock.calls.length).toEqual(1)
      expect(callSpy.mock.calls[0][0]).toMatchObject({ operationId })
    })
  })

  it(`dispatches ${
    actionTypes.STORAGE_SERVICE_GET_STORAGE_LOCATIONS_SUCCESS
  } and returns transformed response`, () => {
    const operationId = 'getStorageLocations'
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

    const testAction = getStorageLocations()

    const expectedFirstAction = {
      type: actionTypes.STORAGE_SERVICE_GET_STORAGE_LOCATIONS_REQUEST,
    }
    const expectedSecondAction = {
      payload: transformedResponse,
      type: actionTypes.STORAGE_SERVICE_GET_STORAGE_LOCATIONS_SUCCESS,
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
    actionTypes.STORAGE_SERVICE_GET_STORAGE_LOCATIONS_FAIL
  } without throwing error`, () => {
    const operationId = 'getStorageLocations'
    const mockResponse = { status: 404 }

    apiClient.mock({
      errors: {
        [operationId]: mockResponse,
      },
    })

    const testAction = getStorageLocations()

    const expectedFirstAction = {
      type: actionTypes.STORAGE_SERVICE_GET_STORAGE_LOCATIONS_REQUEST,
    }
    const expectedSecondAction = {
      error: true,
      payload: mockResponse,
      type: actionTypes.STORAGE_SERVICE_GET_STORAGE_LOCATIONS_FAIL,
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
    actionTypes.STORAGE_SERVICE_GET_STORAGE_LOCATIONS_FAIL
  } and throws error`, () => {
    const operationId = 'getStorageLocations'
    const mockResponse = { status: 404 }

    apiClient.mock({
      errors: {
        [operationId]: mockResponse,
      },
    })

    const testAction = getStorageLocations({ throwError: true })

    const expectedFirstAction = {
      type: actionTypes.STORAGE_SERVICE_GET_STORAGE_LOCATIONS_REQUEST,
    }
    const expectedSecondAction = {
      error: true,
      payload: mockResponse,
      type: actionTypes.STORAGE_SERVICE_GET_STORAGE_LOCATIONS_FAIL,
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
