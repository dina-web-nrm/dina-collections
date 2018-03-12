import setupMockStoreWithApiClient from 'utilities/test/setupMockStoreWithApiClient'

import getCuratedLocality from './index'
import * as actionTypes from '../../actionTypes'

describe('domainModules/localityService/actionCreators/getCuratedLocality', () => {
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
    actionTypes.LOCALITY_SERVICE_GET_CURATED_LOCALITY_REQUEST
  }`, () => {
    const id = '123'

    const testAction = getCuratedLocality({ id })

    const expectedAction = {
      meta: { id },
      type: actionTypes.LOCALITY_SERVICE_GET_CURATED_LOCALITY_REQUEST,
    }

    store.dispatch(testAction)

    expect(store.getActions()).toEqual([expectedAction])
  })

  it(`calls getCuratedLocality`, () => {
    const operationId = 'getCuratedLocality'
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

    const testAction = getCuratedLocality({ id })
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
    actionTypes.LOCALITY_SERVICE_GET_CURATED_LOCALITY_SUCCESS
  } and returns transformed response`, () => {
    const operationId = 'getCuratedLocality'
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

    const testAction = getCuratedLocality({ id })

    const expectedFirstAction = {
      meta: { id },
      type: actionTypes.LOCALITY_SERVICE_GET_CURATED_LOCALITY_REQUEST,
    }
    const expectedSecondAction = {
      meta: { id },
      payload: transformedResponse,
      type: actionTypes.LOCALITY_SERVICE_GET_CURATED_LOCALITY_SUCCESS,
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
    actionTypes.LOCALITY_SERVICE_GET_CURATED_LOCALITY_FAIL
  } without throwing error`, () => {
    const operationId = 'getCuratedLocality'
    const id = '123'
    const mockResponse = { status: 404 }

    apiClient.mock({
      errors: {
        [operationId]: mockResponse,
      },
    })

    const testAction = getCuratedLocality({ id })

    const expectedFirstAction = {
      meta: { id },
      type: actionTypes.LOCALITY_SERVICE_GET_CURATED_LOCALITY_REQUEST,
    }
    const expectedSecondAction = {
      error: true,
      meta: { id },
      payload: mockResponse,
      type: actionTypes.LOCALITY_SERVICE_GET_CURATED_LOCALITY_FAIL,
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
    actionTypes.LOCALITY_SERVICE_GET_CURATED_LOCALITY_FAIL
  } and throws error`, () => {
    const operationId = 'getCuratedLocality'
    const id = '123'
    const mockResponse = { status: 404 }

    apiClient.mock({
      errors: {
        [operationId]: mockResponse,
      },
    })

    const testAction = getCuratedLocality({ id, throwError: true })

    const expectedFirstAction = {
      meta: { id },
      type: actionTypes.LOCALITY_SERVICE_GET_CURATED_LOCALITY_REQUEST,
    }
    const expectedSecondAction = {
      error: true,
      meta: { id },
      payload: mockResponse,
      type: actionTypes.LOCALITY_SERVICE_GET_CURATED_LOCALITY_FAIL,
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
