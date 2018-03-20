import setupMockStoreWithApiClient from 'utilities/test/setupMockStoreWithApiClient'

import updateFeatureObservationType from './index'
import * as actionTypes from '../../actionTypes'
import { FEATURE_OBSERVATION_TYPE } from '../../constants'

describe('domainModules/curatedListService/actionCreators/updateFeatureObservationType', () => {
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
    actionTypes.CURATED_LIST_SERVICE_UPDATE_FEATURE_OBSERVATION_TYPE_REQUEST
  }`, () => {
    const featureObservationType = {}
    const testAction = updateFeatureObservationType({ featureObservationType })

    const expectedAction = {
      meta: { featureObservationType },
      type:
        actionTypes.CURATED_LIST_SERVICE_UPDATE_FEATURE_OBSERVATION_TYPE_REQUEST,
    }

    store.dispatch(testAction)

    expect(store.getActions()).toEqual([expectedAction])
  })

  it(`calls updateFeatureObservationType with correct body`, () => {
    const operationId = 'updateFeatureObservationType'
    const featureObservationType = {
      id: '123',
      normalStorageLocationText: 'string',
      storedUnderTaxonName: 'Sorex minutus',
    }
    const { id, ...attributes } = featureObservationType

    const callSpy = jest.fn()

    apiClient.mock({
      responses: {
        [operationId]: { data: {} },
      },
      spies: {
        [operationId]: callSpy,
      },
    })

    const testAction = updateFeatureObservationType({ featureObservationType })
    const expectedCallParams = {
      body: {
        data: {
          attributes,
          id,
          type: FEATURE_OBSERVATION_TYPE,
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
    actionTypes.CURATED_LIST_SERVICE_UPDATE_FEATURE_OBSERVATION_TYPE_SUCCESS
  } and returns transformed response`, () => {
    const operationId = 'updateFeatureObservationType'
    const attributes = {
      normalStorageLocationText: 'string',
      storedUnderTaxonName: 'Sorex minutus',
    }
    const id = '123'
    const featureObservationType = {
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

    const testAction = updateFeatureObservationType({ featureObservationType })

    const expectedFirstAction = {
      meta: { featureObservationType },
      type:
        actionTypes.CURATED_LIST_SERVICE_UPDATE_FEATURE_OBSERVATION_TYPE_REQUEST,
    }
    const expectedSecondAction = {
      payload: transformedResponse,
      type:
        actionTypes.CURATED_LIST_SERVICE_UPDATE_FEATURE_OBSERVATION_TYPE_SUCCESS,
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
    actionTypes.CURATED_LIST_SERVICE_UPDATE_FEATURE_OBSERVATION_TYPE_FAIL
  } without throwing error`, () => {
    const operationId = 'updateFeatureObservationType'
    const featureObservationType = {
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

    const testAction = updateFeatureObservationType({ featureObservationType })

    const expectedFirstAction = {
      meta: { featureObservationType },
      type:
        actionTypes.CURATED_LIST_SERVICE_UPDATE_FEATURE_OBSERVATION_TYPE_REQUEST,
    }
    const expectedSecondAction = {
      error: true,
      meta: { featureObservationType },
      payload: mockError,
      type:
        actionTypes.CURATED_LIST_SERVICE_UPDATE_FEATURE_OBSERVATION_TYPE_FAIL,
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
    actionTypes.CURATED_LIST_SERVICE_UPDATE_FEATURE_OBSERVATION_TYPE_FAIL
  } and throws error`, () => {
    const operationId = 'updateFeatureObservationType'
    const featureObservationType = {
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

    const testAction = updateFeatureObservationType({
      featureObservationType,
      throwError: true,
    })

    const expectedFirstAction = {
      meta: { featureObservationType },
      type:
        actionTypes.CURATED_LIST_SERVICE_UPDATE_FEATURE_OBSERVATION_TYPE_REQUEST,
    }
    const expectedSecondAction = {
      error: true,
      meta: { featureObservationType },
      payload: mockError,
      type:
        actionTypes.CURATED_LIST_SERVICE_UPDATE_FEATURE_OBSERVATION_TYPE_FAIL,
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
