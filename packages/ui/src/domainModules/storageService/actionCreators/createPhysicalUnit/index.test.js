import setupMockStoreWithApiClient from 'utilities/test/setupMockStoreWithApiClient'

import createPhysicalUnit from './index'
import * as actionTypes from '../../actionTypes'
import { PHYSICAL_UNIT } from '../../constants'

describe('domainModules/storageService/actionCreators/createPhysicalUnit', () => {
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
    const physicalUnit = {}
    const testAction = createPhysicalUnit({ physicalUnit })

    const expectedAction = {
      meta: { physicalUnit },
      type: actionTypes.STORAGE_SERVICE_CREATE_PHYSICAL_UNIT_REQUEST,
    }

    store.dispatch(testAction)

    expect(store.getActions()).toEqual([expectedAction])
  })

  it(`calls createPhysicalUnit with correct body`, () => {
    const operationId = 'createPhysicalUnit'
    const physicalUnit = {
      normalStorageLocationText: 'string',
      storedUnderTaxonName: 'Sorex minutus',
    }
    const callSpy = jest.fn()

    apiClient.mock({
      spies: {
        [operationId]: callSpy,
      },
    })

    const testAction = createPhysicalUnit({ physicalUnit })
    const expectedCallParams = {
      body: {
        data: {
          attributes: { ...physicalUnit },
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
    const operationId = 'createPhysicalUnit'
    const physicalUnit = {
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

    const testAction = createPhysicalUnit({ physicalUnit })

    const expectedFirstAction = {
      meta: { physicalUnit },
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
    const operationId = 'createPhysicalUnit'
    const physicalUnit = {
      normalStorageLocationText: 'string',
      storedUnderTaxonName: 'Sorex minutus',
    }
    const mockError = { status: 500 }

    apiClient.mock({
      errors: {
        [operationId]: mockError,
      },
    })

    const testAction = createPhysicalUnit({ physicalUnit })

    const expectedFirstAction = {
      meta: { physicalUnit },
      type: actionTypes.STORAGE_SERVICE_CREATE_PHYSICAL_UNIT_REQUEST,
    }
    const expectedSecondAction = {
      error: true,
      meta: { physicalUnit },
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
    const operationId = 'createPhysicalUnit'
    const physicalUnit = {
      normalStorageLocationText: 'string',
      storedUnderTaxonName: 'Sorex minutus',
    }
    const mockError = { status: 500 }

    apiClient.mock({
      errors: {
        [operationId]: mockError,
      },
    })

    const testAction = createPhysicalUnit({ physicalUnit, throwError: true })

    const expectedFirstAction = {
      meta: { physicalUnit },
      type: actionTypes.STORAGE_SERVICE_CREATE_PHYSICAL_UNIT_REQUEST,
    }
    const expectedSecondAction = {
      error: true,
      meta: { physicalUnit },
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
