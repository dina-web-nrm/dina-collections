import setupMockStoreWithApiClient from 'utilities/test/setupMockStoreWithApiClient'

import getPhysicalUnit from './index'
import * as actionTypes from '../../actionTypes'

describe('domainModules/storageService/actionCreators/getPhysicalUnit', () => {
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
    actionTypes.STORAGE_SERVICE_GET_PHYSICAL_UNIT_REQUEST
  }`, () => {
    const id = '123'

    const testAction = getPhysicalUnit({ id })

    const expectedAction = {
      meta: { id },
      type: actionTypes.STORAGE_SERVICE_GET_PHYSICAL_UNIT_REQUEST,
    }

    store.dispatch(testAction)

    expect(store.getActions()).toEqual([expectedAction])
  })

  it(`calls getPhysicalUnit`, () => {
    const operationId = 'getPhysicalUnit'
    const id = '123'

    const callSpy = jest.fn()

    apiClient.mock({
      spies: {
        [operationId]: callSpy,
      },
    })

    const testAction = getPhysicalUnit({ id })
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
    actionTypes.STORAGE_SERVICE_GET_PHYSICAL_UNIT_SUCCESS
  } and returns transformed response`, () => {
    const operationId = 'getPhysicalUnit'
    const id = '123'
    const mockResponse = {
      data: {
        attributes: {
          name: 'Alan',
        },
        id,
        relationships: {},
        type: 'type',
      },
    }
    const transformedResponse = {
      id,
      name: 'Alan',
      relationships: {},
      type: 'type',
    }

    apiClient.mock({
      responses: {
        [operationId]: mockResponse,
      },
    })

    const testAction = getPhysicalUnit({ id })

    const expectedFirstAction = {
      meta: { id },
      type: actionTypes.STORAGE_SERVICE_GET_PHYSICAL_UNIT_REQUEST,
    }
    const expectedSecondAction = {
      meta: { id },
      payload: transformedResponse,
      type: actionTypes.STORAGE_SERVICE_GET_PHYSICAL_UNIT_SUCCESS,
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
    actionTypes.STORAGE_SERVICE_GET_PHYSICAL_UNIT_FAIL
  } without throwing error`, () => {
    const operationId = 'getPhysicalUnit'
    const id = '123'
    const mockResponse = { status: 404 }

    apiClient.mock({
      errors: {
        [operationId]: mockResponse,
      },
    })

    const testAction = getPhysicalUnit({ id })

    const expectedFirstAction = {
      meta: { id },
      type: actionTypes.STORAGE_SERVICE_GET_PHYSICAL_UNIT_REQUEST,
    }
    const expectedSecondAction = {
      error: true,
      meta: { id },
      payload: mockResponse,
      type: actionTypes.STORAGE_SERVICE_GET_PHYSICAL_UNIT_FAIL,
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
    actionTypes.STORAGE_SERVICE_GET_PHYSICAL_UNIT_FAIL
  } and throws error`, () => {
    const operationId = 'getPhysicalUnit'
    const id = '123'
    const mockResponse = { status: 404 }

    apiClient.mock({
      errors: {
        [operationId]: mockResponse,
      },
    })

    const testAction = getPhysicalUnit({ id, throwError: true })

    const expectedFirstAction = {
      meta: { id },
      type: actionTypes.STORAGE_SERVICE_GET_PHYSICAL_UNIT_REQUEST,
    }
    const expectedSecondAction = {
      error: true,
      meta: { id },
      payload: mockResponse,
      type: actionTypes.STORAGE_SERVICE_GET_PHYSICAL_UNIT_FAIL,
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
