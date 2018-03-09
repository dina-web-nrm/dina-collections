import setupMockStoreWithApiClient from 'utilities/test/setupMockStoreWithApiClient'

import updatePhysicalUnit from './index'
import * as actionTypes from '../../actionTypes'
import { PHYSICAL_UNIT } from '../../constants'

describe('domainModules/storageService/actionCreators/updatePhysicalUnit', () => {
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
    actionTypes.STORAGE_SERVICE_UPDATE_PHYSICAL_UNIT_REQUEST
  }`, () => {
    const physicalUnit = {}
    const testAction = updatePhysicalUnit({ physicalUnit })

    const expectedAction = {
      meta: { physicalUnit },
      type: actionTypes.STORAGE_SERVICE_UPDATE_PHYSICAL_UNIT_REQUEST,
    }

    store.dispatch(testAction)

    expect(store.getActions()).toEqual([expectedAction])
  })

  it(`calls updatePhysicalUnit with correct body`, () => {
    const operationId = 'updatePhysicalUnit'
    const physicalUnit = {
      id: '123',
      normalStorageLocationText: 'string',
      storedUnderTaxonName: 'Sorex minutus',
    }
    const { id, ...attributes } = physicalUnit

    const callSpy = jest.fn()

    apiClient.mock({
      spies: {
        [operationId]: callSpy,
      },
    })

    const testAction = updatePhysicalUnit({ physicalUnit })
    const expectedCallParams = {
      body: {
        data: {
          attributes,
          id,
          type: PHYSICAL_UNIT,
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
    actionTypes.STORAGE_SERVICE_UPDATE_PHYSICAL_UNIT_SUCCESS
  } and returns transformed response`, () => {
    const operationId = 'updatePhysicalUnit'
    const attributes = {
      normalStorageLocationText: 'string',
      storedUnderTaxonName: 'Sorex minutus',
    }
    const id = '123'
    const physicalUnit = {
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

    const testAction = updatePhysicalUnit({ physicalUnit })

    const expectedFirstAction = {
      meta: { physicalUnit },
      type: actionTypes.STORAGE_SERVICE_UPDATE_PHYSICAL_UNIT_REQUEST,
    }
    const expectedSecondAction = {
      payload: transformedResponse,
      type: actionTypes.STORAGE_SERVICE_UPDATE_PHYSICAL_UNIT_SUCCESS,
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
    actionTypes.STORAGE_SERVICE_UPDATE_PHYSICAL_UNIT_FAIL
  } without throwing error`, () => {
    const operationId = 'updatePhysicalUnit'
    const physicalUnit = {
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

    const testAction = updatePhysicalUnit({ physicalUnit })

    const expectedFirstAction = {
      meta: { physicalUnit },
      type: actionTypes.STORAGE_SERVICE_UPDATE_PHYSICAL_UNIT_REQUEST,
    }
    const expectedSecondAction = {
      error: true,
      meta: { physicalUnit },
      payload: mockError,
      type: actionTypes.STORAGE_SERVICE_UPDATE_PHYSICAL_UNIT_FAIL,
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
    actionTypes.STORAGE_SERVICE_UPDATE_PHYSICAL_UNIT_FAIL
  } and throws error`, () => {
    const operationId = 'updatePhysicalUnit'
    const physicalUnit = {
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

    const testAction = updatePhysicalUnit({ physicalUnit, throwError: true })

    const expectedFirstAction = {
      meta: { physicalUnit },
      type: actionTypes.STORAGE_SERVICE_UPDATE_PHYSICAL_UNIT_REQUEST,
    }
    const expectedSecondAction = {
      error: true,
      meta: { physicalUnit },
      payload: mockError,
      type: actionTypes.STORAGE_SERVICE_UPDATE_PHYSICAL_UNIT_FAIL,
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
