import setupMockStoreWithApiClient from 'utilities/test/setupMockStoreWithApiClient'

import createCuratedLocality from './index'
import * as actionTypes from '../../actionTypes'
import { CURATED_LOCALITY } from '../../constants'

describe('domainModules/localityService/actionCreators/createCuratedLocality', () => {
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
    actionTypes.LOCALITY_SERVICE_CREATE_CURATED_LOCALITY_REQUEST
  }`, () => {
    const curatedLocality = {}
    const testAction = createCuratedLocality({ curatedLocality })

    const expectedAction = {
      meta: { curatedLocality },
      type: actionTypes.LOCALITY_SERVICE_CREATE_CURATED_LOCALITY_REQUEST,
    }

    store.dispatch(testAction)

    expect(store.getActions()).toEqual([expectedAction])
  })

  it(`calls createCuratedLocality with correct body`, () => {
    const operationId = 'createCuratedLocality'
    const curatedLocality = {
      normalStorageLocationText: 'string',
      storedUnderTaxonName: 'Sorex minutus',
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

    const testAction = createCuratedLocality({ curatedLocality })
    const expectedCallParams = {
      body: {
        data: {
          attributes: { ...curatedLocality },
          type: CURATED_LOCALITY,
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
    actionTypes.LOCALITY_SERVICE_CREATE_CURATED_LOCALITY_SUCCESS
  } and returns transformed response`, () => {
    const operationId = 'createCuratedLocality'
    const curatedLocality = {
      normalStorageLocationText: 'string',
      storedUnderTaxonName: 'Sorex minutus',
    }

    const mockResponse = {
      data: {
        attributes: {
          name: 'Alan',
        },
        id: '123',
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

    const testAction = createCuratedLocality({ curatedLocality })

    const expectedFirstAction = {
      meta: { curatedLocality },
      type: actionTypes.LOCALITY_SERVICE_CREATE_CURATED_LOCALITY_REQUEST,
    }
    const expectedSecondAction = {
      payload: transformedResponse,
      type: actionTypes.LOCALITY_SERVICE_CREATE_CURATED_LOCALITY_SUCCESS,
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
    actionTypes.LOCALITY_SERVICE_CREATE_CURATED_LOCALITY_FAIL
  } without throwing error`, () => {
    const operationId = 'createCuratedLocality'
    const curatedLocality = {
      normalStorageLocationText: 'string',
      storedUnderTaxonName: 'Sorex minutus',
    }
    const mockError = { status: 500 }

    apiClient.mock({
      errors: {
        [operationId]: mockError,
      },
    })

    const testAction = createCuratedLocality({ curatedLocality })

    const expectedFirstAction = {
      meta: { curatedLocality },
      type: actionTypes.LOCALITY_SERVICE_CREATE_CURATED_LOCALITY_REQUEST,
    }
    const expectedSecondAction = {
      error: true,
      meta: { curatedLocality },
      payload: mockError,
      type: actionTypes.LOCALITY_SERVICE_CREATE_CURATED_LOCALITY_FAIL,
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
    actionTypes.LOCALITY_SERVICE_CREATE_CURATED_LOCALITY_FAIL
  } and throws error`, () => {
    const operationId = 'createCuratedLocality'
    const curatedLocality = {
      normalStorageLocationText: 'string',
      storedUnderTaxonName: 'Sorex minutus',
    }
    const mockError = { status: 500 }

    apiClient.mock({
      errors: {
        [operationId]: mockError,
      },
    })

    const testAction = createCuratedLocality({
      curatedLocality,
      throwError: true,
    })

    const expectedFirstAction = {
      meta: { curatedLocality },
      type: actionTypes.LOCALITY_SERVICE_CREATE_CURATED_LOCALITY_REQUEST,
    }
    const expectedSecondAction = {
      error: true,
      meta: { curatedLocality },
      payload: mockError,
      type: actionTypes.LOCALITY_SERVICE_CREATE_CURATED_LOCALITY_FAIL,
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
