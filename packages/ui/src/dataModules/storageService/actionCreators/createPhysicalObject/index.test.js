import setupMockStoreWithApiClient from 'utilities/test/setupMockStoreWithApiClient'

import createPhysicalObject from './index'
import * as actionTypes from '../../actionTypes'
import { PHYSICAL_UNIT } from '../../constants'

describe('dataModules/storageService/actionCreators/createPhysicalObject', () => {
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
    actionTypes.STORAGE_SERVICE_CREATE_PHYSICAL_UNIT_REQUEST
  }`, () => {
    const physicalObject = {}
    const testAction = createPhysicalObject({ physicalObject })

    const expectedAction = {
      meta: { physicalObject },
      type: actionTypes.STORAGE_SERVICE_CREATE_PHYSICAL_UNIT_REQUEST,
    }

    store.dispatch(testAction)

    expect(store.getActions()).toEqual([expectedAction])
  })

  it(`calls createPhysicalObject with correct body`, () => {
    const operationId = 'physicalObjectCreate'
    const physicalObject = {
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

    const testAction = createPhysicalObject({ physicalObject })
    const expectedCallParams = {
      body: {
        data: {
          attributes: { ...physicalObject },
          type: PHYSICAL_UNIT,
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
    actionTypes.STORAGE_SERVICE_CREATE_PHYSICAL_UNIT_SUCCESS
  } and returns transformed response`, () => {
    const operationId = 'physicalObjectCreate'
    const physicalObject = {
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

    const testAction = createPhysicalObject({ physicalObject })

    const expectedFirstAction = {
      meta: { physicalObject },
      type: actionTypes.STORAGE_SERVICE_CREATE_PHYSICAL_UNIT_REQUEST,
    }
    const expectedSecondAction = {
      payload: transformedResponse,
      type: actionTypes.STORAGE_SERVICE_CREATE_PHYSICAL_UNIT_SUCCESS,
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
    actionTypes.STORAGE_SERVICE_CREATE_PHYSICAL_UNIT_FAIL
  } without throwing error`, () => {
    const operationId = 'physicalObjectCreate'
    const physicalObject = {
      normalStorageLocationText: 'string',
      storedUnderTaxonName: 'Sorex minutus',
    }
    const mockError = { status: 500 }

    apiClient.mock({
      errors: {
        [operationId]: mockError,
      },
    })

    const testAction = createPhysicalObject({ physicalObject })

    const expectedFirstAction = {
      meta: { physicalObject },
      type: actionTypes.STORAGE_SERVICE_CREATE_PHYSICAL_UNIT_REQUEST,
    }
    const expectedSecondAction = {
      error: true,
      meta: { physicalObject },
      payload: mockError,
      type: actionTypes.STORAGE_SERVICE_CREATE_PHYSICAL_UNIT_FAIL,
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
    actionTypes.STORAGE_SERVICE_CREATE_PHYSICAL_UNIT_FAIL
  } and throws error`, () => {
    const operationId = 'physicalObjectCreate'
    const physicalObject = {
      normalStorageLocationText: 'string',
      storedUnderTaxonName: 'Sorex minutus',
    }
    const mockError = { status: 500 }

    apiClient.mock({
      errors: {
        [operationId]: mockError,
      },
    })

    const testAction = createPhysicalObject({
      physicalObject,
      throwError: true,
    })

    const expectedFirstAction = {
      meta: { physicalObject },
      type: actionTypes.STORAGE_SERVICE_CREATE_PHYSICAL_UNIT_REQUEST,
    }
    const expectedSecondAction = {
      error: true,
      meta: { physicalObject },
      payload: mockError,
      type: actionTypes.STORAGE_SERVICE_CREATE_PHYSICAL_UNIT_FAIL,
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
