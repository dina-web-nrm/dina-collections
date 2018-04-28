import setupMockStoreWithApiClient from 'utilities/test/setupMockStoreWithApiClient'

import createTaxonName from './index'
import * as actionTypes from '../../actionTypes'
import { TAXON_NAME } from '../../constants'

describe('dataModules/taxonService/actionCreators/createTaxonName', () => {
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
    actionTypes.TAXON_SERVICE_CREATE_TAXON_NAME_REQUEST
  }`, () => {
    const taxonName = {}
    const testAction = createTaxonName({ taxonName })

    const expectedAction = {
      meta: { taxonName },
      type: actionTypes.TAXON_SERVICE_CREATE_TAXON_NAME_REQUEST,
    }

    store.dispatch(testAction)

    expect(store.getActions()).toEqual([expectedAction])
  })

  it(`calls createTaxonName with correct body`, () => {
    const operationId = 'createTaxonName'
    const taxonName = {
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

    const testAction = createTaxonName({ taxonName })
    const expectedCallParams = {
      body: {
        data: {
          attributes: { ...taxonName },
          type: TAXON_NAME,
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
    actionTypes.TAXON_SERVICE_CREATE_TAXON_NAME_SUCCESS
  } and returns transformed response`, () => {
    const operationId = 'createTaxonName'
    const taxonName = {
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

    const testAction = createTaxonName({ taxonName })

    const expectedFirstAction = {
      meta: { taxonName },
      type: actionTypes.TAXON_SERVICE_CREATE_TAXON_NAME_REQUEST,
    }
    const expectedSecondAction = {
      payload: transformedResponse,
      type: actionTypes.TAXON_SERVICE_CREATE_TAXON_NAME_SUCCESS,
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
    actionTypes.TAXON_SERVICE_CREATE_TAXON_NAME_FAIL
  } without throwing error`, () => {
    const operationId = 'createTaxonName'
    const taxonName = {
      normalStorageLocationText: 'string',
      storedUnderTaxonName: 'Sorex minutus',
    }
    const mockError = { status: 500 }

    apiClient.mock({
      errors: {
        [operationId]: mockError,
      },
    })

    const testAction = createTaxonName({ taxonName })

    const expectedFirstAction = {
      meta: { taxonName },
      type: actionTypes.TAXON_SERVICE_CREATE_TAXON_NAME_REQUEST,
    }
    const expectedSecondAction = {
      error: true,
      meta: { taxonName },
      payload: mockError,
      type: actionTypes.TAXON_SERVICE_CREATE_TAXON_NAME_FAIL,
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
    actionTypes.TAXON_SERVICE_CREATE_TAXON_NAME_FAIL
  } and throws error`, () => {
    const operationId = 'createTaxonName'
    const taxonName = {
      normalStorageLocationText: 'string',
      storedUnderTaxonName: 'Sorex minutus',
    }
    const mockError = { status: 500 }

    apiClient.mock({
      errors: {
        [operationId]: mockError,
      },
    })

    const testAction = createTaxonName({
      taxonName,
      throwError: true,
    })

    const expectedFirstAction = {
      meta: { taxonName },
      type: actionTypes.TAXON_SERVICE_CREATE_TAXON_NAME_REQUEST,
    }
    const expectedSecondAction = {
      error: true,
      meta: { taxonName },
      payload: mockError,
      type: actionTypes.TAXON_SERVICE_CREATE_TAXON_NAME_FAIL,
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
