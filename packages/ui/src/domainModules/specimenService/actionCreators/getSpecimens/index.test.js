import setupMockStoreWithApiClient from 'utilities/test/setupMockStoreWithApiClient'

import getSpecimens from './index'
import * as actionTypes from '../../actionTypes'

describe('domainModules/specimenService/actionCreators/getSpecimens', () => {
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

  it(`dispatches ${actionTypes.SPECIMEN_SERVICE_GET_SPECIMENS_REQUEST}`, () => {
    const testAction = getSpecimens()

    store.dispatch(testAction)

    expect(store.getActions()[0].type).toEqual(
      actionTypes.SPECIMEN_SERVICE_GET_SPECIMENS_REQUEST
    )
  })

  it(`calls getSpecimens with queryParams`, () => {
    const operationId = 'getSpecimens'
    const queryParams = { 'filter[catalogNumber]': '123' }
    const callSpy = jest.fn()

    apiClient.mock({
      responses: {
        [operationId]: { data: [] },
      },
      spies: {
        [operationId]: callSpy,
      },
    })

    const testAction = getSpecimens({
      queryParams,
    })

    const expectedCallParams = {
      queryParams,
    }

    expect.assertions(3)

    return store.dispatch(testAction).then(() => {
      expect(callSpy.mock.calls.length).toEqual(1)
      expect(callSpy.mock.calls[0][0]).toMatchObject({ operationId })
      expect(callSpy.mock.calls[0][1]).toEqual(expectedCallParams)
    })
  })

  it(`dispatches ${
    actionTypes.SPECIMEN_SERVICE_GET_SPECIMENS_SUCCESS
  } and returns transformed response`, () => {
    const operationId = 'getSpecimens'
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

    const testAction = getSpecimens()

    const expectedFirstActionType =
      actionTypes.SPECIMEN_SERVICE_GET_SPECIMENS_REQUEST
    const expectedSecondActionType =
      actionTypes.SPECIMEN_SERVICE_GET_SPECIMENS_SUCCESS

    expect.assertions(3)

    return store.dispatch(testAction).then(res => {
      expect(store.getActions()[0].type).toEqual(expectedFirstActionType)
      expect(store.getActions()[1].type).toEqual(expectedSecondActionType)
      expect(res).toEqual(transformedResponse)
    })
  })

  it(`dispatches ${
    actionTypes.SPECIMEN_SERVICE_GET_SPECIMENS_FAIL
  } without throwing error`, () => {
    const operationId = 'getSpecimens'
    const mockError = { status: 500 }

    apiClient.mock({
      errors: {
        [operationId]: mockError,
      },
    })

    const testAction = getSpecimens({ throwError: false })

    expect.assertions(3)

    return store.dispatch(testAction).then(res => {
      const secondAction = store.getActions()[1]
      expect(secondAction.type).toEqual(
        actionTypes.SPECIMEN_SERVICE_GET_SPECIMENS_FAIL
      )
      expect(secondAction.payload).toEqual(mockError)
      expect(res).toEqual(undefined)
    })
  })

  it(`dispatches ${
    actionTypes.SPECIMEN_SERVICE_GET_SPECIMENS_FAIL
  } and throws error`, () => {
    const operationId = 'getSpecimens'
    const mockError = { status: 500 }

    apiClient.mock({
      errors: {
        [operationId]: mockError,
      },
    })

    const testAction = getSpecimens({ throwError: true })

    expect.assertions(3)

    return store.dispatch(testAction).catch(err => {
      const secondAction = store.getActions()[1]
      expect(secondAction.type).toEqual(
        actionTypes.SPECIMEN_SERVICE_GET_SPECIMENS_FAIL
      )
      expect(secondAction.payload).toEqual(mockError)
      expect(err).toEqual(mockError)
    })
  })
})
