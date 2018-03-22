import setupMockStoreWithApiClient from 'utilities/test/setupMockStoreWithApiClient'

import getTaxaForLookup from './index'
import * as actionTypes from '../../actionTypes'

describe('domainModules/taxonService/actionCreators/getTaxaForLookup', () => {
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
    actionTypes.TAXON_SERVICE_GET_TAXA_FOR_LOOKUP_REQUEST
  }`, () => {
    const testAction = getTaxaForLookup()

    const expectedAction = {
      meta: { queryParams: {} },
      type: actionTypes.TAXON_SERVICE_GET_TAXA_FOR_LOOKUP_REQUEST,
    }

    store.dispatch(testAction)

    expect(store.getActions()).toEqual([expectedAction])
  })

  it(`calls getTaxaForLookup`, () => {
    const operationId = 'getTaxaByName'

    const callSpy = jest.fn()

    apiClient.mock({
      responses: {
        [operationId]: { data: [] },
      },
      spies: {
        [operationId]: callSpy,
      },
    })

    const testAction = getTaxaForLookup()

    expect.assertions(2)

    return store.dispatch(testAction).then(() => {
      expect(callSpy.mock.calls.length).toEqual(1)
      expect(callSpy.mock.calls[0][0]).toMatchObject({ operationId })
    })
  })

  it(`dispatches ${
    actionTypes.TAXON_SERVICE_GET_TAXA_FOR_LOOKUP_SUCCESS
  } and returns transformed response`, () => {
    const operationId = 'getTaxaByName'
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

    const testAction = getTaxaForLookup({ queryParams })

    const expectedFirstAction = {
      meta: { queryParams },
      type: actionTypes.TAXON_SERVICE_GET_TAXA_FOR_LOOKUP_REQUEST,
    }
    const expectedSecondAction = {
      meta: { queryParams },
      payload: transformedResponse,
      type: actionTypes.TAXON_SERVICE_GET_TAXA_FOR_LOOKUP_SUCCESS,
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
    actionTypes.TAXON_SERVICE_GET_TAXA_FOR_LOOKUP_FAIL
  } without throwing error`, () => {
    const operationId = 'getTaxaByName'
    const mockResponse = { status: 404 }

    apiClient.mock({
      errors: {
        [operationId]: mockResponse,
      },
    })

    const testAction = getTaxaForLookup({ throwError: false })

    const expectedFirstAction = {
      meta: { queryParams: {} },
      type: actionTypes.TAXON_SERVICE_GET_TAXA_FOR_LOOKUP_REQUEST,
    }
    const expectedSecondAction = {
      error: true,
      meta: { queryParams: {} },
      payload: mockResponse,
      type: actionTypes.TAXON_SERVICE_GET_TAXA_FOR_LOOKUP_FAIL,
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
    actionTypes.TAXON_SERVICE_GET_TAXA_FOR_LOOKUP_FAIL
  } and throws error`, () => {
    const operationId = 'getTaxaByName'
    const mockResponse = { status: 404 }

    apiClient.mock({
      errors: {
        [operationId]: mockResponse,
      },
    })

    const testAction = getTaxaForLookup({ throwError: true })

    const expectedFirstAction = {
      meta: { queryParams: {} },
      type: actionTypes.TAXON_SERVICE_GET_TAXA_FOR_LOOKUP_REQUEST,
    }
    const expectedSecondAction = {
      error: true,
      meta: { queryParams: {} },
      payload: mockResponse,
      type: actionTypes.TAXON_SERVICE_GET_TAXA_FOR_LOOKUP_FAIL,
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
