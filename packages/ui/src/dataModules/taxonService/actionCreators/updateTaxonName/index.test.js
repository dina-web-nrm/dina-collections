import setupMockStoreWithApiClient from 'utilities/test/setupMockStoreWithApiClient'

import updateTaxonName from './index'
import * as actionTypes from '../../actionTypes'
import { TAXON_NAME } from '../../constants'

describe('dataModules/taxonService/actionCreators/updateTaxonName', () => {
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
    actionTypes.TAXON_SERVICE_UPDATE_TAXON_NAME_REQUEST
  }`, () => {
    const taxonName = {}
    const testAction = updateTaxonName({ taxonName })

    const expectedAction = {
      meta: { taxonName },
      type: actionTypes.TAXON_SERVICE_UPDATE_TAXON_NAME_REQUEST,
    }

    store.dispatch(testAction)

    expect(store.getActions()).toEqual([expectedAction])
  })

  it(`calls updateTaxonName with correct body`, () => {
    const operationId = 'updateTaxonName'
    const taxonName = {
      id: '123',
      normalStorageLocationText: 'string',
      storedUnderTaxonName: 'Sorex minutus',
    }
    const { id, ...attributes } = taxonName

    const callSpy = jest.fn()

    apiClient.mock({
      responses: {
        [operationId]: { data: {} },
      },
      spies: {
        [operationId]: callSpy,
      },
    })

    const testAction = updateTaxonName({ taxonName })
    const expectedCallParams = {
      body: {
        data: {
          attributes,
          id,
          type: TAXON_NAME,
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
    actionTypes.TAXON_SERVICE_UPDATE_TAXON_NAME_SUCCESS
  } and returns transformed response`, () => {
    const operationId = 'updateTaxonName'
    const attributes = {
      normalStorageLocationText: 'string',
      storedUnderTaxonName: 'Sorex minutus',
    }
    const id = '123'
    const taxonName = {
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

    const testAction = updateTaxonName({ taxonName })

    const expectedFirstAction = {
      meta: { taxonName },
      type: actionTypes.TAXON_SERVICE_UPDATE_TAXON_NAME_REQUEST,
    }
    const expectedSecondAction = {
      payload: transformedResponse,
      type: actionTypes.TAXON_SERVICE_UPDATE_TAXON_NAME_SUCCESS,
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
    actionTypes.TAXON_SERVICE_UPDATE_TAXON_NAME_FAIL
  } without throwing error`, () => {
    const operationId = 'updateTaxonName'
    const taxonName = {
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

    const testAction = updateTaxonName({ taxonName })

    const expectedFirstAction = {
      meta: { taxonName },
      type: actionTypes.TAXON_SERVICE_UPDATE_TAXON_NAME_REQUEST,
    }
    const expectedSecondAction = {
      error: true,
      meta: { taxonName },
      payload: mockError,
      type: actionTypes.TAXON_SERVICE_UPDATE_TAXON_NAME_FAIL,
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
    actionTypes.TAXON_SERVICE_UPDATE_TAXON_NAME_FAIL
  } and throws error`, () => {
    const operationId = 'updateTaxonName'
    const taxonName = {
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

    const testAction = updateTaxonName({
      taxonName,
      throwError: true,
    })

    const expectedFirstAction = {
      meta: { taxonName },
      type: actionTypes.TAXON_SERVICE_UPDATE_TAXON_NAME_REQUEST,
    }
    const expectedSecondAction = {
      error: true,
      meta: { taxonName },
      payload: mockError,
      type: actionTypes.TAXON_SERVICE_UPDATE_TAXON_NAME_FAIL,
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
