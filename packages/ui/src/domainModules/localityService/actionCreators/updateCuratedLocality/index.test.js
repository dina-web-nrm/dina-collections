import setupMockStoreWithApiClient from 'utilities/test/setupMockStoreWithApiClient'

import updateCuratedLocality from './index'
import * as actionTypes from '../../actionTypes'
import { CURATED_LOCALITY } from '../../constants'

describe('domainModules/localityService/actionCreators/updateCuratedLocality', () => {
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
    const curatedLocality = {}
    const testAction = updateCuratedLocality({ curatedLocality })

    const expectedAction = {
      meta: { curatedLocality },
      type: actionTypes.LOCALITY_SERVICE_UPDATE_CURATED_LOCALITY_REQUEST,
    }

    store.dispatch(testAction)

    expect(store.getActions()).toEqual([expectedAction])
  })

  it(`calls updateCuratedLocality with correct body`, () => {
    const operationId = 'updateCuratedLocality'
    const curatedLocality = {
      id: '123',
      normalStorageLocationText: 'string',
      storedUnderTaxonName: 'Sorex minutus',
    }
    const { id, ...attributes } = curatedLocality

    const callSpy = jest.fn()

    apiClient.mock({
      responses: {
        [operationId]: { data: {} },
      },
      spies: {
        [operationId]: callSpy,
      },
    })

    const testAction = updateCuratedLocality({ curatedLocality })
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
    const operationId = 'updateCuratedLocality'
    const attributes = {
      normalStorageLocationText: 'string',
      storedUnderTaxonName: 'Sorex minutus',
    }
    const id = '123'
    const curatedLocality = {
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

    const testAction = updateCuratedLocality({ curatedLocality })

    const expectedFirstAction = {
      meta: { curatedLocality },
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
    const operationId = 'updateCuratedLocality'
    const curatedLocality = {
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

    const testAction = updateCuratedLocality({ curatedLocality })

    const expectedFirstAction = {
      meta: { curatedLocality },
      type: actionTypes.LOCALITY_SERVICE_UPDATE_CURATED_LOCALITY_REQUEST,
    }
    const expectedSecondAction = {
      error: true,
      meta: { curatedLocality },
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
    const operationId = 'updateCuratedLocality'
    const curatedLocality = {
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

    const testAction = updateCuratedLocality({
      curatedLocality,
      throwError: true,
    })

    const expectedFirstAction = {
      meta: { curatedLocality },
      type: actionTypes.LOCALITY_SERVICE_UPDATE_CURATED_LOCALITY_REQUEST,
    }
    const expectedSecondAction = {
      error: true,
      meta: { curatedLocality },
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
