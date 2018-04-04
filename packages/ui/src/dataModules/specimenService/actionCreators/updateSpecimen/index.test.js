import setupMockStoreWithApiClient from 'utilities/test/setupMockStoreWithApiClient'

import updateSpecimen from './index'
import * as actionTypes from '../../actionTypes'

describe('dataModules/specimenService/actionCreators/updateSpecimen', () => {
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
    actionTypes.SPECIMEN_SERVICE_UPDATE_SPECIMEN_REQUEST
  }`, () => {
    const id = '123'
    const specimen = {
      id,
      individualGroup: { distinguishedUnits: [], identifiers: [] },
    }
    const testAction = updateSpecimen({ id, specimen })

    expect.assertions(1)

    return store.dispatch(testAction).then(() => {
      expect(store.getActions()[0].type).toEqual(
        actionTypes.SPECIMEN_SERVICE_UPDATE_SPECIMEN_REQUEST
      )
    })
  })

  it(`calls updateSpecimen with correct body`, () => {
    const operationId = 'updateSpecimen'
    const id = '123'
    const taxon = { id: '2367', type: 'taxon' }
    const attributes = {
      individualGroup: {
        distinguishedUnits: [],
        identifiers: [],
        taxonInformation: {
          determinations: [{ taxon }],
        },
      },
    }
    const specimen = {
      id,
      ...attributes,
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

    const testAction = updateSpecimen({ id, specimen, taxa: [taxon] })

    expect.assertions(7)

    return store.dispatch(testAction).then(() => {
      expect(callSpy.mock.calls.length).toEqual(1)
      expect(callSpy.mock.calls[0][0]).toMatchObject({ operationId })
      expect(callSpy.mock.calls[0][1].body).toBeTruthy()
      expect(callSpy.mock.calls[0][1].body.data).toBeTruthy()
      expect(callSpy.mock.calls[0][1].body.data.attributes).toBeTruthy()
      expect(callSpy.mock.calls[0][1].body.data.relationships).toBeTruthy()
      expect(callSpy.mock.calls[0][1].body.data.type).toBeTruthy()
    })
  })

  it(`dispatches ${
    actionTypes.SPECIMEN_SERVICE_UPDATE_SPECIMEN_SUCCESS
  } and returns transformed response`, () => {
    const operationId = 'updateSpecimen'
    const attributes = {
      individualGroup: {
        distinguishedUnits: [],
        identifiers: [
          { identifier: { identifierType: 'catalogNumber', value: '123' } },
        ],
      },
    }
    const id = '123'
    const specimen = {
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

    const testAction = updateSpecimen({ id, specimen })

    const expectedFirstActionType =
      actionTypes.SPECIMEN_SERVICE_UPDATE_SPECIMEN_REQUEST
    const expectedSecondActionType =
      actionTypes.SPECIMEN_SERVICE_UPDATE_SPECIMEN_SUCCESS

    expect.assertions(3)

    return store.dispatch(testAction).then(res => {
      expect(store.getActions()[0].type).toEqual(expectedFirstActionType)
      expect(store.getActions()[1].type).toEqual(expectedSecondActionType)
      expect(res).toEqual(transformedResponse)
    })
  })

  it(`dispatches ${
    actionTypes.SPECIMEN_SERVICE_UPDATE_SPECIMEN_FAIL
  } without throwing error`, () => {
    const operationId = 'updateSpecimen'
    const specimen = {
      id: '123',
      individualGroup: {
        distinguishedUnits: [],
        identifiers: [
          { identifier: { identifierType: 'catalogNumber', value: '123' } },
        ],
      },
    }
    const mockError = { status: 500 }

    apiClient.mock({
      errors: {
        [operationId]: mockError,
      },
    })

    const testAction = updateSpecimen({ specimen, throwError: false })

    expect.assertions(3)

    return store.dispatch(testAction).then(res => {
      const secondAction = store.getActions()[1]
      expect(secondAction.type).toEqual(
        actionTypes.SPECIMEN_SERVICE_UPDATE_SPECIMEN_FAIL
      )
      expect(secondAction.payload).toEqual(mockError)
      expect(res).toEqual(undefined)
    })
  })

  it(`dispatches ${
    actionTypes.SPECIMEN_SERVICE_UPDATE_SPECIMEN_FAIL
  } and throws error`, () => {
    const operationId = 'updateSpecimen'
    const specimen = {
      id: '123',
      individualGroup: {
        distinguishedUnits: [],
        identifiers: [
          { identifier: { identifierType: 'catalogNumber', value: '123' } },
        ],
      },
    }
    const mockError = { status: 500 }

    apiClient.mock({
      errors: {
        [operationId]: mockError,
      },
    })

    const testAction = updateSpecimen({
      specimen,
      throwError: true,
    })

    expect.assertions(3)

    return store.dispatch(testAction).catch(err => {
      const secondAction = store.getActions()[1]
      expect(secondAction.type).toEqual(
        actionTypes.SPECIMEN_SERVICE_UPDATE_SPECIMEN_FAIL
      )
      expect(secondAction.payload).toEqual(mockError)
      expect(err).toEqual(mockError)
    })
  })
})
