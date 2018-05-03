import setupMockStoreWithApiClient from 'utilities/test/setupMockStoreWithApiClient'

import getTaxa from './index'
import * as actionTypes from '../../actionTypes'

describe('dataModules/taxonService/actionCreators/getTaxa', () => {
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

  it(`dispatches ${actionTypes.TAXON_SERVICE_GET_TAXA_REQUEST}`, () => {
    const testAction = getTaxa()

    const expectedAction = {
      meta: { queryParams: {} },
      type: actionTypes.TAXON_SERVICE_GET_TAXA_REQUEST,
    }

    store.dispatch(testAction)

    expect(store.getActions()).toEqual([expectedAction])
  })

  it(`dispatches ${
    actionTypes.TAXON_SERVICE_GET_TAXA_REQUEST
  } with isLookup true`, () => {
    const testAction = getTaxa({ isLookup: true })

    const expectedAction = {
      meta: { isLookup: true, queryParams: {} },
      type: actionTypes.TAXON_SERVICE_GET_TAXA_REQUEST,
    }

    store.dispatch(testAction)

    expect(store.getActions()).toEqual([expectedAction])
  })

  it(`calls getTaxa`, () => {
    const operationId = 'taxonGetMany'

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

    const testAction = getTaxa({ queryParams })

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
    actionTypes.TAXON_SERVICE_GET_TAXA_SUCCESS
  } and returns transformed response`, () => {
    const operationId = 'taxonGetMany'
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

    const testAction = getTaxa({ queryParams })

    const expectedFirstAction = {
      meta: { queryParams },
      type: actionTypes.TAXON_SERVICE_GET_TAXA_REQUEST,
    }
    const expectedSecondAction = {
      meta: { queryParams },
      payload: transformedResponse,
      type: actionTypes.TAXON_SERVICE_GET_TAXA_SUCCESS,
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
    actionTypes.TAXON_SERVICE_GET_TAXA_FAIL
  } without throwing error`, () => {
    const operationId = 'taxonGetMany'
    const mockResponse = { status: 404 }

    apiClient.mock({
      errors: {
        [operationId]: mockResponse,
      },
    })

    const testAction = getTaxa()

    const expectedFirstAction = {
      meta: { queryParams: {} },
      type: actionTypes.TAXON_SERVICE_GET_TAXA_REQUEST,
    }
    const expectedSecondAction = {
      error: true,
      meta: { queryParams: {} },
      payload: mockResponse,
      type: actionTypes.TAXON_SERVICE_GET_TAXA_FAIL,
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
    actionTypes.TAXON_SERVICE_GET_TAXA_FAIL
  } and throws error`, () => {
    const operationId = 'taxonGetMany'
    const mockResponse = { status: 404 }

    apiClient.mock({
      errors: {
        [operationId]: mockResponse,
      },
    })

    const testAction = getTaxa({ throwError: true })

    const expectedFirstAction = {
      meta: { queryParams: {} },
      type: actionTypes.TAXON_SERVICE_GET_TAXA_REQUEST,
    }
    const expectedSecondAction = {
      error: true,
      meta: { queryParams: {} },
      payload: mockResponse,
      type: actionTypes.TAXON_SERVICE_GET_TAXA_FAIL,
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
