import setupMockStoreWithApiClient from 'utilities/test/setupMockStoreWithApiClient'

import getCuratedLocalities from './index'
import * as actionTypes from '../../actionTypes'

describe('domainModules/localityService/actionCreators/getCuratedLocalities', () => {
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
    actionTypes.LOCALITY_SERVICE_GET_CURATED_LOCALITIES_REQUEST
  }`, () => {
    const id = '123'

    const testAction = getCuratedLocalities({ id })

    const expectedAction = {
      type: actionTypes.LOCALITY_SERVICE_GET_CURATED_LOCALITIES_REQUEST,
    }

    store.dispatch(testAction)

    expect(store.getActions()).toEqual([expectedAction])
  })

  it(`calls getCuratedLocalities`, () => {
    const operationId = 'getCuratedLocalities'
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

    const testAction = getCuratedLocalities({ id })

    expect.assertions(2)

    return store.dispatch(testAction).then(() => {
      expect(callSpy.mock.calls.length).toEqual(1)
      expect(callSpy.mock.calls[0][0]).toMatchObject({ operationId })
    })
  })

  it(`dispatches ${
    actionTypes.LOCALITY_SERVICE_GET_CURATED_LOCALITIES_SUCCESS
  } and returns transformed response`, () => {
    const operationId = 'getCuratedLocalities'
    const id = '123'
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

    const testAction = getCuratedLocalities({ id })

    const expectedFirstAction = {
      type: actionTypes.LOCALITY_SERVICE_GET_CURATED_LOCALITIES_REQUEST,
    }
    const expectedSecondAction = {
      payload: transformedResponse,
      type: actionTypes.LOCALITY_SERVICE_GET_CURATED_LOCALITIES_SUCCESS,
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
    actionTypes.LOCALITY_SERVICE_GET_CURATED_LOCALITIES_FAIL
  } without throwing error`, () => {
    const operationId = 'getCuratedLocalities'
    const id = '123'
    const mockResponse = { status: 404 }

    apiClient.mock({
      errors: {
        [operationId]: mockResponse,
      },
    })

    const testAction = getCuratedLocalities({ id })

    const expectedFirstAction = {
      type: actionTypes.LOCALITY_SERVICE_GET_CURATED_LOCALITIES_REQUEST,
    }
    const expectedSecondAction = {
      error: true,
      payload: mockResponse,
      type: actionTypes.LOCALITY_SERVICE_GET_CURATED_LOCALITIES_FAIL,
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
    actionTypes.LOCALITY_SERVICE_GET_CURATED_LOCALITIES_FAIL
  } and throws error`, () => {
    const operationId = 'getCuratedLocalities'
    const mockResponse = { status: 404 }

    apiClient.mock({
      errors: {
        [operationId]: mockResponse,
      },
    })

    const testAction = getCuratedLocalities({ throwError: true })

    const expectedFirstAction = {
      type: actionTypes.LOCALITY_SERVICE_GET_CURATED_LOCALITIES_REQUEST,
    }
    const expectedSecondAction = {
      error: true,
      payload: mockResponse,
      type: actionTypes.LOCALITY_SERVICE_GET_CURATED_LOCALITIES_FAIL,
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
