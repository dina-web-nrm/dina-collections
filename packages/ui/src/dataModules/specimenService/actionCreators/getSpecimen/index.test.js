import setupMockStoreWithApiClient from 'utilities/test/setupMockStoreWithApiClient'

import getSpecimen from './index'
import * as actionTypes from '../../actionTypes'

describe('dataModules/specimenService/actionCreators/getSpecimen', () => {
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

  it(`dispatches ${actionTypes.SPECIMEN_SERVICE_GET_SPECIMEN_REQUEST}`, () => {
    const id = '123'

    const testAction = getSpecimen({ id })

    const expectedAction = {
      meta: { id },
      type: actionTypes.SPECIMEN_SERVICE_GET_SPECIMEN_REQUEST,
    }

    store.dispatch(testAction)

    expect(store.getActions()).toEqual([expectedAction])
  })

  it(`calls getSpecimen`, () => {
    const operationId = 'getSpecimen'
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

    const testAction = getSpecimen({ id })
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
    actionTypes.SPECIMEN_SERVICE_GET_SPECIMEN_SUCCESS
  } and returns transformed response`, () => {
    const operationId = 'getSpecimen'
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

    const testAction = getSpecimen({ id })

    const expectedFirstAction = {
      meta: { id },
      type: actionTypes.SPECIMEN_SERVICE_GET_SPECIMEN_REQUEST,
    }
    const expectedSecondAction = {
      meta: { id },
      payload: transformedResponse,
      type: actionTypes.SPECIMEN_SERVICE_GET_SPECIMEN_SUCCESS,
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
    actionTypes.SPECIMEN_SERVICE_GET_SPECIMEN_FAIL
  } without throwing error`, () => {
    const operationId = 'getSpecimen'
    const id = '123'
    const mockResponse = { status: 404 }

    apiClient.mock({
      errors: {
        [operationId]: mockResponse,
      },
    })

    const testAction = getSpecimen({ id })

    const expectedFirstAction = {
      meta: { id },
      type: actionTypes.SPECIMEN_SERVICE_GET_SPECIMEN_REQUEST,
    }
    const expectedSecondAction = {
      error: true,
      meta: { id },
      payload: mockResponse,
      type: actionTypes.SPECIMEN_SERVICE_GET_SPECIMEN_FAIL,
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
    actionTypes.SPECIMEN_SERVICE_GET_SPECIMEN_FAIL
  } and throws error`, () => {
    const operationId = 'getSpecimen'
    const id = '123'
    const mockResponse = { status: 404 }

    apiClient.mock({
      errors: {
        [operationId]: mockResponse,
      },
    })

    const testAction = getSpecimen({ id, throwError: true })

    const expectedFirstAction = {
      meta: { id },
      type: actionTypes.SPECIMEN_SERVICE_GET_SPECIMEN_REQUEST,
    }
    const expectedSecondAction = {
      error: true,
      meta: { id },
      payload: mockResponse,
      type: actionTypes.SPECIMEN_SERVICE_GET_SPECIMEN_FAIL,
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
