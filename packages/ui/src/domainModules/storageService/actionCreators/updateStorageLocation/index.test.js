import setupMockStoreWithApiClient from 'utilities/test/setupMockStoreWithApiClient'

import updateStorageLocation from './index'
import * as actionTypes from '../../actionTypes'
import { STORAGE_LOCATION } from '../../constants'

describe('domainModules/storageService/actionCreators/updateStorageLocation', () => {
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
    actionTypes.STORAGE_SERVICE_UPDATE_STORAGE_LOCATION_REQUEST
  }`, () => {
    const storageLocation = {}
    const testAction = updateStorageLocation({ storageLocation })

    const expectedAction = {
      meta: { storageLocation },
      type: actionTypes.STORAGE_SERVICE_UPDATE_STORAGE_LOCATION_REQUEST,
    }

    store.dispatch(testAction)

    expect(store.getActions()).toEqual([expectedAction])
  })

  it(`calls updateStorageLocation with correct body`, () => {
    const operationId = 'updateStorageLocation'
    const storageLocation = {
      id: '123',
      normalStorageLocationText: 'string',
      storedUnderTaxonName: 'Sorex minutus',
    }
    const { id, ...attributes } = storageLocation

    const callSpy = jest.fn()

    apiClient.mock({
      spies: {
        [operationId]: callSpy,
      },
    })

    const testAction = updateStorageLocation({ storageLocation })
    const expectedCallParams = {
      body: {
        data: {
          attributes,
          id,
          type: STORAGE_LOCATION,
        },
      },
      pathParams: { id },
    }

    expect.assertions(3)

    return store.dispatch(testAction).then(() => {
      expect(callSpy.mock.calls.length).toEqual(1)
      expect(callSpy.mock.calls[0][0]).toMatchObject({ operationId })
      expect(callSpy.mock.calls[0][1]).toEqual(expectedCallParams)
    })
  })

  it(`dispatches ${
    actionTypes.STORAGE_SERVICE_UPDATE_STORAGE_LOCATION_SUCCESS
  } and returns transformed response`, () => {
    const operationId = 'updateStorageLocation'
    const attributes = {
      normalStorageLocationText: 'string',
      storedUnderTaxonName: 'Sorex minutus',
    }
    const id = '123'
    const storageLocation = {
      ...attributes,
      id,
    }

    const mockResponse = {
      data: {
        attributes,
        id,
        type: 'type',
      },
    }
    const transformedResponse = {
      ...attributes,
      id,
      type: 'type',
    }

    apiClient.mock({
      responses: {
        [operationId]: mockResponse,
      },
    })

    const testAction = updateStorageLocation({ storageLocation })

    const expectedFirstAction = {
      meta: { storageLocation },
      type: actionTypes.STORAGE_SERVICE_UPDATE_STORAGE_LOCATION_REQUEST,
    }
    const expectedSecondAction = {
      payload: transformedResponse,
      type: actionTypes.STORAGE_SERVICE_UPDATE_STORAGE_LOCATION_SUCCESS,
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
    actionTypes.STORAGE_SERVICE_UPDATE_STORAGE_LOCATION_FAIL
  } without throwing error`, () => {
    const operationId = 'updateStorageLocation'
    const storageLocation = {
      id: '123',
      normalStorageLocationText: 'string',
      storedUnderTaxonName: 'Sorex minutus',
    }
    const mockError = { status: 500 }

    apiClient.mock({
      errors: {
        [operationId]: mockError,
      },
    })

    const testAction = updateStorageLocation({ storageLocation })

    const expectedFirstAction = {
      meta: { storageLocation },
      type: actionTypes.STORAGE_SERVICE_UPDATE_STORAGE_LOCATION_REQUEST,
    }
    const expectedSecondAction = {
      error: true,
      meta: { storageLocation },
      payload: mockError,
      type: actionTypes.STORAGE_SERVICE_UPDATE_STORAGE_LOCATION_FAIL,
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
    actionTypes.STORAGE_SERVICE_UPDATE_STORAGE_LOCATION_FAIL
  } and throws error`, () => {
    const operationId = 'updateStorageLocation'
    const storageLocation = {
      id: '123',
      normalStorageLocationText: 'string',
      storedUnderTaxonName: 'Sorex minutus',
    }
    const mockError = { status: 500 }

    apiClient.mock({
      errors: {
        [operationId]: mockError,
      },
    })

    const testAction = updateStorageLocation({
      storageLocation,
      throwError: true,
    })

    const expectedFirstAction = {
      meta: { storageLocation },
      type: actionTypes.STORAGE_SERVICE_UPDATE_STORAGE_LOCATION_REQUEST,
    }
    const expectedSecondAction = {
      error: true,
      meta: { storageLocation },
      payload: mockError,
      type: actionTypes.STORAGE_SERVICE_UPDATE_STORAGE_LOCATION_FAIL,
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
