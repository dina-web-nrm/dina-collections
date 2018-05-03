import setupMockStoreWithApiClient from 'utilities/test/setupMockStoreWithApiClient'

import getTaxon from './index'
import * as actionTypes from '../../actionTypes'

describe('dataModules/taxonService/actionCreators/getTaxon', () => {
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

  it(`dispatches ${actionTypes.TAXON_SERVICE_GET_TAXON_REQUEST}`, () => {
    const id = '123'

    const testAction = getTaxon({ id })

    const expectedAction = {
      meta: { id },
      type: actionTypes.TAXON_SERVICE_GET_TAXON_REQUEST,
    }

    store.dispatch(testAction)

    expect(store.getActions()).toEqual([expectedAction])
  })

  it(`calls getTaxon`, () => {
    const operationId = 'taxonGetOne'
    const id = '123'

    const callSpy = jest.fn()

    apiClient.mock({
      responses: {
        [operationId]: { data: {} },
      },
      spies: {
        [operationId]: callSpy,
      },
    })

    const testAction = getTaxon({ id })
    const expectedCallParams = {
      pathParams: { id },
      queryParams: {
        relationships: ['all'],
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
    actionTypes.TAXON_SERVICE_GET_TAXON_SUCCESS
  } and returns transformed response`, () => {
    const operationId = 'taxonGetOne'
    const id = '123'
    const mockResponse = {
      data: {
        attributes: {
          name: 'Alan',
        },
        id,
        type: 'type',
      },
    }
    const transformedResponse = {
      id,
      name: 'Alan',
      type: 'type',
    }

    apiClient.mock({
      responses: {
        [operationId]: mockResponse,
      },
    })

    const testAction = getTaxon({ id })

    const expectedFirstAction = {
      meta: { id },
      type: actionTypes.TAXON_SERVICE_GET_TAXON_REQUEST,
    }
    const expectedSecondAction = {
      meta: { id },
      payload: transformedResponse,
      type: actionTypes.TAXON_SERVICE_GET_TAXON_SUCCESS,
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
    actionTypes.TAXON_SERVICE_GET_TAXON_FAIL
  } without throwing error`, () => {
    const operationId = 'taxonGetOne'
    const id = '123'
    const mockResponse = { status: 404 }

    apiClient.mock({
      errors: {
        [operationId]: mockResponse,
      },
    })

    const testAction = getTaxon({ id })

    const expectedFirstAction = {
      meta: { id },
      type: actionTypes.TAXON_SERVICE_GET_TAXON_REQUEST,
    }
    const expectedSecondAction = {
      error: true,
      meta: { id },
      payload: mockResponse,
      type: actionTypes.TAXON_SERVICE_GET_TAXON_FAIL,
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
    actionTypes.TAXON_SERVICE_GET_TAXON_FAIL
  } and throws error`, () => {
    const operationId = 'taxonGetOne'
    const id = '123'
    const mockResponse = { status: 404 }

    apiClient.mock({
      errors: {
        [operationId]: mockResponse,
      },
    })

    const testAction = getTaxon({ id, throwError: true })

    const expectedFirstAction = {
      meta: { id },
      type: actionTypes.TAXON_SERVICE_GET_TAXON_REQUEST,
    }
    const expectedSecondAction = {
      error: true,
      meta: { id },
      payload: mockResponse,
      type: actionTypes.TAXON_SERVICE_GET_TAXON_FAIL,
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
