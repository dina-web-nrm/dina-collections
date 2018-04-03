import setupMockStoreWithApiClient from 'utilities/test/setupMockStoreWithApiClient'

import createCatalogNumber from './index'
import * as actionTypes from '../../actionTypes'
import { CATALOG_NUMBER } from '../../constants'

describe('dataModules/identifierService/actionCreators/createCatalogNumber', () => {
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
    actionTypes.IDENTIFIER_SERVICE_CREATE_CATALOG_NUMBER_REQUEST
  }`, () => {
    const catalogNumber = {}
    const testAction = createCatalogNumber({ catalogNumber })

    const expectedAction = {
      meta: { catalogNumber },
      type: actionTypes.IDENTIFIER_SERVICE_CREATE_CATALOG_NUMBER_REQUEST,
    }

    store.dispatch(testAction)

    expect(store.getActions()).toEqual([expectedAction])
  })

  it(`calls createCatalogNumber with correct body`, () => {
    const operationId = 'createCatalogNumber'
    const catalogNumber = {
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

    const testAction = createCatalogNumber({ catalogNumber })
    const expectedCallParams = {
      body: {
        data: {
          attributes: { ...catalogNumber },
          type: CATALOG_NUMBER,
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
    actionTypes.IDENTIFIER_SERVICE_CREATE_CATALOG_NUMBER_SUCCESS
  } and returns transformed response`, () => {
    const operationId = 'createCatalogNumber'
    const catalogNumber = {
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

    const testAction = createCatalogNumber({ catalogNumber })

    const expectedFirstAction = {
      meta: { catalogNumber },
      type: actionTypes.IDENTIFIER_SERVICE_CREATE_CATALOG_NUMBER_REQUEST,
    }
    const expectedSecondAction = {
      payload: transformedResponse,
      type: actionTypes.IDENTIFIER_SERVICE_CREATE_CATALOG_NUMBER_SUCCESS,
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
    actionTypes.IDENTIFIER_SERVICE_CREATE_CATALOG_NUMBER_FAIL
  } without throwing error`, () => {
    const operationId = 'createCatalogNumber'
    const catalogNumber = {
      normalStorageLocationText: 'string',
      storedUnderTaxonName: 'Sorex minutus',
    }
    const mockError = { status: 500 }

    apiClient.mock({
      errors: {
        [operationId]: mockError,
      },
    })

    const testAction = createCatalogNumber({ catalogNumber })

    const expectedFirstAction = {
      meta: { catalogNumber },
      type: actionTypes.IDENTIFIER_SERVICE_CREATE_CATALOG_NUMBER_REQUEST,
    }
    const expectedSecondAction = {
      error: true,
      meta: { catalogNumber },
      payload: mockError,
      type: actionTypes.IDENTIFIER_SERVICE_CREATE_CATALOG_NUMBER_FAIL,
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
    actionTypes.IDENTIFIER_SERVICE_CREATE_CATALOG_NUMBER_FAIL
  } and throws error`, () => {
    const operationId = 'createCatalogNumber'
    const catalogNumber = {
      normalStorageLocationText: 'string',
      storedUnderTaxonName: 'Sorex minutus',
    }
    const mockError = { status: 500 }

    apiClient.mock({
      errors: {
        [operationId]: mockError,
      },
    })

    const testAction = createCatalogNumber({
      catalogNumber,
      throwError: true,
    })

    const expectedFirstAction = {
      meta: { catalogNumber },
      type: actionTypes.IDENTIFIER_SERVICE_CREATE_CATALOG_NUMBER_REQUEST,
    }
    const expectedSecondAction = {
      error: true,
      meta: { catalogNumber },
      payload: mockError,
      type: actionTypes.IDENTIFIER_SERVICE_CREATE_CATALOG_NUMBER_FAIL,
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
