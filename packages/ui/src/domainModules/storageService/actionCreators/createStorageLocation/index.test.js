import setupMockStoreWithApiClient from 'utilities/test/setupMockStoreWithApiClient'

import createStorageLocation from './index'
import * as actionTypes from '../../actionTypes'
import { STORAGE_LOCATION } from '../../constants'

describe('domainModules/storageService/actionCreators/createStorageLocation', () => {
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
    actionTypes.STORAGE_SERVICE_CREATE_STORAGE_LOCATION_REQUEST
  }`, () => {
    const storageLocation = {}
    const testAction = createStorageLocation({ storageLocation })

    const expectedAction = {
      meta: { storageLocation },
      type: actionTypes.STORAGE_SERVICE_CREATE_STORAGE_LOCATION_REQUEST,
    }

    store.dispatch(testAction)

    expect(store.getActions()).toEqual([expectedAction])
  })

  it(`calls createStorageLocation with correct body`, () => {
    const operationId = 'createStorageLocation'
    const storageLocation = {
      locationText: 'string',
    }
    const callSpy = jest.fn()

    apiClient.mock({
      responses: {
        [operationId]: { data: {} },
      },
      spies: {
        [operationId]: callSpy,
      },
    })

    const testAction = createStorageLocation({ storageLocation })
    const expectedCallParams = {
      body: {
        data: {
          attributes: { ...storageLocation },
          type: STORAGE_LOCATION,
        },
      },
    }

    expect.assertions(3)

    return store.dispatch(testAction).then(() => {
      expect(callSpy.mock.calls.length).toEqual(1)
      expect(callSpy.mock.calls[0][0]).toMatchObject({ operationId })
      expect(callSpy.mock.calls[0][1]).toEqual(expectedCallParams)
    })
  })

  it(`dispatches ${
    actionTypes.STORAGE_SERVICE_CREATE_STORAGE_LOCATION_SUCCESS
  } and returns transformed response`, () => {
    const operationId = 'createStorageLocation'
    const storageLocation = {
      locationText: 'string',
    }

    const mockResponse = {
      data: {
        attributes: {
          name: 'Alan',
        },
        id: '123',
        relationships: {},
        type: 'type',
      },
    }
    const transformedResponse = {
      id: '123',
      name: 'Alan',
      type: 'type',
    }

    apiClient.mock({
      responses: {
        [operationId]: mockResponse,
      },
    })

    const testAction = createStorageLocation({ storageLocation })

    const expectedFirstAction = {
      meta: { storageLocation },
      type: actionTypes.STORAGE_SERVICE_CREATE_STORAGE_LOCATION_REQUEST,
    }
    const expectedSecondAction = {
      payload: transformedResponse,
      type: actionTypes.STORAGE_SERVICE_CREATE_STORAGE_LOCATION_SUCCESS,
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
    actionTypes.STORAGE_SERVICE_CREATE_STORAGE_LOCATION_FAIL
  } without throwing error`, () => {
    const operationId = 'createStorageLocation'
    const storageLocation = {
      locationText: 'string',
    }
    const mockError = { status: 500 }

    apiClient.mock({
      errors: {
        [operationId]: mockError,
      },
    })

    const testAction = createStorageLocation({ storageLocation })

    const expectedFirstAction = {
      meta: { storageLocation },
      type: actionTypes.STORAGE_SERVICE_CREATE_STORAGE_LOCATION_REQUEST,
    }
    const expectedSecondAction = {
      error: true,
      meta: { storageLocation },
      payload: mockError,
      type: actionTypes.STORAGE_SERVICE_CREATE_STORAGE_LOCATION_FAIL,
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
    actionTypes.STORAGE_SERVICE_CREATE_STORAGE_LOCATION_FAIL
  } and throws error`, () => {
    const operationId = 'createStorageLocation'
    const storageLocation = {
      locationText: 'string',
    }
    const mockError = { status: 500 }

    apiClient.mock({
      errors: {
        [operationId]: mockError,
      },
    })

    const testAction = createStorageLocation({
      storageLocation,
      throwError: true,
    })

    const expectedFirstAction = {
      meta: { storageLocation },
      type: actionTypes.STORAGE_SERVICE_CREATE_STORAGE_LOCATION_REQUEST,
    }
    const expectedSecondAction = {
      error: true,
      meta: { storageLocation },
      payload: mockError,
      type: actionTypes.STORAGE_SERVICE_CREATE_STORAGE_LOCATION_FAIL,
    }

    expect.assertions(2)

    return store.dispatch(testAction).catch(err => {
      expect(store.getActions()).toEqual([
        expectedFirstAction,
        expectedSecondAction,
      ])
      expect(err).toEqual(mockError)
    })
  })
})
