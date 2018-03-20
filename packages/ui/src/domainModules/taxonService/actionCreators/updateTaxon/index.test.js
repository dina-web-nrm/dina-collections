import setupMockStoreWithApiClient from 'utilities/test/setupMockStoreWithApiClient'

import updateTaxon from './index'
import * as actionTypes from '../../actionTypes'
import { TAXON } from '../../constants'

describe('domainModules/taxonService/actionCreators/updateTaxon', () => {
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

  it(`dispatches ${actionTypes.TAXON_SERVICE_UPDATE_TAXON_REQUEST}`, () => {
    const taxon = {}
    const testAction = updateTaxon({ taxon })

    const expectedAction = {
      meta: { taxon },
      type: actionTypes.TAXON_SERVICE_UPDATE_TAXON_REQUEST,
    }

    store.dispatch(testAction)

    expect(store.getActions()).toEqual([expectedAction])
  })

  it(`calls updateTaxon with correct body`, () => {
    const operationId = 'updateTaxon'
    const taxon = {
      id: '123',
      normalStorageLocationText: 'string',
      storedUnderTaxonName: 'Sorex minutus',
    }
    const { id, ...attributes } = taxon

    const callSpy = jest.fn()

    apiClient.mock({
      responses: {
        [operationId]: { data: {} },
      },
      spies: {
        [operationId]: callSpy,
      },
    })

    const testAction = updateTaxon({ taxon })
    const expectedCallParams = {
      body: {
        data: {
          attributes,
          id,
          type: TAXON,
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
    actionTypes.TAXON_SERVICE_UPDATE_TAXON_SUCCESS
  } and returns transformed response`, () => {
    const operationId = 'updateTaxon'
    const attributes = {
      normalStorageLocationText: 'string',
      storedUnderTaxonName: 'Sorex minutus',
    }
    const id = '123'
    const taxon = {
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

    const testAction = updateTaxon({ taxon })

    const expectedFirstAction = {
      meta: { taxon },
      type: actionTypes.TAXON_SERVICE_UPDATE_TAXON_REQUEST,
    }
    const expectedSecondAction = {
      payload: transformedResponse,
      type: actionTypes.TAXON_SERVICE_UPDATE_TAXON_SUCCESS,
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
    actionTypes.TAXON_SERVICE_UPDATE_TAXON_FAIL
  } without throwing error`, () => {
    const operationId = 'updateTaxon'
    const taxon = {
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

    const testAction = updateTaxon({ taxon })

    const expectedFirstAction = {
      meta: { taxon },
      type: actionTypes.TAXON_SERVICE_UPDATE_TAXON_REQUEST,
    }
    const expectedSecondAction = {
      error: true,
      meta: { taxon },
      payload: mockError,
      type: actionTypes.TAXON_SERVICE_UPDATE_TAXON_FAIL,
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
    actionTypes.TAXON_SERVICE_UPDATE_TAXON_FAIL
  } and throws error`, () => {
    const operationId = 'updateTaxon'
    const taxon = {
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

    const testAction = updateTaxon({
      taxon,
      throwError: true,
    })

    const expectedFirstAction = {
      meta: { taxon },
      type: actionTypes.TAXON_SERVICE_UPDATE_TAXON_REQUEST,
    }
    const expectedSecondAction = {
      error: true,
      meta: { taxon },
      payload: mockError,
      type: actionTypes.TAXON_SERVICE_UPDATE_TAXON_FAIL,
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
