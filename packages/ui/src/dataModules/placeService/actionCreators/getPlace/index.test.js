import setupMockStoreWithApiClient from 'utilities/test/setupMockStoreWithApiClient'

import getPlace from './index'
import * as actionTypes from '../../actionTypes'

describe('dataModules/placeService/actionCreators/getPlace', () => {
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

  it(`dispatches ${actionTypes.PLACE_SERVICE_GET_PLACE_REQUEST}`, () => {
    const id = '123'

    const testAction = getPlace({ id })

    const expectedAction = {
      meta: { id },
      type: actionTypes.PLACE_SERVICE_GET_PLACE_REQUEST,
    }

    store.dispatch(testAction)

    expect(store.getActions()).toEqual([expectedAction])
  })

  it(`calls getPlace`, () => {
    const operationId = 'getPlace'
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

    const testAction = getPlace({ id })
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
    actionTypes.PLACE_SERVICE_GET_PLACE_SUCCESS
  } and returns transformed response`, () => {
    const operationId = 'getPlace'
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

    const testAction = getPlace({ id })

    const expectedFirstAction = {
      meta: { id },
      type: actionTypes.PLACE_SERVICE_GET_PLACE_REQUEST,
    }
    const expectedSecondAction = {
      meta: { id },
      payload: transformedResponse,
      type: actionTypes.PLACE_SERVICE_GET_PLACE_SUCCESS,
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
    actionTypes.PLACE_SERVICE_GET_PLACE_FAIL
  } without throwing error`, () => {
    const operationId = 'getPlace'
    const id = '123'
    const mockResponse = { status: 404 }

    apiClient.mock({
      errors: {
        [operationId]: mockResponse,
      },
    })

    const testAction = getPlace({ id })

    const expectedFirstAction = {
      meta: { id },
      type: actionTypes.PLACE_SERVICE_GET_PLACE_REQUEST,
    }
    const expectedSecondAction = {
      error: true,
      meta: { id },
      payload: mockResponse,
      type: actionTypes.PLACE_SERVICE_GET_PLACE_FAIL,
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
    actionTypes.PLACE_SERVICE_GET_PLACE_FAIL
  } and throws error`, () => {
    const operationId = 'getPlace'
    const id = '123'
    const mockResponse = { status: 404 }

    apiClient.mock({
      errors: {
        [operationId]: mockResponse,
      },
    })

    const testAction = getPlace({ id, throwError: true })

    const expectedFirstAction = {
      meta: { id },
      type: actionTypes.PLACE_SERVICE_GET_PLACE_REQUEST,
    }
    const expectedSecondAction = {
      error: true,
      meta: { id },
      payload: mockResponse,
      type: actionTypes.PLACE_SERVICE_GET_PLACE_FAIL,
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
