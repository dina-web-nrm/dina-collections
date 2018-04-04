import setupMockStoreWithApiClient from 'utilities/test/setupMockStoreWithApiClient'

import createFeatureObservationType from './index'
import * as actionTypes from '../../actionTypes'
import { FEATURE_OBSERVATION_TYPE } from '../../constants'

describe('dataModules/curatedListService/actionCreators/createFeatureObservationType', () => {
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
    actionTypes.CURATED_LIST_SERVICE_CREATE_FEATURE_OBSERVATION_TYPE_REQUEST
  }`, () => {
    const featureObservationType = {}
    const testAction = createFeatureObservationType({ featureObservationType })

    const expectedAction = {
      meta: { featureObservationType },
      type:
        actionTypes.CURATED_LIST_SERVICE_CREATE_FEATURE_OBSERVATION_TYPE_REQUEST,
    }

    store.dispatch(testAction)

    expect(store.getActions()).toEqual([expectedAction])
  })

  it(`calls createFeatureObservationType with correct body`, () => {
    const operationId = 'createFeatureObservationType'
    const featureObservationType = {
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

    const testAction = createFeatureObservationType({ featureObservationType })
    const expectedCallParams = {
      body: {
        data: {
          attributes: { ...featureObservationType },
          type: FEATURE_OBSERVATION_TYPE,
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
    actionTypes.CURATED_LIST_SERVICE_CREATE_FEATURE_OBSERVATION_TYPE_SUCCESS
  } and returns transformed response`, () => {
    const operationId = 'createFeatureObservationType'
    const featureObservationType = {
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

    const testAction = createFeatureObservationType({ featureObservationType })

    const expectedFirstAction = {
      meta: { featureObservationType },
      type:
        actionTypes.CURATED_LIST_SERVICE_CREATE_FEATURE_OBSERVATION_TYPE_REQUEST,
    }
    const expectedSecondAction = {
      payload: transformedResponse,
      type:
        actionTypes.CURATED_LIST_SERVICE_CREATE_FEATURE_OBSERVATION_TYPE_SUCCESS,
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
    actionTypes.CURATED_LIST_SERVICE_CREATE_FEATURE_OBSERVATION_TYPE_FAIL
  } without throwing error`, () => {
    const operationId = 'createFeatureObservationType'
    const featureObservationType = {
      normalStorageLocationText: 'string',
      storedUnderTaxonName: 'Sorex minutus',
    }
    const mockError = { status: 500 }

    apiClient.mock({
      errors: {
        [operationId]: mockError,
      },
    })

    const testAction = createFeatureObservationType({ featureObservationType })

    const expectedFirstAction = {
      meta: { featureObservationType },
      type:
        actionTypes.CURATED_LIST_SERVICE_CREATE_FEATURE_OBSERVATION_TYPE_REQUEST,
    }
    const expectedSecondAction = {
      error: true,
      meta: { featureObservationType },
      payload: mockError,
      type:
        actionTypes.CURATED_LIST_SERVICE_CREATE_FEATURE_OBSERVATION_TYPE_FAIL,
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
    actionTypes.CURATED_LIST_SERVICE_CREATE_FEATURE_OBSERVATION_TYPE_FAIL
  } and throws error`, () => {
    const operationId = 'createFeatureObservationType'
    const featureObservationType = {
      normalStorageLocationText: 'string',
      storedUnderTaxonName: 'Sorex minutus',
    }
    const mockError = { status: 500 }

    apiClient.mock({
      errors: {
        [operationId]: mockError,
      },
    })

    const testAction = createFeatureObservationType({
      featureObservationType,
      throwError: true,
    })

    const expectedFirstAction = {
      meta: { featureObservationType },
      type:
        actionTypes.CURATED_LIST_SERVICE_CREATE_FEATURE_OBSERVATION_TYPE_REQUEST,
    }
    const expectedSecondAction = {
      error: true,
      meta: { featureObservationType },
      payload: mockError,
      type:
        actionTypes.CURATED_LIST_SERVICE_CREATE_FEATURE_OBSERVATION_TYPE_FAIL,
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
