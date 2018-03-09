import setupMockStoreWithApiClient from 'utilities/test/setupMockStoreWithApiClient'

import getFeatureObservationType from './index'
import * as actionTypes from '../../actionTypes'

describe('domainModules/curatedListService/actionCreators/getFeatureObservationType', () => {
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
    actionTypes.CURATED_LIST_SERVICE_GET_FEATURE_OBSERVATION_TYPE_REQUEST
  }`, () => {
    const id = '123'

    const testAction = getFeatureObservationType({ id })

    const expectedAction = {
      meta: { id },
      type:
        actionTypes.CURATED_LIST_SERVICE_GET_FEATURE_OBSERVATION_TYPE_REQUEST,
    }

    store.dispatch(testAction)

    expect(store.getActions()).toEqual([expectedAction])
  })

  it(`calls getFeatureObservationType`, () => {
    const operationId = 'getFeatureObservationType'
    const id = '123'

    const callSpy = jest.fn()

    apiClient.mock({
      spies: {
        [operationId]: callSpy,
      },
    })

    const testAction = getFeatureObservationType({ id })
    const expectedCallParams = {
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
    actionTypes.CURATED_LIST_SERVICE_GET_FEATURE_OBSERVATION_TYPE_SUCCESS
  } and returns transformed response`, () => {
    const operationId = 'getFeatureObservationType'
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

    const testAction = getFeatureObservationType({ id })

    const expectedFirstAction = {
      meta: { id },
      type:
        actionTypes.CURATED_LIST_SERVICE_GET_FEATURE_OBSERVATION_TYPE_REQUEST,
    }
    const expectedSecondAction = {
      meta: { id },
      payload: transformedResponse,
      type:
        actionTypes.CURATED_LIST_SERVICE_GET_FEATURE_OBSERVATION_TYPE_SUCCESS,
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
    actionTypes.CURATED_LIST_SERVICE_GET_FEATURE_OBSERVATION_TYPE_FAIL
  } without throwing error`, () => {
    const operationId = 'getFeatureObservationType'
    const id = '123'
    const mockResponse = { status: 404 }

    apiClient.mock({
      errors: {
        [operationId]: mockResponse,
      },
    })

    const testAction = getFeatureObservationType({ id })

    const expectedFirstAction = {
      meta: { id },
      type:
        actionTypes.CURATED_LIST_SERVICE_GET_FEATURE_OBSERVATION_TYPE_REQUEST,
    }
    const expectedSecondAction = {
      error: true,
      meta: { id },
      payload: mockResponse,
      type: actionTypes.CURATED_LIST_SERVICE_GET_FEATURE_OBSERVATION_TYPE_FAIL,
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
    actionTypes.CURATED_LIST_SERVICE_GET_FEATURE_OBSERVATION_TYPE_FAIL
  } and throws error`, () => {
    const operationId = 'getFeatureObservationType'
    const id = '123'
    const mockResponse = { status: 404 }

    apiClient.mock({
      errors: {
        [operationId]: mockResponse,
      },
    })

    const testAction = getFeatureObservationType({ id, throwError: true })

    const expectedFirstAction = {
      meta: { id },
      type:
        actionTypes.CURATED_LIST_SERVICE_GET_FEATURE_OBSERVATION_TYPE_REQUEST,
    }
    const expectedSecondAction = {
      error: true,
      meta: { id },
      payload: mockResponse,
      type: actionTypes.CURATED_LIST_SERVICE_GET_FEATURE_OBSERVATION_TYPE_FAIL,
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
