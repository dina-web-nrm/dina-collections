import setupMockStoreWithApiClient from 'utilities/test/setupMockStoreWithApiClient'

import getTaxonNames from './index'
import * as actionTypes from '../../actionTypes'

describe('dataModules/taxonService/actionCreators/getTaxonNames', () => {
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

  it(`dispatches ${actionTypes.TAXON_SERVICE_GET_TAXON_NAMES_REQUEST}`, () => {
    const testAction = getTaxonNames()

    const expectedAction = {
      meta: { queryParams: {} },
      type: actionTypes.TAXON_SERVICE_GET_TAXON_NAMES_REQUEST,
    }

    store.dispatch(testAction)

    expect(store.getActions()).toEqual([expectedAction])
  })

  it(`dispatches ${
    actionTypes.TAXON_SERVICE_GET_TAXON_NAMES_REQUEST
  } with isLookup true`, () => {
    const testAction = getTaxonNames({ isLookup: true })

    const expectedAction = {
      meta: { isLookup: true, queryParams: {} },
      type: actionTypes.TAXON_SERVICE_GET_TAXON_NAMES_REQUEST,
    }

    store.dispatch(testAction)

    expect(store.getActions()).toEqual([expectedAction])
  })

  it(`calls getTaxonNames`, () => {
    const operationId = 'taxonNameGetMany'

    const callSpy = jest.fn()

    apiClient.mock({
      responses: {
        [operationId]: { data: [] },
      },
      spies: {
        [operationId]: callSpy,
      },
    })

    const queryParams = {
      filter: { name: 'sorex' },
      limit: 10,
    }

    const testAction = getTaxonNames({ queryParams })

    const expectedCallParams = {
      queryParams,
    }

    expect.assertions(3)

    return store.dispatch(testAction).then(() => {
      expect(callSpy.mock.calls.length).toEqual(1)
      expect(callSpy.mock.calls[0][0]).toMatchObject({ operationId })
      expect(callSpy.mock.calls[0][1]).toEqual(expectedCallParams)
    })
  })

  it(`dispatches ${
    actionTypes.TAXON_SERVICE_GET_TAXON_NAMES_SUCCESS
  } and returns transformed response`, () => {
    const operationId = 'taxonNameGetMany'
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
    const queryParams = { name: 'a' }
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

    const testAction = getTaxonNames({ queryParams })

    const expectedFirstAction = {
      meta: { queryParams },
      type: actionTypes.TAXON_SERVICE_GET_TAXON_NAMES_REQUEST,
    }
    const expectedSecondAction = {
      meta: { queryParams },
      payload: transformedResponse,
      type: actionTypes.TAXON_SERVICE_GET_TAXON_NAMES_SUCCESS,
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
    actionTypes.TAXON_SERVICE_GET_TAXON_NAMES_FAIL
  } without throwing error`, () => {
    const operationId = 'taxonNameGetMany'
    const mockResponse = { status: 404 }

    apiClient.mock({
      errors: {
        [operationId]: mockResponse,
      },
    })

    const testAction = getTaxonNames()

    const expectedFirstAction = {
      meta: { queryParams: {} },
      type: actionTypes.TAXON_SERVICE_GET_TAXON_NAMES_REQUEST,
    }
    const expectedSecondAction = {
      error: true,
      meta: { queryParams: {} },
      payload: mockResponse,
      type: actionTypes.TAXON_SERVICE_GET_TAXON_NAMES_FAIL,
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
    actionTypes.TAXON_SERVICE_GET_TAXON_NAMES_FAIL
  } and throws error`, () => {
    const operationId = 'taxonNameGetMany'
    const mockResponse = { status: 404 }

    apiClient.mock({
      errors: {
        [operationId]: mockResponse,
      },
    })

    const testAction = getTaxonNames({ throwError: true })

    const expectedFirstAction = {
      meta: { queryParams: {} },
      type: actionTypes.TAXON_SERVICE_GET_TAXON_NAMES_REQUEST,
    }
    const expectedSecondAction = {
      error: true,
      meta: { queryParams: {} },
      payload: mockResponse,
      type: actionTypes.TAXON_SERVICE_GET_TAXON_NAMES_FAIL,
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
