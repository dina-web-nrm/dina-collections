import setupMockStoreWithApiClient from 'utilities/test/setupMockStoreWithApiClient'

import updatePlace from './index'
import * as actionTypes from '../../actionTypes'
import { CURATED_LOCALITY } from '../../constants'

describe('dataModules/localityService/actionCreators/updatePlace', () => {
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
    actionTypes.LOCALITY_SERVICE_UPDATE_CURATED_LOCALITY_REQUEST
  }`, () => {
    const place = {}
    const testAction = updatePlace({ place })

    const expectedAction = {
      meta: { place },
      type: actionTypes.LOCALITY_SERVICE_UPDATE_CURATED_LOCALITY_REQUEST,
    }

    store.dispatch(testAction)

    expect(store.getActions()).toEqual([expectedAction])
  })

  it(`calls updatePlace with correct body`, () => {
    const operationId = 'updatePlace'
    const place = {
      id: '123',
      normalStorageLocationText: 'string',
      storedUnderTaxonName: 'Sorex minutus',
    }
    const { id, ...attributes } = place

    const callSpy = jest.fn()

    apiClient.mock({
      responses: {
        [operationId]: { data: {} },
      },
      spies: {
        [operationId]: callSpy,
      },
    })

    const testAction = updatePlace({ place })
    const expectedCallParams = {
      body: {
        data: {
          attributes,
          id,
          type: CURATED_LOCALITY,
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
    actionTypes.LOCALITY_SERVICE_UPDATE_CURATED_LOCALITY_SUCCESS
  } and returns transformed response`, () => {
    const operationId = 'updatePlace'
    const attributes = {
      normalStorageLocationText: 'string',
      storedUnderTaxonName: 'Sorex minutus',
    }
    const id = '123'
    const place = {
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

    const testAction = updatePlace({ place })

    const expectedFirstAction = {
      meta: { place },
      type: actionTypes.LOCALITY_SERVICE_UPDATE_CURATED_LOCALITY_REQUEST,
    }
    const expectedSecondAction = {
      payload: transformedResponse,
      type: actionTypes.LOCALITY_SERVICE_UPDATE_CURATED_LOCALITY_SUCCESS,
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
    actionTypes.LOCALITY_SERVICE_UPDATE_CURATED_LOCALITY_FAIL
  } without throwing error`, () => {
    const operationId = 'updatePlace'
    const place = {
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

    const testAction = updatePlace({ place })

    const expectedFirstAction = {
      meta: { place },
      type: actionTypes.LOCALITY_SERVICE_UPDATE_CURATED_LOCALITY_REQUEST,
    }
    const expectedSecondAction = {
      error: true,
      meta: { place },
      payload: mockError,
      type: actionTypes.LOCALITY_SERVICE_UPDATE_CURATED_LOCALITY_FAIL,
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
    actionTypes.LOCALITY_SERVICE_UPDATE_CURATED_LOCALITY_FAIL
  } and throws error`, () => {
    const operationId = 'updatePlace'
    const place = {
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

    const testAction = updatePlace({
      place,
      throwError: true,
    })

    const expectedFirstAction = {
      meta: { place },
      type: actionTypes.LOCALITY_SERVICE_UPDATE_CURATED_LOCALITY_REQUEST,
    }
    const expectedSecondAction = {
      error: true,
      meta: { place },
      payload: mockError,
      type: actionTypes.LOCALITY_SERVICE_UPDATE_CURATED_LOCALITY_FAIL,
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
